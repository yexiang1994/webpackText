var {CleanWebpackPlugin} = require("clean-webpack-plugin")
var path = require("path")

module.exports = {
    entry:{
        app: "./cssTest/app.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "boundle.js",
        publicPath: "./dist/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    // options: {
                        // presets: [
                        //     ["@babel/preset-env", // 指定需要编译的语法
                        //     {
                        //         targets: { // 指定需要兼容的浏览器，第一个是市场百分比
                        //             browsers: [">1%", "last 2 versions"]
                        //         }
                        //     }]
                        // ] // 指定编译的规则，es6或者es7需要用babel-loader编译
                    // }
                },
                exclude: '/node_module/'
            },
            {
                test: /\.css$/,
                use:[{
                        loader:"style-loader",
                        options: {
                            insert: "#app"
                        }
                    }, {
                        loader: "css-loader",
                }]
            }
            
        ]
    },
    plugins:[
        // new CleanWebpackPlugin()
    ]
}