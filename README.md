# figmake

> A tiny CLI for making [Figma plugins](https://figma.com/plugin-docs/)

## Goals

- As few files as possible
- No `package.json`, `node_modules`, Git, or TypeScript
- No JavaScript UI framework
- Tiny CLI that only does one thing
- No API – just use the [Figma plugin API](https://figma.com/plugin-docs/)

## Quick start

*Requires [Node.js](https://nodejs.org/).*

Figmake assumes that you have the following **five** files:

```
main.js
manifest.json
ui.css
ui.html
ui.js
```

(Of these, only `main.js` and [`manifest.json`](https://www.figma.com/plugin-docs/manifest/) are mandatory.)

`manifest.json` should look something like:

```json
{
  "name": "Hello, World",
  "id": "314159265358979323",
  "api": "1.0.0",
  "main": "build/main.js",
  "ui": "build/ui.html"
}
```

To build with minification:

```
$ npx figmake
```

To build with sourcemaps and without minifying:

```
$ npx figmake -d
```

To watch for code changes and rebuild automatically:

```
$ npx figmake -w
```

## See also

- [Create Figma Plugin](https://github.com/yuanqing/create-figma-plugin)

## License

[MIT](/LICENSE.md)
