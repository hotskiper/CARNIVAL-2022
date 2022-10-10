<template>
  <div class="orderResultPage">
    <img alt="Vue logo" src="../assets/image/result.png" />
    <cube-button @click="goExchangeCenter()">返回兑换商城</cube-button>
  </div>
</template>
<style scoped lang="scss">
.orderResultPage {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  img{
    width: 100%
  }
  .cube-btn {
    font-size: $font-size-more-large;
    width: 60%;
    border-radius: 40px;
    background-color: $orange-1;
    position: absolute;
    top:70%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .cube-btn:active {
    background-color: $orange-2;
  }
}
</style>
<script>
export default {
  name: 'home',
  computed: {
    username () {
      return 'zzy'
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goExchangeCenter () {
      var _self = this
      _self.$store.commit('changeTabActiveIndex', 1)
      _self.$router.push({ name: 'exchangeCenter' })
    }
  },
  mounted: function () {}
}
</script>
