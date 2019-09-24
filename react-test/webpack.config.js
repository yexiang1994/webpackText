var path = require("path")
// var webpack = require("webpack")
var CopyWebpackPlugin = require("copy-webpack-plugin")
// var CleanWebpackPlugin = require("clean-webpack-plugin")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var {CleanWebpackPlugin} = require("clean-webpack-plugin")
var ExtracTextPlugin = require("extract-text-webpack-plugin")
var extractSass = new ExtracTextPlugin("style/[name]-[hash:5].css")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: "production",
    // devtool:"source-map",
    entry:{
        app: path.resolve(__dirname + "/app/app.js")
    },
    output:{
        path: path.resolve(__dirname + "/public/js"),
        filename: "[name]-[hash:5].js",
        chunkFilename: "[name]-[hash:5].chunk.js"
    },
    module:{
        rules:[
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: /app/
            },
            {
                test: /\.css$/,
                loader: "style-lodaer!css-loader"
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                })
            }
        ]
    },
    plugins: [
        extractSass,
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname + "/public/index.html"),
            template: "./index.html",
            chunks: ["app"],
            minify: {
                collapseWhitespace: false
            }
        })
        
    ]
}