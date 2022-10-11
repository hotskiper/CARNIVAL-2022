<template>
  <div class="one-screen-module">
    <div class="mess-operate">
      <el-row>
        <!-- <el-button type="primary" @click="addRowInTbl()">增加行</el-button> -->
      </el-row>
    </div>
    <div class="table-container">
      <el-form ref="ruleForm" :model="formModel">
        <el-table
          ref="filterGoodsTable"
          :data="formModel.tableData"
          stripe
          style="width: 100%"
          :default-sort="{ prop: 'goodsName', order: 'descending' }"
          :max-height="tableheight"
        >
          <el-table-column prop="name" label="商品名称">
            <template slot-scope="scope">
              <el-form-item
                class="item-form"
                :prop="'tableData.' + scope.$index + '.name'"
                :rules="formModel.rules.name"
                v-if="scope.row.isEdit"
                style="padding-left: 0 !important"
              >
                <el-input
                  v-model="scope.row.name"
                  placeholder="请输入商品名称"
                  style="padding-left: 0 !important"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="price" label="价格">
            <template slot-scope="scope">
              <el-form-item
                class="item-form"
                :prop="'tableData.' + scope.$index + '.name'"
                :rules="formModel.rules.name"
                v-if="scope.row.isEdit"
              >
                <el-input
                  v-if="scope.row.isEdit"
                  v-model="scope.row.prize_price"
                  placeholder="请输入价格"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.prize_price }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="totalNumber" label="商品库存">
            <template slot-scope="scope">
              <el-form-item
                class="item-form"
                :prop="'tableData.' + scope.$index + '.name'"
                :rules="formModel.rules.name"
                v-if="scope.row.isEdit"
              >
                <el-input
                  v-if="scope.row.isEdit"
                  v-model="scope.row.prize_quantity"
                  placeholder="请输入商品总量"
                ></el-input>
              </el-form-item>
              <span v-else>{{ scope.row.prize_quantity }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="!scope.row.isEdit"
                type="text"
                size="small"
                @click="editGoods(scope.row)"
                >增加库存</el-button
              >
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
import { getGoodsData, updateGoodsData } from "../../apis/data.js"

export default {
  data() {
    return {
      labelWidth: "80px",
      ruleForm: {
        username: "",
        password: "",
      },
      isCheck: false,
      fullscreenLoading: false,
      tableheight: 600,
      currentPage: 1, //当前页
      count: 1000, //总量
      pagesize: 5, //条数
      pagenum: 1, //页数,
      isShowEmpty: false,
      filterNameArr: [],
      originTableData: [],
      formModel: {
        rules: {
          name: [{ required: true, message: "请输入", trigger: "blur" }],
        },
        tableData: [],
      },
    }
  },
  created() {
    this.getGoodsList()
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
        currentNumber: "--",
      })
    },
    getGoodsList() {
      const param = {
        page_size: this.pagesize,
        page_number: this.pagenum,
      }
      getGoodsData(param).then((res) => {
        if (Number(res.data.status_code) === 200) {
          if (res.data.data.length === 0) {
            this.isShowEmpty = true
          }
          this.isShowLoading = false
          let dataObj = [],
            filterObj = []
          res.data.data.forEach((item) => {
            let rowData = item
            rowData.name = `${item.prize_name}`
            rowData.isEdit = false
            dataObj.push(rowData)
            filterObj.push({
              text: rowData.name,
              value: rowData.name,
            })
          })

          this.count = dataObj.length
          this.formModel.tableData = dataObj

          this.originTableData = dataObj
          let oldTableData = JSON.parse(JSON.stringify(this.originTableData))
          this.tableData = oldTableData.splice(0, this.pagesize)

          this.filterNameArr = filterObj
        }
      })
    },
    filterHandler(value, row, column) {
      return row.name === value
    },
    editGoods(row) {
      this.$prompt("请输入增加库存量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        console.log(row)
        let param = {
          prize_name: row.prize_name,
          prize_attr: row.prize_attr || "",
          quantity: Number(value),
        }
        updateGoodsData(param)
          .then((res) => {
            console.log(this)
            if (Number(res.data.status_code) === 200) {
              this.$message.success(res.data.msg)
              this.getGoodsList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch((err) => {
            this.$message.error("")
          })
      })
    },
    deleteGoods(row) {},
    saveGoods(row) {
      this.$refs["ruleForm"].validate((valid) => {
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
          let param = {
            prize_name: "拉杆箱",
            prize_attr: "黑色",
            quantity: 20,
          }
          updateGoodsData(param).then((res) => {
            debugger
            if (Number(res.data.status_code) === 200) {
              this.getGoodsList()
            } else {
              this.$message.error("保存失败！")
            }
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    cancelGoods(row) {
      this.formModel.tableData.splice(0, 1)
    },
    handleSizeChange(val) {
      this.pagesize = val
      let _this = this
      this.pagesize = val
      setTimeout(function () {
        let maxPageNum =
          _this.count % _this.pagesize === 0
            ? parseInt(_this.count / _this.pagesize)
            : parseInt(_this.count / _this.pagesize) + 1
        let oldTableData = JSON.parse(JSON.stringify(_this.originTableData))
        if (_this.pagenum < maxPageNum) {
          _this.tableData = oldTableData.splice(
            _this.pagesize * (_this.pagenum - 1),
            _this.pagesize
          )
        } else {
          _this.tableData = oldTableData.splice(
            _this.pagesize * (_this.pagenum - 1),
            _this.count - _this.pagesize * (_this.pagenum - 1)
          )
        }
      }, 0)
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.pagenum = val
      let maxPageNum =
        this.count % this.pagesize === 0
          ? parseInt(this.count / this.pagesize)
          : parseInt(this.count / this.pagesize) + 1
      let oldTableData = JSON.parse(JSON.stringify(this.originTableData))
      if (this.pagenum < maxPageNum) {
        this.tableData = oldTableData.splice(
          this.pagesize * (this.pagenum - 1),
          this.pagesize
        )
      } else {
        this.tableData = oldTableData.splice(
          this.pagesize * (this.pagenum - 1),
          this.count - this.pagesize * (this.pagenum - 1)
        )
      }
    },
  },
  mounted() {
    let self = this
    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
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
