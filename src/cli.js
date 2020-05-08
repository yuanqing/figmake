#!/usr/bin/env node

const sade = require('sade')
const buildAsync = require('./build-async')
const watch = require('./watch')
const packageJson = require('../package.json')

sade(packageJson.name, true)
  .describe(packageJson.description)
  .option('-m, --minify', 'Build with minification', false)
  .option(
    '-w, --watch',
    'Watch for code changes and rebuild the plugin automatically',
    false
  )
  .option('-y, --yes', 'Use defaults', false)
  .action(async function ({ m: shouldMinify, w: isWatch }) {
    if (isWatch === true) {
      watch(shouldMinify)
      return
    }
    await buildAsync(shouldMinify)
  })
  .parse(process.argv)
