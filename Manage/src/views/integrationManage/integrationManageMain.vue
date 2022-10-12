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
              v-model="intSearchKey"
            >
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
          <el-table-column prop="cardNumber" label="工号"> </el-table-column>
          <el-table-column prop="allScore" label="碎片总量"> </el-table-column>
          <el-table-column prop="fragment1_quantity" label="伏羲碎片">
          </el-table-column>
          <el-table-column prop="fragment2_quantity" label="盘古碎片">
          </el-table-column>
          <el-table-column prop="fragment3_quantity" label="淘沙碎片">
          </el-table-column>
          <el-table-column prop="fragment4_quantity" label="BOSS碎片">
          </el-table-column>
          <el-table-column prop="fragment5_quantity" label="ACE碎片">
          </el-table-column>
          <el-table-column prop="fragment6_quantity" label="星空人碎片">
          </el-table-column>
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
        <span class="home-title" @click="showMainPage = true">积分管理 / </span>
        <span class="child-title">{{ curId }}积分详情</span>
      </div>
      <div class="detail-card">
        <div class="detail-kind" v-for="(item, index) in detailData" :key="index">
          <div class="detail-title">{{ item.type }}</div>
          <div class="int-layout">
            <div class="game-int" v-for="(game, gameIndex) in item.data" :key="gameIndex">
              <span class="game-name">{{ game.game }}</span>
              <span class="game-score">{{ game.score }}</span>
            </div>
          </div>
          <div class="total-score">
            <div class="score-block">
              <span class="game-name">总积分</span>
              <span class="game-score">{{ getTotalScore(item.data) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getIntData,
  getIntDetail
} from "../../apis/data.js"
export default {
  data() {
    return {
      showMainPage: true,
      curId: "x5500",
      labelWidth: "80px",
      ruleForm: {
        username: "",
        password: "",
      },
      isCheck: false,
      intSearchKey: "",
      fullscreenLoading: false,
      tableheight: 700,
      currentPage: 1, //当前页
      count: 0, //总量
      pagesize: 10, //条数
      pagenum: 1, //页数,
      originTableData: [],
      tableData: [],
      isShowEmpty: false,
      detailData: [],
      isShowAllData: false,
    }
  },
  watch: {
    intSearchKey: function (val, oldVal) {
      
    },
  },
  created() {
    this.getIntList()
  },
  methods: {
    handleSelectionChange() {},
    filterHandler(value, row, column) {
      return row.exchange === value
    },
    getIntList() {
      const param = {
        page_size: this.pagesize,
        page_number: this.pagenum,
      }
      getIntData(param).then((res) => {
        if (Number(res.data.status_code) === 200) {
          if (res.data.data.length === 0) {
            this.isShowEmpty = true
          }
          // debugger
          this.count = res.data.data.total_count
          let dataObj = []
          res.data.data.data.forEach((item) => {
            let rowData = item
            // rowData.name = ''
            // rowData.exchangeTime = ''
            rowData.cardNumber = item.user_id
            rowData.allScore =
              item.fragment1_quantity +
              item.fragment2_quantity +
              item.fragment3_quantity +
              item.fragment4_quantity +
              item.fragment5_quantity +
              item.fragment6_quantity
           
            dataObj.push(rowData)
          })
          this.isShowLoading = false
          this.originTableData = dataObj

          let oldTableData = JSON.parse(JSON.stringify(this.originTableData))
          this.tableData = oldTableData.splice(0, this.pagesize)
        }
      })
    },

    handleSizeChange(val) {
      this.pagesize = val
      this.getIntList();
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getIntList();
    },
    intDetail(rowData) {
      this.curId = rowData.id
      this.showMainPage = false
      getIntDetail().then((res) => {
        if (Number(res.data.code) === 0) {
          this.detailData = res.data.data
        }
      })
    },
    getTotalScore(scoreObj) {
      let sum = 0
      scoreObj.forEach((item) => {
        sum += item.score
      })
      return sum
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
