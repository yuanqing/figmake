#!/usr/bin/env node

const buildAsync = require('./build-async')
const watch = require('./watch')

async function mainAsync (flag) {
  if (flag === '-w') {
    watch()
    return
  }
  await buildAsync(flag === '-d')
}

mainAsync(process.argv[2])
