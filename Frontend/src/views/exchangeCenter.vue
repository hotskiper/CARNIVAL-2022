<template>
  <div class="exchangeCenter">
    <img class="bg-img" alt="烽火嘉年华" src="../assets/image/exchangeCenterBg.jpg" />
    <p class="total-score" @click="goPage('scoreDetail')">{{this.$store.getters.getBalance}}</p>
    <div class="item-list">
      <div class="item-list-block" v-for="(item,key,index) in itemList" v-bind:key="key">
        <div class="item-list-in">
          <div class="check-bar">
            <!-- <img alt="Vue logo" :src="item.typeList[0].picBase64" /> -->
          </div>
          <div class="item-info">
            <div class="title">{{key}}</div>
            <div class="more">
              <span>{{item.price}}</span>
              <span>积分</span>
              <span>
                库存：{{item.quantity}}
              </span>
            </div>
          </div>
          <div class="action-bar">
            <div class="action-bar-in">
              <span @click="openSelect(key)">加入购物车</span>
            </div>
          </div>
        </div>
        <div class="item-list-line" v-if="index != (Object.keys(itemList).length-1)"></div>
      </div>
    </div>
    <div class="light-list">
      <div class="light-list-in">
        <div class="light-1"></div>
        <div class="light-2"></div>
      </div>
       <div class="light-list-in">
        <div class="light-1"></div>
        <div class="light-2"></div>
      </div>

       <div class="light-list-in">
        <div class="light-1"></div>
        <div class="light-2"></div>
      </div>
    </div>

    <BottomTabBar/>
    <ConfirmItem ref="ConfirmItem" :select-item-data="selectItemData" :select-prize-name="selectPrizeName"/>
    <div class="loading-dialog" v-if="isLoading">
      <cube-loading></cube-loading>
    </div>
  </div>
