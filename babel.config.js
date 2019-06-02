const webpackConfig = require('./build/webpack.config')

module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel',
    [
      'react-css-modules',
      {
        context: webpackConfig.context,
        webpackHotModuleReloading: true,
        generateScopedName: '[local]--[hash:base64:5]',
        handleMissingStyleName: 'warn',
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss'
          }
        }
      }
    ]
  ]
}
