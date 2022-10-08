import Axios from 'axios'
import qs from 'qs'

Axios.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (localStorage.token) {
      config.headers.Authorization = `bearer ${localStorage.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export function reqJsonData (url, params = {}, method = 'post') {
  if (method === 'get') {
    return Axios.get('/' + url, {
      params
    })
  } else if (method === 'post') {
    return Axios.post('/' + url, qs.stringify(params))
  }
}
export default {
  login (data) {
    return reqJsonData('api/carnival/v1/login', data, 'post')
  },
  throwBottle (data) {
    return reqJsonData('api/carnival/v1/throw_bottle', data, 'post')
  },
  getMyBottle (data) {
    return reqJsonData('api/carnival/v1/my_bottle', data, 'get')
  },
  getBottle (data) {
    return reqJsonData('api/carnival/v1/get_bottle', data, 'get')
  },
  getUserFragment (data) {
    return reqJsonData('api/carnival/v1/query_user_fragment', data, 'get')
  },
  mergeFragment (data) {
    return reqJsonData('api/carnival/v1/merge_fragment', data, 'get')
  },
  rewardFragment (data) {
    return reqJsonData('api/carnival/v1/reward_fragment', data, 'post')
  },
  getPrizeInfo (data) {
    return reqJsonData('api/carnival/v1/prize_info', data, 'get')
  },
  getPrizeDetail (data) {
    return reqJsonData('api/carnival/v1/prize_detail', data, 'get')
  },
  addCart (data) {
    return reqJsonData('api/carnival/v1/add_cart', data, 'post')
  },
  removeCart (data) {
    return reqJsonData('api/carnival/v1/remove_cart', data, 'post')
  },
  getCartInfo (data) {
    return reqJsonData('api/carnival/v1/cart_info', data, 'get')
  },
  buyCart (data) {
    return reqJsonData('api/carnival/v1/buy', data, 'post')
  },
  getOrderInfo (data) {
    return reqJsonData('api/carnival/v1/order_info', data, 'get')
  },
  mergedExchange (data) {
    return reqJsonData('api/carnival/v1/spree', data, 'post')
  },
  getWxUserInfo (data) {
    return reqJsonData('api/getWxUserInfo', data, 'get')
  },
  getWxTicket (data) {
    return reqJsonData('api/getWxTicket', data, 'get')
  },
  getWxTicketIOS (data) {
    return reqJsonData('api/getWxTicketIOS', data, 'get')
  },
  getUserList (data) {
    return reqJsonData('api/getUserList', data, 'get')
  },
  getUserInfo (data) {
    return reqJsonData('api/getUserInfo', data, 'get')
  },
  addScore (data) {
    return reqJsonData('api/addScore', data, 'get')
  },
  updateShoppingCart (data) {
    return reqJsonData('api/updateShoppingCart', data, 'get')
  },
  getGameInfo (data) {
    return reqJsonData('api/getGameInfo', data, 'get')
  },
  addGamePlayerNumber (data) {
    return reqJsonData('api/addGamePlayerNumber', data, 'get')
  },
  getItemList (data) {
    return reqJsonData('api/getItemList', data, 'get')
  },
  updateItemRoot (data) {
    return reqJsonData('api/updateItemRoot', data, 'get')
  },
  updateItem (data) {
    return reqJsonData('api/updateItem', data, 'get')
  },
  getOrderList (data) {
    return reqJsonData('api/getOrderList', data, 'get')
  },
  updateOrder (data) {
    return reqJsonData('api/updateOrder', data, 'get')
  },
  addOrder (data) {
    return reqJsonData('api/addOrder', data, 'get')
  },
  getLogList (data) {
    return reqJsonData('api/getLogList', data, 'get')
  },
  getMessageList (data) {
    return reqJsonData('api/getMessageList', data, 'get')
  },
  addMessage (data) {
    return reqJsonData('api/addMessage', data, 'get')
  },
  updateMessage (data) {
    return reqJsonData('api/updateMessage', data, 'get')
  },
  getDepartmentsList (data) {
    return reqJsonData('api/getDepartmentsList', data, 'get')
  },
  addDepartmentsNumber (data) {
    return reqJsonData('api/addDepartmentsNumber', data, 'get')
  }

}
