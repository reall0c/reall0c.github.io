# reAll0c.github.io

This repository contains the source for **reAll0c's Cave Den**, a personal site focused on cybersecurity and AI topics.  The site is built with [Zola](https://www.getzola.org/) using the [Linkita](https://codeberg.org/salif/linkita) theme as a submodule.

## Cloning

Clone the repository including the theme submodule:

```bash
git clone --recursive https://github.com/reall0c/reall0c.github.io.git
```

If you already cloned without `--recursive`, initialise the submodule with:

```bash
git submodule update --init --recursive
```

## Building locally

1. [Install Zola](https://www.getzola.org/documentation/getting-started/installation/).
2. Run `zola build` to generate the site into the `public/` directory.
3. Serve locally with `zola serve` while editing.

## Deployment

The repository includes a GitHub Actions workflow that builds the site and deploys the contents of the `public/` directory to GitHub Pages whenever changes are pushed to the `main` branch.

