const chokidar = require('chokidar')
const path = require('path')
const buildAsync = require('./build-async')
const { OUTPUT_DIRECTORY } = require('./constants')

const watchIgnoreRegex = new RegExp(
  `${path.basename(OUTPUT_DIRECTORY)}|node_modules`
)

function watch (shouldMinify) {
  const watcher = chokidar.watch('.', {
    ignored: function (path) {
      return watchIgnoreRegex.test(path)
    }
  })
  async function handleChange () {
    await buildAsync(shouldMinify)
    console.log('● Watching...')
  }
  watcher.on('ready', handleChange)
  watcher.on('change', handleChange)
}

module.exports = watch
