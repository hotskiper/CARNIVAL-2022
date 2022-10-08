<template>
    <div>
        <div class="nav-detail-tab" v-if="tabList.length > 0">
            <div class="headermenu-item" v-for="(item, index) in tabList" :key="index"
                 v-bind:class="item.servicecode === listshow ? 'active' : ''">
                <a @click.prevent="handleLink(item)">
                    <span>{{item.servicename}}{{item.childtotal ? '('+item.childtotal+')' : ''}}</span>
                </a>
            </div>
        </div>
        <div class="child-list">
            <div v-if="listshow == '01'" class="per-box">
                <!--<div class="key-person-container">-->
                    <!--<iframe src="../../../html/keyperson.html" height="400px" width="1000px" ref="iframe"></iframe>-->
                <!--</div>-->

                <key-person :key="listshow" :taskid="taskid" :taskname="taskname" :tabList="tabList" :tabItem="tabItem"></key-person>
            </div>
            <div v-else-if="listshow == '02'">
                <ablity-force :key="listshow" :taskid="taskid" :taskname="taskname" :tabList="tabList" :tabItem="tabItem"></ablity-force>
            </div>
            <div v-else-if="listshow == '03'">
                <ablity-force :key="listshow" :taskid="taskid" :taskname="taskname" :tabList="tabList" :tabItem="tabItem"></ablity-force>
            </div>
        </div>
    </div>

</template>

<script>
  import KeyPerson from '../keyperson'
  import AblityForce from '../ablityforce'
  export default {
    name: "TabBar",
    data() {
      return {
        listshow: this.tabList.length > 0 ? this.tabList[0].servicecode : '',
        currentPage: 1,
        offset: 0,
        limit: 10,
        count: 1000,
        pagesize: 10, //条数
        pagenum: 1,
        taskgroupInfo:{},
        // reportUrl:'../../html/keyperson.html'
      }
    },

    computed: {
        tabItem: function() {
            return this.tabList.find(item => {
                return item.servicecode === this.listshow
            })
        }
    },
    props: {
      tabList: '',
      taskid:'',
      taskname:''
    },
    components: {
      KeyPerson,
      AblityForce
    },

    methods: {
      handleLink(item) {
        this.listshow = item.servicecode
      }
    },
    watch:{
      tabList:function (val,oldval) {
        val.length > 0 ? this.listshow = val[0].servicecode:''
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .nav-detail-tab {
        display: inline-block;
        font-size: 14px;
        line-height: 48px;
        width: 100%;
        border-bottom: solid 1px #cfd6ed;
        padding-left: 24px;
        .headermenu-item {
            display: inline-block;
            color: #97a8be;
            cursor: pointer;
            font-size: 16px;
            a {
                height: 100%;
                display: inline-block;
                padding: 0 16px;
            }
            &.active {
                color: #2985f7;
                border-bottom: solid 2px #2985f7;
            }
        }
    }
    .per-box{
        height:calc(100vh - 286px);
        overflow-y: scroll;
    }
    .key-person-container{
        background: pink;
    }
</style>