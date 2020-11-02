const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/status-message.js",
    "./js/backend.js",
    "./js/filter.js",
    "./js/pins.js",
    "./js/form.js",
    "./js/preview.js",
    "./js/popup.js",
    "./js/move.js"
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
