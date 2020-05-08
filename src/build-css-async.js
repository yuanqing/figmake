const postcss = require('postcss')
const postcssUrl = require('postcss-url')
const sass = require('sass')

async function buildCssAsync (file, outputFilePath, shouldMinify) {
  const css = sass.renderSync({
    file,
    outFile: outputFilePath,
    sourceMap: shouldMinify === false,
    sourceMapContents: shouldMinify === false,
    sourceMapEmbed: shouldMinify === false,
    outputStyle: shouldMinify === true ? 'compressed' : 'expanded'
  })
  const result = await postcss()
    .use(
      postcssUrl({
        url: 'inline'
      })
    )
    .process(css.css.toString('utf8'), { from: file })
    .toString()
  return result
}

module.exports = buildCssAsync
