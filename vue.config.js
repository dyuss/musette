module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/musette/' : '/'
}