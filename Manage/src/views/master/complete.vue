<template>
  <div class="master-complete-container ">
    <search-bar routename="Complete" @handleSearchChange="handleSearchChange" @handleDateChange="handleDateChange" />
    <div v-show="isShowEmpty">
      <empty-show info="任务"></empty-show>
    </div>
    <div v-if="isShowLoading">
      <loading/>
    </div>
    <div class="padd-24">
      <div class="inline-block">
          <span class="font-wei-16">执行结束&nbsp;&nbsp;</span>
          <span class="font-gray-14">({{count}})</span>
      </div>
  </div>
    <div class="table-list">
      <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              :default-sort="{prop:'createtime',order:'descending'}"
              :v-loading="loading"
              :height="tableheight"
      >
        <el-table-column
                prop="taskname"
                label="任务名称"
                width="200">
        </el-table-column>
        <el-table-column
                prop="taskstatus"
                label="状态"
                :filters="[{text: '异常', value: 0},{text: '终止', value: 4},{text: '已完成', value: 5}]"
                :filter-method="filterHandler"
                width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.taskstatus == 0">
              <i class="status-error"></i>
              <span>异常</span>
            </div>
            <div v-if="scope.row.taskstatus == 4">
              <i class="status-error"></i>
              <span>终止</span>
            </div>
            <div v-if="scope.row.taskstatus == 5">
              <i class="status-end"></i>
              <span>已完成</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
                prop="createtime"
                label="创建时间"
                sortable
                width="240">
        </el-table-column>
        <el-table-column
                prop="spendtime"
                label="执行计时"
                width="200">
        </el-table-column>
        <el-table-column
                prop="taskpercent"
                label="执行总进度"
                min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.taskstatus == 5">
              <el-progress :text-inside="true" :stroke-width="16" :percentage="getTaskPercent(scope.row.taskpercent)"
              >
              </el-progress>
            </div>
            <div v-else="scope.row.taskstatus == 0">
              <el-progress :text-inside="true" :stroke-width="16" :percentage="getTaskPercent(scope.row.taskpercent)"
                           color="#fb7474" >
              </el-progress>
            </div>

            <span class="font-gray-14 switch-change">
             <span :class="{textColor:getcloseTablePop === scope.$index}" v-show="getcloseTablePop === scope.$index"
                   @click.stop="showChildPrograss(scope.row,-1)">
               收起
             </span>
             <span :class="{textColor:getcloseTablePop === scope.$index}" v-show="getcloseTablePop != scope.$index"
                   @click.stop="showChildPrograss(scope.row,scope.$index)">
               展开
             </span>

           </span>
            <transition name="fade">
              <div class="row-child-box" v-show="getcloseTablePop === scope.$index" @click.stop>
                <ul>
                  <li v-for="(item,index) in scope.row.taskchild">
                    <a>{{item.servicename}}</a>
                    <div v-if="item.childstatus == 5">
                      <el-progress :text-inside="true" :stroke-width="16"
                                   :percentage="getTaskPercent(item.childpercent)" >
                      </el-progress>
                    </div>
                    <div v-else>
                      <el-progress :text-inside="true" :stroke-width="16"
                                   :percentage="getTaskPercent(item.childpercent)" color="#fb7474">
                      </el-progress>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="200">
          <template slot-scope="scope">
            <el-button @click="handleCancelClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="changeRouteInfo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  import SearchBar from './components/SearchBar.vue'
  import EmptyShow from '@/components/EmptyShow'
  import Loading from '@/components/Loading'

  import { getCompleteTask, deleteCompleteTask } from '@/apis/data'
