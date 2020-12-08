# Awesome WhatTheFar

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

😎 Curated list of awesome WhatTheFar

## Getting Started

Install dependecies and build internal packages :

```bash
$ yarn install
$ yarn build
```

Generate `awesome-whatthefar` :

```bash
$ ./awesome.sh --copy
```

## Library

Libraries are located at `packages/*`.

- [@awesome-whatthefar/parser](packages/generator/README.md) - A generic library for templating data into an awesome list
- [@awesome-whatthefar/generator](packages/parser/README.md) - Source code that generate `awesome-whatthefar`

### Publish Libraries

Publish all libraries to `npm`.

```bash
$ yarn install
$ yarn run publish
```
