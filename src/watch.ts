import * as chokidar from 'chokidar'
import * as path from 'path'
import { buildAsync } from './build-async'
import { constants } from './constants'

const { OUTPUT_DIRECTORY } = constants

const watchIgnoreRegex = new RegExp(
  `${path.basename(OUTPUT_DIRECTORY)}|node_modules`
)

export function watch (shouldMinify: boolean) {
  const watcher = chokidar.watch('.', {
    ignored: function (path: string) {
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
