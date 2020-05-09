import * as postcss from 'postcss'
import * as postcssUrl from 'postcss-url'
import * as sass from 'sass'

export async function buildCssAsync (
  file: string,
  outputFilePath: string,
  shouldMinify: boolean
) {
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
