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

Directory names are stable URL slugs: lowercase letters, digits, and single hyphen or underscore separators. Site assets must use root-aware URLs such as `/notes/styles.css`.

## Local workflow

```sh
make ci
make serve
```

`make ci` is the exact pull-request validation contract. `make serve` rebuilds and serves the complete output at `http://127.0.0.1:4173`.

## Publishing

Pull requests validate without write permission. A merge to `main` reruns validation, builds all sites, and force-publishes the generated artifact to `gh-pages`. GitHub Pages serves that branch with the generated `CNAME`; Cloudflare DNS remains managed from the private infrastructure repository.
