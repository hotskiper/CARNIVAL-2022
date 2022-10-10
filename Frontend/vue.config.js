module.exports = {
  configureWebpack: {

  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
      sass: {
        data: `@import "src/styles/index.scss";`
      }

    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  // 配置 axios 代理请求
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://yapi.njsecnet.com/mock/1175/',
        // target: 'http://106.75.241.108:53372/',
        target: 'https://47.94.39.209:53375/',
        // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          // '^/api': '/'
        }
      }
    }
  }
}
