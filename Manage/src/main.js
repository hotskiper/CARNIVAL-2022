import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css'


import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import Filter from './filters/index'
import $ from 'jquery'

import '@/icons'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


Vue.use(ElementUI)
// Vue.use(echarts)
Vue.prototype.$echarts = echarts

Vue.use(Filter)
Vue.use(Viewer,{
  defaultOptions:{
    zIndex:99999,
    navbar:false,
    inline:false,
    tooltip:false,
  }
})
// Vue.use(VueWaterfallEasy)


Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
  if(!localStorage.mtoken){
    console.log(from, to);
    if(to.path==='/login'){
      next()
    }else {
      next({path: 'login'})
    }
  }else { 
    next();
  }
})

var app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
