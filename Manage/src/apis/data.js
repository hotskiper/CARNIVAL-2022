import axios from 'axios'
axios.interceptors.request.use(
  config => {
    if (localStorage.mtoken) {
      config.headers.Authorization = `bearer ${localStorage.mtoken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 登陆
 */
export const checkLogin = (param) => {
  return axios.post('api/carnival/v1/login', param)
}

/**
 * 获取商品管理列表
 */
export const getGoodsData = (param) => {
  // return axios.get('/api/data/goodsList.json')
  return axios.post('/api/carnival/v1/query_prize_info',param)
}

/**
 * 保存商品
 */
export const updateGoodsData = (param) => {
  // return axios.get('/api/data/goodsList.json')
  return axios.post('/api/carnival/v1/update_stock', param)
}

/**
 * 获取订单管理列表
 */
export const getOrderData = (param) => {
  // return axios.get('/api/data/orderList.json')
  return axios.post('/api/carnival/v1/query_order_info',param)
}

/**
 * 获取积分管理列表
 */
export const getIntData = (param) => {
  return axios.post('/api/carnival/v1/query_user_account',param)
}

/**
 * 获取个人积分详情
 */
export const getIntDetail = () => {
  return axios.get('/api/data/intDetail.json')
}








