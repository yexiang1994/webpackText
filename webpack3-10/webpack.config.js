
module.exports = {
    entry:{
        app: "./app/i.ts"
    },
    output: {
        filename: "./dist/[name]-[hash:8].js"
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
            }
            
        ]
    }
}