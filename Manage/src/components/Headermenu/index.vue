<template>
  <div class="app-headermenu" v-if="routes.length > 0" ref="headermenu" :class="tabshow">
    <div class="headermenu-item" v-for="(item, index) in routes" :key="index" :class="$route.name === item.name ? 'active' : ''">
      <a @click.prevent="handleLink(item)">
        <span>{{item.meta && item.meta.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      levelList: null,
      tabshow:'',
    }
  },
  computed: {
    routes() {
      var self = this;
      var option = this.$router.options.routes.find((item) => {
        return item.name === self.$route.path.split('/')[1]
      })
      var tabs = option && option.children.filter((item) => {
        return item.tab
      })
      return tabs || []
    }
  },
  methods: {
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-headermenu {
    display: inline-block;
    font-size: 14px;
    line-height: 48px;
    width: 100%;
    border-bottom: solid 1px #cfd6ed;
    padding-left: 24px;
    /* margin-left: 10px; */
    .headermenu-item {
      display: inline-block;
      color: #97a8be;
      cursor: pointer;
      font-size: 16px;
      // padding: 0 16px;
      >a {
        height: 100%;
        display: inline-block;
        padding: 0 16px;
      }
      &.active {
        /* background: #1f2d3d; */
        color: #2985f7;
        border-bottom: solid 2px #2985f7;
      }
    }
  }
</style>
