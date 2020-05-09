import * as fs from 'fs'
import * as htmlMinifier from 'html-minifier'
import posthtml from 'posthtml'
import posthtmlInlineAssets from 'posthtml-inline-assets'

export async function buildHtmlAsync (file: string, shouldMinify: boolean) {
  const html = fs.readFileSync(file, 'utf8')
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
