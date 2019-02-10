/* eslint-env node */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const features = require('creature-features')();
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const featureFlags = new webpack.DefinePlugin({
  FEATURES: features
});

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const plugins = [
  new CleanWebpackPlugin(['public']),
  new Dotenv(),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css'
  }),
  // FIXME: not working
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    deleteOriginalAssets: false
  }),
  new HtmlWebpackPlugin({
    title: 'We Are Us',
    template: 'src/index.ejs',
    templateParameters: {
      title: 'We Are Us'
    }
  }),
  new CopyWebpackPlugin([{ from: './assets/*', to: './public/' }]),
  featureFlags
];

if (mode === 'production') {
  plugins.push(
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    })
  );
}

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].js'
  },
  devServer: {
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode,
  plugins
};
