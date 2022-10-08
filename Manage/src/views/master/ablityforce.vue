<template>
    <div class="ablity-force-container">
        <!--<vue-waterfall-easy :imgsArr="images1"></vue-waterfall-easy>-->
        <viewer  :images="images"
        class="viewer"
        ref="viewer"
        >
            <div v-for="(item,index) in tabledata.faces">
                <img  :src="'/' + taskPrefix + item.hitSources.image_local" >
                <span>{{index+1}}/{{total}}</span>
            </div>

            <div class="tabledata-null" v-if="tabledata.faces && tabledata.faces.length === 0">
                暂无数据
            </div>

        </viewer>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagenum"
                    :page-size="10"
                    layout="total,sizes, prev, pager, next"
                    :total="total"
                    background
            >
            </el-pagination>
        </div>

    </div>


</template>

<script>
  import VueWaterfallEasy from 'vue-waterfall-easy'
  import {getChildTaskDetails} from '@/apis/data'
  import images3 from '@/assets/images/image1.png'
  import images1 from '@/assets/images/image3.png'
  import images2 from '@/assets/images/ku-img.png'

  export default {
    name: "Ablityforce",
    components: {
      VueWaterfallEasy
    },
    data() {
      return {
        $viewer:'',
        isShow:false,
        // images:[images3,images1,images2,images3,images1,images2,images1,images2,images1,images2,images3,images1,images2,images3,images1,images2,],
        total: 0,
        pagesize: 10, //条数
        pagenum: 1,
        tabledata:'',
        taskPrefix: ''
      }
    },
    props: {
      tablelist: {},
      taskid:'',
      taskname:'',
      taskUrL:'',
      tabList: '',
      tabItem: ''
    },
    computed: {
      images: function() {
        let list = [];
        this.tabledata && this.tabledata.faces.forEach(element => {
          list.push(element.hitSources.image_local)
        });
        return list
      }
    },
    created() {
      const self = this;
      this.getChildTaskDetails()
      
    },
    methods:{
      getChildTaskDetails(){
        var self=this;
        const childparams={
          // task_name:this.taskname,
          task_name:this.taskname,
          pagesize: this.pagesize, //条数
          pagenum: this.pagenum,
          service_code : this.tabItem.servicecode
        }
        const urlObj = {
          '02': 'armyprotector', // 鉴军
          '03': 'peacepigeon', // 鉴暴恐
        }
        this.taskPrefix = urlObj[this.tabItem.servicecode];
        getChildTaskDetails(urlObj[this.tabItem.servicecode],childparams).then(res => {
          if(res.data.code === '0'){
            this.tabledata=res.data.data
            this.total=res.data.data.total
          }else{
            this.tabledata= {
              faces: [],
              total: 0
            }
            this.total=0
          }
        })
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.getChildTaskDetails()
      },
      handleCurrentChange(val) {
        this.pagenum = val;
        this.getChildTaskDetails()
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
    .ablity-force-container {
        padding: 24px;
        .viewer{
            /* height: calc(100vh - 310px); */
            height: calc(100vh - 386px);
            overflow-y: scroll;
            &>div{
                display: inline-block;
                position: relative;
                margin: 10px;
                border-radius: 2px 2px 2px 2px;
                img{
                    width: 212px;
                    height: 174px;
                    background-color: rgba(240, 242, 247, 1);
                }
                span{
                    position: absolute;
                    right: 0px;
                    background-color: rgba(238, 172, 29, 1);
                    bottom: 3px;
                    display: inline-block;
                    border-radius: 9px 0px 0px 9px;
                    padding: 2px 4px;
                }
            }
        }
    }



</style>