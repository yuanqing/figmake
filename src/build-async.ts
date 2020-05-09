import * as fs from 'fs'
import * as path from 'path'
import * as tempy from 'tempy'

import { buildCssAsync } from './build-css-async'
import { buildHtmlAsync } from './build-html-async'
import { buildJsAsync } from './build-js-async'
import { constants } from './constants'

const {
  MAIN_JS_FILE,
  OUTPUT_DIRECTORY,
  SOURCE_DIRECTORY,
  UI_CSS_FILE,
  UI_HTML_FILE,
  UI_JS_FILE
} = constants

export async function buildAsync (shouldMinify: boolean): Promise<void> {
  console.log('● Building...')
  const mainJsFile = path.join(SOURCE_DIRECTORY, MAIN_JS_FILE)
  if (fs.existsSync(mainJsFile) === false) {
    console.error(`Need a ${MAIN_JS_FILE}`)
    process.exit(1)
  }
  await buildJsAsync(
    mainJsFile,
    path.join(process.cwd(), OUTPUT_DIRECTORY),
    shouldMinify
  )
  await buildUiAsync(
    path.join(SOURCE_DIRECTORY, UI_CSS_FILE),
    path.join(SOURCE_DIRECTORY, UI_HTML_FILE),
    path.join(SOURCE_DIRECTORY, UI_JS_FILE),
    OUTPUT_DIRECTORY,
    shouldMinify
  )
  console.log('✔ Done')
}

async function buildUiAsync (
  cssFile: string,
  htmlFile: string,
  jsFile: string,
  outputDirectory: string,
  shouldMinify: boolean
) {
  const uiHtmlFilePath = path.join(outputDirectory, htmlFile)
  const css =
    fs.existsSync(cssFile) === true
      ? `<style>${await buildCssAsync(
          cssFile,
          uiHtmlFilePath,
          shouldMinify
        )}</style>`
      : ''
  const html =
    fs.existsSync(htmlFile) === true
      ? await buildHtmlAsync(htmlFile, shouldMinify)
      : ''
  const js =
    fs.existsSync(jsFile) === true
      ? `<script>${await buildJsAsync(
          jsFile,
          tempy.directory(),
          shouldMinify
        )}</script>`
      : ''
  if (css === '' && html === '' && js === '') {
    return
  }
  const result = [css, html, js].join('')
  fs.writeFileSync(uiHtmlFilePath, result)
}
