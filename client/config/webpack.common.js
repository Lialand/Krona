const path = require('path');

const miniCssExtract = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['../src/index.js', '../src/resourses.js'],
    output: {
        path: path.resolve(__dirname, '../build/'),
        publicPath: '/',
        filename: "bundle.js"       
    }, 
    resolve: {
        alias: {
            utils: path.resolve(__dirname, "../src/shared/utils/"),
            constants: path.resolve(__dirname, "../src/shared/constants/"),
            hooks: path.resolve(__dirname, "../src/shared/hooks/"),
            reduxFolder: path.resolve(__dirname, "../src/redux/"),
            components: path.resolve(__dirname, "../src/components/"),
            server: path.resolve(__dirname, "../../server/"),
            mixins: path.resolve(__dirname, "../src/shared/mixins/mixins.scss")
        },
    },
    module:{
        rules:[   
            {
                test: /\.js?$/, 
                exclude: /(node_modules)/,  
                loader: "babel-loader",   
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    miniCssExtract.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { 
                            postcssOptions: {
                                config: path.resolve(__dirname, "./postcss.config.js"),
                                browsers: ['ie >= 9']  
                            }, 
                        }
                    },
                    'sass-loader'
                ],
            },
            { 
                test: /\.(png|svg|jpe?g|ico)$/, 
                loader: 'file-loader',
                options: {
                    name: '../build/assets/images/[name].[ext]'
                }
            },
            { 
                test: /\.(woff|woff2|eot|ttf)$/, 
                loader: 'file-loader',
                options: {
                    name: '../build/assets/fonts/[name].[ext]'
                }
            },
            {
            test: /\.(ico)$/, 
                loader: 'file-loader',
                options: {
                    name: '../build/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new miniCssExtract({
            filename: 'style.css'
        }),
        new htmlWebpackPlugin({
            template: '../src/assets/index.html'
        })
    ]
};