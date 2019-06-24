// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        // rules: [
        //     {test:/\.vue$/,use:'vue-loader'}
        // ]
    },
    plugins: [
        // new VueLoaderPlugin()
    ],
    resolve: {
        // alias: {
        //     'vue$': 'vue/dist/vue.js'
        // }
    }
}