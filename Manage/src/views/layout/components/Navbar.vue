<template>
  <div class="navbar">
    <div class="avatar-container">
      <div class="user-logstatus logout" @click="loginout">
        <img src="../../../assets/images/logout1.png">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Headermenu from '@/components/Headermenu'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Headermenu
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    loginout(){
      localStorage.mtoken = '';
      this.$router.push('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  display: flex;
  align-items: center;
  background-color: #fff;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 0;
    .user-logstatus {
      vertical-align: top;
      line-height: 52px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0;
      background-color: #fff;
      color: #333;
      padding: 8px 16px 0;
      cursor: pointer;
      img {
        width: 20px;
      }
    }
  }
}
</style>

