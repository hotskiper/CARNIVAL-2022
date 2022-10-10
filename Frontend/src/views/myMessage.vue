<template>
  <div class="myMessage">
    <div class="main-tab" v-show="page === 1">
      <div class="main-tab-left" :class="{'active':this.tabIndex === 0}" @click="changeTab(0)">私信</div>
      <div class="main-tab-right" :class="{'active':this.tabIndex === 1}" @click="changeTab(1)">通知</div>
    </div>
    <div class="message-list" v-show="tabIndex === 0">
      <div class="none-style" v-if="messageList.length <= 0">╮（╯＿╰）╭ 空空如也~</div>

      <div class="message-list-in" :class="{'notRead':item.state == 1}" v-for="(item,index) in messageList" v-bind:key="index" @click="showPage2(index)">
          <img alt="头像" :src="item.img"/>
          <div class="content">
            <div class="name">{{item.randomName}}</div>
            <div class="content-in">献给您的一封来信</div>
          </div>
           <div class="time">
              {{item.timeStr}}
           </div>
      </div>
    </div>

    <div class="message-list" v-show="tabIndex === 1">
      <div class="none-style" v-if="messageListSystem.length <= 0">╮（╯＿╰）╭ 空空如也~</div>
      <div class="message-list-in message-list-in-system" v-for="(item,index) in messageListSystem" v-bind:key="index">
          <!-- <img alt="头像" src="../assets/image/item.jpg" /> -->
          <div class="content">
            <div class="name">{{item.name}}</div>
            <div class="content-in">{{item.content}}</div>
          </div>
           <div class="time">
              {{item.timeStr}}
           </div>
      </div>
    </div>

    <div class="message-detail" v-show="page === 2" @click="closePage2">
      <img class="toHerBg" alt="Vue logo" :src="$store.getters.getPlayerList[messageChecked.playerIndex].img2" />
      <div class="sendBox" :class="{'isHide':this.isHide}">
        <div class="title">
          <p>{{$store.getters.getPlayerList[messageChecked.playerIndex].name}}</p>
          <img src="../assets/image/toHer-bg-left.png" alt />
          <img src="../assets/image/toHer-bg-right.png" alt />
        </div>
        <div class="content">
          <div
            class="describe"
          >{{$store.getters.getPlayerList[messageChecked.playerIndex].describe}}</div>
          <img src="../assets/image/toHer-content-bg-left.png" alt />
          <img src="../assets/image/toHer-content-bg-right.png" alt />
        </div>
        <div class="content content2">
          <div class="describe">{{messageChecked.content}}</div>
          <div class="describe-from">——来自{{messageChecked.randomName}}的寄语</div>
          <img src="../assets/image/toHer-content-bg-2-left.png" alt />
          <img src="../assets/image/toHer-content-bg-2-right.png" alt />
        </div>
      </div>
    </div>
     <div class="loading-dialog" v-if="isLoading">
      <cube-loading></cube-loading>
    </div>
  </div>
