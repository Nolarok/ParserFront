const withSass = require('@zeit/next-sass')
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withImages = require('next-images')
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

require('dotenv').config()
const withTM = require('next-transpile-modules')(['image-conversion']);

module.exports = withTM(withSass(withImages({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]--[hash:base64:5]',
  },
  webpack: config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    config.module.rules.push({
      test: /\.(webp|woff|ttf|woff2?)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: '[path][name]-[hash:8].[ext]',
          },
        },
      ],
    })

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    )

    return config
  },
})))
