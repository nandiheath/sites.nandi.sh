# sites.nandi.sh

Static-site monorepo published at [sites.nandi.sh](https://sites.nandi.sh).

## Layout

- `sites/home/public/` builds to `/`.
- `sites/<slug>/public/` builds to `/<slug>/`.
- Each site has a `site.json` title and description. The home page discovers sub-sites from those manifests.
- `dist/` is generated and ignored.

Add a site:

```text
sites/
  notes/
    site.json
    public/
      index.html
```

Directory names are stable URL slugs: lowercase letters, digits, and single hyphen or underscore separators. Non-versioned sites use root-aware asset URLs such as `/notes/styles.css`.

For cache-safe releases, use `{{ASSET_BASE}}` for every local asset URL in a site's root `public/index.html`, for example `<script type="module" src="{{ASSET_BASE}}js/main.js"></script>`. This opts the site into content-versioned assets: the entry document stays at `/<slug>/`, while every other public file moves under `/<slug>/assets/<sha256>/`. Relative imports, CSS URLs and vendor dependencies stay together without source rewriting. Any asset-content or filename change creates a new base; unchanged assets keep it stable. Keep navigation URLs pointed at stable site routes, not the asset base. Sites without the marker retain their existing output layout. Preview the built output, not raw source.

## Local workflow

```sh
make ci
make serve
```

`make ci` is the exact pull-request validation contract. `make serve` rebuilds and serves the complete output at `http://127.0.0.1:4173`.

## Publishing

Pull requests validate without write permission. A merge to `main` reruns validation, builds all sites, and force-publishes the generated artifact to `gh-pages`. GitHub Pages serves that branch with the generated `CNAME`; Cloudflare DNS remains managed from the private infrastructure repository.
