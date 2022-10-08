<template>
  <div class="shoppingCart">
    <img alt="Vue logo" class="img-ab-2" src="../assets/image/bg4.png" />
    <div class="none-style" v-if="itemAllInfoList.length <= 0">╮（╯＿╰）╭ 空空如也~</div>
    <div class="item-list" v-if="itemAllInfoList.length > 0">
      <div class="item-list-block" v-for="(item,index) in itemAllInfoList" v-bind:key="index">
        <div class="item-list-in">
          <div class="check-bar">
            <cube-checkbox v-model="item.checked">
              <img alt="Vue logo" src="" />
            </cube-checkbox>
          </div>
          <div class="item-info">
            <div class="title">{{item.item.name}}</div>
            <div class="more">
              <span>{{item.item.price}}</span>
              <span>积分</span>
              <span @click="changeType(index,1)">
                {{item.item.attr}}
              </span>
            </div>
          </div>
          <div class="action-bar">
            <div class="change-number">
              <img alt="add" src="../assets/image/reduce.png" @click="changeNumber(item,-1)"/>
              <input type="text" v-model="item.number" readonly/>
              <img alt="add" src="../assets/image/add.png" @click="changeNumber(item,1)"/>
            </div>
          </div>
        </div>
        <div class="item-list-line" v-if="index != (itemAllInfoList.length-1)"></div>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="bottom-bar-block">
        <cube-checkbox v-model="allChecked">全选</cube-checkbox>
      </div>
      <div class="bottom-bar-block"></div>
      <div class="bottom-bar-block">
        <p>
          合计积分：<span>{{allPrice}}</span>
          <br />可用积分：<span :class="{'gery': this.$store.getters.getBalance < 0}">{{this.$store.getters.getBalance}}</span>
        </p>
      </div>
      <div class="bottom-bar-block">
        <cube-button @click="buy" :class="{'disabledClass':this.$store.getters.getBalance < 0}">结算({{selectNumber}})</cube-button>
      </div>
    </div>
     <div class="loading-dialog" v-if="isLoading">
      <cube-loading></cube-loading>
    </div>
        <div class="bottom-bar-ex"></div>
        <BottomTabBar/>
           <ConfirmItem ref="ConfirmItem" v-on:listenTochildEvent="updateDate" :componentTypeOut="componentType" :select-item-data="selectItemData"  :select-item-data-number="selectItemDataNumber" />
    </div>

