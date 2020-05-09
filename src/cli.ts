#!/usr/bin/env node

import * as sade from 'sade'
import { buildAsync } from './build-async'
import { watch } from './watch'

sade('figmake', true)
  .describe('A tiny CLI to help you make Figma plugins')
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
  .example('-m')
  .example('-w')
  .parse(process.argv)
