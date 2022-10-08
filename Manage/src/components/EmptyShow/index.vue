<template>
    <div class="no-data">
        <img src="../../assets/images/empty_image.png">
        <p>暂无数据</p>
        <!-- <p>当前没有{{info}}，快去新建一个吧！</p>
        <el-button type="primary" size="mini" v-show="isbtnShow">新建{{info}}</el-button> -->

    </div>
    
</template>

<script>
  export default {
    name: "EmptyShow",
    props: {
      info:String,
      isbtnShow:true
    },
    data(){
      return{

      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .no-data{
        text-align: center;
        height: calc(100vh - 191px);
        background: #e1e5f0;
        width: calc(100% - 240px);
        position: fixed;
        top: 192px;
        left: 240px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p{
            text-align: center;
            color: #0e1011;
            font-weight: 600;
            padding: 10px 0px;
        }
    }


</style>