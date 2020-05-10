import * as fs from 'fs-extra'
import * as htmlMinifier from 'html-minifier'

const posthtml = require('posthtml')
const posthtmlInlineAssets = require('posthtml-inline-assets')

export async function buildHtmlAsync (
  file: string,
  shouldMinify: boolean
): Promise<String> {
  const html = await fs.readFile(file, 'utf8')
  const result = await posthtml()
    .use(posthtmlInlineAssets())
    .process(html)
  if (shouldMinify === false) {
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