</template>
<style scoped lang="scss">
.myMessage {
  padding: 16px 10px 32px 10px;
  .main-tab {
    background-color: $white;
    width: 100%;
    height: 48px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    z-index: 99;
    .main-tab-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: $font-size-bigger;
      color: $grey-1;
      cursor: pointer;
      &.active{
        color: $orange-1;
        border-bottom: 2px solid $orange-1;
      }
    }
    .main-tab-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: $font-size-bigger;
      color: $grey-1;
      cursor: pointer;
      &.active{
        color: $orange-1;
         border-bottom: 2px solid $orange-1;
      }
    }
  }

  .message-list {
    background-color: $white;
    width: 100%;
    padding: 0 10px;
    border-radius: 6px;
    margin-top: 44px;
    margin-bottom: 10px;

    .message-list-in {
      height: 67px;
      border-bottom: 1px solid $grey-4;
      font-size: $font-size-bigger;
      position: relative;
      padding-top: 14px;
       img {
          width: 37px;
          height: 37px;

          border-radius: 37px;
          float: left;

        }

        .content{
          float: left;
          padding-left: 10px;
          .name{
            color: $brown-1;
            font-size: $font-size-big;
            text-align: left;
            font-weight: 700;
          }
          .content-in{
            color: $grey-2;
            font-size: $font-size-middle;
          }
        }
        .time{
          float: right;
          text-align: right;
          font-size: $font-size-small;
          color: $grey-1;
        }

      &:nth-last-child(1){
        border: none
      }

       &.notRead:after{
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        background-color: $red;
        border-radius: 10px;
        position: absolute;
        top: 14px;
        left: 26px;
      }

    }

    .message-list-in-system{
      .time{
        position: absolute;
        top: 14px;
        right: 0;
      }
    }

  }

   .message-detail{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      .toHerBg {
        width: 100%;
      }
      .sendBox {
        width: 100%;
        height: 386px;
        background-color: #b0854f;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        position: fixed;
        bottom: 0;
        transition: 0.5s all;

        &.isHide {
          bottom: -386px;
        }

        .title {
          height: 55px;
          position: relative;
          p {
            line-height: 55px;
            font-size: $font-size-large;
            color: $brown-3;
          }
          img {
            height: 19px;
            width: 5px;
          }
          img:nth-of-type(1) {
            position: absolute;
            top: 18px;
            left: 12px;
          }
          img:nth-of-type(2) {
            position: absolute;
            top: 18px;
            right: 12px;
          }
        }
        .content {
          height: 114px;
          width: calc(100% - 12px);
          margin: 0 6px;
          background-color: $brown-4;
          position: relative;
          .describe {
            height: 115px;
            text-align: left;
            font-size: $font-size-middle;
            color: $grey-7;
            padding: 0 18px;
            display: table-cell;
            vertical-align: middle;
            font-weight: bold;
            line-height: 1.6;
            letter-spacing: 1.75px;
          }
          img {
            height: 114px;
            width: 24px;
          }
          img:nth-of-type(1) {
            position: absolute;
            top: 0;
            left: 0;
          }
          img:nth-of-type(2) {
            position: absolute;
            top: 0;
            right: 0;
          }
          .send-number {
            height: 50px;
            margin: 10px 10px 0 10px;
            width: calc(100% - 20px);
            border-radius: 5px;
            background-color: $brown-5;
            padding: 0 10px;
            p {
              float: left;
              color: $grey-7;
              font-size: $font-size-middle;
              font-weight: bold;
              line-height: 50px;
              text-align: left;
              width: 50px;
            }
            input {
              float: left;
              width: 220px;
              height: 40px;
              padding-left: 5px;
              background-color: rgba(0, 0, 0, 0);
              color: $grey-3;
              margin-top: 4px;
              font-size: $font-size-middle;
            }
          }

          .send-message {
            height: 70px;
            margin: 10px 10px 0 10px;
            width: calc(100% - 20px);
            border-radius: 5px;
            background-color: $brown-5;
            padding: 0 10px;
            p {
              float: left;
              color: $grey-7;
              font-size: $font-size-middle;
              font-weight: bold;
              line-height: 50px;
              text-align: left;
              width: 50px;
            }
            .send-message-content {
              float: left;
              width: 220px;
              height: 40px;
              padding-left: 5px;
              background-color: rgba(0, 0, 0, 0);
              color: $grey-3;
              margin-top: 16px;
              font-size: $font-size-middle;
              border: none;
              resize: none;
            }
          }

          .cube-btn {
            font-size: $font-size-more-large;
            width: 80%;
            margin-left: 10%;
            margin-top: 14px;
            border-radius: 40px;
            background-color: $orange-1;
          }
          .cube-btn:active {
            background-color: $orange-2;
          }
        }

        .content2{
          height: 198px;
          margin-top: 10px;
          img {
            height: 190px;
            width: 19px;
          }
          img:nth-of-type(1) {
            position: absolute;
            top: 4px;
            left: 4px;
          }
          img:nth-of-type(2) {
            position: absolute;
            top: 4px;
            right: 4px;
          }

          .describe {
            height: 140px;
            text-align: left;
            font-size: $font-size-middle;
            color: $grey-7;
            padding: 0 18px;
            display: table-cell;
            vertical-align: middle;
            font-weight: bold;
            line-height: 1.75;
            letter-spacing: 1.75px;
          }
          .describe-from {
            display: block;
            text-align: right;
            font-size: $font-size-middle;
            color: $grey-7;
            padding: 0 18px;
            font-weight: bold;
            line-height: 1.75;
            letter-spacing: 1.75px;
          }
        }
      }
    }

}
</style>

