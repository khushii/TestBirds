const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }, // File loader for image assets -> ADDED IN THIS STEP
      // We'll add only image extensions, but you can things like svgs, fonts and videos
      { test: /\.(png|jpg|gif)$/, use: ["file-loader"] }, // Compile Less to CSS
      // https://github.com/webpack-contrib/less-loader
      // Install dependencies before uncommenting: yarn add --dev less-loader less
      { test: /\.less$/, loader: "less-loader" }, // Compile Sass to CSS
      // https://github.com/webpack-contrib/sass-loader
      // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
      { test: /\.(scss|sass)$/, loader: "sass-loader" },
      {
        test: /\.svg$/,
        loader: "svg-url-loader",
        options: { name: "[hash:8].[ext]", limit: 4096 }
      },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
