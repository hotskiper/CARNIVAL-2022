<template>
  <div class="userCode">
    <img alt="Vue logo" src="../assets/image/bg2.jpg" />
    <img alt="Vue logo" class="img-ab" src="../assets/image/bg4.png" />
    <div class="content-block">
      <div class="head-img">
        <!-- <img src="../assets/image/logo.png" alt /> -->
        <img :src="this.headImg" alt />
      </div>
      <div class="name">{{this.$store.getters.getCardNumber}}{{this.$store.getters.getName}}</div>
      <div class="text">二维码被裁判扫码录入后方可参加比赛</div>
      <!-- <img class="code-img" src="../assets/image/logo.png" alt /> -->
      <div id="qrcode" ref="qrcode"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.userCode {
  // padding: 10px 20px;
  img {
    width: 100%;
  }
  .img-ab {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .content-block {
    width: 355px;
    height: 430px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%);
    padding: 10px 19px;
    background-image: url("../assets/image/user-code.png");
    background-size: 100% 100%;
    .head-img {
      width: 100%;
      height: 50px;
      img {
        height: 36px;
        width: 36px;
      }
    }
    .name {
      width: 100%;
      font-size: $font-size-large;
      color: $grey-3;
    }
    .text {
      width: 100%;
      font-size: $font-size-bigger;
      color: $grey-1;
    }
    .code-img{
      width: 215px;
      height: 215px;
      position: absolute;
      border-radius: 6px;
      top: 190px;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
<script>
// @ is an alias to /src
import QRCode from 'qrcodejs2'

export default {
  name: 'home',
  data () {
    return {
      headImg: '/headImg/1.png'
    }
  },
  components: {},
  methods: {
    test () {},
    qrcode () {
      var _self = this
      let qrcode = new QRCode('qrcode', {
        width: 210, // 设置宽度，单位像素
        height: 210, // 设置高度，单位像素
        text: _self.$store.getters.getId + ',' + _self.$store.getters.getName + ',' + _self.$store.getters.getCardNumber // 设置二维码内容或跳转地址
      })
    }
  },
  mounted: function () {
    var _self = this
    // if (_self.$store.getters.getId === '') {
    //   _self.$router.push({ name: 'home' })
    // }

    let nameList = _self.$store.getters.getName.split('')
    let nameNumber = 0
    nameList.forEach(element => {
      nameNumber += parseInt(element.charCodeAt())
    })
    _self.headImg = '/headImg/' + (nameNumber % 6) + '.png'

    setTimeout(function () {
      _self.qrcode()
    }, 200)
  }
}
</script>
