<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="tablist"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55"
            >
            </el-table-column>
            <el-table-column
                    :label="count"
                    prop="name"
            >
                <template slot-scope="scope">
                    <div class="head-name">
                        <img :src="scope.row.file_path">
                        <span>{{scope.row.file_name}}</span>
                    </div>

                </template>
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="file_info"
                    width="300">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" custom-class="edit-pic" width="576px"  @close="clearFormInfo('editFileform')">
            <div class="dialog-container clearfix">
                <el-form class="fl" :rules="rules" :model="editFileform" ref="editFileform">
                    <el-form-item label="图片描述" :label-width="formLabelWidth" prop="file_info">
                        <el-input type="textarea" placeholder="请输入描述" :rows='4' v-model="editFileform.file_info"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible=false">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('editFileform')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
  import {editKeyGroupInfo} from '@/apis/data'
  export default {
    name: "gallleryTable",
    data() {
      return {
        multipleSelection: [],
        dialogTitle: "编辑图片详情",
        formLabelWidth: '100px',
        dialogFormVisible: false,
        rules: {
          file_info: [
            {required: true, message: '不能为空', trigger: 'change'},
          ]
        },
        count:'文件名',
        editFileform:{
          group_id:'',
          face_id:'',
          file_info:'',
        },
      }
    },
    props: {
      tablist: {},
      groupid:''
    },
    mounted() {
      this.editFileform.group_id = this.groupid
    },
    methods: {
      handleSelectionChange(val) {
        this.count='文件名'+'(已选'+val.length+')个';
       var self=this;
       var arr=[];
        val.forEach(function (item) {
          arr.push(item.face_id)
        })
        self.multipleSelection = arr;
        this.$emit("changeSelectdata",self.multipleSelection)
      },
      handleEdit(item) {
        this.editFileform.face_id=item.face_id;
        this.editFileform.file_info=item.file_info;
        this.dialogFormVisible = true;
      },
      submitForm(formName) {
        var self=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params={
              ...this.editFileform
            }
            editKeyGroupInfo(params).then(res => {
              if (res.data.code === '0') {
                this.$message({
                  type: 'success',
                  message: '编辑成功'
                })
                self.$emit('getKeyGroupInfo')

              }
            })
            this.dialogFormVisible = false;
          }

        });

      },
      clearFormInfo(formName) {
        this.$refs[formName].clearValidate();
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .head-name {
        display: flex;
        align-items: center;
        height: 48px;
        img {
            height: 35px;
            margin-right: 16px;
        }
    }
</style>