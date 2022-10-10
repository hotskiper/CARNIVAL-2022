<template>
  <div class="orderPage">
    <div class="order-info" v-if="orderListActive.length <= 0">
      <div class="none-style">╮（╯＿╰）╭ 空空如也~</div>
    </div>

    <div class="order-info" v-for="(itemOut,indexOut) in orderListActive" v-bind:key="indexOut">
      <div class="order-info-title">
        <p>订单{{indexOut+1}}</p>
        <p>{{itemOut.state === 1?"配送中":"已到达"}}</p>
      </div>
      <div class="order-info-in" :style="orderInfoObject(indexOut)" >
        <div class="item-block"  v-for="(item,index) in itemOut.itemList" v-bind:key="index">
          <div class="item-list-in">
                    <div class="check-bar">
                      <img alt="Vue logo" :src="'https://47.94.39.209:53376/img/'+ item.name + '.jpg'" />
                    </div>
                    <div class="item-info">
                      <div class="title">{{item.name}}</div>
                      <div class="more">
                        <span>{{item.price}}</span>
                        <span>积分</span>
                        <span>
                          {{item.prize_attr}}
                        </span>
                      </div>
                    </div>
                    <div class="action-bar">
                      <div class="change-number">
                        <span>x{{item.quantity}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="item-list-line" v-if="index != (itemOut.itemList.length - 1)"></div>
        </div>

        <div class="user-info">
          <span class="title">收货人</span>
          <span class="content"> {{itemOut.cardNumber}}{{itemOut.name}}</span>
        </div>
        <div class="position-info">
          <span class="title">配送地址</span>
          <div class="content">
            {{itemOut.position}}
          </div>
        </div>
      </div>
      <div class="order-info-summary">
        <!-- <p><span  @click="deleteOrder(itemOut._id,indexOut,itemOut.priceAll)" v-if="itemOut.state === 1">撤销</span></p> -->
        <!-- <p @click="toggleOrder(indexOut)">
          <span class="down" v-if="!itemOut.orderInfoInIsClose"><span>收起&nbsp;</span><span>︿</span></span>
          <span class="up" v-if="itemOut.orderInfoInIsClose"><span>展开&nbsp;</span><span>﹀</span></span>  </p> -->
        <p><span>商品{{itemOut.allCount}}件</span><span>合计：</span><span>{{itemOut.priceAll}}</span></p>
      </div>
    </div>
    <div class="loading-dialog" v-if="isLoading">
      <cube-loading></cube-loading>
    </div>
  </div>
</template>
<style scoped lang="scss">
.orderPage {
  padding: 16px 10px 32px 10px;
  .order-info {
    background-color: $white;
    width: 100%;
    border-radius: 6px;
    margin-bottom: 10px;

    .order-info-title {
      height: 40px;
      border-bottom: 1px solid $grey-4;
      p:nth-of-type(1) {
        color: $grey-3;
        float: left;
        font-weight: bold;
        line-height: 40px;
        font-size: $font-size-bigger;
        padding-left: 10px;
        .rotate{

        }
      }
      p:nth-of-type(2) {
        color: $grey-1;
        float: right;
        height: 100%;
        line-height: 40px;
        font-size: $font-size-bigger;
        padding-right: 10px;
      }
      margin-bottom: 10px;
    }

    .order-info-summary{
       height: 40px;
      // border-bottom: 1px solid $grey-4;
       p:nth-of-type(1) {
        color: $red;
        float: left;
        line-height: 40px;
        font-size: $font-size-small;
        padding-left: 10px;
      }
      // p:nth-of-type(1) {
      //   color: $grey-3;
      //   float: left;
      //   line-height: 40px;
      //   font-size: $font-size-small;
      //   padding-left: 10px;
      //   .down{
      //     span{
      //       float: left;
      //     }
      //     span:nth-of-type(2){
      //       margin-top: -2px;
      //     }
      //   }
      //   .up{
      //     span{
      //       float: left;
      //     }
      //     span:nth-of-type(2){
      //       margin-top: 2px;
      //     }
      //   }
      // }
      p:nth-of-type(2) {
        color: $grey-1;
        float: right;
        height: 100%;
        line-height: 40px;
        font-size: $font-size-small;
        padding-right: 10px;
        span:nth-of-type(2){
          color: $grey-3;
        }
        span:nth-of-type(3){
          color: $orange-1;
        }
      }
    }

    .order-info-in {
      width: 100%;
      padding: 0 10px;
      height: auto;
       overflow: hidden;
      transition: 0.5s all;
      .user-info {
        height: 46px;
        border-bottom: 1px solid $grey-4;
        font-size: $font-size-bigger;
        margin-top: 10px;
        span {
          display: inline-block;
        }
        .title {
          line-height: 46px;
          width: 72px;
          text-align: left;
          color: $grey-1;
          float: left;
        }
        .content {
          line-height: 46px;
          text-align: left;
          float: left;
          color: $grey-3;
          font-weight: bold;
        }
      }
      .position-info {
        height: 64px;
        font-size: $font-size-bigger;
        position: relative;
        .title {
          line-height: 42px;
          width: 72px;
          text-align: left;
          color: $grey-1;
          float: left;
        }
        .content {
          height: 100%;
          display: block;
          width: calc(100% - 72px);

          text-align: left;
          float: left;
          color: $grey-2;
          overflow-y:auto;
          padding-top: 10px;
        }
        i {
          color: $grey-2;
          position: absolute;
          top: 22px;
          right: 0;
        }
      }

      .item-list-in {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        .check-bar {
          flex: 0.8;
          font-size: $font-size-large;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          img {
            width: 44px;
            height: 44px;
            margin-top: 2px;
          }
        }
        .item-info {
          flex: 3;
          height: 100%;
          .title {
            height: 50%;

            font-size: $font-size-large;

            color: $brown-1;
            line-height: 40px;
            text-align: left;
          }
          .more {
            height: 50%;

            line-height: 16px;
            margin-top: -2px;
            text-align: left;
            span:nth-of-type(1) {
              font-size: $font-size-large;
              color: $orange-1;
              font-weight: bold;
            }
            span:nth-of-type(2) {
              font-size: $font-size-middle;
              color: $orange-1;
            }
            span:nth-of-type(3) {
              font-size: $font-size-small;
              background-color: $white-2;
              color: $grey-1;
              padding: 4px;
              margin-left: 20px;
            }
          }
        }
        .action-bar {
          flex: 1.2;
          height: 100%;
          .change-number {
            height: 50%;
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span {
              font-size: $font-size-big;
              color: $grey-1;
              text-align: center;
            }
          }
        }
      }

      .item-list-line {
        margin: 10px 0;
        width: 100%;
        border-bottom: 1px solid $grey-4;
      }
    }

  }

}
</style>
<script>
import service from '../javascript/common/services'
export default {
  name: 'home',
  data () {
    return {
      money: 10,
      checked: true,
      number: 1,
      checkList: [1, 4],
      orderList: [

      ],
      isLoading: true
    }
  },
  computed: {
    orderListActive () {
      var _self = this
      var orderListActive = []
      _self.orderList.forEach(element => {
        // if (element.state !== 0) {
        orderListActive.push(element)
        // }
      })
      return orderListActive
    }
  },
  methods: {
    orderInfoObject: function (index) {
      var _self = this
      return {
        'height': _self.orderListActive[index]['orderInfoInIsClose'] ? '0' : _self.orderListActive[index].itemList.length * 90 - 21 + 120 + 'px'
      }
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    },
    upDate () {
      var _self = this
      // service.getPrizeInfo({}).then(function (res) {
      //   let itemInfoList = res.data.data

      service.getOrderInfo({}).then(function (resIn) {
        let orderList = []
        if (resIn.data.status_code === 200) {
          let param = {}
          param.orderInfoInIsClose = false // 接口无此属性，是否要加
          param.cardNumber = _self.$store.getters.getCardNumber
          param.name = resIn.data.data.user_name
          param.priceAll = resIn.data.data.total_amount
          param.position = resIn.data.data.address
          param.itemList = resIn.data.data.detail_info
          param.allCount = resIn.data.data.all_count
          orderList.push(param)
        }
        // let orderList = resIn.data.data

        // orderList.forEach(function (item) {
        // item.orderInfoInIsClose = false
        // item.cardNumber = _self.$store.getters.getCardNumber
        // item.name = _self.$store.getters.getName
        // item.priceAll = 0
        // item.itemList.forEach(function (itemIn) { // 订单的itemList的item
        //   itemInfoList.forEach(function (itemInIn) { // 物品信息list的item
        //     if (itemInIn._id === itemIn.id) {
        //       itemInIn.typeList.forEach(function (itemInInIn) { // 物品信息list的item的typeList
        //         if (itemInInIn.typeIndex === itemIn.typeIndex) {
        //           itemIn.name = itemInInIn.name
        //           itemIn.price = itemInInIn.price
        //           itemIn.picBase64 = itemInInIn.picBase64
        //           itemIn.describe = itemInInIn.describe
        //           item.priceAll += itemInInIn.price * itemIn.number
        //           itemIn.nameO = itemInIn.name
        //         }
        //       })
        //     }
        //   })
        // })
        // })
        _self.orderList = orderList
        _self.isLoading = false
      }).catch(() => {
        _self.orderList = []
        _self.isLoading = false
      })
      // })
    },
    toggleOrder (index) {
      var _self = this
      _self.orderListActive[index]['orderInfoInIsClose'] = !_self.orderListActive[index]['orderInfoInIsClose']
    },
    deleteOrder (id, indexOut, priceAll) {
      var _self = this
      var r = confirm('确认撤销订单?')
      if (r === true) {
        service.updateOrder({
          id: id,
          state: 0
        }).then(function (res) {
          if (res.data.status !== 200) {
            alert('error:' + res.data.message + '-' + res.data.data.msg)
          }
          _self.$store.commit(
            'changeConsumption',
            (parseInt(_self.$store.getters.getConsumption) - parseInt(priceAll))
          )
          _self.upDate()
        })
      } else {

      }
    }
  },
  mounted: function () {
    var _self = this
    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }
    _self.upDate()
  }
}
</script>
