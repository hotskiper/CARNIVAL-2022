<template>
    <div class="master-detail-container">
        <div class="head-tab" >
            <router-link :to="{name:routename}">
                <span class="color-gray" >{{routemeta}}</span>
            </router-link>
            <span class="color-black"> >  {{taskdetail.taskname}}</span>
        </div>
        <div class="head-info">
            <div class="head-per flex">
                <span class="font-point">{{taskdetail.taskname}}</span>
                <span :class='"status status-"+taskdetail.taskstatus'>{{taskstatus}}</span>
            </div>
            <div class="head-per padd-top-bot-16">
                <span class="color-gray">创建时间：</span>
                <span class="color-black">{{taskdetail.createtime}}</span>
            </div>
            <div class="head-per">
                <span class="color-gray">执行计时：</span>
                <span class="color-black">{{taskdetail.spendtime}}</span>
            </div>
            <el-button type="primary" size="mini" class="posi-right" v-show="routemeta == '执行结束'" @click="exportTask">导出结果</el-button>
        </div>
        <tab-bar :tabList="taskdetail.taskchild || []" :taskid="taskid" :taskname="taskname"></tab-bar>
        <div>

        </div>
    </div>

</template>

<script>
  import TabBar from './components/TabBar.vue'
  import {requsetTaskdetail,exporttask} from '@/apis/data'

  const statusMap = ['异常','新建','执行中','暂停','终止','完成'];

  export default {
    name: "MasterDetail",
    data() {
      return {
        taskid: '',
        taskname:'',
        routename:'',
        routemeta:'',
        tabList:{
          tabinfo:[
            {
              meta:'重点人布控',
              count:20,
              component:'keyperson',
              focus:true,
            },
            {
              meta:'图片溯源',
              count:20,
              component:'test2'
            },
            {
              meta:'鉴黄',
              count:20,
              component:'ablityforce'
            },
            {
              meta:'鉴暴恐',
              count:20,
              component:''
            },
          ],
        },
        taskdetail: {},
        taskUrl:''

      }
    },
    components: {
      TabBar
    },

    computed: {
        taskstatus() {
            return statusMap[this.taskdetail.taskstatus]
        }
    },

    mounted() {
      this.taskid = this.$route.params.taskid || this.$route.query.taskid
      this.taskname = this.$route.params.taskname || this.$route.query.taskname
      this.routename = this.$route.params.routename
      this.routemeta = this.$route.params.routemeta
      const param = {
        taskid: this.taskid
      }
      requsetTaskdetail(param).then(res => {
        this.taskdetail = res.data.data
      })

    },
    methods:{
      handleLink(){
      },
      exportTask(){
        // this.taskid='61c1b1e1-17d3-4830-baca-4972143a65e7'
        window.open('/ailab/minibox/exportTask?taskid='+this.taskid)
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .master-detail-container{
        font-size: 14px;
        .head-tab {
            height: 48px;
            background-color: rgba(255, 255, 255, 1);
            border-bottom: 1px solid rgba(207, 214, 228, 1);
            line-height: 48px;
            padding-left: 24px;
        }
        .color-gray{
            color: #999999;
        }
        .color-black{
            color: #5a5e66;
        }
        .flex{
            display: flex;
            align-items: center;
        }

        .head-info {
            padding: 24px;
            border-bottom: 1px solid #cfd6e4;
            position: relative;
            .head-per{
                .font-point{
                    font-size: 24px;
                    font-weight: 600;
                    color: #333333;
                }
                .status{
                    background-color: #F53B3B;
                    padding: 3px 8px;
                    border-radius: 11px;
                    color: #fff;
                    margin-left: 10px;
                }
                .status-1{
                    background-color: rgba(45, 201, 111, 1);
                }
                .status-2{
                    background-color: rgba(45, 201, 111, 1);
                }
                .status-5{
                    background-color: #2985f7;
                }
                span{
                    &:last-child{
                        padding-left: 8px;
                    }
                }
            }
        }
        .posi-right{
            position: absolute;
            right: 24px;
            top: 60px;
        }
        .padd-top-bot-16{
            padding: 16px 0px;
        }
        /deep/.viewer-prev{
            display: none;
        }
    }



</style>