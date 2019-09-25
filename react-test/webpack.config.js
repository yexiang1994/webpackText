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
    // mode: "production",
    mode: "development",
    // devtool:"source-map",
    entry:{
        app: path.resolve(__dirname + "/app/app.js")
    },
    output:{
        path: path.resolve(__dirname + "/public/js"),
        filename: "[name]-[hash:5].js",
        chunkFilename: "[name].[hash].chunk.js"
    },

    // entry:{
    //     app: path.resolve(__dirname + "/test/main.js")
    // },
    // output:{
    //     path: path.resolve(__dirname + "/dist/js"),
    //     filename: "[name]-[hash:5].js",
    //     chunkFilename: "[name].[hash].chunk.js"
    // },
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
        
    ],
    stats:{
        reasons: false,
        version: false,
        modules: true,
        cachedAssets: false,
        assets:true,
        cached: false,
        children:false,
        chunkModules: true,
    }
}