const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');

module.exports = {
  name: 'SushiMicroFrontendAlbums',
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    client: {
      overlay: false
    },
    compress: true,
    port: 9002
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    }),
    new ModuleFederationPlugin({
      name: 'SushiMicroFrontendAlbums',
      filename: 'remoteEntry.js',
      remotes: {
        SushiMicroFrontendNotifications: 'SushiMicroFrontendNotifications@http://localhost:9005/remoteEntry.js'
      },
      exposes: {
        './SushiMicroFrontendAlbums': './src/App.tsx'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react
        },
        rxjs: {
          singleton: true,
          requiredVersion: dependencies.rxjs
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom']
        },
        'react-error-boundary': {
          singleton: true,
          requiredVersion: dependencies['react-error-boundary']
        }
      }
    })
  ]
};
