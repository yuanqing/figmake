# Figmake [![npm Version](https://img.shields.io/npm/v/figmake?cacheSeconds=1800)](https://www.npmjs.com/package/figmake) [![build](https://github.com/yuanqing/figmake/workflows/build/badge.svg)](https://github.com/yuanqing/figmake/actions?query=workflow%3Abuild)

> A tiny CLI for making [Figma plugins](https://figma.com/plugin-docs/) with HTML, CSS, and vanilla JavaScript

- Stitches together `ui.html`, `ui.scss`, and `ui.js` into a single HTML file for your plugin UI
- Automatically inlines any image assets into the generated HTML file

## Goals

- As few files as possible
- No `package.json` or `node_modules`
- No TypeScript
- No JavaScript UI frameworks
- No API; just use the [Figma plugin API](https://figma.com/plugin-docs/)
- Tiny CLI that just does one thing

## Quick start

*Requires [Node.js](https://nodejs.org/).*

Figmake assumes that your plugin code comprises the following five files:

```
main.js
manifest.json
ui.scss
ui.html
ui.js
```

(Of these, only `main.js` and [`manifest.json`](https://figma.com/plugin-docs/manifest/) are mandatory.)

`manifest.json` should look something like:

```json
{
  "name": "My Plugin",
  "id": "314159265358979323",
  "api": "1.0.0",
  "main": "build/main.js",
  "ui": "build/ui.html"
}
```

To build the plugin:

```
$ npx figmake
```

This will generate the following two files:

- **`build/main.js`** — The plugin entry point, built from `main.js`.
- **`build/ui.html`** — HTML file for the plugin UI, stitched together from `ui.html`, `ui.scss`, and `ui.js`.
    - `ui.scss` will be compiled down to CSS.
    - Image assets referenced in `ui.html` and `ui.scss` will be inlined into the resulting HTML file.

To watch for code changes and rebuild the plugin automatically:

```
$ npx figmake -w
```

To build with minification:

```
$ npx figmake -m
```

## See also

- [Create Figma Plugin](https://github.com/yuanqing/create-figma-plugin)

## License

[MIT](/LICENSE.md)
