package sitebuild

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"html"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
)

const (
	Domain         = "sites.nandi.sh"
	homeSlug       = "home"
	siteListMarker = "<!-- SITE_LIST -->"
)

var slugPattern = regexp.MustCompile(`^[a-z0-9]+(?:[-_][a-z0-9]+)*$`)

type Manifest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Site struct {
	Slug        string
	Title       string
	Description string
	URLPath     string
	PublicDir   string
}

func Build(root, output string) ([]Site, error) {
	root, err := filepath.Abs(root)
	if err != nil {
		return nil, fmt.Errorf("resolve repository root: %w", err)
	}
	output, err = filepath.Abs(output)
	if err != nil {
		return nil, fmt.Errorf("resolve output directory: %w", err)
	}
	if output == root {
		return nil, errors.New("output directory cannot be the repository root")
	}

	sites, err := discover(filepath.Join(root, "sites"))
	if err != nil {
		return nil, err
	}

	outputParent := filepath.Dir(output)
	if err := os.MkdirAll(outputParent, 0o755); err != nil {
		return nil, fmt.Errorf("create output parent: %w", err)
	}
	stage, err := os.MkdirTemp(outputParent, ".sites-build-")
	if err != nil {
		return nil, fmt.Errorf("create build staging directory: %w", err)
	}
	defer os.RemoveAll(stage)

	for _, site := range sites {
		target := stage
		if site.Slug != homeSlug {
			target = filepath.Join(stage, site.Slug)
			if _, err := os.Stat(target); err == nil {
				return nil, fmt.Errorf("site %q collides with home content at %s", site.Slug, site.URLPath)
			} else if !errors.Is(err, fs.ErrNotExist) {
				return nil, fmt.Errorf("inspect output for %q: %w", site.Slug, err)
			}
			if err := os.Mkdir(target, 0o755); err != nil {
				return nil, fmt.Errorf("create output for %q: %w", site.Slug, err)
			}
		}
		if err := copyContents(site.PublicDir, target); err != nil {
			return nil, fmt.Errorf("copy site %q: %w", site.Slug, err)
		}
	}

	if err := renderHome(filepath.Join(stage, "index.html"), sites); err != nil {
		return nil, err
	}
	if err := os.WriteFile(filepath.Join(stage, "CNAME"), []byte(Domain+"\n"), 0o644); err != nil {
		return nil, fmt.Errorf("write CNAME: %w", err)
	}
	if err := os.WriteFile(filepath.Join(stage, ".nojekyll"), nil, 0o644); err != nil {
		return nil, fmt.Errorf("write .nojekyll: %w", err)
	}

	if err := os.RemoveAll(output); err != nil {
		return nil, fmt.Errorf("replace output directory: %w", err)
	}
	if err := os.Rename(stage, output); err != nil {
		return nil, fmt.Errorf("publish staged output: %w", err)
	}
	return sites, nil
}

func discover(sitesDir string) ([]Site, error) {
	entries, err := os.ReadDir(sitesDir)
	if err != nil {
		return nil, fmt.Errorf("read sites directory: %w", err)
	}

	sites := make([]Site, 0, len(entries))
	hasHome := false
	for _, entry := range entries {
		if strings.HasPrefix(entry.Name(), ".") {
			continue
		}
		if !entry.IsDir() {
			return nil, fmt.Errorf("sites/%s must be a directory", entry.Name())
		}
		if !slugPattern.MatchString(entry.Name()) {
			return nil, fmt.Errorf("site directory %q must match %s", entry.Name(), slugPattern)
		}

		siteDir := filepath.Join(sitesDir, entry.Name())
		manifest, err := readManifest(filepath.Join(siteDir, "site.json"))
		if err != nil {
			return nil, fmt.Errorf("site %q: %w", entry.Name(), err)
		}
		publicDir := filepath.Join(siteDir, "public")
		if info, err := os.Stat(filepath.Join(publicDir, "index.html")); err != nil || !info.Mode().IsRegular() {
			if err == nil {
				err = errors.New("not a regular file")
			}
			return nil, fmt.Errorf("site %q requires public/index.html: %w", entry.Name(), err)
		}

		urlPath := "/" + entry.Name() + "/"
		if entry.Name() == homeSlug {
			hasHome = true
			urlPath = "/"
		}
		sites = append(sites, Site{
			Slug:        entry.Name(),
			Title:       manifest.Title,
			Description: manifest.Description,
			URLPath:     urlPath,
			PublicDir:   publicDir,
		})
	}
	if !hasHome {
		return nil, errors.New("sites/home is required")
	}
	sort.Slice(sites, func(i, j int) bool {
		if sites[i].Slug == homeSlug {
			return true
		}
		if sites[j].Slug == homeSlug {
			return false
		}
		return sites[i].Slug < sites[j].Slug
	})
	return sites, nil
}

func readManifest(path string) (Manifest, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Manifest{}, fmt.Errorf("read site.json: %w", err)
	}
	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	var manifest Manifest
	if err := decoder.Decode(&manifest); err != nil {
		return Manifest{}, fmt.Errorf("decode site.json: %w", err)
	}
	if err := decoder.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		return Manifest{}, errors.New("site.json must contain exactly one JSON object")
	}
	manifest.Title = strings.TrimSpace(manifest.Title)
	manifest.Description = strings.TrimSpace(manifest.Description)
	if manifest.Title == "" || manifest.Description == "" {
		return Manifest{}, errors.New("site.json title and description are required")
	}
	return manifest, nil
}

func copyContents(source, target string) error {
	entries, err := os.ReadDir(source)
	if err != nil {
		return err
	}
	for _, entry := range entries {
		if err := copyEntry(filepath.Join(source, entry.Name()), filepath.Join(target, entry.Name())); err != nil {
			return err
		}
	}
	return nil
}

func copyEntry(source, target string) error {
	info, err := os.Lstat(source)
	if err != nil {
		return err
	}
	if info.Mode()&os.ModeSymlink != 0 {
		return fmt.Errorf("symbolic links are not allowed: %s", source)
	}
	if info.IsDir() {
		if err := os.Mkdir(target, 0o755); err != nil {
			return err
		}
		return copyContents(source, target)
	}
	if !info.Mode().IsRegular() {
		return fmt.Errorf("unsupported file type: %s", source)
	}
	input, err := os.Open(source)
	if err != nil {
		return err
	}
	defer input.Close()
	output, err := os.OpenFile(target, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0o644)
	if err != nil {
		return err
	}
	if _, err := io.Copy(output, input); err != nil {
		output.Close()
		return err
	}
	return output.Close()
}

func renderHome(path string, sites []Site) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("read home page: %w", err)
	}
	if bytes.Count(data, []byte(siteListMarker)) != 1 {
		return fmt.Errorf("home index must contain exactly one %s marker", siteListMarker)
	}

	var content strings.Builder
	for _, site := range sites {
		if site.Slug == homeSlug {
			continue
		}
		fmt.Fprintf(&content, `<a class="site-card" href="%s"><span class="site-title">%s</span><span class="site-description">%s</span><span class="site-path">%s</span></a>`, html.EscapeString(site.URLPath), html.EscapeString(site.Title), html.EscapeString(site.Description), html.EscapeString(site.URLPath))
	}
	if content.Len() == 0 {
		content.WriteString(`<p class="empty-state">New projects will appear here.</p>`)
	}

	rendered := bytes.Replace(data, []byte(siteListMarker), []byte(content.String()), 1)
	if err := os.WriteFile(path, rendered, 0o644); err != nil {
		return fmt.Errorf("render home page: %w", err)
	}
	return nil
}
