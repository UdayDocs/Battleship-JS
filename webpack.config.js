const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // For HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // For CSS

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/main.js', // Your main JS entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the dist folder before each build
    assetModuleFilename: 'assets/[name][ext]', // For images, fonts, etc.
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate file
          'css-loader', // Interprets CSS
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader', // Handles HTML files
      },
       {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // For images
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // For fonts
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // Path to your HTML template
      filename: 'index.html', // Output HTML file name in dist
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output CSS file name in dist
    }),
  ],
  devServer: {
    static: './dist', // Serve files from the dist directory
    hot: true, // Enable Hot Module Replacement (HMR)
  },
};