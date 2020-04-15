/* eslint-disable no-undef */

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	mode: "development",
	entry: ["./src/index.js"],
	output: {
		filename: "bundle.js"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader",],
			},
		],
	},
}