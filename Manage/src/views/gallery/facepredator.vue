<template>
    <div class="facepredator-body">
        <div class="facepredator-title">
            重点人特征库
        </div>
        <div class="facepredator-main">
            <div class="facepredator-library-add">
                <div class="facepredator-library-addIcon" @click="handleAddClick()"> +</div>
                <div class="facepredator-library-name">新建特征库</div>
                <div class="facepredator-library-description"></div>
            </div>
            <div class="facepredator-library-box" v-for="item in cardlist" :key='item.id'>
                <div class="facepredator-library-item">
                    <div class="facepredator-library-tag">{{item.count}}</div>
                    <div class="facepredator-library-img"><img :src="item.showpic" alt=""></div>
                    <div class="facepredator-library-description">{{item.group.group_info}}</div>
                    <div class="facepredator-library-mask" @click="changeRouteDetail(item)" v-if="item.isdown">
                        <div>
                            <i class="icon-delete" @click.stop="handleDeleteClick(item)"></i>
                            <i class="icon-edit" @click.stop="handleEditClick(item)"></i>
                        </div>
                    </div>
                    <div class="facepredator-library-mask" @click="changeRouteDetail(item)" v-else>
                        <el-progress type="circle" :percentage="getTaskPercent(item.progress)" :width="87"></el-progress>
                    </div>
                </div>
                <div class="facepredator-library-name">{{item.group.group_name}}</div>
            </div>
        </div>
        <!-- 新增Form -->
        <el-dialog title="新增特征库" :visible.sync="dialogFormVisible" custom-class="add-facelog" width="576px"
                   @close="clearFormInfo('addFaceform')">
            <el-form :model="addFaceform" :rules="rulesadd" ref="addFaceform">
                <el-form-item label="特征库名称" :label-width="formLabelWidth" prop="group_name">
                    <el-input v-model="addFaceform.group_name" size="small" placeholder="特征库名称"></el-input>
                </el-form-item>
                <el-form-item label="特征库描述" :label-width="formLabelWidth" prop="description">
                    <el-input type='textarea' :rows='5' placeholder="请输入特征库描述" v-model="addFaceform.description"
                              size="small"
                    ></el-input>
                </el-form-item>
                <el-form-item label="特征库地址" :label-width="formLabelWidth" prop="fileUrl">
                    <el-input v-model="addFaceform.fileUrl" placeholder="特征库地址" size="small"
                              :disabled="isdisabled"></el-input>
                    <span class="choose-file" @click="chooseFileLoader" style="display: none"></span>
                    <input size="small" type="file" name="file" ref="inputfileloader" class="input-hidden"
                           webkitdirectory @change="uploadFile" style="display: none"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('addFaceform','add')">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑特征库" :visible.sync="dialogFormVisibleEdit" custom-class="add-facelog" width="576px"
                   @close="clearFormInfo('editFaceform')">
            <el-form :model="editFaceform" :rules="rulesedit" ref="editFaceform">
                <el-form-item label="特征库名称" :label-width="formLabelWidth" prop="group_name">
                    <el-input v-model="editFaceform.group_name" size="small" placeholder="特征库名称"></el-input>
                </el-form-item>
                <el-form-item label="特征库描述" :label-width="formLabelWidth" prop="description">
                    <el-input type='textarea' :rows='5' placeholder="请输入特征库描述" v-model="editFaceform.description"
                              size="small"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('editFaceform')">确 定</el-button>
            </div>
        </el-dialog>


        <!--删除提示-->
        <el-dialog title="" :visible.sync="confirmTipVisible" width="320px" custom-class="delete-tip">
            <div slot="title" class="tip-title">
                <i class="icon-warning el-icon-warning"></i>
                <span class="title-txt">提示</span>
            </div>
            <div class="tip-cont">
                确定删除此特征库吗？删除后此库内所有图片都会被清空。
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="confirmTipVisible=false">取 消</el-button>
                <el-button size="mini" type="primary" @click="deleteGroupConform">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import {getKeyGroupData, addKeyGroup, deleteKeyGroup, editKeyGroup} from '@/apis/data'

  export default {
    name: 'Facepredator',
    props: {
      msg: String
    },
    data() {
      return {
        rowData: {},
        isdisabled: false,
        addFaceform: {
          group_name: '',
          fileUrl: '',
          description: '',
        },
        editFaceform: {
          group_name: '',
          description: '',
          group_id: ''
        },
        group_id:'',
        rulesadd: {
          group_name: [
            {required: true, message: '请输入正确名称', trigger: 'change', max: 50},
          ],
          fileUrl: [
            {required: true, message: '请输入正确地址', trigger: 'change'}
          ]
        },
        rulesedit: {
          group_name: [
            {required: true, message: '请输入正确名称', trigger: 'change', max: 50},
          ]
        },
        formLabelWidth: '100px',
        dialogFormVisible: false,
        dialogFormVisibleEdit: false,
        confirmTipVisible: false,
        offset: 0,
        limit: 10,
        cardlist: [],
        timerFuc:''
      }

    },
    created() {
      this.getKeyGroupList();
    },
    mounted() {

    },

    methods: {

      /**
       * 请求库列表
       * */
      getKeyGroupList(timer) {
        var self = this;
        if (timer) {
          this.timerFuc = setInterval(function () {
            getKeyGroupData().then(res => {
              if (res.data.code === '0') {
                self.cardlist = res.data.data
                let info = res.data.data.filter((item) => {
                  return !item.isdown
                })
                if (info.length == 0) {
                  clearInterval(this.timerFuc)
                }
              }
            })
          }, timer)
        } else {
          getKeyGroupData().then(res => {
            if (res.data.code === '0') {
              this.cardlist = res.data.data
            }
          })
        }


      },

      //新建特征库
      handleAddClick() {
        this.initialData();
        this.dialogFormVisible = true;
      },
      /*编辑特征库*/
      handleEditClick(item) {
        // 处理后台描述字段，返回的和接收的参数不一致的坑
        this.editFaceform.description = item.group.group_info;
        this.editFaceform.group_name = item.group.group_name;
        this.editFaceform.group_id = item.group.group_id;
        this.dialogFormVisibleEdit = true;
      },
      handleDeleteClick(item){
        this.group_id = item.group.group_id;
        this.confirmTipVisible = true;
      },
      changeRouteDetail(item) {
        this.$router.push({
          name: 'Gallerydetail',
          params: {
            routename: this.$route.meta.title,
            groupid:item.group.group_id
          },
          query: {
            groupid:item.group.group_id,
            groupName: item.group.group_name
          }
        })
      },
      getTaskPercent(val) {
        const num = Number((val * 100).toFixed(2))
        return num
      },
      clearFormInfo(formName) {
        this.$refs[formName].clearValidate();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName == 'editFaceform') {
              const params = {
                ...this.editFaceform,
              }
              this.editKeyGroup(params);
            } else {
              const params = {
                ...this.addFaceform,
              }
              this.addKeyGroup(params);
            }
          } else {
            return false;
          }
        });

      },
      deleteGroupConform() {
        deleteKeyGroup({group_id: this.group_id}).then(res => {
          if (res.data.code === '0') {
            this.confirmTipVisible = false;
            this.getKeyGroupList();
            this.$message({
              type: 'success',
              message: '删除成功'
            })

          }
        })
      },
      initialData() {
        this.addFaceform.group_name = '';
        this.addFaceform.description = '';
        this.addFaceform.fileUrl = '';
      },
      chooseFileLoader() {
        this.$refs.inputfileloader.click();
      },
      addKeyGroup(params){
        addKeyGroup(params).then(res => {
          if (res.data.code === '0') {
            this.dialogFormVisible = false;
            this.getKeyGroupList(3000);
            this.$message({
              type: 'success',
              message: '新增成功'
            })

          }
        })
      },
      editKeyGroup(params){
        editKeyGroup(params).then(res => {
          if (res.data.code === '0') {
            this.dialogFormVisibleEdit = false;
            this.getKeyGroupList();
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
          }
        })
      },
      uploadFile(e) {
        let files = e.target.files;
        let path = files[0].webkitRelativePath
        let fileloader = path.split('/')[0]
        let pathreak = window.URL.createObjectURL(fileloader)
        this.addFaceform.fileUrl = fileloader;
      }
    },
    beforeDestroy() {
      clearInterval(this.timerFuc)
    }


  }
