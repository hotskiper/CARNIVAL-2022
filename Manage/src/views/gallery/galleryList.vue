<template>
    <div class="detail-container">
        <el-checkbox-group v-model="getCheckData" @change="handleCheckedData">
            <div class="gallery-detail-list list-check-container">
                <div class="list-per" v-for="(item,index) in tablist" :class="item.check ? active : ''">
                    <div class="flex-center list-per-head">
                        <img :src="item.file_path">
                        <div class="font-weight">{{item.file_name}}</div>
                    </div>
                    <p class="color-gray">{{item.file_info}}</p>
                    <el-checkbox :key="index" :label="item.face_id" @change="changeCheckStatus(item,index)"></el-checkbox>
                    <!--<el-checkbox :key="index" :model="item.check" @change="test(item,index)" ></el-checkbox>-->
                    <div class="list-per-mask">
                        <img src="../../assets/images/gallery-edit.png" @click="handleEdit(item, $event)"/>
                    </div>
                </div>
            </div>
        </el-checkbox-group>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" custom-class="edit-pic" width="576px"  @close="clearFormInfo('editFileform')">
            <div class="dialog-container clearfix">
                <el-form class="fl" :rules="rules" :model="editFileform" ref="editFileform">
                    <el-form-item label="图片名称" :label-width="formLabelWidth" prop="dialog_desc" style="display: none">
                        <el-input size="small" v-model="editFileform.name"></el-input>
                    </el-form-item>
                    <el-form-item label="图片描述" :label-width="formLabelWidth" prop="file_info">
                        <el-input type="textarea" placeholder="请输入描述" :rows='4' v-model="editFileform.file_info"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-img fr" style="display: none">
                    <img :src="picUrl">
                </div>
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
  import EmptyShow from '@/components/EmptyShow'

  export default {
    name: "galleryList",
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空！'))
        }
      }
      return {
        checkInfo: 'gallery-check-before',
        checkData: ['张倪明1'],
        answer: [],
        editFileform:{
          group_id:'',
          // current_name:'',
          face_id:'',
          file_info:'',
        },
        active:'active',
        dialogTitle: "编辑图片详情",
        formLabelWidth: '100px',
        isemptyShow:false,
        check: true,
        picUrl:'',
        dialogFormVisible: false,
        rules: {
          file_info: [
            {required: true, message: '不能为空', trigger: 'change'},
          ]
        },
        list: {}
      }
    },
    components: {
      EmptyShow
    },
    props: {
      tablist: {},
      groupid:''
    },
    mounted() {
      this.list = this.tablist
      this.editFileform.group_id = this.groupid
    },
    methods: {
      handleCheckedData(value) {
       this.checkData=value;
      },
      changeCheckStatus(item, index) {
        this.$emit('checkChild', item , index)
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
      handleEdit(item) {
        this.editFileform.face_id=item.face_id;
        this.editFileform.file_info=item.file_info;
        this.dialogFormVisible = true;
      },
      getInputChecked(item) {
        this.$set(item, 'check', item.check)
        return item.check
      }
    },
    computed: {
      getCheckData: {
        get(){
          var list = [];
          this.tablist.forEach(function(item, index){
            item.check ? list.push(item.face_id) : null;
          })

          return list;
        },
        set(){

        }
      }
    },
    // watch:{
    //   tablist:{
    //     handler:function (val,olaval) {
    //      this.list=val
    //     },
    //     deep:true
    //   }
    // }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .detail-container{
        .gallery-detail-list {
            background: #e1e5f0;
            display: flex;
            flex-wrap: wrap;
            padding-top: 24px;
            .list-per {
                width: calc((100% - 144px) / 5);
                height: 241px;
                background-color: rgba(240, 242, 247, 1);
                cursor: pointer;
                transition: all .4s;
                box-shadow: none;
                position: relative;
                margin: 0px 0px 24px 24px;
                padding: 20px;
                border: 1px solid transparent;
                .list-per-head {
                    img {
                        width: 100px;
                        height: 140px;
                    }
                }

                .flex-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                &:hover {
                    .list-per-mask {
                        opacity: 1;
                    }
                    background-color: #e9f3fe;
                    box-shadow: 0px 2px 8px 0px rgba(6, 0, 1, 0.15);
                }
                &.active{
                    background-color: rgba(233, 243, 254, 1);
                    box-shadow: 0px 2px 8px 0px
                    rgba(0, 0, 0, 0.15);
                    border: solid 1px rgba(41, 133, 247, 1);
                }
            }
            .list-per-mask {
                position: absolute;
                height: 100%;
                width: 100%;
                background: rgba(0, 0, 0, 0.4);
                opacity: 0;
                left: 0px;
                top: 0px;
                padding: 9px;
                transition: all .4s;
                /*z-index: 22;*/
                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            label {
                position: absolute;
                top: 11px;
                right: 12px;
                /*z-index: 1;*/
            }
            /deep/.el-checkbox__inner {
                width: 20px;
                height: 20px;
                border-radius: 10px;
            }
            /deep/.el-checkbox__inner::after {
                height: 10px;
                left: 6px;
                top: 2px;
                width: 5px;
            }

            /deep/.el-checkbox__label {
                display: none;
            }
        }

    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .clearfix {
        &::before {
            content: " ";
            display: table;
            box-sizing: border-box;
        }
        &::after {
            content: " ";
            display: table;
            box-sizing: border-box;
            clear: both;
        }
    }

    .el-form {
        width: calc(100% - 124px);
        .el-form-item {
            margin-bottom: 7px;
        }
    }

    .dialog-img {
        margin-top: 4px;
        margin-left: 24px;
        width: 100px;
        height: 140px;
        border: solid 1px #cfd6e4;
        border-radius: 2px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .font-weight {
        color: #333333;
        font-weight: 600;
        margin: 10px 0px;
        font-size: 14px;
    }
    .color-gray {
        color: #999999;
        margin: 0;
        font-size: 14px;
    }

</style>