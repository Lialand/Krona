const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: ["./index.tsx", "./resources.js"],
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env", "@babel/preset-typescript"] }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            }
        ]
    },
    resolve: { 
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        alias: {
            assets: path.resolve(__dirname, "./src/assets"),
            utils: path.resolve(__dirname, "./src/shared/utils/"),
            types: path.resolve(__dirname, "./src/shared/types/types.ts"),
            const: path.resolve(__dirname, "./src/shared/const/"),
        },
    },
    output: {
        path: path.resolve(__dirname, "build/"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    devServer: {
        port: 3002,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ]
};