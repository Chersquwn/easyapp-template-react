const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {
  DefinePlugin,
  HashedModuleIdsPlugin,
  HotModuleReplacementPlugin
} = require('webpack')

const DEV_ENV = process.env.NODE_ENV === 'development'
const PROD_ENV = process.env.NODE_ENV === 'production'

let webpackConfig = {
  entry: './index.tsx',

  output: {
    filename: DEV_ENV ? '[name].js' : 'js/[name].[contenthash:5].js',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          DEV_ENV
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: 'css'
                }
              },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /.(png|jpe?g|gif|svg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: DEV_ENV ? 'imgs/[name].[ext]' : 'imgs/[name].[hash:5].[ext]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    symlinks: false
  },

  context: path.resolve(__dirname, '../src'),

  stats: 'errors-only',

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (DEV_ENV) {
  webpackConfig = merge(webpackConfig, {
    mode: 'development',

    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      compress: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      https: false,
      port: 3001,
      stats: 'errors-only',
      useLocalIp: true,
      open: true
    },

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },

    devtool: 'inline-source-map',

    plugins: [new HotModuleReplacementPlugin()]
  })
}

if (PROD_ENV) {
  webpackConfig = merge(webpackConfig, {
    mode: 'production',

    devtool: 'source-map',

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:5].css',
        chunkFilename: '[id].[contenthash:5].css'
      }),
      new CleanWebpackPlugin(),
      new HashedModuleIdsPlugin()
    ],

    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({
          cssProcessPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }]
          }
        })
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          },
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all'
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      noEmitOnErrors: true
    }
  })
}

module.exports = webpackConfig
