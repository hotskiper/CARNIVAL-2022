import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/index'


export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/login')
  },

  {
    path: '/',
    component: Layout,
    redirect: '/orderManage',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/homePage',
    component: Layout,
    name: 'homePage',
    redirect: '/homePage/homePageMain',
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: 'homePageMain',
        name: 'homePageMain',
        hidden: true,
        component: () => import('@/views/homePage/homePageMain'),
      }]
  },
  {
    path: '/goodsManage',
    component: Layout,
    name: 'goodsManage',
    redirect: '/goodsManage/goodsManageMain',
    meta: { title: '商品管理', icon: 'goods' },
    children: [
      {
      path: 'goodsManageMain',
      name: 'goodsManageMain',
      hidden: true,
      component: () => import('@/views/goodsManage/goodsManageMain'),
    }],
  },
  {
    path: '/orderManage',
    component: Layout,
    name: 'orderManage',
    redirect: '/orderManage/orderManageMain',
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
      path: 'orderManageMain',
      name: 'orderManageMain',
      hidden: true,
      component: () => import('@/views/orderManage/orderManageMain'),
    }],
  },
  {
    path: '/integrationManage',
    component: Layout,
    name: 'integrationManage',
    redirect: '/integrationManage/integrationManageMain',
    meta: { title: '积分管理', icon: 'integration' },
    children: [
      {
      path: 'integrationManageMain',
      name: 'integrationManageMain',
      hidden: true,
      component: () => import('@/views/integrationManage/integrationManageMain'),
    }],
  },
  {
    path: '/master',
    component: Layout,
    name: 'master',
    hidden: true,
    redirect: '/master/complete',
    meta: { title: '任务列表', icon: 'icon_master' },
    children: [
      {
        path: 'create',
        name: 'Create',
        hidden: true,
        tab:true,
        component: () => import('@/views/master/create'),
        meta: { title: '正在执行', icon: 'create' },

      },
      {
        path: 'complete',
        name: 'Complete',
        hidden: true,
        tab:true,
        component: () => import('@/views/master/complete'),
        meta: { title: '执行结束', icon: 'complete' },
      },
      {
        path: 'masterdetail',
        name: 'MasterDetail',
        hidden: true,
        component: () => import('@/views/master/masterdetail'),
        meta: { title: '任务详情', icon: 'masterDetail' }
      }
    ]
  },

  {
    path: '/gallery',
    component: Layout,
    redirect: '/gallery/facepredator',
    name: 'gallery',
    hidden: true,
    meta: { title: '基础图库', icon: 'icon-gallery' },
    // children:route_child
    children: [
      {
        path: 'facepredator',
        name: 'Facepredator',
        component: () => import('@/views/gallery/facepredator'),
        meta: { title: '重点人布控', icon: 'facepredator' }
      },
      // {
      //   path: 'imageresource',
      //   name: 'Imageresource',
      //   component: () => import('@/views/gallery/imageresource'),
      //   meta: { title: '图片溯源', icon: 'image-resource' }
      // },
      {
        path: 'gallerydetail',
        name: 'Gallerydetail',
        hidden: true,
        component: () => import('@/views/gallery/gallerydetail'),
        meta: { title: '详情公共', icon: 'gallerydetail' }
      }
    ]
  },

  { path: '*', redirect: '/login', hidden: true }
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
