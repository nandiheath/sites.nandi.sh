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
