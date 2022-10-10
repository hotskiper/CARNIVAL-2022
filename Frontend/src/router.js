import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {// 兑换商城
      path: '/exchangeCenter',
      name: 'exchangeCenter',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/exchangeCenter.vue')
    },
    {// 游戏规则目录
      path: '/gameRule',
      name: 'gameRule',
      component: () => import('./views/gameRule.vue')
    },
    {// 游戏规则内容
      path: '/gameRuleIn',
      name: 'gameRuleIn',
      component: () => import('./views/gameRuleIn.vue')
    },
    {// 我的订单
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('./views/myOrder.vue')
    },
    {// 提交订单
      path: '/orderPage',
      name: 'orderPage',
      component: () => import('./views/orderPage.vue')
    },
    {// 订单提交结果页
      path: '/orderResultPage',
      name: 'orderResultPage',
      component: () => import('./views/orderResultPage.vue')
    },
    {// 积分详情
      path: '/scoreDetail',
      name: 'scoreDetail',
      component: () => import('./views/scoreDetail.vue')
    },
    {// 购物车
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: () => import('./views/shoppingCart.vue')
    },
    {// 用户中心
      path: '/userCenter',
      name: 'userCenter',
      component: () => import('./views/userCenter.vue')
    },
    {// 计分页面
      path: '/scoringPage',
      name: 'scoringPage',
      component: () => import('./views/scoringPage.vue')
    },
    {// 用户二维码
      path: '/userCode',
      name: 'userCode',
      component: () => import('./views/userCode.vue')
    },
    {// 写给心中的她
      path: '/toHer',
      name: 'toHer',
      component: () => import('./views/toHer.vue')
    },
    {// 前世今生
      path: '/pastLife',
      name: 'pastLife',
      component: () => import('./views/pastLife.vue')
    },
    {// 我的消息
      path: '/myMessage',
      name: 'myMessage',
      component: () => import('./views/myMessage.vue')
    },
    {// 游戏页的外壳
      path: '/gameOuter',
      name: 'gameOuter',
      component: () => import('./views/gameOuter.vue')
    }
  ]
})
