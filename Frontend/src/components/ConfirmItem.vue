<template>
  <div class="ConfirmItem">
    <div class="mask" v-if="!this.isClose"></div>
    <div
      class="content-in"
      :class="{'content-in-close': this.isClose,'small': this.componentType == 2&& selectItemData &&(selectItemData.length <= 5),'bigger':this.componentType != 2 && selectItemData &&(selectItemData.length > 5),'biggerEx':this.componentType == 2 && selectItemData &&(selectItemData.length > 5) }"
    >
      <div class="main-info">
        <div class="close" @click="close()"></div>
        <div class="main-info-pic">
          <img alt="烽火嘉年华" @click="showImage()" :src="selectTypeData.picBase64" />
        </div>
        <div class="main-info-in">
          <p>
            <span>{{selectTypeData.detail && selectTypeData.detail.price?selectTypeData.detail.price:'--'}}</span>
            <span>积分</span>
          </p>
          <p>
            <span>库存：{{selectTypeData.detail && selectTypeData.detail.quantity?selectTypeData.detail.quantity:'--'}}</span>
          </p>
          <p>
            <span>{{selectTypeData.name?selectTypeData.name:'--'}}</span>
          </p>
        </div>
      </div>
      <div class="type-select">
        <div class="title">颜色分类<span v-if="selectTypeData.name == '黑S' || selectTypeData.name == '黑M'|| selectTypeData.name == '黑L' || selectTypeData.name == '黑XL'|| selectTypeData.name == '黑XXL' || selectTypeData.name == '白S' || selectTypeData.name == '白M'|| selectTypeData.name == '白L' || selectTypeData.name == '白XL'|| selectTypeData.name == '白XXL'" @click="showImageEx()">尺码说明</span></div>
        <div class="button-group">
          <div :class="{'checked':selectTypeData == item}" @click="selectType(item)" v-for="(item,index) in selectItemData" v-bind:key="index">{{item.name}}</div>
        </div>
      </div>
      <div class="number-select" v-if="componentType == 1">
        <div class="title">购买数量</div>
        <div class="change-number">
          <img alt="add" src="../assets/image/reduce.png" @click="reduceNumber" />
          <input type="text" v-model="number" readonly />
          <img alt="add" src="../assets/image/add.png" @click="addNumber" />
        </div>
      </div>
      <div class="item-describe">
        <div class="title">产品介绍</div>
        <div class="content">
          {{selectTypeData.detail ? selectTypeData.detail.detail : ''}}
        </div>
      </div>
      <div class="item-submit">
        <cube-button v-if="componentType == 1" @click="submit">确认兑换</cube-button>
        <cube-button v-if="componentType == 2" @click="submitC">确认改变</cube-button>
      </div>
    </div>
    <div class="add-icon" :class="{'play-add': isPlayAdd}" @animationend="isPlayAdd = false">+{{this.number}}</div>
    <div class="image-dialog" @click="hideImage()" v-if="showImg">
       <img alt="烽火嘉年华" :src="selectTypeData.picBase64" />
    </div>
    <div class="image-dialog-ex" @click="hideImageEx()" v-if="showImgEx">
      <img alt="烽火嘉年华" src="../assets/image/size.png" />
    </div>
  </div>
</template>