</script>

<style rel="stylesheet/scss" lang="scss">
    .facepredator-body {
        background: rgb(225, 229, 240);
        height: calc(100vh - 60px);
        .facepredator-title {
            background: #eef1f7;
            border-bottom: 1px solid #d1d3db;
            height: 46px;
            line-height: 46px;
            padding-left: 24px;
            font-size: 14px
        }

        .facepredator-main {
            display: flex;
            flex-wrap: wrap;
            padding-top: 20px;
            height: calc(100vh - 138px);
            overflow-y: scroll;
        }
        .facepredator-library-add {
            background-color: #fff;
            width: calc((100% - 144px) / 5);
            height: 241px;
            cursor: pointer;
            -webkit-transition: all .4s;
            transition: all .4s;
            -webkit-box-shadow: none;
            box-shadow: none;
            position: relative;
            margin: 0px 0px 24px 24px;
            padding: 20px;

            .facepredator-library-addIcon {
                height: 75px;
                width: 75px;
                border-radius: 50%;
                background: #e8ebf5;
                color: #9da3b4;
                font-size: 50px;
                font-weight: bold;
                line-height: 75px;
                margin: 0 auto;
                margin-top: 48px;
                margin-bottom: 22px;
                cursor: pointer;
                text-align: center;
            }
            .facepredator-library-name {
                font-size: 14px;
                font-weight: bold;
                text-align: center;
            }
        }

        .facepredator-library-box {
            width: calc((100% - 144px) / 5);
            margin: 0px 0px 24px 24px;

            .facepredator-library-item {
                background-color: #fff;
                height: 241px;
                cursor: pointer;
                -webkit-box-shadow: none;
                box-shadow: none;
                position: relative;
                padding: 20px;
            }

            .facepredator-library-item:hover {
                .facepredator-library-mask {
                    opacity: 1;
                    width: 100%;
                }
            }
            .facepredator-library-img {
                margin: 0 auto;
                text-align: center;
            }
            .facepredator-library-img img {
                width: 100px;
                height: 140px;
                margin-top: 0px;
                margin-bottom: 12px;
            }
            .facepredator-library-description {
                font-size: 14px;
                margin-top: 9px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color: rgba(44, 44, 44, 0.502);
            }
            .facepredator-library-tag {
                position: absolute;
                background: #2985f7;
                color: #fff;
                padding: 4px 4px;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                font-size: 12px;
                padding-right: 16px;
                top: 0px;
                left: 0px;
            }
            .facepredator-library-name {
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                margin-top: 10px;
            }
            .icon-edit {
                width: 24px;
                height: 24px;
                display: inline-block;
                font-size: 20px;
                position: absolute;
                right: 38px;
                font-weight: bold;
                top: 10px;
                background: url("../../assets/images/edit.png");
            }

            .icon-delete {
                width: 14px;
                height: 18px;
                display: inline-block;
                position: absolute;
                right: 14px;
                font-weight: bold;
                top: 12px;
                background: url("../../assets/images/delete.png");
            }
            .facepredator-library-mask {
                opacity: 0;
                position: absolute;
                height: 241px;
                background: rgba(0, 0, 0, 0.4);
                margin: 0 -20px;
                -webkit-transition: all .4s;
                transition: all .4s;
                width: 100%;
                top: 0px;
            }
        }

        .choose-file {
            width: 22px;
            height: 16px;
            background: url("../../assets/images/file_upload.png") no-repeat;
            display: block;
            position: absolute;
            right: 8px;
            top: 12px;
            cursor: pointer;
        }
        .el-progress {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -43px;
            margin-left: -43px;
        }
    }


</style>

