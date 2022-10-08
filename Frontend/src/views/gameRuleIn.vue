<template>
  <div class="gameRuleIn">
    <img alt="Vue logo" :src="this.$store.getters.getUrlStr">
    <div class="code" @click="goPage('userCode')"></div>
  </div>
</template>
<style scoped lang="scss">
.gameRuleIn{
  img {
    width: 100%;
  }
  .code{
    position: absolute;
    height: 100px;
    width: 40px;
    top:330px;
    right: 10px;
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
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    }
  },
  mounted: function () {

  }
}
</script>
