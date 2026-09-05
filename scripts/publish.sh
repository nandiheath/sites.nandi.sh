#!/bin/sh
set -eu

: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
: "${GITHUB_SHA:?GITHUB_SHA is required}"
: "${GH_TOKEN:?GH_TOKEN is required}"

if [ ! -f dist/index.html ] || [ ! -f dist/CNAME ] || [ ! -f dist/.nojekyll ]; then
  printf '%s\n' 'dist is not a complete GitHub Pages build; run make build first' >&2
  exit 1
fi

publish_dir=$(mktemp -d)
trap 'rm -rf "$publish_dir"' EXIT HUP INT TERM
cp -R dist/. "$publish_dir/"

cd "$publish_dir"
git init -b gh-pages >/dev/null
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git add --all
git commit -m "Deploy ${GITHUB_SHA}" >/dev/null
git remote add origin "https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
git push --force origin HEAD:gh-pages
