<template>
    <div>
        <viewer
                class="viewer"
                ref="viewer"
                :images="images"
        >
            <div class="key-person-container">

                <div class="key-per-box" v-for="(item,index) in tabledata.faces">
                    <div class="img-box flex-between">
                        <div>
                            <img :src="'/'+taskPrefix + item.hitSources.image_local">
                            <span class="border-info bordre-yellow">中</span>
                        </div>

                        <span class="flex-column-center key-per-info">
                            <span class="red-point">{{item.hitBaseSources.source.similarity}}</span>
                            <div class="arrow-img"></div>
                            <span class="gray-usual">匹配度</span>
                        </span>
                        <div>
                            <img :src="'/'+taskPrefix + item.hitBaseSources.info.file_path">
                            <span class="border-info bordre-blue">库</span>
                        </div>

                    </div>
                    <div class="line-gray"></div>
                    <div class="info-box">
                        <div>
                            <div class="black-point">图片描述：</div>
                            <p class="gray-usual limit3">{{item.hitBaseSources.info.file_info}}</p>
                        </div>
                        <div>
                            <div class="black-point">所属特征库：</div>
                            <p class="gray-usual"> {{item.hitBaseSources.info.group_name}}</p>
                        </div>

                    </div>
                </div>

                <div class="tabledata-null" v-if="tabledata.faces && tabledata.faces.length === 0">
                    暂无数据
                </div>

            </div>
        </viewer>
        <div class="pagination fixed-posi">
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
  import {getChildTaskDetails} from '@/apis/data'

  export default {
    name: "Keyperson",
    data() {
      return {
        total: 0,
        pagesize: 10, //条数
        pagenum: 1,
        tabledata:'',
        taskPrefix: '',
        taskUrL:this.tabList.length > 0 ? this.tabList[0].childurl : ''
      }
    },
    props: {
      taskid:'',
      taskname:'',
      tabList:'',
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
    mounted() {
        this.getChildTaskDetails()
    },
    methods: {
      getChildTaskDetails(){
        var self=this;
        const childparams={
          // task_name:this.taskname,
          task_name:this.taskname,
          pagesize: this.pagesize, //条数
          pagenum: this.pagenum,
          service_code :'01'
        }
        const urlObj = {
          '01': 'facepredator', // 重点人
        }
        this.taskPrefix = urlObj[this.tabItem.servicecode];
        getChildTaskDetails(urlObj[this.tabItem.servicecode],childparams).then(res => {
          if(res.data.code == '0'){
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
    },
    watch:{
      tabList:function (val,oldval) {
        val.length > 0 ? this.taskUrL =  val[0].childurl:''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .key-person-container {
        display: flex;
        flex-wrap: wrap;
        padding-top: 24px;
        .key-per-box {
            width: calc((100% - 90px) / 3);
            height: 380px;
            background-color: rgba(240, 242, 247, 1);
            padding: 26px 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            cursor: pointer;
            transition: all .4s;
            box-shadow: none;
            position: relative;
            margin: 0px 0px 24px 24px;

            &:hover {
                background-color: rgba(233, 243, 254, 1);
                box-shadow: 0px 2px 8px 0px rgba(6, 0, 1, 0.15);
                &:before {
                    content: '';
                    border: solid 1px #7bb2f6;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                }
            }

        }
        .img-box {
            .key-per-info {
                img {
                    margin: 5px 0px;
                    
                }
            }
            & > div {
                position: relative;
                width: 112px;
                height: 112px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }

        }
        .flex-between {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .flex-column-center {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .red-point {
            font-size: 24px;
            color: #f61616;
            font-weight: bold;
        }
        .gray-usual {
            color: #b0bfd0;
        }
        .black-point {
            color: #4c4c4c;
            font-weight: bold;
        }

        .limit3 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .info-box {
            p {
                margin: 6px 0px;
            }
            & > div {
                &:first-child {
                    margin-bottom: 24px;
                }
            }

        }
        .line-gray {
            border-bottom: 1px dashed rgba(162, 170, 187, 1);
            position: relative;
            margin: 24px -30px;
            &:before, &:after {
                content: '';
                width: 16px;
                height: 16px;
                background: #fff;
                display: block;
                border-radius: 8px;
            }
            &:before {
                position: absolute;
                top: -6px;
                left: -8px;
            }
            &:after {
                position: absolute;
                top: -6px;
                right: -8px;
            }
        }
        .border-info {
            width: 27px;
            height: 20px;
            border-radius: 0px 9px 9px 0px;
            color: #fff;
            position: absolute;
            left: 0;
            line-height: 20px;
            padding-left: 5px;
        }
        .bordre-yellow {
            background-color: rgba(238, 172, 29, 1);
        }
        .bordre-blue {
            background-color: rgba(93, 160, 242, 1);
        }
    }

    .fixed-posi {
        padding: 0 20px;
        position: fixed;
        bottom: 16px;
        background: #fff;
        width: calc(100vw - 240px);
    }

    .viewer-next, .viewer-prev {
        display: none !important;
    }

    .arrow-img {
        height: 7px;
        width: 83px;
        background: url("../../assets/images/arrow.png") no-repeat;
    }


</style>