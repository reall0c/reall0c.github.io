# reAll0c.github.io

This repository contains the source for **reAll0c's Cave Den**, a personal site focused on cybersecurity and AI topics.  The site is built with [Zola](https://www.getzola.org/) using the [Linkita](https://github.com/salif/linkita) theme vendored directly in the `themes/` directory.

## Cloning

Clone the repository normally:

```bash
git clone https://github.com/reall0c/reall0c.github.io.git
```

## Building locally

1. [Install Zola](https://www.getzola.org/documentation/getting-started/installation/).
2. Run `zola build` to generate the site into the `public/` directory.
3. Serve locally with `zola serve` while editing.

## Deployment

The repository includes a GitHub Actions workflow that builds the site and deploys the contents of the `public/` directory to GitHub Pages whenever changes are pushed to the `main` branch.

