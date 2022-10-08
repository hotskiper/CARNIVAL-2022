<template>
    <div>
        <search-bar routename="create"/>
        <div class="padd-24">
            <div class="inline-block">
                <span class="font-wei-16">正在执行&nbsp;&nbsp;</span>
                <span class="font-gray-14">(128)</span>
            </div>
            <el-button type="primary" size="mini" class="pull-right" @click="dialogVisible = true">新建任务</el-button>
        </div>
        <div class="table-list">
            <el-table
                    :data="tableData3"
                    stripe
                    style="width: 100%"
                    :default-sort="{prop:'createtime',order:'descending'}"
                    :v-loading="loading"
            >
                <el-table-column
                        prop="taskname"
                        label="任务名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="taskstatus"
                        label="状态"
                        width="180">
                    <template slot-scope="scope">
                        <i class="status-doing"></i>
                        <span>执行中</span>
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
                        <el-progress :text-inside="true" :stroke-width="16" :percentage="scope.row.taskpercent * 100">
                        </el-progress>
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
                                        <el-progress :text-inside="true" :stroke-width="16"
                                                     :percentage="item.childpercent * 100">
                                        </el-progress>
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
                        <el-button @click="handleCancelClick(scope.row)" type="text" size="small">终止</el-button>
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
        <el-dialog
                title="新建任务"
                :visible.sync="dialogVisible"
                width="30%"
                custom-class="add-newlog">
            <el-form :model="addFormparams" :rules="rules" ref="addFormparams" label-width="110px">
                <el-form-item label="任务名称" prop="taskname">
                    <el-input v-model="addFormparams.taskname" size="small" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="上传任务文件" prop="path">
                    <div>
                        <el-input v-model="addFormparams.path" size="small" placeholder="请选择文件"></el-input>
                        <img src="../../assets/images/loading.png" class="input-file" @click="chooseFile">
                        <input size="small" type="file" name="file" ref="inputfile" class="input-hidden"/>
                    </div>

                </el-form-item>
                <el-form-item label="选择执行项目" prop="servicecodes">
                    <el-input v-model="addFormparams.servicecodes" size="small" placeholder="请选择项目"></el-input>
                    <div>

                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer">
         <el-button size="mini" class="pull-right" @click="resetForm('addFormparams')">取消</el-button>
         <el-button type="primary" size="mini" class="pull-right" @click="submitForm('addFormparams')">确定</el-button>
      </span>
        </el-dialog>
    </div>

</template>

<script>
  import SearchBar from './components/SearchBar.vue'
  import EmptyShow from '@/components/EmptyShow'
  import Loading from '@/components/Loading'
  import {getTableData} from '@/apis/data'
  export default {
    name: "createList",
    props: {
      msg: String
    },
    data() {
      return {
        taskchild: [],
        selected: '',
        isShowEmpty: false,
        isShowLoading: false,
        iscloseTablePop: '',
        dialogVisible: false,
        currentPage: 1,
        offset: 0,
        limit: 10,
        count: 1000,
        loading: true,
        tableData: [],
        addFormparams: {
          taskname: '',
          path: '',
          servicecodes: ''

        },
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
        tableData3: [
          {
            taskid: '32434',
            taskname: '任务一',
            taskstatus: 2,
            createtime: '2016-05-02 14:56',
            spendtime: '100分钟',
            taskpercent: '0.25',
            isShow: false,
            showText: '展开',
            taskchild: [
              {
                childid: '213123',
                servicename: '重点人',
                servicecode: '01',
                childpercent: 0.21,
                childstatus: 'http://127.0.0.7:8080/detail',
                childurl: 2
              },
              {
                childid: '21312354',
                servicename: '重点人11',
                servicecode: '01',
                childpercent: 0.21,
                childstatus: 'http://127.0.0.7:8080/detail',
                childurl: 2
              }
            ],
          }, {
            taskid: '32434',
            taskname: '任务er',
            taskstatus: 2,
            isShow: false,
            createtime: '2016-05-02 14:56',
            spendtime: '100分钟',
            taskpercent: '0.25',
            showText: '展开',
            taskchild: [
              {
                childid: '213123',
                servicename: '重点人',
                servicecode: '01',
                childpercent: 0.21,
                childstatus: 'http://127.0.0.7:8080/detail',
                childurl: 2
              },
              {
                childid: '21312354',
                servicename: '重点人11',
                servicecode: '01',
                childpercent: 0.21,
                childstatus: 'http://127.0.0.7:8080/detail',
                childurl: 2
              }
            ],
          }, {
            taskid: '32434',
            taskname: '任务三',
            taskstatus: 2,
            isShow: false,
            createtime: '2016-05-04 14:56',
            spendtime: '100分钟',
            taskpercent: '0.25',
            showText: '展开',
            taskchild: [
              {
                childid: '213123',
                servicename: '重点ghaha',
                servicecode: '01',
                childpercent: 0.21,
                childstatus: 'http://127.0.0.7:8080/detail',
                childurl: 2
              }
            ],
          }, {
            taskid: '32434',
            taskname: '任务四',
            taskstatus: 2,
            createtime: '2016-05-06 14:56',
            spendtime: '100分钟',
            isShow: false,
            taskpercent: '0.25',
            showText: '展开',
            taskchild: [
              {
                childid: '213123',
                servicename: '重点人cdc',
                servicecode: '01',
                childpercent: 0.21,
                childstatus: 'http://127.0.0.7:8080/detail',
                childurl: 2
              }
            ],
          }],
        selectData: [
          {
            id: '1',
            name: '重点人布控',
            Child: [
              {
                id: '11',
                name: '经济犯'
              },
              {
                id: '12',
                name: '经济犯'
              },
              {
                id: '13',
                name: '经济犯'
              },
              {
                id: '14',
                name: '经济犯'
              },
              {
                id: '15',
                name: '经济犯'
              }

            ]


          },
          {
            id: '2',
            name: '图片溯源',
            Child: []
          },
          {
            id: '3',
            name: '鉴爆恐',
            Child: []
          },
          {
            id: '4',
            name: '监军',
            Child: []
          }


        ]
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
      getCreateTaskList() {
        getTableData({offset: this.offset, limit: this.limit}).then(res => {
          if (res.data.data.length === 0) {
            this.isShowEmpty = true;
          }
          this.tableData = res.data.data;
          this.isShowLoading = false
        })
      },
      handleCancelClick(row) {
        this.$confirm('确定终止该任务吗？', '终止任务', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '取消'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '终止成功'
          })
        })
          .catch(() => {
          })
      },
      showChildPrograss(row, selectvalue) {
        this.taskchild = row.taskchild;
        this.$store.dispatch('CloseTablePop', selectvalue)
      },
      handleSizeChange(val) {
        this.limit = val

      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
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
            routename:this.$route.meta.title
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

<style scoped>

</style>