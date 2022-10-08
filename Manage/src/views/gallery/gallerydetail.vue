<template>
    <div class="gallery-detail-container">
        <div class="detail-title">
            <router-link :to="{name:'Facepredator'}"><span class="back-to">重点人特征库</span></router-link>
            <span>> {{groupName}}</span>
        </div>
        <div class="option-head">
            <div>
              <el-checkbox v-model="checkedall" @change="checkAll" v-show="isShowCheckall">全选</el-checkbox>

                <el-button type="defalut" size="mini" class="posi-right" @click="exportSelect">导出选中项</el-button>
                <el-button type="primary" size="mini" class="posi-right" @click="deleteSelect">删除选中项</el-button>
                <el-upload
                        ref="upload"
                        :http-request="UploadFile"
                        class="upload-file"
                        multiple
                        accept="image/jpeg,image/png,image/jpg,image/gif"
                        :show-file-list="false"
                        :on-success="handleAvatarUpload"
                        :before-upload="beforeUpload"
                        action=""
                >
                    <img src="../../assets/images/upload.png"/>
                    <span>上传文件</span>
                    <img src="../../assets/images/info.png"/>
                </el-upload>
            </div>
            <div>
                <el-input size="mini" placeholder="请输入内容" v-model="searchvalue"></el-input>
                <i class="el-icon-search btn-search" @click="getKeyGroupInfo"></i>
                <img :src="listshow" @click="changeShowType('list')">
                <span class="border-left"></span>
                <img :src="tableshow" @click="changeShowType('table')">
            </div>
        </div>
        <div v-if="isemptyShow">
            <empty-show :isbtnShow=!isemptyShow info="图片"></empty-show>
        </div>
        <div class="gallery-list-body" v-else>
            <div v-if="tableShowType == 'list'">
                <gallery-list :tablist="tablist" @checkChild="checkChild" :groupid="group_id" @getKeyGroupInfo="getKeyGroupInfo"></gallery-list>
            </div>
            <div v-else>
                <galllery-table :tablist="tablist" :groupid="group_id" @getKeyGroupInfo="getKeyGroupInfo" @changeSelectdata="changeSelectdata"></galllery-table>
            </div>
        </div>
        <div class="pagination bac-pagi " v-show="count != 0">
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
  import images2 from '@/assets/images/ku-img.png'

  import GalleryList from '@/views/gallery/galleryList.vue'
  import GallleryTable from '@/views/gallery/gallleryTable.vue'
  import EmptyShow from '@/components/EmptyShow'

  import listshow from '@/assets/images/list_show.png'
  import listshowactive from '@/assets/images/list_show_active.png'
  import tableshow from '@/assets/images/table_show.png'
  import tableshowactive from '@/assets/images/table_show_active.png'

  import { getKeyGroupInfo, deleteKeyGroupInfo, uploadKeyGroupInfo,exportKeyGroupInfo, faceUpload } from '@/apis/data'


  export default {
    name: "GalleryDetail",
    data() {
      return {
        checkedall: false,
        isShowCheckall:true,
        searchvalue: '',
        tableShowType: 'list',
        listshow: listshowactive,
        tableshow: tableshow,
        group_id: '',
        groupName: '',
        tablist: [],
        currentPage: 1,
        offset: 0,
        limit: 10,
        count: 1000,
        selectdata: [],
        uploadparams: '',
        isemptyShow:false

      }
    },
    components: {
      GalleryList,
      GallleryTable,
      EmptyShow
    },
    created() {
      this.group_id = this.$route.params.groupid || this.$route.query.groupid;
      this.groupName = this.$route.query.groupName;
      this.getKeyGroupInfo();
    },
    mounted() {

    },
    methods: {
      getKeyGroupInfo() {
        const params = {
          group_id: this.group_id,
          pagesize: this.limit,
          pagenum: this.currentPage,
          condition: this.searchvalue
        }
        getKeyGroupInfo(params).then(res => {
          if (res.data.code === '0') {
            var data = res.data.data.faces;
            // this.tablist = res.data.data.faces;
            // this.tablist.forEach(function(item, index){
            //   item.check=false
            // })
            if(data.length == 0){
              this.isemptyShow=true
            }else{
              this.isemptyShow=false
            }
            data.forEach(function (item, index) {
              item.check = false;
            })
            this.tablist = data
            this.count = res.data.data.total
          }
        })
      },
      handleSizeChange(val) {
        this.limit = val
        this.getKeyGroupInfo()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.offset = (val - 1) * this.limit;
        this.getKeyGroupInfo()
      },

      changeShowType(val) {
        this.tableShowType = val
        if (val == 'table') {
          this.tableshow = tableshowactive;
          this.listshow = listshow;
          this.isShowCheckall=false;
        } else {
          this.tableshow = tableshow;
          this.listshow = listshowactive;
          this.isShowCheckall=true;
        }
      },
      checkAll() {
        let self = this;
        this.tablist.forEach(function (item, index) {
          self.$set(self.tablist[index], 'check', self.checkedall)
        })
      },
      deleteSelect() {
        let selectList = [];
        if(this.tableShowType === 'list') {
          this.tablist.forEach((item) => {
            item.check ? selectList.push(item.face_id) : null
          })
        } else if (this.tableShowType === 'table') {
          selectList = this.selectdata
        }
        
        if(selectList.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的内容'
          })
          return;
        }
        const params = {
          group_id: this.group_id,
          list: selectList
        }
        deleteKeyGroupInfo(params).then(res => {
          if (res.data.code === '0') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getKeyGroupInfo();
          }
        })

      },
      exportSelect(){
        let selectList = [];
        if(this.tableShowType === 'list') {
          this.tablist.forEach((item) => {
            item.check ? selectList.push(item.face_id) : null
          })
        } else if (this.tableShowType === 'table') {
          selectList = this.selectdata
        }
        const param = {
          export: selectList
        }
        if(selectList.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要导出的内容'
          })
          return;
        }
        let url='/facepredator/ailab/minibox/face/upload';
        window.open(url+'?export='+selectList);
        // faceUpload(param).then(function(res) {

        // })
        // var url='/facepredator/ailab/minibox/face/upload';
        // var newWin=window.open(),
        //   formStr='';
        //  var test=["2019042510133498200","2019042510133523000","2019042510133539500"]
        // formStr = '<form style="visibility: hidden"; method="post" action="'+url+'">' +
        //   '<input style="hidden" name="export" id="export" value="'+test+'"/> ' +
        //   '</form>'
        // newWin.document.body.innerHTML=formStr;
        // newWin.document.forms[0].submit();
        // return newWin;
        // let export = this.selectdata;
        // window.open('http://10.0.203.162:8088/ailab/minibox/face/export?export='+this.selectdata)
      },
      checkChild(item, _index) {
        let selectList = [];
        this.$set(this.tablist[_index], 'check', !this.tablist[_index].check);
        this.tablist.forEach((item) => {
          item.check ? selectList.push(item.face_id) : null
        })
       this.changeSelectdata(selectList)
        var count = 0;
        this.tablist.forEach(function (item, index) {
          item.check && count++;
        })
        count === this.tablist.length ? this.checkedall = true : this.checkedall = false;
      },
      UploadFile(param) {
        var form = new FormData();
        form.append("group_id", this.group_id);
        form.append("files", param.file);
        uploadKeyGroupInfo(form).then(res => {
          if (res.data.code === '0') {
            this.$message({
              type: 'success',
              message: '上传成功'
            })

          }
        })
      },
      handleAvatarUpload(res, file) {
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          this.getKeyGroupInfo();
        } else {
          this.$message.error('上传图片失败！');
        }

      },
      beforeUpload(file) {
      },
      changeSelectdata(selectlist){
        let arr = [];
        arr = selectlist ;
        this.selectdata = arr
      }

    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .gallery-detail-container {
        background: #e1e5f0;
        font-size: 14px;
        height: 100vh;
        .detail-title {
            background: #eef1f7;
            border-bottom: 1px solid #d1d3db;
            height: 46px;
            line-height: 46px;
            padding-left: 24px;
            font-size: 14px;
            span:last-child {
                color: #333333;
                margin-left: 10px;
            }
        }
        .option-head {
            background-color: rgba(255, 255, 255, 1);
            padding: 0 24px;
            height: 55px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-input {
                width: 288px;
                margin-right: 24px;
            }
            & > div {
                display: flex;
                align-items: center;
            }
            img {
                cursor: pointer;
            }
        }
        .upload-file {
            width: 115px;
            height: 32px;
            background-color: white;
            border-radius: 3px 3px 3px 3px;
            border: solid 1px #cfd6e4;
            position: relative;
            display: inline-block;
            margin-left: 40px;
        }
        .border-left {
            border-left: 1px solid rgba(207, 214, 228, 1);
            display: inline-block;
            width: 1px;
            height: 19px;
            margin: 0 16px;
        }
        .gallery-list-body {
            height: calc(100vh - 226px);
            background: #e1e5f0;
            overflow-y: scroll;
        }
        .btn-search{
            display: inline-block;
            position: absolute;
            right: 137px;
            cursor: pointer;
            width: 25px;
            height: 23px;
            line-height: 23px;
            text-align: center;
        }

    }

    .bac-pagi {
        height: 48px;
        background: #e1e5f0;
    }

    .back-to {
        cursor: pointer;
    }
</style>