<template>
  <div class="userCenter">
    <img alt="Vue logo" class="img-ab-2" src="../assets/image/bg4.png" />
    <div class="user-info">
      <div class="user-info-left">
        <img :src="this.headImg" alt />
      </div>
      <div class="user-info-right">
        <div class="name">{{this.$store.getters.getCardNumber}}{{this.$store.getters.getName}}</div>
         <div class="score">您当前积分{{this.$store.getters.getOnlineScore - this.$store.getters.getConsumption}}分</div>
      </div>
    </div>
    <div class="more-info">
      <div class="more-info-in" @click="goPage('myOrder')" >
        <img src="../assets/image/order.png" alt />
        <span class="title">我的订单</span>
        <i class="cubeic-arrow"></i>
      </div>
      <div class="more-info-in" @click="goPage('myMessage')"  :class="{'notRead':hasNotRead}">
        <img src="../assets/image/message.png" alt />
        <span class="title">我的消息</span>
        <i class="cubeic-arrow"></i>
      </div>
      <div class="more-info-in" @click="goPage('scoreDetail')">
        <img src="../assets/image/score.png" alt />
        <span class="title">积分详情</span>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <div class="uxd-info">
      <p>2022烽火嘉年华</p>
      <p>主办方：南京烽火星空通信发展有限公司工会委员会</p>
      <p>承办方：公共研发部-技术设计部-UXD</p>
    </div>
    <BottomTabBar/>
     <div class="loading-dialog" v-if="isLoading">
      <cube-loading></cube-loading>
    </div>
  </div>
</template>
<style scoped lang="scss">
.userCenter {
  padding: 16px 10px 32px 10px;
  img {
    width: 100%;
  }
  .img-ab-2{
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .user-info{
  background-color: $white;
    width: 100%;
    height: 70px;
     border-radius: 6px;
        padding: 0 10px;
         margin-bottom: 10px;
         display: flex;
         .user-info-left{
           flex: 1;
           display: flex;
           align-items: center;
           justify-content: center;
           height: 100%;
            img{
              height: 50px;
              width: 50px;
              border-radius: 50px;
              display: inline-block;
            }
         }
          .user-info-right{
           flex: 4;
           height: 100%;
           .name{
             height: 50px;
             line-height: 50px;
             color: $grey-3;
             font-size: $font-size-large;
             text-align: left;
             font-weight: bold;
           }
           .score{
             height: 20px;
             line-height: 20px;
             color: $grey-1;
             font-size: $font-size-bigger;
             text-align: left;
             margin-top: -10px;
           }

        }

  }

  .more-info {
    background-color: $white;
    width: 100%;
    padding: 0 10px;
    border-radius: 6px;
    // height: 92px;
    margin-bottom: 10px;
    .more-info-in {
      height: 46px;
      border-bottom: 1px solid $grey-4;
      font-size: $font-size-bigger;
        position: relative;
      img{
        float:left;
        height: 15px;
        width: 15px;
        line-height: 46px;
        margin-top: 16px;
        margin-right: 8px;
      }
      span {
        float: left;
      }
      .title {
        line-height: 46px;
        width: 72px;
        text-align: left;
        color: $grey-3;
        font-weight: bold;

      }
      i {
      color: $grey-6;
      position: absolute;
      top: 14px;
      right: 0;
    }
     &.notRead:after{
          content: "";
          display: block;
          height: 10px;
          width: 10px;
          background-color: $red;
          border-radius: 10px;
          position: absolute;
          top: 17px;
          left: 85px;
        }
    }
    .more-info-in:nth-of-type(3){
        border: none;
      }
  }

  .uxd-info{
    p{
      text-align: center;
      color: $brown-6;
      font-size: $font-size-smaller;

    }
  }

}
</style>
<script>
import BottomTabBar from '@/components/BottomTabBar.vue'
import service from '../javascript/common/services'

export default {
  name: 'home',
  data () {
    return {
      money: 10,
      checked: true,
      number: 1,
      isLoading: true,
      hasNotRead: false,
      headImg: '/headImg/1.png',
      checkList: [1, 4]
    }
  },
  components: {
    BottomTabBar
  },
  computed: {
    username () {
      return 'zzy'
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    }
  },
  mounted: function () {
    var _self = this

    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }

    service.getUserFragment({}).then(function (res) {
      _self.isLoading = false
      if (res.data.status_code !== 200) {
        alert('error:' + res.data.message + '-' + res.data.data.msg)
      }
      let score = 0
      score = res.data.data.reduce(function (prev, cur) {
        return prev + cur
      })
      _self.$store.commit(
        'changeOnlineScore',
        score
      )
    })

    // service.getUserInfo({
    //   id: _self.$store.getters.getId
    // }).then(function (res) {
    //   if (res.data.status !== 200) {
    //     alert('error:' + res.data.message + '-' + res.data.data.msg)
    //   }
    //   _self.$store.commit(
    //     'changeName',
    //     res.data.data.name
    //   )
    //   _self.$store.commit(
    //     'changeCardNumber',
    //     res.data.data.cardNumber
    //   )
    //   _self.$store.commit(
    //     'changeOnlineScore',
    //     res.data.data.onlineScore
    //   )
    //   _self.$store.commit(
    //     'changeUnderTheLineScore',
    //     res.data.data.underTheLineScore
    //   )
    //   _self.$store.commit(
    //     'changeConsumption',
    //     res.data.data.consumption
    //   )
    //   _self.$store.commit(
    //     'changeId',
    //     res.data.data._id
    //   )
    //   _self.$store.commit(
    //     'changeShoppingCartNumber',
    //     res.data.data.shoppingCart.length
    //   )
    //   _self.$store.commit(
    //     'changeUserType',
    //     res.data.data.type
    //   )
    // })

    let nameList = _self.$store.getters.getName.split('')
    let nameNumber = 0
    nameList.forEach(element => {
      nameNumber += parseInt(element.charCodeAt())
    })
    _self.headImg = '/headImg/' + (nameNumber % 6) + '.png'

    let messageList = []
    _self.$store.commit(
      'changeHasNotRead',
      false
    )
    // service.getMessageList({
    //   'recipientName': _self.$store.getters.getName
    // }).then(function (res) {
    //   messageList = res.data.data
    //   service.getMessageList({
    //     'recipientName': _self.$store.getters.getCardNumber
    //   }).then(function (res) {
    //     messageList = messageList.concat(res.data.data)
    //     messageList.forEach(element => {
    //       if (element.state === 1) {
    //         _self.hasNotRead = true
    //         _self.$store.commit(
    //           'changeHasNotRead',
    //           true
    //         )
    //       }
    //     })
    //     _self.isLoading = false
    //   })
    // })
  }
}
</script>