export default {
  name: 'Complete',
  props: {
    msg: String
  },
  components: {
    SearchBar
  },
  data() {
    return {
      test: 50,
      taskchild: [],
      selected: '',
      isShowEmpty: false,
      isShowLoading: false,
      iscloseTablePop: '',
      dialogVisible: false,
      currentPage: 1,
      offset: 0,
      limit: 10,
      count: 0,
      pagesize: 10, //条数
      pagenum: 1, //页数,
      starttime: '', //开始时间
      endtime: '', //结束时间,
      loading: true,
      taskname: '',
      tableData: [],
      addFormparams: {
        taskname: '',
        path: '',
        servicecodes: ''

      },
      tableheight:'calc(100vh - 340px)',
      rules: {
        taskname: [
          {required: true, message: '请输入名称', trigger: 'change'},
        ],
        path: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ],
        servicecodes: [
          {required: true, message: '请输入名称', trigger: 'change'}
        ]
      },
      tableData3: [],
      selectData: []
    }
  },
  beforeCreate() {

  },
  created() {
    this.getCreateTaskList();
  },
  mounted() {

  },
  components: {
    SearchBar,
    EmptyShow,
    Loading
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    getCreateTaskList(){
      const param = {
        pagesize: this.pagesize,
        pagenum: this.pagenum,
        taskname: this.taskname,
        starttime: this.starttime,
        endtime: this.endtime
      }
      getCompleteTask(param).then(res => {
        if (res.data.data.length === 0) {
          this.isShowEmpty = true;
        }
        this.count = res.data.data.total;
        this.isShowLoading = false
        this.tableData = res.data.data.task
      })
    },
    //输入框筛选
    handleSearchChange(val) {
      this.taskname = val
      this.getCreateTaskList()
    },
    //时间筛选
    handleDateChange(val) {
      // this.taskname = val
      this.starttime = val[0];
      this.endtime = val[1];
      this.getCreateTaskList()
    },
    handleCancelClick(row) {
      this.$confirm('确定删除该任务吗？', '删除任务', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        deleteCompleteTask({taskid: row.taskid}).then(res => {
          if(res.data.code === '0') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getCreateTaskList()
          }
        })
        
      })
        .catch(() => {
        })
    },
    showChildPrograss(row, selectvalue) {
      this.taskchild = row.taskchild;
      this.$store.dispatch('CloseTablePop', selectvalue)
    },
    getTaskPercent(val) {
      const num = Number((val * 100).toFixed(2))
      return num
    },
    handleSizeChange(val) {
      this.limit = val
      this.pagesize = val
      this.getCreateTaskList()

    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getCreateTaskList()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
      // this.$refs[formName].resetFields();
      // this.dialogVisible = false
    },
    chooseFile() {
      this.$refs.inputfile.click();
    },
    changeRouteInfo(row) {
      this.$router.push({
        name: 'MasterDetail',
        params: {
          taskid: row.taskid,
          taskname:row.taskname,
          routename: this.$route.name,
          routemeta: this.$route.meta.title
        },
        query: {
          taskid: row.taskid,
          taskname: row.taskname
        }
      })

    }
  },
  computed: {
    getcloseTablePop() {
      return this.$store.state.app.iscloseTablePop
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .padd-24 {
    padding: 24px;
  }

  .font-wei-16 {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }

  .font-gray-14 {
    color: #999999;
  }

  .status-error {
    display: inline-block;
    height: 8px;
    border-radius: 8px;
    min-width: 8px;
    padding: 0;
    background: #F53B3B;
    margin-right: 6px;
  }
  .status-end {
    display: inline-block;
    height: 8px;
    border-radius: 8px;
    min-width: 8px;
    padding: 0;
    background: #2985f7;
    margin-right: 6px;
  }


  .switch-change {
    position: absolute;
    left: 84%;
    top: 8px;
    cursor: pointer;
  }

  .row-child-box {
    width: 295px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    border: solid 1px rgba(207, 214, 228, 1);
    padding: 0 17px;
    position: absolute;
    top: 29px;
    z-index: 1111;
    left: 70px;
    ul {
      li {
        padding-bottom: 26px;
        a {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 7px;
        }
      }
    }
  }

  .textColor {
    color: blue;
  }

  .table-list {
    margin: 17px 0px 0px 0px;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity 1s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }

</style>