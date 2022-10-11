<template>
    <div class="one-screen-module">
         <div class="mess-operate">
            <el-row>
                <!-- <el-button type="primary" @click="addRowInTbl()">增加行</el-button> -->
            </el-row>
         </div>
         <div class="table-container">
              <el-form  ref="ruleForm" :model="formModel">
                <el-table 
                        ref="filterGoodsTable"
                        :data="formModel.tableData"
                        stripe
                        style="width: 100%"
                        :default-sort="{prop:'goodsName',order:'descending'}"
                        :max-height="tableheight"
                >   
                  
                        <el-table-column
                                prop="name"
                                label="商品名称"
                                sortable
                                :filters="filterNameArr"
                                :filter-method="filterHandler"
                            >
                                <template slot-scope="scope">
                                          <el-form-item class="item-form" :prop="'tableData.' + scope.$index + '.name'" :rules="formModel.rules.name" v-if="scope.row.isEdit" style="padding-left: 0 !important;">
                                             <el-input  v-model="scope.row.name" placeholder="请输入商品名称"  style="padding-left: 0 !important;"></el-input>
                                          </el-form-item>
                                    <span v-else>{{scope.row.name}}</span>
                                </template>
                        </el-table-column>
                    
                        <el-table-column
                                prop="price"
                                label="价格"
                            >
                                <template slot-scope="scope">
                                     <el-form-item class="item-form" :prop="'tableData.' + scope.$index + '.name'" :rules="formModel.rules.name" v-if="scope.row.isEdit">
                                          <el-input  v-if="scope.row.isEdit" v-model="scope.row.prize_price" placeholder="请输入价格"></el-input>
                                    </el-form-item>
                                    <span v-else>{{scope.row.prize_price}}</span>
                                </template>
                        </el-table-column>

                        <el-table-column
                                prop="totalNumber"
                                label="商品库存"
                            >
                                <template slot-scope="scope">
                                     <el-form-item class="item-form" :prop="'tableData.' + scope.$index + '.name'" :rules="formModel.rules.name" v-if="scope.row.isEdit">
                                          <el-input   v-if="scope.row.isEdit" v-model="scope.row.prize_quantity" placeholder="请输入商品总量"></el-input>
                                    </el-form-item>
                                    <span v-else>{{scope.row.prize_quantity}}</span>
                                </template>
                        </el-table-column>

<!-- 
                        <el-table-column
                                prop="sellCount"
                                label="销量"
                            >
                        </el-table-column>

                        <el-table-column
                                prop="currentNumber"
                                label="库存量"
                            >
                        </el-table-column> -->

                        <el-table-column
                                label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button v-if="!scope.row.isEdit" type="text" size="small" @click="editGoods(scope.row)" >编辑</el-button>
                                <el-button v-if="!scope.row.isEdit" type="text" size="small" @click="deleteGoods(scope.row)">删除</el-button>
                                <el-button v-if="scope.row.isEdit" type="text" size="small" @click="saveGoods(scope.row)" >保存</el-button>
                                <el-button v-if="scope.row.isEdit" type="text" size="small" @click="cancelGoods(scope.row)">取消</el-button>
                            </template>
                        </el-table-column>
                </el-table>
              </el-form>
               
         </div>
         <div class="pagination">
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
</template>

