import * as fs from 'fs-extra'
import * as path from 'path'
import * as tempy from 'tempy'

import { buildCssAsync } from './build-css-async'
import { buildHtmlAsync } from './build-html-async'
import { buildJsAsync } from './build-js-async'
import {
  MAIN_JS_FILE,
  OUTPUT_DIRECTORY,
  SOURCE_DIRECTORY,
  UI_CSS_FILE,
  UI_HTML_FILE,
  UI_JS_FILE
} from './constants'

export async function buildAsync (shouldMinify: boolean): Promise<void> {
  console.log('● Building...')
  const mainJsFile = path.join(SOURCE_DIRECTORY, MAIN_JS_FILE)
  if ((await fs.pathExists(mainJsFile)) === false) {
    throw new Error(`Need a ${MAIN_JS_FILE}`)
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
    (await fs.pathExists(cssFile)) === true
      ? `<style>${await buildCssAsync(
          cssFile,
          uiHtmlFilePath,
          shouldMinify
        )}</style>`
      : ''
  const html =
    (await fs.pathExists(htmlFile)) === true
      ? await buildHtmlAsync(htmlFile, shouldMinify)
      : ''
  const js =
    (await fs.pathExists(jsFile)) === true
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
  await fs.writeFile(uiHtmlFilePath, result)
}
