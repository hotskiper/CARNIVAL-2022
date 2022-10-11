<template>
  <div class="scrollbar-wrapper" >
    <div class="logo">
        <img src="../../../../assets/images/carnival_logo.png" alt="">
        <div class="name">嘉年华订单管理</div>
    </div>
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.subMenuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      menus: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      const index = this.$router.options.routes.findIndex((item) => {
        return item.name === 'gallery'
      })
      
      let list = [...this.$router.options.routes]
      list[index].menus = this.menus
      return list
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    const self = this
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .logo {
    background-color: rgb(48, 65, 86);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    img {
      width: 48px;
      margin-bottom: 9px;
    }
    .name {
      font-size: 22px;
      margin-left: 12px;
    }
  
  }
</style>


