<template>
    <div class="master-create-container ">
        <search-bar @handleSearchChange="handleSearchChange" routename="create"/>
        <div v-show="isShowEmpty">
            <empty-show info="任务"></empty-show>
        </div>
        <div v-if="isShowLoading">
            <loading/>
        </div>

        <div class="padd-24">
            <div class="inline-block">
                <span class="font-wei-16">正在执行&nbsp;&nbsp;</span>
                <span class="font-gray-14">({{count}})</span>
            </div>
            <el-button type="primary" size="mini" class="pull-right" @click="dialogVisible = true">新建任务</el-button>
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
                        <div v-if="getTaskStatus(scope.row)">
                            <el-progress :text-inside="true" :stroke-width="16"
                                         :percentage="getTaskPercent(scope.row.taskpercent)">
                            </el-progress>
                        </div>
                        <div v-else>
                            <el-progress :text-inside="true" :stroke-width="16"
                                         :percentage="getTaskPercent(scope.row.taskpercent)" color="#fb7474">
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
                                        <div v-if="item.childstatus == 2 || item.childstatus == 5  || item.childstatus == 1">
                                            <el-progress :text-inside="true" :stroke-width="16 "
                                                         :percentage="getTaskPercent(item.childpercent)">
                                            </el-progress>
                                        </div>
                                        <div v-else>
                                            <el-progress :text-inside="true" :stroke-width="16"
                                                         :percentage="getTaskPercent(item.childpercent)"
                                                         color="#fb7474">
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
                        <el-button @click="handleEndClick(scope.row)" type="text" size="small">终止</el-button>
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
                width="576px"
                custom-class="add-newlog" @close="clearFormInfo('addFormparams')">
            <el-form :model="addFormparams" :rules="rules" ref="addFormparams" label-width="110px">
                <el-form-item label="任务名称" prop="name">
                    <el-input v-model="addFormparams.name" size="small" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="上传任务文件" prop="path">
                    <div>
                        <el-input v-model="addFormparams.path" size="small" placeholder="请选择文件"></el-input>
                    </div>
                </el-form-item>
                <!--<el-form-item label="选择执行项目" prop="servicecodes">-->
                <!--<el-autocomplete-->
                <!--size="small"-->
                <!--v-model="addFormparams.servicecodes"-->
                <!--placeholder="请选择项目"-->
                <!--:fetch-suggestions="querySearchAsync"-->
                <!--@select="handleSelect"-->
                <!--multiple="true"-->
                <!--&gt;-->
                <!--</el-autocomplete>-->
                <!--&lt;!&ndash; <el-input v-model="addFormparams.servicecodes" size="small" placeholder="请选择项目"></el-input> &ndash;&gt;-->
                <!--<div>-->

                <!--</div>-->
                <!--</el-form-item>-->
                <el-form-item label="选择执行项目" prop="" class="select-info">
                    <div class="select-input" @click="isShowDropDown">
                        <i class="el-input_icon el-icon-arrow-down" slot="suffix" v-show="arrow"></i><i
                            class="el-input_icon el-icon-arrow-up" slot="suffix" v-show="!arrow"></i>
                        <span class="plase-select" v-if="pselect">请选择</span>
                        <div class="el-form-item__error" v-show="serveceshow">
                            请选择项目
                        </div>
                        <div class="select-list">
                            <div class="select-container clearfix" ref="abc">
                                <div class="select-one fl" v-for="(item, index) in inputList">
                                    <div class="one-body" v-if="item.name">
                                        <span class="one-name" v-if="item.name">{{item.name}}</span>
                                        <span v-if="item.list.length > 0">：{{item.list[0].groupname}}</span>
                                        <span v-if="item.list.length > 1">等{{item.list.length}}项</span>
                                        <span class="select-close el-icon-close"
                                              @click.stop="handleDelete(index,item)"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="rest-more" v-if="restMore">...</div>
                        </div>

                    </div>
                    <div class="dropdown-container" v-show="dropdown">
                        <div class="container-up">
                            <div class="checkbox-one" v-for="(item, index) in checkList">
                                <el-checkbox v-model="item.isChecked" @change="handleCheckAll(index)"><strong>{{item.name}}</strong>
                                </el-checkbox>
                                <div class="check-list clearfix">
                                    <div class="list-one fl" v-for="(value, key) in item.group"
                                         :class="{list_one_active: item.isCheck[key]}" @click="handleCheck(index, key)">
                                        {{value.groupname}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-bottom">
                            <el-checkbox v-model="buttonCheckAll" @change="handleButtonCheckAll">全选</el-checkbox>
                            <div class="bottom-button">
                                <!-- <el-button size="mini" @click="handleCancel">取消</el-button> -->
                                <el-button size="mini" @click="handleReset">重置</el-button>
                                <el-button size="mini" type="primary" @click="handelConfirm">确定</el-button>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" class="pull-right" @click="resetForm('addFormparams')">取消</el-button>
                <el-button type="primary" size="mini" class="pull-right" @click="submitForm('addFormparams')">确定
                </el-button>
            </div>
        </el-dialog>

        <el-dialog title="" :visible.sync="confirmTipVisible" width="320px" custom-class="delete-tip">
            <div slot="title" class="tip-title">
                <i class="icon-warning el-icon-warning"></i>
                <span class="title-txt">提示</span>
            </div>
            <div class="tip-cont">
                确定终止任务吗?
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="confirmTipVisible=false">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleCancelClick">确 定</el-button>
            </div>
        </el-dialog>


    </div>

</template>

<script>
  import SearchBar from './components/SearchBar.vue'
  import EmptyShow from '@/components/EmptyShow'
  import Loading from '@/components/Loading'

  import {getTableData, getTaskService, addtask, stopCreateTask} from '@/apis/data'

  export default {
    name: 'Create',
    props: {
      msg: String
    },
    data() {
      return {
        taskchild: [],
        serveceshow: false,
        selected: '',
        isShowEmpty: false,
        isShowLoading: false,
        iscloseTablePop: '',
        dialogVisible: false,
        confirmTipVisible: false,
        currentPage: 1,
        count: 1000,
        pagesize: 10, //条数
        pagenum: 1, //页数,
        starttime: '', //开始时间
        endtime: '', //结束时间,
        taskname: '',
        taskService: '', //新建任务执行项目
        loading: true,
        tableData: [],
        addFormparams: {
          name: '',
          path: '',
        },
        tableheight: 'calc(100vh - 324px)',
        servicecodes: '',
        rules: {
          name: [
            {required: true, message: '请输入正确名称', trigger: 'change', max: 50},
          ],
          path: [
            {required: true, message: '请输入有效路径', trigger: 'change'}
          ],
        },
        selectData: [],
        timer: '',
        checkList: [],
        buttonCheckAll: false,
        inputList: [],
        dropdown: false,
        arrow: true,
        restMore: false,
        pselect: true,
        selectFlag: false
      }
    },
    beforeCreate() {

    },
    created() {
      this.getCreateTaskList();
      this.queyList()
    },
    mounted() {
      var self = this
      this.timer = setInterval(() => {
        self.getCreateTaskList()
      }, 5000)

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
      queyList() {
        var self = this;
        getTaskService().then(function (res) {
          if (res.data.msg == 'sucess') {
            let list = res.data.data;
            let group_leng;
            list.forEach(function (item, index) {
              item.isChecked = false;
              item.isCheck = []
              if (item.group) {
                item.group.forEach(function (it) {
                  item.isCheck.push(false)
                })
              }
            })
            self.checkList = list;
          }
        })
      },
      getTaskStatus(rowData) {
        var flag = true;
        var list = rowData.taskchild.filter(function (item) {
          return item.childstatus == 0
        })
        list.length > 0 ? flag = false : flag = true
        return flag
      },
      getCreateTaskList() {
        const param = {
          pagesize: this.pagesize,
          pagenum: this.pagenum,
          taskname: this.taskname
        }
        getTableData(param).then(res => {
          if (res.data.msg == 'sucess') {
            if (res.data.data.length === 0) {
              this.isShowEmpty = true;
            }
            this.count = res.data.data.total;
            this.isShowLoading = false
            this.tableData = res.data.data.task
          }

        })
      },
      handleSearchChange(val) {
        this.taskname = val
        this.getCreateTaskList()
      },
      handleCancelClick(row) {
        this.$message({
          type: 'success',
          message: '终止成功'
        })
      },
      handleEndClick(row) {
        this.$confirm('确定终止该任务吗？', '终止任务', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          stopCreateTask({taskid: row.taskid}).then(res => {
            if (res.data.code === '0') {
              this.$message({
                type: 'success',
                message: '终止成功'
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
        const s = Math.round(val * 100).toFixed(0);
        return Number(s);
      },
      handleSizeChange(val) {
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
        var self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              name: this.addFormparams.name,
              path: this.addFormparams.path.replace('\\', '\/'),
            }
            let arr = [];
            let servicecode = this.inputList;
            servicecode.forEach((item, index) => {
              if (item.list) {
                let group = [];
                item.list.forEach((itemid, index) => {
                  group.push(itemid.groupid);
                })
                arr.push({
                  code: item.code,
                  group: group
                })
              }
            })
            param.servicecode = arr
            addtask(param).then(function (res) {
              if (res.data.code === "0") {
                self.dialogVisible = false
                self.getCreateTaskList()
                self.$message({
                  type: 'success',
                  message: '新建成功'
                })
                self.addFormparams = {
                  name: '',
                  path: '',
                }
                self.inputList = []
              }
            })
          } else {
            return false;
          }
        });
        if (this.inputList.length <= 0) {
          this.serveceshow = true
          return false
        } else {
          this.serveceshow = false
        }
      },
      chooseFile() {
        this.$refs.inputfile.click();

      },
      clearFormInfo(formName) {
        this.$refs[formName].clearValidate();
      },
      changeRouteInfo(row) {
        this.$router.push({
          name: 'MasterDetail',
          params: {
            taskid: row.taskid,
            taskname: row.taskname,
            routename: this.$route.name,
            routemeta: this.$route.meta.title
          },
          query: {
            taskid: row.taskid,
            taskname: row.taskname
          }
        })

      },
      /**
       * 下拉相关*
       * */
      handleCheck(_index, _key) {
        let count = 0;
        let length = this.checkList[_index].isCheck.length;
        this.$set(this.checkList[_index].isCheck, _key, !this.checkList[_index].isCheck[_key])
        this.checkList[_index].isCheck.forEach((item, index) => {
          item === true && count++;
        })
        count === length ? this.$set(this.checkList[_index], 'isChecked', true) : this.$set(this.checkList[_index], 'isChecked', false);
      },
      handleCheckAll(_index) {
        let length = this.checkList[_index]['isCheck'].length
        let checkedArr = new Array(length).fill(true);
        let uncheckedArr = new Array(length).fill(false)
        this.checkList[_index].isChecked ? this.$set(this.checkList[_index], 'isCheck', checkedArr) : this.$set(this.checkList[_index], 'isCheck', uncheckedArr);
        var count = 0;
        this.checkList.forEach(function (item, index) {
          item.isChecked && count++;
        })
        count === this.checkList.length ? this.buttonCheckAll = true : this.buttonCheckAll = false;

      },
      handleButtonCheckAll() {
        this.checkList.forEach((item, index) => {
          let length = this.checkList[index]['isCheck'].length;
          let checkedArr = new Array(length).fill(true);
          let uncheckedArr = new Array(length).fill(false);
          this.$set(this.checkList[index], 'isChecked', this.buttonCheckAll);
          this.buttonCheckAll ? this.$set(this.checkList[index], 'isCheck', checkedArr) : this.$set(this.checkList[index], 'isCheck', uncheckedArr)

        })
      },
      handleCancel() {
        //关闭下拉
        this.dropdown = false;
        this.arrow = !this.arrow;
      },
      handleReset() {
        this.checkList.forEach((item, index) => {
          let length = this.checkList[index]['isCheck'].length;
          let uncheckedArr = new Array(length).fill(false);
          this.$set(this.checkList[index], 'isChecked', false);
          this.buttonCheckAll = false;
          this.$set(this.checkList[index], 'isCheck', uncheckedArr);
        })
      },
      handelConfirm() {
        this.inputList = [];
        let select = [];
        this.selectFlag = false;
        this.checkList.forEach((item, index) => {
          let obj = {};
          obj.name = "";
          obj.list = [];
          if (item.isChecked) {
            obj.name = item.name;
            this.selectFlag = true;
          }
          obj.code = item.code
          item.isCheck.forEach((value, key) => {
            if (value) {
              obj.name = item.name
              if (item.group[key]) {
                obj.list.push(item.group[key])
              }
              this.selectFlag = true;
            }
          })
          obj.name && this.inputList.push(obj)
        })

        this.dropdown = false;
        if (this.selectFlag) {
          this.pselect = false;
        } else {
          this.pselect = true;
        }
      },
      isShowDropDown() {
        this.dropdown = !this.dropdown;
        this.arrow = !this.arrow;
      },
      handleDelete(_index, item) {
        this.inputList.splice(_index, 1);
        this.checkList.forEach(function (items, index) {
          if (items.code == item.code) {
            items.isChecked = false
            if (items.isCheck.length > 0) {
              items.isCheck.forEach(function (it, i) {
                items.isCheck[i] = false
              })
            }
          }


        })
      },

    },
    computed: {
      getcloseTablePop() {
        return this.$store.state.app.iscloseTablePop
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
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

    .status-doing {
        display: inline-block;
        height: 8px;
        border-radius: 8px;
        min-width: 8px;
        padding: 0;
        background: #17b42a;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .select-input {
        position: relative;
        border: solid 1px #cfd6e4;
        border-radius: 3px;
        padding-bottom: 6px;
        padding-right: 20px;
        height: 32px;
        line-height: 32px;
        .el-input_icon {
            position: absolute;
            top: 50%;
            right: 10px;
            color: #a2aabb;
            transform: translate(0, -50%);
        }
        .plase-select {
            padding-left: 15px;
            color: #999999;
        }
        .select-list {
            height: 32px;
            overflow: auto;
            position: relative;
            .select-container {
                .select-one {
                    box-sizing: border-box;
                    padding-top: 6px;
                    padding-left: 9px;
                    display: inline-block;
                    .one-body {
                        position: relative;
                        padding-left: 9px;
                        line-height: 20px;
                        padding-right: 18px;
                        background-color: #e6ebf5;
                        border-radius: 10px;
                        .select-close {
                            position: absolute;
                            top: 50%;
                            right: 4px;
                            transform: translate(0, -50%);
                        }
                    }
                }
            }
            .rest-more {
                position: absolute;
                top: 7px;
                right: 0px;
                color: #000;
                // color: red;
                line-height: 12px;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }

    .dropdown-container {
        position: absolute;
        width: 425px;
        height: 294px;
        background-color: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
        border-radius: 3px;
        border: solid 1px #cfd6e4;
        .container-up {
            padding: 8px 19px;
            padding-right: 12px;
            overflow: auto;
            height: 253px;
            .checkbox-one {
                &:not(:last-child) {
                    margin-bottom: 9px;
                }
                .check-list {
                    padding-left: 24px;
                    .list-one {
                        position: relative;
                        padding: 9px 14px;
                        border: 1px solid transparent;
                        line-height: 12px;
                        margin-right: 24px;
                        cursor: pointer;
                        margin-bottom: 12px;
                        display: inline-block;
                        /*width: 72px;*/
                        &:nth-child(4n) {
                            margin-right: 0;
                        }
                    }
                    .list_one_active {
                        background-color: rgba(255, 255, 255, 1);
                        border-radius: 3px 3px 3px 3px;
                        border: solid 1px rgba(41, 133, 247, 1);
                        color: #2985f7;
                        &::after {
                            display: block;
                            content: "";
                            position: absolute;
                            border-bottom: 2px solid #fff;
                            border-left: 2px solid #fff;
                            width: 8px;
                            height: 5px;
                            right: 1px;
                            bottom: 3px;
                            -webkit-transform: rotate(-50deg);
                            transform: rotate(-50deg);
                        }
                        &::before {
                            display: block;
                            position: absolute;
                            content: "";
                            right: 0;
                            bottom: 0;
                            width: 0;
                            height: 0;
                            border-bottom: 15px solid #2985F7;
                            border-left: 15px solid transparent;
                        }
                    }
                }
            }
        }
        .container-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 19px;
            padding-right: 12px;
            height: 40px;
            border-top: 1px solid #cfd6e4;
            button {
                height: 24px;
                line-height: 0px;
                font-size: 12px;
                padding: 0 8px !important;
            }
        }
    }

    /deep/ .select-info label.el-form-item__label {
        &:before {
            content: '*';
            color: #F56C6C;
            margin-right: 4px;
        }

    }

</style>
