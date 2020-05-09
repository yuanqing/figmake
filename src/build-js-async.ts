import * as fs from 'fs'
import * as path from 'path'
import * as TerserPlugin from 'terser-webpack-plugin'
import * as webpack from 'webpack'

export async function buildJsAsync (
  file: string,
  outputDirectory: string,
  shouldMinify: boolean
) {
  const webpackConfig: webpack.Configuration = {
    mode: shouldMinify === true ? 'production' : 'development',
    entry: path.join(process.cwd(), file),
    output: {
      path: outputDirectory,
      filename: file
    },
    devtool: shouldMinify === true ? false : 'inline-cheap-module-source-map',
    stats: 'errors-only',
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    }
  }
  return new Promise(function (resolve, reject) {
    webpack(webpackConfig, async function (error, stats) {
      if (stats.hasErrors() === true) {
        reject(stats.toJson().errors.join('\n'))
        return
      }
      if (error) {
        reject(error)
        return
      }
      const js = fs.readFileSync(path.join(outputDirectory, file), 'utf8')
      resolve(js)
    })
  })
}
