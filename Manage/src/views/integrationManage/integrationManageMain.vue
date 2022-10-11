<template>
    <div class="one-screen-module">
        <div class="main-page" v-if="showMainPage">
               <div class="mess-operate">
                    <el-row>
                        <!-- <el-button type="primary" @click="showAllData()">{{isShowAllData?'分页展示':'展示全部'}}</el-button> -->
                        <div class="search-container">
                            <el-input
                                placeholder="请输入关键词"
                                prefix-icon="el-icon-search"
                                v-model="intSearchKey">
                            </el-input>
                        </div>
                    
                    </el-row>
                </div>
                <div class="table-container">
                        <el-table 
                                :data="tableData"
                                stripe
                                style="width: 100%"
                                sortable
                                :max-height="tableheight"
                                @selection-change="handleSelectionChange"
                        >
                            <!-- <el-table-column
                                    prop="name"
                                    label="姓名"
                                    sortable
                                >
                            </el-table-column> -->
                            <el-table-column
                                    prop="cardNumber"
                                    label="工号"
                                >
                            </el-table-column>
                            <el-table-column
                                    prop="allScore"
                                    label="碎片总量"
                                >
                            </el-table-column>
                            <el-table-column
                                    prop="fragment1_quantity"
                                    label="伏羲碎片"
                                >
                            </el-table-column>
                            <el-table-column
                                    prop="fragment2_quantity"
                                    label="盘古碎片"
                                >
                            </el-table-column>
                            <el-table-column
                                    prop="fragment3_quantity"
                                    label="淘沙碎片"
                                >
                            </el-table-column>
                            <el-table-column
                                    prop="fragment4_quantity"
                                    label="BOSS碎片"
                                >
                            </el-table-column>
                            <el-table-column
                                    prop="fragment5_quantity"
                                    label="ACE碎片"
                                >
                            </el-table-column>
                            <el-table-column
                                    prop="fragment6_quantity"
                                    label="星空人碎片"
                                >
                            </el-table-column>

                            <!-- <el-table-column
                                    prop="exchange"
                                    label="是否兑换"
                                    sortable
                                    :filters="[{text: '是', value: 1}, {text: '否', value: 0}]"
                                    :filter-method="filterHandler"
                                >
                                <template slot-scope="scope">{{ scope.row.exchange === 0 ? '否':'是' }}</template>   
                            </el-table-column>

                            <el-table-column
                                    prop="consumption"
                                    label="消耗积分"
                                    sortable
                                >
                            </el-table-column> -->

                            <!-- <el-table-column
                                    prop="left"
                                    label="剩余积分"
                                    sortable
                                >
                                <template slot-scope="scope">{{ scope.row.allScore - scope.row.consumption }}</template>   
                            </el-table-column>

                            <el-table-column
                                    prop="exchangeTime"
                                    label="兑换时间"
                                    sortable
                                >
                            </el-table-column> -->

                            <!-- <el-table-column
                                    label="操作"
                                >
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="intDetail(scope.row)">详情</el-button>
                                </template>
                            </el-table-column> -->
                    </el-table>
                </div>
                <div class="pagination" v-show="!isShowAllData">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="10"
                            layout="total,sizes, prev, pager, next"
                            :total="count"
                            background
                    >
                    </el-pagination>
                </div>
        </div>
        <div class="detail-container" v-else>
             <div class="detail-bread">
                  <span class="home-title" @click="showMainPage = true">积分管理 /  </span>
                  <span class="child-title">{{curId}}积分详情</span>
             </div>
             <div class="detail-card">
                  <div class="detail-kind" v-for="(item, index) in detailData">
                       <div class="detail-title">{{item.type}}</div>
                       <div class="int-layout">
                            <div class="game-int" v-for="(game, gameIndex) in item.data">
                                 <span class="game-name">{{game.game}}</span>
                                 <span class="game-score">{{game.score}}</span>
                            </div>
                       </div>
                       <div class="total-score">
                            <div class="score-block">
                                 <span class="game-name">总积分</span>
                                 <span class="game-score">{{getTotalScore(item.data)}}</span>
                            </div>
                          
                       </div>
                  </div>
             </div>
        </div>
       

         
    </div>
</template>