</template>
<style scoped lang="scss">
.exchangeCenter {
  .bg-img {
    width: 100%;
  }
  .total-score{
    width: 50px;
    font-size: $font-size-max;
    font-weight: bold;
    color: $orange-1;
    position: absolute;
    top: 66px;
    left: 50%;
    transform: translateX(-49px);
  }

  .item-list {
    position: absolute;
    top: 154px;
    // height: 600px;
    overflow-y:scroll;
    left: 50%;
    transform: translateX(-50%);
    width: 82%;
    padding: 10px 10px;
    border-radius: 6px;

    .item-list-in {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      .check-bar {
        flex: 0.8;
        font-size: $font-size-big;
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
        flex: 2.4;
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
          padding-top: 4px;
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
            color: $grey-1;
            padding: 4px;
            margin-left: 20px;
          }
        }
      }
      .action-bar {
        flex: 1.2;
        height: 100%;
        .action-bar-in {
          height: 50%;
          margin-top: 28px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          span {
            width: 70px;
            height: 22px;
            line-height: 22px;
            display: inline-block;
            border: 1px solid $orange-1;
            border-radius: 2px;
            font-size: $font-size-small;
            color: $orange-1;
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

  .light-list{
    .light-list-in{
      height: 50px;
      width: 20px;
      position: absolute;
      animation:lightMove 12s linear infinite;
      transform-origin: top center;

      .light-1{
        position: absolute;
        top: 0;
        left: 10px;
        height: 12.5px;
        width: 1px;
        background: url("../assets/image/light-1.png") no-repeat;
         background-size: 100%;
      }
      .light-2{
        position: absolute;
        top: 10px;
        left: 0px;
        height: 37.5px;
        width: 20px;
        background: url("../assets/image/light-2.png") no-repeat;
        background-size: 100%;
        animation:lightMoveIn 12s linear infinite;
        transform-origin: top center;
      }
      &:nth-of-type(1){
        top: 40px;
        left: 18px;
        animation-delay: 2.4s;
        .light-2{
           animation-delay: 2.4s;
        }
      }
      &:nth-of-type(2){
        top: 40px;
        left: 74px;
        animation-delay: 2s;
        .light-2{
           animation-delay: 2s;
        }
      }

      &:nth-of-type(3){
        top: 40px;
        right: 74px;
        animation-delay: 1s;
        .light-2{
           animation-delay: 1s;
        }
      }
    }
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
      money: 10,
      checked: true,
      number: 1,
      checkList: [1, 4],
      isLoading: true,
      itemList: [
        // {
        //   'state': 2,
        //   '_id': '5d54b1f2ff5c53cb0fd0c5df',
        //   'name': '徽章1',
        //   'currentNumber': 0,
        //   'typeList': [
        //     {
        //       'typeIndex': 1,
        //       'totalNumber': 100,
        //       'reserveNumber': 10,
        //       'currentNumber': 90,
        //       'price': 12,
        //       'state': 1,
        //       '_id': '5d78b4007774210b78dc79d2',
        //       'name': '绿色',
        //       'picBase64': '',
        //       'describe': '描述'
        //     }, {
        //       'typeIndex': 2,
        //       'totalNumber': 100,
        //       'reserveNumber': 10,
        //       'currentNumber': 90,
        //       'price': 12,
        //       'state': 1,
        //       '_id': '5d78b4007774210b78dc79d1',
        //       'name': '红色',
        //       'picBase64': 'fsdadafdaad',residue
        //       'describe': '描述1'
        //     }
        //   ]
        // }

      ],
      selectItemData: [],
      selectPrizeName: ''
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
    residue () {
      // let allScore = 0
      // this.$store.getters.getOnlineScore.forEach(item => {
      //   allScore += item
      // })
      // return allScore
      let number = parseInt(this.$store.getters.getOnlineScore - this.$store.getters.getConsumption)
      return number
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    openSelect (key) {
      debugger
      let _self = this
      _self.selectPrizeName = key

      service.getPrizeDetail({
        prize_name: key
      }).then(function (res) {
        if (res.data.status_code !== 200) {
          alert('error:' + res.data.message + '-' + res.data.msg)
        }
        let arr = []
        for (let k in res.data.data) {
          let param = {}
          param.name = k
          param.detail = res.data.data[k]
          arr.push(param)
        }
        _self.selectItemData = arr
        _self.$refs.ConfirmItem.open()
      })
    },
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    }
  },
  mounted: function () {
    var _self = this

    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }

    service.getCartInfo({}).then(function (res) {
      if (res.data.status_code !== 200) {
        alert('error:' + res.data.message + '-' + res.data.data.msg)
      }
      _self.$store.commit(
        'changeBalance',
        res.data.data.balance
      )
    })

    // service.getUserInfo({
    //   id: _self.$store.getters.getId
    // }).then(function (res) {
    //   if (res.data.status !== 200) {
    //     alert('error:' + res.data.message + '-' + res.data.data.msg)
    //   }
    //   _self.$store.commit(
    //     'changeName',
    //     res.data.data.name
    //   )
    //   _self.$store.commit(
    //     'changeCardNumber',
    //     res.data.data.cardNumber
    //   )
    //   _self.$store.commit(
    //     'changeOnlineScore',
    //     res.data.data.onlineScore
    //   )
    //   _self.$store.commit(
    //     'changeUnderTheLineScore',
    //     res.data.data.underTheLineScore
    //   )
    //   _self.$store.commit(
    //     'changeConsumption',
    //     res.data.data.consumption
    //   )
    //   _self.$store.commit(
    //     'changeId',
    //     res.data.data._id
    //   )
    //   _self.$store.commit(
    //     'changeShoppingCartNumber',
    //     res.data.data.shoppingCart.length
    //   )
    //   _self.$store.commit(
    //     'changeUserType',
    //     res.data.data.type
    //   )
    // })

    // service.getUserFragment({}).then(function (res) {
    //   if (res.data.status_code !== 200) {
    //     alert('error:' + res.data.message + '-' + res.data.msg)
    //   }
    //   _self.$store.commit(
    //     'changeOnlineScore',
    //     res.data.data
    //   )
    // })
    service.getPrizeInfo({}).then(function (res) {
      if (res.data.status_code !== 200) {
        alert('error:' + res.data.message + '-' + res.data.msg)
      }
      _self.itemList = res.data.data
      _self.isLoading = false
    })
  }
}
</script>
