<template>
    <div class="loading-box">
        <div class="loading ">
            <img src="../../assets/images/loading.png">
        </div>
        <p>加载中，请稍后...</p>
    </div>
</template>

<script>
  export default {
    name: "Loading",
    data(){
      return{

      }
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .loading-box{
        z-index: 999;
        text-align: center;
        height: calc(100vh - 191px);
        background: #fff;
        width: calc(100% - 240px);
        position: fixed;
        top: 192px;
        left: 240px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
  .loading{
      width: 32px;
      height: 32px;
      -webkit-animation: circle 1s linear infinite ;
      animation: circle 1s linear infinite ;
  }
    @keyframes circle {
        from{
            transform: rotate(0deg);
        }
       to{
           transform: rotate(360deg);
       }
    }


</style>