<script>
import cookie from '../../utils/cookie.js'
import {getIntData,getOrderData,getIntDetail,checkLogin} from '../../apis/data.js'
import { debug } from 'util';
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
             if(!value){
                return callback(new Error('用户名不能为空'))
            }else{
                callback();
            }
        }
        var validatePassword = (rule, value, callback) => {
            if(!value){
                return callback(new Error('密码不能为空'))
            }else{
                callback();
            }
        }
        return {
            showMainPage: true,
            curId: "x5500",
            labelWidth: '80px',
            ruleForm: {
                username: "",
                password: ""
            },
            isCheck: false,
            rules: {
                username: [
                    {
                        validator: validateUsername, trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: validatePassword, trigger: 'blur'
                    }
                ]
            },
            intSearchKey: "",
            fullscreenLoading: false,
            tableheight: 700,
            currentPage: 1, //当前页
            count: 0,    //总量
            pagesize: 10,   //条数
            pagenum: 1,     //页数,
            originTableData: [],
            tableData: [],
            isShowEmpty: false,
            detailData: [],
            isShowAllData: false,
        }
    },
    watch: {
        intSearchKey: function(val, oldVal){
            if(val === "") {
            //    this.tableData = this.originTableData
               this.count = this.originTableData.length
               this.handleCurrentChange(this.pagenum);
               return 
            }
            let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
            this.tableData = oldTableData.filter( item => (~item.cardNumber.indexOf(val) ||  ~item.name.indexOf(val) || ~item.exchangeTime.indexOf(val)));
            this.count = this.tableData.length
        }
    },
    created() {
      this.getIntList();
    },
    methods: {
        showAllData() {
           this.isShowAllData = !this.isShowAllData
           if(this.isShowAllData) {
              this.tableData = this.originTableData
           }else{
              let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
              this.tableData = oldTableData.splice(0, this.pagesize)
           }
         
        },
        handleSelectionChange() {

        },
        filterHandler(value, row, column) {
            return row.exchange === value;
        },
        getIntList() {
            let _this = this;
            // checkLogin().then(res=> {
            this.getUserOrderData().then((arrItem)=> {
                const param = {
                    page_size: this.pagesize,
                    page_number: this.pagenum
                }
                _this.userOrderData = arrItem
                 getIntData(param).then(res => {
                    if (Number(res.data.status_code) === 200) {
                        if (res.data.data.length === 0) {
                            this.isShowEmpty = true;
                        }
                        // debugger
                        this.count = res.data.data.length;
                        let dataObj = [];
                        res.data.data.forEach((item)=> {
                            let rowData = item;
                            // rowData.name = ''
                            // rowData.exchangeTime = ''
                            rowData.cardNumber = item.user_id
                            rowData.allScore = item.fragment1_quantity + item.fragment2_quantity + item.fragment3_quantity + item.fragment4_quantity + item.fragment5_quantity + item.fragment6_quantity
                            // rowData.left
                            _this.userOrderData.forEach((obj)=> {
                                if(item.user_id === obj._id) {
                                    rowData.name = obj.name
                                    rowData.exchangeTime = obj.create_time
                                    rowData.consumption = obj.consumption
                                }
                            })
                            dataObj.push(rowData)
                        })
                       this.isShowLoading = false
                       this.originTableData = dataObj
                       
                        
                        // this.count = res.data.data.length;
                        // var leftAll = 0, onlineAll=0, underlineAll=0, consumeAll=0;
                        // res.data.data.forEach((item)=> {
                        //     item.allScore = item.onlineScore + item.underTheLineScore
                        // })
                       
                        // this.isShowLoading = false
                        
                        // this.originTableData = res.data.data
                        // this.originTableData.forEach((item)=>{
                        //     var left = item.underTheLineScore + item.onlineScore - item.consumption
                        //     leftAll = leftAll + left
                        //     onlineAll = onlineAll + item.onlineScore
                        //     underlineAll = underlineAll + item.underTheLineScore
                        //     consumeAll = consumeAll + item.consumption
                        // }) 
                        // console.log('剩余积分总数：', leftAll)
                        // console.log('线上积分总数：', onlineAll)
                        // console.log('线下积分总数：', underlineAll)
                        // console.log('消耗积分总数：', consumeAll)

                        // console.log('剩余积分平均（共2700人）：', leftAll/2700)
                        // console.log('线上积分总数（共2700人）：', onlineAll/2700)
                        // console.log('线下积分总数（共2700人）：', underlineAll/2700)
                        // console.log('消耗积分总数（共2700人）：', consumeAll/2700)
                        let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
                        this.tableData = oldTableData.splice(0, this.pagesize)
                    }

                })
            })
           
        },
        getUserOrderData() {
            let _this = this;
            return new Promise(function(resolve, reject){
                const param = {
                    page_size: _this.pagesize,
                    page_number: _this.pagenum
                }
                getOrderData(param).then(res => {
                    if (Number(res.data.status_code) === 200) {
                        let dataObj = []
                        res.data.data.forEach((item)=> {
                                let itemData = {};
                                itemData.name = item.user_name
                                itemData._id = item.user_id
                                itemData.consumption = item.total_amount
                                itemData.create_time = item.create_time
                                dataObj.push(itemData)
                        })
                        resolve(dataObj);
                    }else{
                        reject(res)
                    }

                })
            })
           
        },
        
        handleSizeChange(val) {
            let _this = this;
            this.pagesize = val
            // this.getCreateTaskList()
            setTimeout(function() {
                let maxPageNum = _this.count % _this.pagesize === 0 ? parseInt(_this.count / _this.pagesize) : parseInt(_this.count / _this.pagesize) + 1;
                let oldTableData = JSON.parse(JSON.stringify(_this.originTableData));
                if(_this.pagenum < maxPageNum) {
                    _this.tableData = oldTableData.splice(_this.pagesize * (_this.pagenum - 1), _this.pagesize)
                }else{
                    _this.tableData = oldTableData.splice(_this.pagesize * (_this.pagenum - 1), _this.count - _this.pagesize * (_this.pagenum - 1)) 
                }
            }, 0)
           
        },
        handleCurrentChange(val) {
            this.pagenum = val;
            let maxPageNum = this.count % this.pagesize === 0 ? parseInt(this.count / this.pagesize) : parseInt(this.count / this.pagesize) + 1;
            let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
            if(this.pagenum < maxPageNum) {
                this.tableData = oldTableData.splice(this.pagesize * (this.pagenum - 1), this.pagesize)
            }else{
                this.tableData = oldTableData.splice(this.pagesize * (this.pagenum - 1), this.count - this.pagesize * (this.pagenum - 1)) 
            }
            // this.getCreateTaskList()
        },
        intDetail(rowData) {
            this.curId = rowData.id
            this.showMainPage = false
            getIntDetail().then(res => {
                if (Number(res.data.code) === 0) {
                    this.detailData = res.data.data
                }

            })
        },
        getTotalScore(scoreObj) {
           let sum = 0;
           scoreObj.forEach((item) => {
               sum += item.score
           })
           return sum;
        } 
    },
    mounted() {
        let self = this;
        document.addEventListener('keydown', function(e){
            if(e.keyCode === 13){
                
            }
        })
      
    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .one-screen-module {
        height: calc(100% - 64px);
        margin: 24px 24px 0 24px;
        background: #fff;
        border-radius: 3px;
        padding: 36px 16px 12px 16px;
        color: #606266;
    }
    .mess-operate {
        margin-bottom: 16px;
        .search-container {
            width: 300px;
            display: inline-block;
            float: right ;
        }
    }
    .detail-container {
        height: 100%;
        margin-top: -36px;
        .detail-bread {
            margin-bottom: 24px;
            >span {
                vertical-align: top;
                height: 48px;
                line-height: 48px;
                display: inline-block;
            }
            .home-title {
                cursor: pointer;
            }
            .child-title {
                margin-left: 8px;
            }
        }
    }
    .detail-kind {
        margin-bottom: 24px;
        .detail-title {
            height: 48px;
            line-height: 48px;
            font-weight: bold;
        }
        .int-layout {
           .game-int {
               display: inline-block;
               width: 25%;
               padding: 12px 0 12px 24px;
           }

        }
        .total-score {
            border-top: 1px solid #cfd6e4;
            padding-top: 8px;
         
            .score-block {
                padding-left: 24px;
                width: 25%;
                float: right;
            }
        }
        .game-name {
            color: #a2aabb;
            display: inline-block;
            width: 150px;
        }
        .game-score {

        }
    }
</style>
