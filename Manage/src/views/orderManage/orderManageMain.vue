<template>
    <div class="one-screen-module">
         <div class="mess-operate">
            <el-row>
                <!-- <el-button type="primary" @click="showAllData()">{{isShowAllData?'分页展示':'展示全部'}}</el-button> -->
                <div class="search-container">
                    <el-input
                        placeholder="请输入关键词"
                        prefix-icon="el-icon-search"
                        v-model="orderSearchKey">
                    </el-input>
                </div>
              
            </el-row>
         </div>
         <div class="table-container">
                <el-table 
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        :default-sort="{prop:'exchangeCount',order:'descending'}"
                        :max-height="tableheight"
                         @selection-change="handleSelectionChange"
                >·
                   <el-table-column
                        type="selection"
                        width="55px"
                        sortable
                        >
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="姓名"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="userCardNumber"
                            label="工号"
                           >
                    </el-table-column>
                   
                    <el-table-column
                            prop="exchangeNumber"
                            label="兑换礼品数量"
                           >
                           <template slot-scope="scope" >
                                {{scope.row.exchangeNumber}}
                            </template>
                    </el-table-column>

                     <el-table-column
                            prop="costInt"
                            label="消耗积分"
                           >
                    </el-table-column>

                      <el-table-column
                            prop="position"
                            label="收货地"
                           >
                    </el-table-column>

                    <el-table-column
                            prop="timeStr"
                            label="创建时间"
                           >
                    </el-table-column>
            </el-table>
         </div>
         <div class="pagination" v-show="!isShowAllData">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total,sizes, prev, pager, next"
                    :total="count"
                    background
            >
            </el-pagination>
        </div>

         
    </div>
</template>

<script>
import cookie from '../../utils/cookie.js'
import constant from '../../utils/constant.js'
import {getGoodsData, getOrderData} from '../../apis/data.js'
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
            orderSearchKey: "",
            fullscreenLoading: false,
            tableheight: 700,
            currentPage: 1, //当前页
            count: 0,    //总量
            pagesize: 10,   //条数
            pagenum: 1,     //页数,
            originTableData: [],
            tableData: [],
            isShowEmpty: false,
            goodsPriceMap: [],
            isShowAllData: false,
            
        }
    },
    created() {
      this.getOrderList();
    },
    watch: {
        orderSearchKey: function(val, oldVal){
            
               this.getOrderList();
            
        }
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
        getOrderList() {
            // let _this = this;
            const param = {
                page_size: this.pagesize,
                page_number: this.pagenum
            }
            if(this.orderSearchKey){param.user_id = this.orderSearchKey}
            getOrderData(param).then(res => {
                if (Number(res.data.status_code) === 200) {
                    if (res.data.data.length === 0) {
                        this.isShowEmpty = true;
                    }
                    this.count = res.data.data.total_count;
                    this.isShowLoading = false
                    let dataObj = [];
                    res.data.data.data.forEach((item)=> {
                        let rowData = item;
                        rowData.userName = item.user_name
                        rowData.userCardNumber = item.user_id
                        rowData.costInt = item.total_amount
                        rowData.exchangeNumber = item.all_count
                        rowData.position = item.address
                        rowData.timeStr = item.create_time
                        dataObj.push(item)
                    })
                    var leftAll = 0;
                    
                    this.originTableData = dataObj
                    let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
                    this.tableData = oldTableData.splice(0, this.pagesize)
                }
            })


            // this.getGoodsPriceMap().then((mapArr)=> {
            //     _this.goodsPriceMap = mapArr
            //     console.log('mapArr===', mapArr)
            //     getOrderData().then(res => {
            //         if (Number(res.data.status) === 200) {
            //                 if (res.data.data.length === 0) {
            //                     this.isShowEmpty = true;
            //                 }
            //                 console.log('orderData===',res.data.data)
            //                 this.count = res.data.data.length;
            //                 this.isShowLoading = false
            //                 let dataObj = [];
            //                 res.data.data.forEach((item)=> {
            //                     item.costInt = 0
            //                     item.exchangeNumber = 0
            //                     item.itemList.forEach((good)=> {
            //                          _this.goodsPriceMap.forEach((obj)=> {
            //                             if(good.id === obj._id && good.typeIndex === obj.typeIndex) {
            //                                 item.costInt += obj.price * good.number
            //                                 item.exchangeNumber += good.number
            //                             }
            //                         })
            //                     })
            //                     dataObj.push(item)
            //                 })
            //                 var leftAll = 0;
                           
            //                 this.originTableData = dataObj
            //                 let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
            //                 this.tableData = oldTableData.splice(0, this.pagesize)
            //             }

            //         })
            // })
           
        },
        // getGoodsPriceMap() {
        //     return new Promise(function(resolve, reject){
        //         getGoodsData().then(res => {
        //             if (Number(res.data.status) === 200) {
        //                 let dataObj = []
        //                 let tempRes = res.data.data;
        //                 tempRes.forEach((goodItem)=> {
        //                     if(goodItem.typeList && goodItem.typeList.length > 0) {
        //                         goodItem.typeList.forEach((typeItem)=> {
        //                             let itemData = {};
        //                             itemData._id       = goodItem._id
        //                             itemData.typeIndex = typeItem.typeIndex
        //                             itemData.price     = typeItem.price
        //                             dataObj.push(itemData)
        //                         })
        //                     }else{
        //                     //
        //                     }
                            
        //                 })
        //                 resolve(dataObj);
        //             }else{
        //                 reject(res)
        //             }

        //         })
        //     })
           
        // },
        handleSizeChange(val) {
            this.pagesize = val
            this.getOrderList();

        },
        handleCurrentChange(val) {
            this.pagenum = val;
            this.getOrderList();
        },
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
        padding: 26px 16px 12px 16px;
    }
    .mess-operate {
        margin-bottom: 16px;
        .search-container {
            width: 300px;
            display: inline-block;
            float: right ;
        }
    }
</style>
