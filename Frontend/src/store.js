import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'

Vue.use(Vuex)

const params = document.location.search
const urlParams = qs.parse(params, { ignoreQueryPrefix: true })
const userId = urlParams.userId

export default new Vuex.Store({
  state: {
    userId: userId,
    count: 1,
    money: 1,
    shoppingCartNumber: 0,
    urlStr: '/logoN.png',
    tabActiveIndex: 0,
    wxCode: '',
    name: '', // 用户名
    id: '', // 用户id
    userType: 0,
    cardNumber: '', // 用户工号
    onlineScore: 0, // 线上积分
    underTheLineScore: 0, // 线下积分
    consumption: 0, // 消费
    balance: 0, // 余额
    playerList: [
      
    ],
    gameIndex: 0,
    hasNotRead: false
  },
  getters: {
    getMoney: function (state) {
      return state.money
    },
    getUrlStr: function (state) {
      return state.urlStr
    },
    getTabActiveIndex: function (state) {
      return state.tabActiveIndex
    },
    getShoppingCartNumber: function (state) {
      return state.shoppingCartNumber
    },
    getWxCode: function (state) {
      return state.wxCode
    },
    getName: function (state) {
      return state.name
    },
    getCardNumber: function (state) {
      return state.userId
    },
    getOnlineScore: function (state) {
      return state.onlineScore
    },
    getUnderTheLineScore: function (state) {
      return state.underTheLineScore
    },
    getConsumption: function (state) {
      return state.consumption
    },
    getBalance: function (state) {
      return state.balance
    },
    getId: function (state) {
      return state.id
    },
    getUserType: function (state) {
      return state.userType
    },
    getPlayerList: function (state) {
      return state.playerList
    },
    getGameIndex: function (state) {
      return state.gameIndex
    },
    getHasNotRead: function (state) {
      return state.hasNotRead
    }

  },
  mutations: {
    add (state) {
      state.money += 1
    },
    reduction (state) {
      state.money -= 1
    },
    changeUrlStr (state, url) {
      state.urlStr = url
    },
    changeTabActiveIndex (state, index) {
      state.tabActiveIndex = index
    },
    changeShoppingCartNumber (state, number) {
      state.shoppingCartNumber = number
    },
    changeWxCode (state, code) {
      state.wxCode = code
    },
    changeName (state, code) {
      state.name = code
    },
    changeCardNumber (state, code) {
      state.cardNumber = code
    },
    changeOnlineScore (state, code) {
      state.onlineScore = code
    },
    changeUnderTheLineScore (state, code) {
      state.underTheLineScore = code
    },
    changeConsumption (state, code) {
      state.consumption = code
    },
    changeBalance (state, code) {
      state.balance = code
    },
    changeId (state, code) {
      state.id = code
    },
    changeUserType (state, code) {
      state.userType = code
    },
    changeGameIndex (state, code) {
      state.gameIndex = code
    },
    changeHasNotRead (state, code) {
      state.hasNotRead = code
    }
  },
  actions: {
    addF (content) {
      content.commit('add')
    },
    reductionF (content) {
      content.commit('reduction')
    }
  }
})