<script>
import service from '../javascript/common/services'
export default {
  name: 'ConfirmItem',
  props: ['componentTypeOut', 'selectItemData', 'selectItemDataNumber', 'selectPrizeName'],
  data () {
    return {
      componentType: this.componentTypeOut ? this.componentTypeOut : 1,
      isPlayAdd: false,
      number: 1,
      isClose: true,
      showImg: false,
      showImgEx: false,
      urlList: ['home', 'exchangeCenter', 'shoppingCart', 'userCenter'],
      selectTypeData: {

      }
    }
  },
  methods: {
    close () {
      this.isClose = true
    },
    open (typeIndex) {
      debugger
      let _self = this
      this.isClose = false
      setTimeout(function () {
        if (typeIndex) {
          _self.selectType(_self.selectItemData[typeIndex])
        } else {
          _self.selectType(_self.selectItemData[0])
        }
      }, 10)
    },
    selectType (type) {
      debugger
      this.selectTypeData = type
      console.log(this.selectTypeData)
    },
    addNumber () {
      this.number += 1
    },
    reduceNumber () {
      if (this.number <= 1) return
      this.number -= 1
    },
    submit () {
      var _self = this

      console.log(_self.selectTypeData)
      if (!_self.selectTypeData.name) {
        this.$createDialog({
          type: 'error',
          content: `请选择类型！`,
          icon: 'cubeic-alert'
        }).show()
        return
      }

      _self.close()
      _self.isPlayAdd = true

      const toast = _self.$createToast({
        type: 'txt',
        time: 1000,
        txt: '添加成功!'
      })
      toast.show()

      service.addCart({
        prize_name: _self.selectPrizeName,
        prize_attr: _self.selectTypeData.name,
        quantity: _self.number
      }).then(function (res) {
        if (res.data.status_code !== 200) {
          alert('error:' + res.data.message + '-' + res.data.data.msg)
        }
        _self.$store.commit(
          'changeShoppingCartNumber',
          (_self.$store.getters.getShoppingCartNumber + 1)
        )
      })

      console.log(_self.selectTypeData)
    },
    submitC () {
      var _self = this
      console.log(_self.selectTypeData)
      if (!_self.selectTypeData.name) {
        this.$createDialog({
          type: 'error',
          content: `请选择类型！`,
          icon: 'cubeic-alert'
        }).show()
        return
      }
      _self.close()
      service.addCart({
        prize_name: _self.selectPrizeName,
        prize_attr: _self.selectItemData.name, //  传根的id
        quantity: _self.selectTypeData.detail.detail
      }).then(function (res) {
        if (res.data.status_code !== 200) {
          alert('error:' + res.data.message + '-' + res.data.data.msg)
        }
        _self.$emit('listenTochildEvent', { })
      })
    },
    showImage () {
      var _self = this
      _self.showImg = true
    },
    showImageEx () {
      var _self = this
      _self.showImgEx = true
    },
    hideImage () {
      var _self = this
      _self.showImg = false
    },
    hideImageEx () {
      var _self = this
      _self.showImgEx = false
    }
  },
  mounted: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ConfirmItem {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(1, 1, 1, 0.7);
  }
  .add-icon {
    position: fixed;
    bottom: -50px;
    left: 62%;
    color: $red;
    font-size: $font-size-large;
    font-weight: bold;
    opacity: 0;
  }
  .play-add {
    animation: playAdd 1s linear 1 normal;
    animation-fill-mode: forwards;
  }

  @keyframes playAdd {
    0% {
      bottom: 20px;
      opacity: 0;
    }
    10% {
      bottom: 20px;
      opacity: 1;
    }
    100% {
      bottom: 50px;
      opacity: 0;
    }
  }

  .content-in {
    position: fixed;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    background-color: #ffffff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 420px;
    padding: 10px;
    transition: 0.5s all;
    &.bigger{
      height: 458px;
      .type-select {
        height: 118px;
      }
    }

    .main-info {
      display: flex;
      height: 120px;
      position: relative;
      .close {
        background-image: url("../assets/image/close.png");
        background-size: 100% 100%;
        height: 20px;
        width: 20px;
        position: absolute;
        top: 0;
        right: 0;
      }

      .main-info-pic {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 80px;
          width: 80px;
        }
      }
      .main-info-in {
        flex: 2.2;
        height: 100%;
        p {
          text-align: left;
        }
        p:nth-of-type(1) {
          margin-top: 10px;
          color: #ff6e17;
          span:nth-of-type(1) {
            font-size: 16px;
          }
          span:nth-of-type(2) {
            font-size: 14px;
          }
        }
        p:nth-of-type(2) {
          margin-top: -4px;
          color: #999999;
          font-size: 12px;
        }
        p:nth-of-type(3) {
          color: #999999;
          font-size: 12px;
        }
      }
    }
    .type-select {
      height: 80px;

      border-bottom: 1px solid #eeeeee;
      .title {
        font-size: $font-size-bigger;
        color: #333333;
        font-weight: bold;
        text-align: left;
        height: 30px;
        span{
          float: right;
          font-size: $font-size-small;
          color: $orange-1;
          margin-top: 2px;
        }
      }
      .button-group {
        height: 50px;
        padding-top: 4px;
        margin-left: -3px;
        div {
          height: 32px;
          width: 44px;
          font-size: 14px;
          line-height: 32px;
          text-align: center;
          border-radius: 5px;
          border: 1px solid #999999;
          color: #999999;
          float: left;
          margin:3px;
        }
        div.checked {
          border: 1px solid $orange-1;
          color: $orange-1;
        }
      }
    }
    .number-select {
      height: 46px;
      border-bottom: 1px solid #eeeeee;
      .title {
        float: left;
        height: 100%;
        line-height: 46px;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        text-align: left;
        height: 30px;
      }
      .change-number {
        float: right;
        width: 100px;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 24px;
          height: 24px;
        }
        input {
          background-color: #f6f5f5;
          width: 32px;
          border-radius: 10px;
          height: 20px;
          font-size: 12px;
          color: #333333;
          text-align: center;
        }
      }
    }
    .item-describe {
      height: 96px;
      .title {
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        text-align: left;
        height: 40px;
        line-height: 40px;
      }
      .content {
        height: 56px;
        line-height: 16px;
        font-size: 12px;
        color: #666666;
        text-align: left;
        overflow-y: scroll;
      }
    }
    .item-submit {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .cube-btn {
        height: 40px;
        padding: 0;
        font-size: 18px;
        width: 290px;
        border-radius: 40px;
        background-color: #ff6e17;
      }
      .cube-btn:active {
        background-color: $orange-2;
      }
    }
  }

  .content-in-close {
    bottom: -460px;
  }
  .content-in-close.small {
    bottom: -376px;
  }
  .content-in-close.biggerEx{
    bottom: -414px;
  }

  .content-in.small {
    height: 376px;

  }

  .content-in.biggerEx{
    height: -414px;
    .type-select {
      height: 118px;
    }
  }

  .image-dialog{
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.7);
    top: 0;
    left: 0;
    z-index: 99999;
    overflow-y:auto;
    img{
      width: 80%;
      position:absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%)
    }
  }
  .image-dialog-ex{
    position: fixed;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.7);
    top: 0;
    left: 0;
    z-index: 99999;
    overflow-y:auto;
    img{
      width: 80%;
      position:absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%)
    }
  }
}
</style>
