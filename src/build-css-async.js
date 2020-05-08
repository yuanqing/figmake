const postcss = require('postcss')
const postcssUrl = require('postcss-url')
const sass = require('sass')

async function buildCssAsync (file, outputFilePath, isDevelopment) {
  const css = sass.renderSync({
    file,
    outFile: outputFilePath,
    sourceMap: isDevelopment === true,
    sourceMapContents: isDevelopment === true,
    sourceMapEmbed: isDevelopment === true,
    outputStyle: isDevelopment === true ? 'expanded' : 'compressed'
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
