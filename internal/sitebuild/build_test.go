package sitebuild

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestBuildPublishesHomeAndNestedSites(t *testing.T) {
	root := t.TempDir()
	writeSite(t, root, "home", "Home", "The root site", `<main>`+siteListMarker+`</main>`)
	writeSite(t, root, "2027sbd_hokkaido", "Hokkaido", "Snowboard trip", `<h1>Hokkaido</h1>`)

	output := filepath.Join(root, "dist")
	sites, err := Build(root, output)
	if err != nil {
		t.Fatal(err)
	}
	if len(sites) != 2 || sites[0].URLPath != "/" || sites[1].URLPath != "/2027sbd_hokkaido/" {
		t.Fatalf("unexpected site routes: %#v", sites)
	}

	home := readFile(t, filepath.Join(output, "index.html"))
	if !strings.Contains(home, `href="/2027sbd_hokkaido/"`) || !strings.Contains(home, "Snowboard trip") {
		t.Fatalf("home page does not link the nested site: %s", home)
	}
	if got := readFile(t, filepath.Join(output, "2027sbd_hokkaido", "index.html")); got != `<h1>Hokkaido</h1>` {
		t.Fatalf("nested site published at unexpected content: %s", got)
	}
	if got := readFile(t, filepath.Join(output, "CNAME")); got != Domain+"\n" {
		t.Fatalf("unexpected CNAME: %q", got)
	}
}

func TestBuildRejectsHomeContentThatShadowsASubsite(t *testing.T) {
	root := t.TempDir()
	writeSite(t, root, "home", "Home", "The root site", `<main>`+siteListMarker+`</main>`)
	if err := os.MkdirAll(filepath.Join(root, "sites", "home", "public", "notes"), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(root, "sites", "home", "public", "notes", "index.html"), []byte("shadow"), 0o644); err != nil {
		t.Fatal(err)
	}
	writeSite(t, root, "notes", "Notes", "Small references", `<h1>Notes</h1>`)

	_, err := Build(root, filepath.Join(root, "dist"))
	if err == nil || !strings.Contains(err.Error(), "collides with home content") {
		t.Fatalf("expected collision error, got %v", err)
	}
}

func TestBuildVersionsTransitiveAssets(t *testing.T) {
	root := t.TempDir()
	writeSite(t, root, "home", "Home", "Root", siteListMarker)
	entry := `<script type="module" src="{{ASSET_BASE}}js/main.js"></script>`
	writeSite(t, root, "trip", "Trip", "Trip", entry)
	public := filepath.Join(root, "sites", "trip", "public")
	for name, content := range map[string]string{
		"js/main.js":       `import './data.js';`,
		"js/data.js":       `export default "old";`,
		"assets/style.css": `body { color: red; }`,
	} {
		path := filepath.Join(public, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	output := filepath.Join(root, "dist")
	buildURL := func() string {
		t.Helper()
		if _, err := Build(root, output); err != nil {
			t.Fatal(err)
		}
		document := readFile(t, filepath.Join(output, "trip", "index.html"))
		_, rest, ok := strings.Cut(document, `src="`)
		url, _, closed := strings.Cut(rest, `"`)
		if !ok || !closed || !strings.HasPrefix(url, "/trip/") || strings.Contains(url, "{{") {
			t.Fatalf("entry does not resolve to a published asset: %s", document)
		}
		return url
	}
	first := buildURL()
	if again := buildURL(); again != first {
		t.Fatalf("unchanged build invalidates asset cache: %q -> %q", first, again)
	}
	if err := os.WriteFile(filepath.Join(public, "js", "data.js"), []byte(`export default "new";`), 0o644); err != nil {
		t.Fatal(err)
	}
	second := buildURL()
	if second == first {
		t.Fatal("nested module changed but entry asset URL stayed cached")
	}
	published := filepath.Join(output, filepath.FromSlash(strings.TrimPrefix(second, "/")))
	if got := readFile(t, published); got != `import './data.js';` {
		t.Fatalf("entry import changed: %s", got)
	}
	if got := readFile(t, filepath.Join(filepath.Dir(published), "data.js")); got != `export default "new";` {
		t.Fatalf("relative dependency resolves to stale content: %s", got)
	}
	if got := readFile(t, filepath.Join(filepath.Dir(published), "..", "assets", "style.css")); got != `body { color: red; }` {
		t.Fatalf("existing assets directory was not preserved: %s", got)
	}
	if got := readFile(t, filepath.Join(public, "index.html")); got != entry {
		t.Fatalf("build modified source: %s", got)
	}
	if _, err := os.Stat(filepath.Join(output, "trip", "js", "main.js")); !os.IsNotExist(err) {
		t.Fatalf("unversioned asset still published: %v", err)
	}
}

func writeSite(t *testing.T, root, slug, title, description, index string) {
	t.Helper()
	publicDir := filepath.Join(root, "sites", slug, "public")
	if err := os.MkdirAll(publicDir, 0o755); err != nil {
		t.Fatal(err)
	}
	manifest := `{"title":"` + title + `","description":"` + description + `"}`
	if err := os.WriteFile(filepath.Join(root, "sites", slug, "site.json"), []byte(manifest), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(publicDir, "index.html"), []byte(index), 0o644); err != nil {
		t.Fatal(err)
	}
}

func readFile(t *testing.T, path string) string {
	t.Helper()
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	return string(data)
}