<script>
import cookie from '../../utils/cookie.js'
import {getGoodsData, updateGoodsData} from '../../apis/data.js'
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
            fullscreenLoading: false,
            tableheight: 600,
            currentPage: 1, //当前页
            count: 1000,    //总量
            pagesize: 10,   //条数
            pagenum: 1,     //页数,
            isShowEmpty: false,
            filterNameArr: [],
            originTableData: [],
            formModel: {
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ]
                },
                tableData: [],

            }
          
        }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
        addRowInTbl() {
            this.formModel.tableData.unshift({
                isEdit: true,
                name: "",
                price: "",
                totalNumber: "",
                reserveNumber: "",
                sellCount: 0,
                currentNumber: "--"
            })
        },
        getGoodsList() {
            const param = {
                page_size: this.pagesize,
                page_number: this.pagenum
            }
            getGoodsData(param).then(res => {
                if (Number(res.data.status_code) === 200) {
                    if (res.data.data.length === 0) {
                        this.isShowEmpty = true;
                    }
                    this.isShowLoading = false
                    let dataObj = [], filterObj = [];
                    res.data.data.forEach((item)=> {
                                let rowData = item;
                                rowData.name = `${item.prize_name}`
                                // rowData.pId  = goodItem._id
                                // rowData.sellCount = item.prize_quantity
                                rowData.isEdit = false
                                dataObj.push(rowData)
                                filterObj.push({
                                    text: rowData.name,
                                    value: rowData.name
                                })
                    })
                    
                    // this.isShowLoading = false
                    // let tempRes = res.data.data;
                    // let dataObj = [], filterObj = [];
                    // tempRes.forEach((goodItem)=> {
                    //     if(goodItem.typeList && goodItem.typeList.length > 0) {
                    //         goodItem.typeList.forEach((typeItem)=> {
                    //             let rowData = typeItem;
                    //             rowData.name = `${goodItem.name}-${typeItem.name}`
                    //             rowData.pId  = goodItem._id
                    //             rowData.sellCount = typeItem.totalNumber - typeItem.currentNumber - typeItem.reserveNumber
                    //             rowData.isEdit = false
                    //             dataObj.push(rowData)
                    //             filterObj.push({
                    //                 text: rowData.name,
                    //                 value: rowData.name
                    //             })
                    //         })
                    //     }else{
                    //         goodItem.sellCount = 0
                    //         goodItem.isEdit = false
                    //         dataObj.push(goodItem)
                    //         filterObj.push({
                    //             text: dataObj.name,
                    //             value: dataObj.name
                    //         })
                    //     }
                       
                    // })
                    this.count = dataObj.length;
                    this.formModel.tableData = dataObj

                    this.originTableData = dataObj
                    console.log("商品数据===================", JSON.stringify(this.originTableData))
                    let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
                    this.tableData = oldTableData.splice(0, this.pagesize)

                    this.filterNameArr = filterObj
                }

            })
        },
        filterHandler(value, row, column) {
          return row.name === value;
        },
        editGoods(row) {
          
        },
        deleteGoods(row) {

        },
        saveGoods(row) {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    /**
                     * @desc 更新具体物品
                     * @param id 必填
                     * @param typeIndex 必填
                     * @param name 物品名
                     * @param totalNumber 商品总量
                     * @param reserveNumber 备品量
                     * @param currentNumber 库存量
                     * @param price 价格
                     * @param picBase64 商品图片base64
                     * @param describe 描述
                     * @param state 0-已删除 1-上架 2-下架
                     */
                   
                    // let param = {
                    //     id: this.getRandomCode(9),
                    //     typeIndex: "",
                    //     name:  this.formModel.tableData[0].name,
                    //     totalNumber: parseInt(this.formModel.tableData[0].totalNumber),
                    //     reserveNumber: parseInt(this.formModel.tableData[0].reserveNumber),
                    //     currentNumber: "",
                    //     price: parseInt(this.formModel.tableData[0].price),
                    //     picBase64: "",
                    //     describe: "",
                    //     // state: 1
                    // }
                    let param= {
                        prize_name: "拉杆箱",
                        prize_attr: "黑色",
                        quantity: 20
                    }
                    updateGoodsData(param).then(res=>{
                        debugger
                         if (Number(res.data.status_code) === 200) {
                            this.getGoodsList();
                         }else{
                            this.$message.error('保存失败！');
                         }
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelGoods(row) {
           this.formModel.tableData.splice(0, 1);
        },
        handleSizeChange(val) {
            this.pagesize = val
            let _this = this;
            this.pagesize = val
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
            this.pagenum = val;
            let maxPageNum = this.count % this.pagesize === 0 ? parseInt(this.count / this.pagesize) : parseInt(this.count / this.pagesize) + 1;
            let oldTableData = JSON.parse(JSON.stringify(this.originTableData));
            if(this.pagenum < maxPageNum) {
                this.tableData = oldTableData.splice(this.pagesize * (this.pagenum - 1), this.pagesize)
            }else{
                this.tableData = oldTableData.splice(this.pagesize * (this.pagenum - 1), this.count - this.pagesize * (this.pagenum - 1)) 
            }
        },
        getRandomCode(length) {
            if (length > 0) {
                var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                var nums = "";
                for (var i = 0; i < length; i++) {
                    var r = parseInt(Math.random() * 61);
                    nums += data[r];
                }
                return nums;
            } else {
                return false;
            }
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
    }
    .mess-operate {
        margin-bottom: 16px;
        text-align: right;
    }
    .table-container {
        .item-form {
            margin: 20px 0;
        }
        /deep/ .el-form-item__content {
            padding-left: 0 !important
        }
    }
</style>
