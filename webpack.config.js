var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	mode: "development",
	devtool:'eval-source-map',
	entry: {
		app: path.resolve(__dirname + "/app/app.js")
	},
	output : {
		path : __dirname + "/public",
		// filename: "bundle.js"
		filename: "[name]-[hash].js",
		// path: path.resolve(__dirname, __dirname+"/public/dist"),
		// publicPtah: "/dist/"

	},
	module:{
		rules:[
			{
		        test: /\.json$/,
				loader: "json-loader",
				include: [
					path.resolve(__dirname, "app")
				],
				exclude: [
					path.resolve(__dirname, "node_modules")
				]
		    },
			{
				test : /\.js$/,
				exclude: /node_modules/,
			    loader: 'babel-loader' //在webpack的module部分的loaders里进行配置即可
			},
			{
		        test: /\.scss$/,
		        loaders: [
		        	"style-loader",
		        	"css-loader",
		        	"sass-loader",
		        	"sass?outputStyle=expanded&includePaths[]=" + path.resolve(__dirname, './node_modules/compass-mixins/lib')]
		    },
		    {
		        test: /\.css$/,
				loader: 'style-loader!css-loader'
		        // loader: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:5]' //添加对样式表的处理
		    },
		    {
		    	test   : /\.(ttf|eot|svg|jpg|png|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : 'file-loader'
		    }
		]
	},
	plugins: [
	    // new webpack.DefinePlugin({
		//   	'process.env': {
		//     	NODE_ENV: JSON.stringify('production')
		//   	}
		// }),
	    // new webpack.optimize.UglifyJsPlugin({
	    //   compress: {
	    //     //supresses warnings, usually from module minification
	    //     warnings: false
	    //   }
	    // }),
		new CopyWebpackPlugin([
			{ from: __dirname + "/app/index.html", to: 'index.html' }
		]),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	nanme: "vendor",
		// 	filename: "vendor.js"
		// })
	]

}
