const chokidar = require('chokidar')
const path = require('path')
const buildAsync = require('./build-async')
const { OUTPUT_DIRECTORY } = require('./constants')

const watchIgnoreRegex = new RegExp(
  `${path.basename(OUTPUT_DIRECTORY)}|node_modules`
)

function watch () {
  const watcher = chokidar.watch('.', {
    ignored: function (path) {
      return watchIgnoreRegex.test(path)
    }
  })
  watcher.on('ready', handleChange)
  watcher.on('change', handleChange)
}

async function handleChange () {
  await buildAsync(true)
  console.log('● Watching...')
}

module.exports = watch
