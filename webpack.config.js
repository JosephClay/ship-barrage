require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const analyze = process.argv.includes('--analyze');
const isDev = !analyze && process.env.NODE_ENV === 'development';
const isProd = analyze || process.env.NODE_ENV === 'production';
const mode = isDev ? 'development' : 'production';
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    'js/app': './app/index.js',
  },
  mode,
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  watch: isDev,
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename({ chunk }) {
      const { name } = chunk;
      return `${name}.js`.replace('js/', '');
    },
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { publicPath: '/public/' },
        },
      },
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          sourceType: 'unambiguous',
          presets: [
            '@babel/preset-react',
            '@emotion/babel-preset-css-prop',
          ],
        },
      },
    ]
  },
  plugins: [
    isProd && new CompressionPlugin(),
    isProd && new BrotliPlugin({
      asset: 'br.[path][query]',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.EnvironmentPlugin(
      Object.assign({}, process.env, {
        __DEV__: isDev ? 'true' : 'false',
        NODE_ENV: mode,
      })
    ),
    analyze && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    ...(isProd && {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      }
    }),
  },
  optimization: {
    usedExports: true,
  },
};