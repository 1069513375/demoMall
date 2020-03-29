module.exports = {
    //设置别名
    configureWebpack:{
        resolve:{
            alias: {
                //'@':'src',默认配置
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views':'@/views',
            }
        },
    }
}