<script>
import service from '../javascript/common/services'
export default {
  name: 'pastLife',
  data () {
    return {
      money: 10,
      tabIndex: 0,
      isHide: true,
      isLoading: true,
      page: 1,
      messageList: [
        {
          '_id': '5d849a79512be033a4f4d697',
          'time': 1568971385783.0,
          'content': 'ooo',
          'state': 2,
          'playerIndex': 1,
          'randomName': 'lll',
          'timeStr': '2019-09-20 17:23:05',
          'recipientId': '5d80484acec8b331b89fdced',
          'senderId': '5d80484acec8b331b89fdced',
          'img': '/headImg/1.png'
        }
      ],
      messageListSystem: [
        {
          // 'name': '系统提示',
          // 'content': 'ooo',
          // 'time': 1568971385783.0,
          // 'timeStr': '2019-09-20 17:23:05'
        }
      ],
      messageChecked: {
        '_id': '5d849a79512be033a4f4d697',
        'time': 1568971385783.0,
        'content': 'ooo',
        'state': 2,
        'playerIndex': 1,
        'randomName': 'lll',
        'timeStr': '2019-09-20 17:23:05',
        'recipientId': '5d80484acec8b331b89fdced',
        'senderId': '5d80484acec8b331b89fdced',
        'img': '/headImg/1.png'
      }
    }
  },
  computed: {},
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    },
    changeTab (index) {
      let _self = this
      _self.tabIndex = index
    },
    showPage2 (index) {
      var _self = this
      _self.page = 2

      if (_self.messageList[index].state === 1) {
        _self.messageList[index].state = 2
        service.updateMessage({
          'id': _self.messageList[index]._id,
          'state': 2
        }).then(function (res) {
          if (res.data.status !== 200) {
            alert('error:' + res.data.message + '-' + res.data.data.msg)
          }
        })
      }

      _self.messageChecked = _self.messageList[index]

      setTimeout(function () {
        _self.isHide = false
      }, 1)
    },
    closePage2 () {
      var _self = this
      _self.isHide = true
      _self.page = 1
    }
  },
  mounted: function () {
    var _self = this
    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }

    _self.messageList = []
    _self.messageListSystem = []
    // service.getMessageList({
    //   'recipientName': _self.$store.getters.getName
    // }).then(function (res) {
    //   _self.messageList = res.data.data
    //   service.getMessageList({
    //     'recipientName': _self.$store.getters.getCardNumber
    //   }).then(function (res) {
    //     if (res.data.status !== 200) {
    //       alert('error:' + res.data.message + '-' + res.data.data.msg)
    //     }
    //     _self.messageList = _self.messageList.concat(res.data.data)
    //     _self.messageList.reverse()
    //     _self.messageList.forEach(element => {
    //       element.img = '/headImg/' + Math.floor(6 * Math.random()) + '.png'
    //     })
    //     _self.isLoading = false
    //   })
    // })

    // service.getMessageList({
    //   'recipientName': '系统消息-uxd'
    // }).then(function (res) {
    //   if (res.data.status !== 200) {
    //     alert('error:' + res.data.message + '-' + res.data.data.msg)
    //   }
    //   res.data.data.forEach(function (item, index) {
    //     _self.messageListSystem.push({
    //       'name': '系统消息',
    //       'content': item.content,
    //       'time': item.time,
    //       'timeStr': item.timeStr
    //     })
    //   })
    //   _self.messageListSystem.reverse()
    // })
  }
}
</script>
