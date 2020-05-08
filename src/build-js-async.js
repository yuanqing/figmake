const fs = require('fs')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

async function buildJsAsync (file, outputDirectory, isDevelopment) {
  const webpackConfig = {
    mode: isDevelopment === true ? 'development' : 'production',
    entry: path.join(process.cwd(), file),
    output: {
      path: outputDirectory,
      filename: file
    },
    devtool: isDevelopment ? 'inline-cheap-module-source-map' : 'none',
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

module.exports = buildJsAsync