</template>
<style scoped lang="scss">
.shoppingCart {
  padding: 16px 10px 32px 10px;
  img {
      width: 100%;
  }
  .img-ab-2{
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .item-list {
    background-color: #ffffff;
    width: 100%;
    padding: 10px 10px;
    border-radius: 6px;

    .item-list-in {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      .check-bar {
        flex: 1.2;
        font-size: $font-size-large;
        height: 100%;
        .cube-checkbox {
          padding: 0;
          height: 100%;
        }

        img {
          width: 44px;
          height: 44px;
          margin-top: 7px;
        }
      }
      .item-info {
        flex: 3;
        height: 100%;
        .title {
          height: 50%;

          font-size: $font-size-large;

          color: #784b1e;
          line-height: 32px;
          text-align: left;
        }
        .more {
          height: 50%;
          margin-top: -2px;
          line-height: 16px;
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
            padding-right: 8px;
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
          justify-content: center;
          img{
            width: 24px;
            height: 24px;
          }
          input {
            width: 32px;
            border-radius: 10px;
            height: 20px;
            font-size: $font-size-small;
            color: $grey-3;
            text-align: center;
          }
        }
      }
    }

    .item-list-line{
      margin: 10px 0 10px 10px;
      width: calc(100% - 10px);
      border-bottom: 1px solid #dfdbcf;
    }

  }

  .bottom-bar {
    position: fixed;
    left: 0rem;
    right: 0rem;
    bottom: 60px;
    background-color: $white;
    height: 70px;
    display: flex;
    .bottom-bar-block {
      display: flex;
      align-items: center;
      justify-content: center;
      .disabledClass{
        opacity: 0.5;
      }
    }
    .bottom-bar-block:nth-of-type(1) {
      display: flex;
      flex: 1.5;
      justify-content: flex-start;
      font-size: $font-size-bigger;
      color: $grey-2;
    }
    .bottom-bar-block:nth-of-type(2) {
      flex: 0.3;
    }
    .bottom-bar-block:nth-of-type(3) {
      flex: 1.7;
      p {
        line-height: 20px;
        font-size: $font-size-bigger;
        height: 40px;
        color: $grey-2;
        span {
          color: $orange-1;
          font-weight: bold;
        }
        span.gery{
          color: $grey-1
        }
      }
    }

    .bottom-bar-block:nth-of-type(4) {
      flex: 2;
      .cube-btn {
        height: 40px;
        padding: 0;
        font-size: $font-size-more-large;
        width: 80%;
        border-radius: 40px;
        background-color: $orange-1;
      }
       .cube-btn:active {
        background-color: $orange-2;
      }
      .cube-btn_disabled
      {
         background-color: $grey-6;
         position: initial;
      }
    }
  }

  .bottom-bar-ex{
     position: fixed;
    left: 0rem;
    right: 0rem;
    bottom:  0rem;
    background-color: $white;
    height: 60px;
  }
}
</style>
<script>
import BottomTabBar from '@/components/BottomTabBar.vue'
import ConfirmItem from '@/components/ConfirmItem.vue'
import service from '../javascript/common/services'

export default {
  name: 'home',
  data () {
    return {
      componentType: 2,
      isLoading: true,
      money: 10,
      number: 1,
      checkList: [1, 4],
      selected4: '1',
      orderList: [],
      selectItemDataNumber: 0,
      selectItemData: [],
      // allPrice: 0,
      // balance: 0,
      itemAllInfoList: [
        // {
        //   item: {
        //     _id: '',
        //     name: '',
        //     state: 2,
        //     typeList: [
        //       {
        //         typeIndex: 1,
        //         totalNumber: 100,
        //         reserveNumber: 10,
        //         currentNumber: 90,
        //         price: 12,
        //         state: 1,
        //         _id: '',
        //         name: '',
        //         picBase64: '',
        //         describe: ''
        //       }
        //     ]
        //   },
        //   typeIndex: 0,
        //   number: 1,
        //   id: ''
        // }
      ]
    }
  },
  components: {
    BottomTabBar,
    ConfirmItem
  },
  computed: {
    username () {
      return 'zzy'
    },
    allChecked: {
      get () {
        let _self = this
        let isAllChecked = true
        if (_self.itemAllInfoList.length > 0) {
          _self.itemAllInfoList.forEach(function (item) {
            if (!item.checked) {
              isAllChecked = false
            }
          })
        } else {
          isAllChecked = false
        }

        return isAllChecked
      },
      set (val) {
        let _self = this
        _self.itemAllInfoList.forEach(function (item) {
          item.checked = val
        })
      }

    },
    allPrice () {
      let _self = this
      let price = 0
      if (_self.itemAllInfoList.length > 0) {
        _self.itemAllInfoList.forEach(function (item) {
          if (item.checked) {
            price += item.item.price * item.number
          }
        })
      }

      return price
    },
    residue () {
      let number = parseInt(this.$store.getters.getOnlineScore + this.$store.getters.getUnderTheLineScore - this.$store.getters.getConsumption - this.allPrice)
      return number

      // let allScore = 0
      // this.$store.getters.getOnlineScore.forEach(item => {
      //   allScore += item
      // })
      // return parseInt(allScore - this.$store.getters.getConsumption - this.allPrice)
    },
    selectNumber () {
      let _self = this
      let selectNumber = 0
      _self.itemAllInfoList.forEach(function (item) {
        if (item.checked) {
          selectNumber += 1
        }
      })
      return selectNumber
    }

  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    },
    changeType (index, typeIndex) {
      this.$refs.ConfirmItem.open(typeIndex)
      this.selectItemData = this.itemAllInfoList[index].item
      this.selectItemDataNumber = this.itemAllInfoList[index].number // 改变种类才有
    },
    changeNumber (item, number) {
      var _self = this
      item.number += number
      if (item.number < 1) {
        item.number = 1
        var r = confirm('是否删除该物品?')
        if (r === true) {
          service.removeCart({
            // userId: _self.$store.getters.getId,
            // itemId: item.item._id,
            // typeIndex: item.typeIndex,
            // number: item.number,
            // type: 'delete'
            prize_name: item.item.name,
            prize_attr: item.item.attr,
            quantity: item.number
          }).then(function (res) {
            // if (parseInt(res.data.status_code) === 200) {
            //   for (var i = 0; i < _self.itemAllInfoList.length; i++) {
            //     if (_self.itemAllInfoList[i].id === item.id) {
            //       _self.itemAllInfoList.splice(i, 1)
            //       i--
            //       break
            //     }
            //   }
            // }
          })
        } else {

        }
      } else {
        service.addCart({
          prize_name: item.item.name,
          prize_attr: item.item.attr,
          quantity: item.number
        }).then(function (res) { })
      }
    },
    buy () {
      let _self = this
      if (_self.$store.getters.getBalance < 0) {
        return
      }

      if (_self.allPrice <= 0) {
        this.$createDialog({
          type: 'error',
          content: `请先选择物品！`,
          icon: 'cubeic-alert'
        }).show()
        return
      }
      let checkedItemList = []
      _self.itemAllInfoList.forEach(function (item) {
        if (item.checked) {
          checkedItemList.push(item)
        }
      })

      _self.$router.push({ name: 'orderPage',
        params: {
          checkedItemList: checkedItemList
        } })
    },
    updateDate () {
      var _self = this
      _self.isLoading = true
      // let itemList = []
      // let itemInfoList = []
      let itemAllInfoList = []
      service.getCartInfo({}).then(function (res) {
        // _self.allPrice = res.data.data.total_amount
        // _self.balance = res.data.data.balance
        if (res.data.data.detail.length > 0) {
          res.data.data.detail.forEach(function (itemIn) {
            _self.itemAllInfoList.push({
              item: itemIn,
              number: itemIn.quantity,
              checked: false
            })
          })
        }
        _self.$store.commit(
          'changeBalance',
          res.data.data.balance
        )
        _self.isLoading = false
      })

      // service.getUserInfo({
      //   id: _self.$store.getters.getId
      // }).then(function (res) {
      //   itemList = res.data.data.shoppingCart
      //   service.getItemList({}).then(function (res) {
      //     itemInfoList = res.data.data
      //     if (itemList.length > 0) {
      //       itemList.forEach(function (item) {
      //         itemInfoList.forEach(function (itemIn) {
      //           if (item.id === itemIn._id) {
      //             itemIn.typeList.forEach(function (itemInIn) {
      //               if (itemInIn.typeIndex === item.typeIndex) {
      //                 itemAllInfoList.push({
      //                   item: itemIn,
      //                   typeIndex: item.typeIndex,
      //                   number: item.number,
      //                   id: item.id,
      //                   checked: false
      //                 })
      //               }
      //             })
      //           }
      //         })
      //         _self.isLoading = false
      //       })
      //     } else {
      //       _self.isLoading = false
      //     }
      //   })
      //   _self.itemAllInfoList = itemAllInfoList
      // })
    }
  },
  mounted: function () {
    var _self = this

    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }

    service.getUserInfo({
      id: _self.$store.getters.getId
    }).then(function (res) {
      _self.$store.commit(
        'changeName',
        res.data.data.name
      )
      _self.$store.commit(
        'changeCardNumber',
        res.data.data.cardNumber
      )
      _self.$store.commit(
        'changeOnlineScore',
        res.data.data.onlineScore
      )
      _self.$store.commit(
        'changeUnderTheLineScore',
        res.data.data.underTheLineScore
      )
      _self.$store.commit(
        'changeConsumption',
        res.data.data.consumption
      )
      _self.$store.commit(
        'changeId',
        res.data.data._id
      )
      _self.$store.commit(
        'changeShoppingCartNumber',
        res.data.data.shoppingCart.length
      )
      _self.$store.commit(
        'changeUserType',
        res.data.data.type
      )
    })

    // let itemList = []
    // let itemInfoList = []
    // let itemAllInfoList = []
    service.getCartInfo({}).then(function (res) {
      // _self.allPrice = res.data.data.total_amount
      // _self.balance = res.data.data.balance
      if (res.data.data.detail.length > 0) {
        res.data.data.detail.forEach(function (itemIn) {
          _self.itemAllInfoList.push({
            item: itemIn,
            number: itemIn.quantity,
            checked: false
          })
        })
      }
      _self.$store.commit(
        'changeBalance',
        res.data.data.balance
      )

      _self.isLoading = false
    })

    // service.getUserInfo({
    //   id: _self.$store.getters.getId
    // }).then(function (res) {
    //   itemList = res.data.data.shoppingCart
    //   service.getItemList({}).then(function (res) {
    //     itemInfoList = res.data.data
    //     if (itemList.length > 0) {
    //       itemList.forEach(function (item) {
    //         itemInfoList.forEach(function (itemIn) {
    //           if (item.id === itemIn._id) {
    //             itemIn.typeList.forEach(function (itemInIn) {
    //               if (itemInIn.typeIndex === item.typeIndex) {
    //                 itemAllInfoList.push({
    //                   item: itemIn,
    //                   typeIndex: item.typeIndex,
    //                   number: item.number,
    //                   id: item.id,
    //                   checked: false
    //                 })
    //               }
    //             })
    //           }
    //         })
    //         _self.isLoading = false
    //       })
    //     } else {
    //       _self.isLoading = false
    //     }
    //   })
    //   _self.itemAllInfoList = itemAllInfoList
    // })
  }
}
</script>
