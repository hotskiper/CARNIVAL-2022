const path = require('path')
const webpack=require('webpack')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: BASE_URL,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'http://yapi.njsecnet.com/mock/1175/',
        // target: 'http://10.1.200.93:2020/',
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/ailab': {
        target: 'http://10.0.203.155:8888',
        changeOrigin: true
      },
      // '/api': {
      //   target: 'https://fh.happyzzy.com',
      //   changeOrigin: true,
      // },
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack:{
    plugins:[
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  }

}



