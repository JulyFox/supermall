module.exports = {
    configurewebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            } //别名
        }
    }
}
// 别名配置