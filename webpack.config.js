/* eslint-disable */

module.exports = {
    entry: {
      render: './process/js/render.js',
      renderCase: './process/js/render-case.js'
    },
    output: {
      filename: '[name].js',
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          
        },
      ],
    },
  };