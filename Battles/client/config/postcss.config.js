const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        new postcssPresetEnv({
            autoprefixer: { 
                overrideBrowserslist: 'last 2 versions'
            },
        })
    ]
}