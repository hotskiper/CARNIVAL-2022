<template>
  <div class="BottomTabBar">
    <div class="bar-content">
      <div class="bar-content-block" @click="clickTab(0)">
        <div
          class="bar-content-block-in"
          :class="{ 'active': this.$store.getters.getTabActiveIndex===0 }"
        ></div>
      </div>
      <div class="bar-content-block" @click="clickTab(1)">
        <div
          class="bar-content-block-in"
          :class="{ 'active': this.$store.getters.getTabActiveIndex===1 }"
        ></div>
      </div>
      <div class="bar-content-block" @click="clickTab(2)">
        <div
          class="bar-content-block-in"
          :class="{ 'active': this.$store.getters.getTabActiveIndex===2,'other-icon': this.$store.getters.getShoppingCartNumber > 0 && this.$store.getters.getTabActiveIndex!==2}"
        ></div>
      </div>
      <div class="bar-content-block" @click="clickTab(3)">
        <div
          class="bar-content-block-in"
          :class="{ 'active': this.$store.getters.getTabActiveIndex===3,'other-icon': this.$store.getters.getHasNotRead && this.$store.getters.getTabActiveIndex!==3}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../javascript/common/services'
export default {
  name: 'BottomTabBar',
  data () {
    return {
      urlList: ['home', 'exchangeCenter', 'shoppingCart', 'userCenter']
    }
  },
  methods: {
    clickTab (index) {
      // this.$store.dispatch({
      //   type: 'changeTabActiveIndexF',
      //   index: index
      // })

      var _self = this

      let messageList = []
      _self.$store.commit(
        'changeHasNotRead',
        false
      )
      service.getMessageList({
        'recipientName': _self.$store.getters.getName
      }).then(function (res) {
        if (res.data.status !== 200) {
          alert('error:' + res.data.message + '-' + res.data.data.msg)
        }
        messageList = res.data.data
        service.getMessageList({
          'recipientName': _self.$store.getters.getCardNumber
        }).then(function (res) {
          messageList = messageList.concat(res.data.data)
          messageList.forEach(element => {
            if (element.state === 1) {
              _self.$store.commit(
                'changeHasNotRead',
                true
              )
            }
          })
        })
      })
      console.log('hasNotRead:' + _self.$store.getters.getHasNotRead)

      this.$store.commit('changeTabActiveIndex', index)

      _self.$router.push({ name: _self.urlList[index] })
    }
  },
  mounted: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.BottomTabBar {
  .bar-content {
    position: fixed;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    // background-color: #ffffff;
    background: url("../assets/image/bottom-tab-bar.png");
    background-repeat: no-repeat;
    background-position: 100%, 100%;
    background-size: 100%, 100%;
    height: 56px;
    display: flex;
    .bar-content-block {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .bar-content-block:nth-of-type(1) {
      flex: 1;
      .bar-content-block-in {
        background: url("../assets/image/bottom-tab-bar-1-s.png");
        height: 51px;
        width: 48px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
      }
      .bar-content-block-in.active {
        height: 57.5px;
        width: 51px;
        background: url("../assets/image/bottom-tab-bar-1-l.png");
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
      }
    }

    .bar-content-block:nth-of-type(2) {
      flex: 1;
      .bar-content-block-in {
        background: url("../assets/image/bottom-tab-bar-2-s.png");
        height: 51px;
        width: 47px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
      }
      .bar-content-block-in.active {
        height: 57.5px;
        width: 51px;
        background: url("../assets/image/bottom-tab-bar-2-l.png");
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
      }
    }
    .bar-content-block:nth-of-type(3) {
      flex: 1;
      .bar-content-block-in {
         position: relative;
        background: url("../assets/image/bottom-tab-bar-3-s.png");
        height: 51px;
        width: 35px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
      }
      .bar-content-block-in.active {
        height: 57.5px;
        width: 51px;
        background: url("../assets/image/bottom-tab-bar-3-l.png");
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
        &.other-icon:after {
          content: "";
          display: none;
          height: 12px;
          width: 12px;
          background-color: $orange-1;
          border-radius: 12px;
          position: absolute;
          top: 2px;
          right: 6px;
        }
      }
      .bar-content-block-in.other-icon:after {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        background-color: $red;
        border-radius: 10px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .bar-content-block:nth-of-type(4) {
      flex: 1;
      .bar-content-block-in {
        position: relative;
        background: url("../assets/image/bottom-tab-bar-4-s.png");
        height: 51px;
        width: 32.5px;
        margin-bottom: 10px;
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
      }
      .bar-content-block-in.active {
        height: 57px;
        width: 51px;
        background: url("../assets/image/bottom-tab-bar-4-l.png");
        background-repeat: no-repeat;
        background-position: 100%, 100%;
        background-size: 100%, 100%;
      }
      .bar-content-block-in.other-icon:after {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        background-color: $red;
        border-radius: 10px;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
