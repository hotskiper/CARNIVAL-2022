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
      {
        name: '班昭',
        describe: '字惠班，东汉女史学家、文学家，史学家班彪之女、班固之妹。一生博学高才，其兄班固著《汉书》，未竟而卒，班昭奉旨代兄续写《汉书》完成父兄心愿。巾帼不让须眉，凭借高超的才学教授学术，桃李满天下。',
        img1: 'player/班昭.jpg',
        img2: 'player/班昭1.jpg'
      },
      {
        name: '蔡琰',
        describe: '字文姬，东汉时期女性文学家，是古代四大才女之一。出身名门，博学能文又善歌赋，精通音律，一生几度沉浮，但从未向命运屈服过，苦难的生活更加激发了她的文学和音乐创作，在历史上留下不可多得的文化财富。',
        img1: 'player/蔡文姬.jpg',
        img2: 'player/蔡文姬1.jpg'
      },
      {
        name: '刘备',
        describe: '字玄德，三国时期蜀汉开国皇帝、政治家。为人弘毅宽厚，知人待士，中国文化精神中“仁”的体现者。有胆识、胸襟和谋略，具有仁政、爱民的民本思想。',
        img1: 'player/刘备.jpg',
        img2: 'player/刘备1.jpg'
      },
      {
        name: '孙权',
        describe: '字仲谋，三国时期孙吴的建立者。足智多谋，善于招揽和任用人才，能做到知人善任从谏如流，身处逆境时仍能够忍辱负重、坚韧不屈。',
        img1: 'player/孙权.jpg',
        img2: 'player/孙权1.jpg'
      },
      {
        name: '张飞',
        describe: '字益德，三国时期蜀汉名将。生性耿直，敢爱敢恨、爱憎分明又勇猛无畏。虽是一员武将，却粗中带细有时也有一定的计谋。',
        img1: 'player/张飞.jpg',
        img2: 'player/张飞1.jpg'
      },
      {
        name: '赵云',
        describe: '字子龙，身长八尺，姿颜雄伟，三国时期蜀汉名将。武艺超群骁勇善战，对事物有独立思考和见解，是难得的有勇有谋的武将。曾两次救出年幼时期的刘禅，单骑救主的故事在民间广为流传。',
        img1: 'player/赵云.jpg',
        img2: 'player/赵云1.jpg'
      },
      {
        name: '诸葛亮',
        describe: '字孔明，号卧龙，三国时期蜀汉丞相，接触的政治家、军事家、文学家、书法家、发明家。足智多谋、料事如神，有着胸怀坦荡的大智慧。具有忠贞不渝、为国为民，鞠躬尽瘁死而后已的无私奉献精神，是智慧和忠贞的典型。',
        img1: 'player/诸葛亮.jpg',
        img2: 'player/诸葛亮1.jpg'
      },
      {
        name: '卓文君',
        describe: '原名文后，汉代才女，古代四大才女之一。姿色娇美，精通音律，善弹琴，有文名，对爱情忠贞不渝。与汉代著名文人司马相如的一段爱情佳话至今被人津津乐道。《白头吟》中“愿得一心人，白头不相离”堪称经典佳句。',
        img1: 'player/卓文君.jpg',
        img2: 'player/卓文君1.jpg'
      }
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
      return state.cardNumber
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
