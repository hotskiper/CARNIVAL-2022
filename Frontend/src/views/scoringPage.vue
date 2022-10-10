<template>
  <div class="scoringPage">
    <img alt="Vue logo" src="../assets/image/bg2.jpg" />
    <img alt="Vue logo" class="img-ab" src="../assets/image/bg4.png" />
    <div class="top-block">
        <div>游戏</div>
        <div @click="showPicker()">{{this.gameName}}<i class="cubeic-arrow"></i></div>
        <div @click="scan()">
            <img alt="Vue logo" src="../assets/image/1.png" />
        </div>
    </div>
    <div class="scoring-block">
      <div class="revoke" v-for="(itemR,indexR) in addScoreList" v-bind:key="indexR">
        <span class="name">{{itemR.cardNumber}}{{itemR.name}}</span>
        <span class="score">{{itemR.number}}分</span>&nbsp;&nbsp;
        <span class="revoke-in" @click="revoke(itemR.name,itemR.cardNumber,itemR.userId,indexR)">
           <img alt="revoke" src="../assets/image/revoke.png" />撤回操作
        </span>
      </div>
      <div class="scoring-block-in" v-for="(item,index) in userList" v-bind:key="index">
        <div class="close-block" @click="remove (index)"></div>
        <div class="user">
          <div class="head-img">
            <img alt="Vue logo" src="../assets/image/item.jpg" />
          </div>
          <div class="user-info">
            <div class="name">{{item.name}}</div>
            <div class="user-score">{{item.cardNumber}}</div>
            <!-- <div class="user-score">本游戏累计积分：0分</div> -->
          </div>
        </div>
        <div class="button-group">
          <!-- <div @click="beforeAdd (item.name,item.cardNumber,item.userId, 3, gameValue, gameName,index)">3分</div> -->
          <div @click="beforeAdd (item.name,item.cardNumber,item.userId, 6, gameValue, gameName,index)">6分</div>
          <div @click="beforeAdd (item.name,item.cardNumber,item.userId, 9, gameValue, gameName,index)">9分</div>
          <div @click="beforeAdd (item.name,item.cardNumber,item.userId, 12, gameValue, gameName,index)">12分</div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped lang="scss">
