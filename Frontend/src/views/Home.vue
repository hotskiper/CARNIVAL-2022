<template>
  <div class="home">
    <div v-show="!isLoading">
      <img alt="Vue logo" src="../assets/image/bg1.jpg" />
      <div class="under-the-line-state">
        <div class="block">
          <div class="name">
            <div
              class="name-in"
              v-for="(item, index) in underLineGameListO"
              v-bind:key="item.name"
              :class="{ 'play-name': index === 0 && isPlay }"
            >
              <p>{{ item.name }}</p>
              <p>参与人数</p>
            </div>
          </div>
          <div class="number">
            <p
              v-for="(item, index) in underLineGameListO"
              v-bind:key="item.name"
              :class="{ 'play-number': index === 0 && isPlay }"
            >
              {{ item.number }}
            </p>
          </div>
        </div>
        <div class="block">
          <div class="name">
            <div
              class="name-in"
              v-for="(item, index) in underLineGameListE"
              v-bind:key="item.name"
              :class="{ 'play-name': index === 0 && isPlay }"
            >
              <p>{{ item.name }}</p>
              <p>参与人数</p>
            </div>
          </div>
          <div class="number">
            <p
              v-for="(item, index) in underLineGameListE"
              v-bind:key="item.name"
              :class="{ 'play-number': index === 0 && isPlay }"
            >
              {{ item.number }}
            </p>
          </div>
        </div>
      </div>
      <div class="more-action">
        <div class="more-action-rule" @click="goPage('gameRule')"></div>
        <!-- <div v-if="this.$store.getters.getUserType === 0" class="more-action-scan" @click="goPage('userCode')">
            <img alt="Vue logo" src="../assets/image/3.png" />
          </div>
          <div v-if="this.$store.getters.getUserType === 1" class="more-action-score" @click="goPage('scoringPage')">
              <img alt="Vue logo" src="../assets/image/2.png" />
          </div> -->
        <!-- <div class="more-action-score" @click="goPage('scoringPage')">
              <img alt="Vue logo" src="../assets/image/2.png" />
          </div> -->
      </div>
      <div class="game-block-1">
          <div class="game-block-in" @click="goGame('gameOuter',0)"></div>
          <div class="game-block-in" @click="goGame('gameOuter',1)"></div>
          <div class="game-block-in" @click="goGame('gameOuter',2)"></div>
          <div class="game-block-in" @click="goGame('gameOuter',3)"></div>
        </div>
        <div class="game-block-2">
          <div class="game-block-in" @click="goPage('toHer')"></div>
          <div class="game-block-in" @click="goPage('pastLife')"></div>
          <div class="game-block-in" @click="goGame('gameOuter',4)"></div>
        </div>

      <!-- <div class="game-block-1">
        <div class="game-block-in" @click="showMsg()"></div>
        <div class="game-block-in" @click="showMsg()"></div>
        <div class="game-block-in" @click="showMsg()"></div>
        <div class="game-block-in" @click="showMsg()"></div>
      </div>
      <div class="game-block-2">
        <div class="game-block-in" @click="showMsg()"></div>
        <div class="game-block-in" @click="showMsg()"></div>
        <div class="game-block-in" @click="showMsg()"></div>
      </div> -->

      <div class="light-list">
        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>
        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>

        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>
        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>
        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>
        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>

        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>
        <div class="light-list-in">
          <div class="light-1"></div>
          <div class="light-2"></div>
        </div>
      </div>

      <BottomTabBar />

      <div class="top-info">
        <div class="content">{{ this.messageListSystem[0].content }}</div>
      </div>
    </div>

    <div class="loading-dialog-home" :class="{ show: isLoading }">
      <cube-loading v-if="isLoading"></cube-loading>
    </div>
  </div>
