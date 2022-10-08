<template>
  <section class="app-main">
    <sidebar class="sidebar-container"/>
    <div class="main-content">
      <navbar/>
      <div v-show="getcloseheadPop">
        <headermenu  />
      </div>
      <transition name="fade-transform" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </section>
</template>

<script>
import { Sidebar, Navbar } from './index.js'
import Headermenu from '@/components/Headermenu'

export default {
  name: 'pAppMain',
  components: {
    Sidebar,
    Navbar,
    Headermenu
  },
  data(){
    return{
      isheadmenuShow:true
    }
  },
  computed: {
    getcloseheadPop() {
      this.$route.name == 'MasterDetail' ? this.isheadmenuShow = false : this.isheadmenuShow = true
      return this.isheadmenuShow
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  height:100vh;
  position: relative;
  overflow: hidden;
  
  .main-content {
    /*82 = navbar + margin  */
    /* height: calc(100vh - 92px); */
    height: 100%;
    background: #fff;
    position: relative;
    overflow: hidden;
    margin: 0 0 0 240px;
    padding: 0;
    background: #f2f2f2;
  }
}
</style>
