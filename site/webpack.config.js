const path = require("path");

module.exports = {
  entry: "./app/app.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader?name=[name].[ext]",
          },
        ],
      },
    ],
  },

  devServer: {
    static: { directory: path.join(__dirname, "public") },
    compress: true,
    port: 9000,
  },
};
