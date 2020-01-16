/**
 * Assets Config file
 */

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const webpack = require('webpack')

const config = {
  entry: {
    app: './js/index.js',
  },
  output: {
    filename: './js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/i,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html/,
        use: ['html-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader',
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: 'images/[path][name].[ext]', publicPath: '../', limit: 8192 },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: 'fonts/[name].[ext]', publicPath: '../', limit: 8192 },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  devServer: {
    port: 9000,
    // hot: true,
  },
  plugins: [
    // new BrowserSyncPlugin({
    //   proxy: localServer.path,
    //   port: localServer.port,
    //   files: [],
    //   ghostMode: {
    //     clicks: false,
    //     location: false,
    //     forms: false,
    //     scroll: false,
    //   },
    //   injectChanges: true,
    //   logFileChanges: true,
    //   logLevel: 'debug',
    //   logPrefix: 'wepback',
    //   notify: true,
    //   reloadDelay: 0,
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './html/index.html',
      filename: 'index.html',
      favicon: './img/favicon.png',
    }),
    new HtmlWebpackPlugin({
      template: './html/photograph.html',
      filename: 'photograph.html',
      favicon: './img/favicon.png',
    }),
    new HtmlWebpackPlugin({
      template: './html/training.html',
      filename: 'training.html',
      favicon: './img/favicon.png',
    }),
    new HtmlWebpackPlugin({
      template: './html/about.html',
      filename: 'about.html',
      favicon: './img/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src', 'images', 'content'),
    //     to: path.resolve(__dirname, 'dist', 'images', 'content'),
    //     toType: 'dir',
    //   },
    // ]),
    new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }),
  ],
};

module.exports = config;
