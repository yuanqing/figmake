const fs = require('fs')
const htmlMinifier = require('html-minifier')
const posthtml = require('posthtml')
const posthtmlInlineAssets = require('posthtml-inline-assets')

async function buildHtmlAsync (file, isDevelopment) {
  const html = fs.readFileSync(file, 'utf8')
  const result = await posthtml()
    .use(posthtmlInlineAssets())
    .process(html)
  if (isDevelopment === true) {
    return result.html
  }
  return htmlMinifier.minify(result.html, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeTagWhitespace: true
  })
}

module.exports = buildHtmlAsync
