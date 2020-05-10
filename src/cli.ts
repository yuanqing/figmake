#!/usr/bin/env node
import * as sade from 'sade'
import { buildAsync } from './build-async'
import { watch } from './watch'

sade('figmake', true)
  .describe(
    'A tiny CLI for making Figma plugins with HTML, CSS, and vanilla JavaScript'
  )
  .option('-m, --minify', 'Build with minification')
  .option(
    '-w, --watch',
    'Watch for code changes and rebuild the plugin automatically'
  )
  .action(async function ({ m: shouldMinify, w: isWatch }) {
    if (isWatch === true) {
      watch(shouldMinify)
      return
    }
    await buildAsync(shouldMinify)
  })
  .example('')
  .example('--minify')
  .example('--watch')
  .parse(process.argv)