</template>
<style scoped lang="scss">
.home {
  // padding: 10px 20px;

  img {
    width: 100%;
  }
  .under-the-line-state {
    position: absolute;
    top: 178px;
    left: 0;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .block {
      width: 112px;
      height: 60px;
      padding: 4px 4px;

      .name {
        float: left;
        width: 61%;
        height: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
        color: $brown-2;
        overflow: hidden;
        .name-in {
          height: 100%;
          margin-top: 10px;
          p {
            font-size: $font-size-bigger;
            font-weight: bold;
            height: 50%;
            display: flex;
            justify-content: left;
            align-items: center;
            padding-left: 2px;
          }
          p:nth-of-type(2) {
            font-size: $font-size-small;
            height: 50%;
            font-weight: initial;
            align-items: center;
            padding-left: 2px;
          }
        }
        .name-in:nth-of-type(1) {
          margin-top: 0;
        }

        .name-in.play-name {
          animation: playName 0.3s linear 1 normal;
          animation-fill-mode: forwards;
        }

        @keyframes playName {
          0% {
            margin-top: 0;
          }
          100% {
            margin-top: -46px;
          }
        }
      }
      .number {
        float: right;
        width: 39%;
        height: 60%;
        margin-top: 8px;
        overflow: hidden;
        p {
          font-size: $font-size-big;
          font-weight: bold;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $brown-2;
          margin-top: 0;
        }
        p.play-number {
          animation: playNumber 0.3s linear 1 normal;
          animation-fill-mode: forwards;
        }

        @keyframes playNumber {
          0% {
            margin-top: 0;
          }
          100% {
            margin-top: -31px;
          }
        }
      }
    }
    .block:nth-of-type(2) {
      margin-left: 5px;
    }
  }

  .more-action {
    position: absolute;
    height: 40px;
    width: 100%;
    top: 296px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .more-action-rule {
      height: 100%;
      width: 92px;
      margin-right: 2px;
      border-radius: 5px;
    }
    .more-action-rule:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .more-action-scan {
      height: 100%;
      width: 142px;
      margin-left: 6px;
      margin-right: 2px;
      border-radius: 5px;
      line-height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60%;
      }
    }
    .more-action-scan:active {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .more-action-score {
      height: 100%;
      width: 142px;
      margin-left: 6px;
      margin-right: 2px;
      border-radius: 5px;
      line-height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 32%;
      }
    }
    .more-action-score:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .game-block-1 {
    position: absolute;
    height: 240px;
    width: 100%;
    top: 396px;
    left: 0;

    .game-block-in {
      height: 58px;
      width: 58px;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      background: rgba(126, 126, 126, 0.7);
    }
    .game-block-in:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .game-block-in:nth-of-type(1) {
      transform: translate(-84px, -78px);
    }
    .game-block-in:nth-of-type(2) {
      transform: translate(26px, -78px);
    }
    .game-block-in:nth-of-type(3) {
      transform: translate(-84px, 14px);
    }
    .game-block-in:nth-of-type(4) {
      transform: translate(26px, 14px);
    }
  }

  .game-block-2 {
    position: absolute;
    height: 240px;
    width: 100%;
    top: 690px;
    left: 0;

    .game-block-in {
      height: 58px;
      width: 58px;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      background: rgba(126, 126, 126, 0.7);
    }
    .game-block-in:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .game-block-in:nth-of-type(1) {
      transform: translate(-84px, -78px);
    }
    .game-block-in:nth-of-type(2) {
      transform: translate(26px, -78px);
    }
    .game-block-in:nth-of-type(3) {
      width: 168px;
      transform: translate(-84px, 13px);
    }
  }

  .light-list {
    .light-list-in {
      height: 50px;
      width: 20px;
      position: absolute;
      animation: lightMove 12s linear infinite;
      transform-origin: top center;

      .light-1 {
        position: absolute;
        top: 0;
        left: 10px;
        height: 12.5px;
        width: 1px;
        background: url("../assets/image/light-1.png") no-repeat;
        background-size: 100%;
      }
      .light-2 {
        position: absolute;
        top: 10px;
        left: 0px;
        height: 37.5px;
        width: 20px;
        background: url("../assets/image/light-2.png") no-repeat;
        background-size: 100%;
        animation: lightMoveIn 12s linear infinite;
        transform-origin: top center;
      }
      &:nth-of-type(1) {
        top: 161px;
        left: 29px;
        animation-delay: 2.2s;
        .light-2 {
          animation-delay: 2.2s;
        }
      }
      &:nth-of-type(2) {
        top: 161px;
        right: 29px;
        animation-delay: 1.8s;
        .light-2 {
          animation-delay: 1.8s;
        }
      }

      &:nth-of-type(3) {
        top: 387px;
        left: 38px;
        animation-delay: 4.4s;
        .light-2 {
          animation-delay: 4.4s;
        }
      }
      &:nth-of-type(4) {
        top: 387px;
        left: 94px;
        animation-delay: 4s;
        .light-2 {
          animation-delay: 4s;
        }
      }
      &:nth-of-type(5) {
        top: 387px;
        right: 94px;
        animation-delay: 3.6s;
        .light-2 {
          animation-delay: 3.6s;
        }
      }
      &:nth-of-type(6) {
        top: 387px;
        right: 38px;
        animation-delay: 3.2s;
        .light-2 {
          animation-delay: 3.2s;
        }
      }

      &:nth-of-type(7) {
        top: 694px;
        left: 83px;
        animation-delay: 4.2s;
        .light-2 {
          animation-delay: 4.2s;
        }
      }
      &:nth-of-type(8) {
        top: 694px;
        right: 83px;
        animation-delay: 4.6s;
        .light-2 {
          animation-delay: 4.6s;
        }
      }
    }
  }

  .loading-dialog-home {
    position: fixed;

    height: 100vh;
    width: 100vw;
    background: url("../assets/image/loading.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: 0.5s;
    top: -100vh;
    left: 0;
    z-index: 99999;
    .cube-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
    &.show {
      top: 0;
    }
  }

  .top-info {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 30px;
    overflow: hidden;
    opacity: 0;
    background: rgba(0, 0, 0, 0.3);
    animation: topInfoMove 20s linear infinite;
    .content {
      width: 100vw;
      height: 100%;
      line-height: 30px;
      font-size: $font-size-middle;
      color: $white;
      font-weight: bold;
      // margin-left: 300px;
      // animation: topInfoMoveIn 20s linear infinite;
    }
  }

  @keyframes topInfoMove {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    55% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes topInfoMoveIn {
    0% {
      margin-left: 300px;
    }
    50% {
      margin-left: 300px;
    }
    55% {
      margin-left: 300px;
    }
    100% {
      margin-left: -300px;
    }
  }
}
</style>
<script>
// @ is an alias to /src
import BottomTabBar from '@/components/BottomTabBar.vue'
import service from '../javascript/common/services'
import { setTimeout } from 'timers'

export default {
  name: 'home',
  data () {
    return {
      isPlay: false,
      money: 10,
      isLoading: true,
      underLineGameList: [
        {
          name: '书法画扇',
          number: 0
        },
        {
          name: '印染体验',
          number: 0
        },
        {
          name: '套圈',
          number: 0
        },
        {
          name: '投壶',
          number: 0
        },
        {
          name: '跳百索',
          number: 0
        },
        {
          name: '极客坊',
          number: 0
        },
        {
          name: '抛绣球',
          number: 0
        },
        {
          name: '漂流小球',
          number: 0
        }
      ],
      messageListSystem: [
        {
          // 'name': '系统提示',
          // 'content': 'ooo',
          // 'time': 1568971385783.0,
          // 'timeStr': '2019-09-20 17:23:05'
        }
      ]
    }
  },
  computed: {
    underLineGameListO: function () {
      // 奇数列
      let List = []
      this.underLineGameList.forEach((element, index) => {
        if (index % 2 === 0) {
          List.push(element)
        }
      })
      return List
    },
    underLineGameListE: function () {
      // 偶数列
      let List = []
      this.underLineGameList.forEach((element, index) => {
        if (index % 2 === 1) {
          List.push(element)
        }
      })
      return List
    }
  },
  components: {
    BottomTabBar
  },
  methods: {
    // test () {
    //   service.getInfo()
    // },
    test2 () {
      this.$store.dispatch('addF')
    },
    showMsg () {
      alert('还未到开放时间')
    },
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    },
    goGame (nameIn, index) {
      var _self = this
      _self.goPage(nameIn)
      _self.$store.commit('changeGameIndex', index)
    },
    goPageUrl (url) {
      window.location.href = url
    },
    getGameList: function () {
      const games = [
        { type: 1, name: '1', playerNumber: 1 },
        { type: 2, name: '2', playerNumber: 2 },
        { type: 3, name: '3', playerNumber: 3 },
        { type: 4, name: '4', playerNumber: 4 }
      ]
      var _self = this
      games.forEach(function (item) {
        _self.underLineGameList.forEach(function (itemIn) {
          if (itemIn.name === item.name) {
            itemIn.number = item.playerNumber
          }
        })
      })

      // this.timer = setInterval(() => {
      //   service.getGameList().then(function (res) {
      //     if (res.data.status !== 200) {
      //       alert('error:' + res.data.message + '-' + res.data.data.msg)
      //     }
      //     res.data.data
      //   })
      //   this.updateState()
      // }, 5000)
    },
    updateState () {
      var _self = this
      _self.isPlay = true
      setTimeout(function () {
        _self.isPlay = false
        let obj = _self.underLineGameList.shift()
        _self.underLineGameList.push(obj)
        let obj2 = _self.underLineGameList.shift()
        _self.underLineGameList.push(obj2)
      }, 4000)
    }
  },
  mounted: function () {
    var _self = this
    if (localStorage.token) {
      _self.isLoading = false
      clearInterval(this.timer)
      this.getGameList()
    } else {
      const userId = this.$store.state.userId
      const params = {
        username: userId,
        password: `${userId}1024`
      }
      // debugger
      service.login(params).then((res) => {
        _self.isLoading = false
        if (res.data.status_code === 200) {
          localStorage.token = res.data.access_token
          clearInterval(this.timer)
          this.getGameList()
        } else {
          console.log(res.data.msg)
        }
      })
    }

    // 测试数据
    _self.$store.commit('changeId', '5daabed21e16331d205c1857')

    // service
    //   .getUserInfo({
    //     id: _self.$store.getters.getId
    //   })
    //   .then(function (res) {
    //     if (res.data.status !== 200) {
    //       alert('error:' + res.data.message + '-' + res.data.data.msg)
    //     }
    //     _self.$store.commit('changeName', res.data.data.name)
    //     _self.$store.commit('changeCardNumber', res.data.data.cardNumber)
    //     _self.$store.commit('changeOnlineScore', res.data.data.onlineScore)
    //     _self.$store.commit(
    //       'changeUnderTheLineScore',
    //       res.data.data.underTheLineScore
    //     )
    //     _self.$store.commit('changeConsumption', res.data.data.consumption)
    //     _self.$store.commit('changeId', res.data.data._id)
    //     _self.$store.commit(
    //       'changeShoppingCartNumber',
    //       res.data.data.shoppingCart.length
    //     )
    //     _self.$store.commit('changeUserType', res.data.data.type)

    //     service
    //       .getMessageList({
    //         recipientName: '系统消息-uxd'
    //       })
    //       .then(function (res) {
    //         if (res.data.status !== 200) {
    //           alert('error:' + res.data.message + '-' + res.data.data.msg)
    //         }
    //         res.data.data.forEach(function (item, index) {
    //           _self.messageListSystem.push({
    //             name: '系统消息',
    //             content: item.content,
    //             time: item.time,
    //             timeStr: item.timeStr
    //           })
    //         })
    //         _self.messageListSystem.reverse()
    //       })

    //     let messageList
    //     service
    //       .getMessageList({
    //         recipientName: _self.$store.getters.getName
    //       })
    //       .then(function (res) {
    //         if (res.data.status !== 200) {
    //           alert('error:' + res.data.message + '-' + res.data.data.msg)
    //         }
    //         messageList = res.data.data
    //         service
    //           .getMessageList({
    //             recipientName: _self.$store.getters.getCardNumber
    //           })
    //           .then(function (res) {
    //             messageList = messageList.concat(res.data.data)
    //             messageList.forEach((element) => {
    //               if (element.state === 1) {
    //                 _self.$store.commit('changeHasNotRead', true)
    //               }
    //             })
    //           })
    //       })

    //     _self.isLoading = false
    //   })

    // if (_self.$route.query.ruleId) {
    //   if (_self.$route.query.code) {
    //     _self.$store.commit(
    //       'changeWxCode',
    //       _self.$route.query.code
    //     )
    //     service.getWxUserInfo({
    //       code: _self.$route.query.code
    //     }).then(function (res) {
    //       _self.$store.commit(
    //         'changeName',
    //         res.data.data.name
    //       )
    //       _self.$store.commit(
    //         'changeCardNumber',
    //         res.data.data.cardNumber
    //       )
    //       _self.$store.commit(
    //         'changeId',
    //         res.data.data._id
    //       )
    //       _self.$store.commit(
    //         'changeUrlStr',
    //         '/rule/' + _self.$route.query.ruleId + '.jpg'
    //       )
    //       _self.$router.push({ name: 'gameRuleIn' })
    //     })
    //   } else {
    //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wl50ea71a776&redirect_uri=https://fh.happyzzy.com?ruleId=' + _self.$route.query.ruleId + '&response_type=code&scope=snsapi_privateinfo&agentid=1000041'
    //   }
    // } else {
    //   if (_self.$route.query.code && _self.$route.query.code !== 'has') {
    //     _self.$store.commit(
    //       'changeWxCode',
    //       _self.$route.query.code
    //     )
    //     service.getWxUserInfo({
    //       code: _self.$route.query.code
    //     }).then(function (res) {
    //       history.replaceState('', '', 'https://fh.happyzzy.com?code=has')

    //       _self.$store.commit(
    //         'changeName',
    //         res.data.data.name
    //       )
    //       _self.$store.commit(
    //         'changeCardNumber',
    //         res.data.data.cardNumber
    //       )
    //       _self.$store.commit(
    //         'changeOnlineScore',
    //         res.data.data.onlineScore
    //       )
    //       _self.$store.commit(
    //         'changeUnderTheLineScore',
    //         res.data.data.underTheLineScore
    //       )
    //       _self.$store.commit(
    //         'changeConsumption',
    //         res.data.data.consumption
    //       )
    //       _self.$store.commit(
    //         'changeId',
    //         res.data.data._id
    //       )
    //       _self.$store.commit(
    //         'changeShoppingCartNumber',
    //         res.data.data.shoppingCart.length
    //       )
    //       _self.$store.commit(
    //         'changeUserType',
    //         res.data.data.type
    //       )
    //       service.getMessageList({
    //         'recipientName': '系统消息-uxd'
    //       }).then(function (res) {
    //         res.data.data.forEach(function (item, index) {
    //           _self.messageListSystem.push({
    //             'name': '系统消息',
    //             'content': item.content,
    //             'time': item.time,
    //             'timeStr': item.timeStr
    //           })
    //         })
    //         _self.messageListSystem.reverse()
    //       })

    //       let messageList
    //       service.getMessageList({
    //         'recipientName': _self.$store.getters.getName
    //       }).then(function (res) {
    //         if (res.data.status !== 200) {
    //           alert('error:' + res.data.message + '-' + res.data.data.msg)
    //         }
    //         messageList = res.data.data
    //         service.getMessageList({
    //           'recipientName': _self.$store.getters.getCardNumber
    //         }).then(function (res) {
    //           messageList = messageList.concat(res.data.data)
    //           messageList.forEach(element => {
    //             if (element.state === 1) {
    //               _self.$store.commit(
    //                 'changeHasNotRead',
    //                 true
    //               )
    //             }
    //           })
    //         })
    //       })
    //       _self.isLoading = false
    //     })
    //   } else if (_self.$route.query.code && _self.$route.query.code === 'has') {
    //     _self.isLoading = false
    //   } else {
    //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wl50ea71a776&redirect_uri=https://fh.happyzzy.com&response_type=code&scope=snsapi_privateinfo&agentid=1000041'
    //   }
    // }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  distroyed: function () {
    clearInterval(this.timer)
  }
}
</script>
