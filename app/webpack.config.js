const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const fileLoaderExcluded = [/\.html$/, /\.jsx?$/, /\.css$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]
const urlLoaderTest = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]

const postcssPlugins = () => [ autoprefixer({ browsers: [ '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9' ] }) ]

const paths = {
  src: path.join(__dirname, 'src'),
  dev: path.join(__dirname, 'dev'),
  build: path.join(__dirname, 'build'),
}

const alias = {
   'actions': path.join(paths.src, 'js/redux/actions'),
   'components': path.join(paths.src, 'js/components'),
   'elements': path.join(paths.src, 'js/elements'),
   'layouts': path.join(paths.src, 'js/layouts'),
   'pages': path.join(paths.src, 'js/pages'),
   'utils': path.join(paths.src, 'js/utils')
}

const common = {
  context: paths.src,
  entry: './js',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: paths.src,
        use: [
          { loader: 'babel-loader', options: { cacheDirectory: true } }
        ]
      }
    ]
  }
}

if (process.env.npm_lifecycle_event === 'bundle') {
  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    devServer: {
      historyApiFallback: true,
      publicPath: '/',
      contentBase: paths.dev,
      port: 3000,
      hot: true,
      proxy: {
        '/api/v1': {
          target: 'http://localhost:3030',
          secure: false
        },
        '/WSS': {
          target: 'http://localhost:3030',
          secure: false
        },
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new Dotenv()
    ],
    module: {
      rules: [
        { test: /\.jsx?$/, include: paths.src, enforce: 'pre', use: [{ loader: 'eslint-loader', options: { emitWarning: true } }] },
        { loader: 'file-loader', exclude: fileLoaderExcluded, options: { name: '/static/media/[name].[hash:8].[ext]' } },
        { test: urlLoaderTest, loader: 'url-loader', options: { limit: 10000, name: '/static/media/[name].[hash:8].[ext]' } },
        { test: /\.css$/, use: [ 'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1, } },
            { loader: 'postcss-loader', options: { ident: 'postcss', plugins: postcssPlugins } }
        ] },
      ]
    }
  })
}

if (process.env.npm_lifecycle_event === 'build') {
  module.exports = merge(common, {
    plugins: [
      new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new Dotenv()
    ],
    output: { path: paths.build },
    module: {
      rules: [
        { test: /\.jsx?$/, include: paths.src, enforce: 'pre', use: [{ loader: 'eslint-loader', options: { emitWarning: true } }] },
        { loader: 'file-loader', exclude: fileLoaderExcluded, options: { name: 'static/media/[name].[hash:8].[ext]' } },
        { test: urlLoaderTest, loader: 'url-loader', options: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]', } },
        { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { ident: 'postcss', plugins: postcssPlugins } }
        ] }) },
      ]
    }
  })
}