.scoringPage {
  // padding: 10px 20px;

  img {
    width: 100%;
  }
  .img-ab {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .top-block{
    width: calc(100% - 38px);
    margin: 10px 19px;
    top: 0;
    position: absolute;
    display: flex;
    border-radius: 5px;
    background-color: $white;
    div{
      line-height: 40px;
    }
    div:nth-of-type(1){
      flex:1;
      font-size: $font-size-bigger;
      color: $grey-3;
      font-weight: bold;
    }
    div:nth-of-type(2){
      flex:3;
      font-size: $font-size-bigger;
      color: $grey-3;
      text-align: left;

    }
    div:nth-of-type(3){
      flex:1;
      line-height: 36px;
      img{
        width: 70%
      }
    }
  }

  .scoring-block {
    width: 100%;
    position: absolute;
    top: 50px;
    padding: 10px 19px;
    .revoke {
      height: 24px;
      line-height: 24px;
      margin: 10px 0;
      width: 100%;
      text-align: center;
      font-size: $font-size-bigger;
      .name {
        color: $grey-3;
        font-weight: bold;
      }
      .score {
        color: $orange-1;
        font-weight: bold;
      }
      .revoke-in {
        img{
          height: 11px;
          width: 11px;
          margin-right: 2px;
        }
        color: $orange-1;
        font-weight: bold;
      }
    }
    .scoring-block-in {
      height: 117px;
      border-radius: 5px;
      background-color: $white;
      margin-bottom: 10px;
      padding: 12px 10px 8px 10px;
      position: relative;

      .close-block{
        position: absolute;
        top:10px;
        right: 10px;;
        height: 20px;
        width: 20px;
      }

      .user {
        height: 50%;
        display: flex;
        .head-img {
          display: flex;
          align-items: center;
          justify-items: center;
          flex: 1;
          img {
            height: 40px;
            width: 40px;
            border-radius: 40px;
          }
        }
        .user-info {
          flex: 5;
          .name {
            font-size: $font-size-large;
            color: $grey-3;
            text-align: left;
            height: 50%;
            line-height: 29px;
          }
          .user-score {
            font-size: $font-size-bigger;
            color: $grey-1;
            text-align: left;
            height: 50%;
            line-height: 29px;
          }
        }
      }

      .button-group {
        height: 50%;
        display: flex;
        align-items: center;
        justify-items: flex-start;
        div {
          width: 46px;
          height: 30px;
          line-height: 30px;
          border-radius: 2px;
          color: $orange-1;
          border: 1px solid $orange-1;
          font-size: $font-size-bigger;
          margin-right: 12px;
          float: left;
        }
        div:active{
          background-color: $orange-1;
           color:$white;
        }
      }
    }

    .scoring-block-in:before {
      content: "";
      display: block;
      position: absolute;
      right: 10px;
      top: 10px;
      background-image: url("../assets/image/close.png");
      background-size: 100% 100%;
      height: 20px;
      width: 20px;
    }
  }
}
</style>
<script>
// @ is an alias to /src
import service from '../javascript/common/services'
import wx from 'weixin-js-sdk'

export default {
  name: 'home',
  data () {
    return {
      gameList: [
        { text: '投壶', value: '5d54b525ff5c53cb0fd0c6c0' },
        { text: '书法画扇', value: '5d7ee29412b3397db86e98d4' },
        { text: '印染体验', value: '5d7ee2a812b3397db86e98de' },
        { text: '套圈', value: '5d7ee2bf12b3397db86e98eb' },
        { text: '跳百索', value: '5d7ee2cc12b3397db86e98f6' },
        { text: '抛绣球', value: '5d7ee2d712b3397db86e9900' },
        { text: '漂流小球', value: '5d7ee2e412b3397db86e9906' },
        { text: '极客坊', value: '5da3d0e7ab6d04fe96cde88b' }
      ],
      gameName: '请选择',
      gameValue: '请选择',
      userList: [
        // {
        //   'name': '庄泽宇',
        //   'userId': '5d80484acec8b331b89fdced',
        //   'cardNumber': 'X4714'
        // }
      ],
      addScoreList: [
        // {
        //   'name': '庄泽宇',
        //   'cardNumber': 'X4714',
        //   'userId': '',
        //   'number': '',
        //   'gameId': '',
        //   'gameName': '',
        //   'active':true
        // }

      ]
    }
  },
  components: {},
  methods: {
    test () {},
    scan () {
      var _self = this
      wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var infoList = res.resultStr.split(',')
          var userId = infoList[0].trim()
          var name = infoList[1]
          var cardNumber = infoList[2]
          var data = {
            'name': name,
            'userId': userId,
            'cardNumber': cardNumber
          }

          _self.userList.push(data)

          if (_self.gameName === '书法画扇') {
            service.getLogList({
              'userId': userId,
              'gameId': _self.gameValue
            }).then(function (res) {
              if (res.data.data.length > 0) {
                alert('请注意‘' + name + '’已玩过‘书法画扇’')
              }
            })
          }
          if (_self.gameName === '印染体验') {
            service.getLogList({
              'userId': userId,
              'gameId': _self.gameValue
            }).then(function (res) {
              if (res.data.data.length > 0) {
                alert('请注意‘' + name + '’已玩过‘印染体验’')
              }
            })
          }
        },
        error: function (res) {
          if (res.errMsg.indexOf('function_not_exist') > 0) {
            alert('版本过低请升级')
          }
        }
      })
    },
    revoke (name, cardNumber, userId, index) {
      var _self = this
      var data = {
        'name': name,
        'cardNumber': cardNumber,
        'userId': userId
      }
      _self.addScoreList[index].active = false
      _self.addScoreList.splice(index, 1)

      _self.userList.push(data)
    },
    remove (index) {
      var _self = this
      _self.userList.splice(index, 1)
    },
    beforeAdd (name, cardNumber, userId, number, gameId, gameName, index) {
      var _self = this
      if (_self.gameName === '请选择') {
        this.$createDialog({
          type: 'error',
          content: `请选择类游戏！`,
          icon: 'cubeic-alert'
        }).show()
        return
      }

      var data = {
        'name': name,
        'cardNumber': cardNumber,
        'userId': userId,
        'number': number,
        'gameId': gameId,
        'gameName': gameName,
        'active': true
      }
      _self.userList.splice(index, 1)
      _self.addScoreList.push(data)
      setTimeout(function () {
        if (data.active) {
          _self.addScore(data.userId, data.number, data.gameId, data.gameName)
          for (var i = 0; i < _self.addScoreList.length; i++) {
            if (_self.addScoreList[i] === data) {
              _self.addScoreList.splice(i, 1)
              break
            }
          }
        }
      }, 2000)
    },
    addScore (userId, number, gameId, gameName) {
      var _self = this
      service.addScore({
        'id': userId,
        'number': number,
        'type': 'add',
        'numberType': 'underTheLine',
        'gameId': gameId,
        'msg': gameName
        // 'id': '5d80484acec8b331b89fdd0e',
        // 'number': 3,
        // 'type': 'add',
        // 'numberType': 'underTheLine',
        // 'gameId': '5d54b525ff5c53cb0fd0c6c0',
        // 'msg': '投壶'
      }).then(function (res) {

      })
    },
    showPicker () {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '游戏选择',
          data: [this.gameList],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      this.gameName = selectedText[0]
      this.gameValue = selectedVal[0]
    },
    cancelHandle () {

    }
  },
  mounted: function () {
    var _self = this
    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }

    // function isIOS () {
    //   let isIphone = navigator.userAgent.includes('iPhone')
    //   let isIpad = navigator.userAgent.includes('iPad')
    //   return isIphone || isIpad
    // }

    service.getWxTicket().then(function (res) {
      wx.config({
        beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wl50ea71a776', // 必填，企业微信的cropID
        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.data.signature, // 必填，签名，见附录1
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    })

    // if (isIOS()) {
    //   alert('ios')
    //   service.getWxTicketIOS().then(function (res) {
    //     wx.config({
    //       beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
    //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //       appId: 'wl50ea71a776', // 必填，企业微信的cropID
    //       timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    //       nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    //       signature: res.data.data.signature, // 必填，签名，见附录1
    //       jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     })
    //   })
    // } else {
    //   alert('安卓')
    //   service.getWxTicket().then(function (res) {
    //     wx.config({
    //       beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
    //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //       appId: 'wl50ea71a776', // 必填，企业微信的cropID
    //       timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    //       nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    //       signature: res.data.data.signature, // 必填，签名，见附录1
    //       jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     })
    //   })
    // }

    // wx.config({
    //   beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: 'wl50ea71a776', // 必填，企业微信的cropID
    //   timestamp: 1570699046, // 必填，生成签名的时间戳
    //   nonceStr: '4036ac6a', // 必填，生成签名的随机串
    //   signature: 'b6efdc2aed06e06f1ee4df2ca920c005221d1f11', // 必填，签名，见附录1
    //   jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // })
  }
}
</script>
