import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

module.exports = (env) => {
  return {
    entry: {
      home: './app/home.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test:/\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          context: "app",
          from: "*.html",
          transform: (content, path) => {
            return "<!-- This file is copied from app folder, do not modify it. -->\n" + content
          }
        }
      ])
    ]
  }
}
