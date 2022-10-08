<template>
  <div class="orderPage">
    <div class="order-info">
      <div class="user-info">
        <span class="title">收货人</span>
        <span class="content">{{this.$store.getters.getCardNumber}}{{this.$store.getters.getName}}</span>
      </div>
      <div class="position-info">
        <span class="title">配送地址</span>
        <div class="content" @click="showPicker">
          <span class="content-1">{{postionName}}</span>
          <span class="content-2">{{positionValue}}</span>
        </div>
        <i class="cubeic-arrow"></i>
      </div>
    </div>
    <div class="item-list">
      <div class="item-list-block" v-for="(item,index) in checkedItemList" v-bind:key="index">
        <div class="item-list-in">
          <div class="check-bar">
            <img alt="Vue logo" src="" />
          </div>
          <div class="item-info">
            <div class="title">{{item.item.name}}</div>
            <div class="more">
              <span>{{ item.number * item.item.price}}</span>
              <span>积分</span>
              <span>
                 {{item.item.attr}}
                <i class="cubeic-select"></i>
              </span>
            </div>
          </div>
          <div class="action-bar">
            <div class="change-number">
              <span>x{{item.number}}</span>
            </div>
          </div>
        </div>
        <div class="item-list-line"  v-if="index != (checkedItemList.length-1)"></div>
      </div>

      <!-- <div class="item-list-in">
        <div class="check-bar">
            <img alt="Vue logo" src="../assets/image/item.jpg" />
        </div>
        <div class="item-info">
          <div class="title">异形抱枕</div>
          <div class="more">
            <span>12</span>
            <span>积分</span>
            <span>
              绿色
              <i class="cubeic-select"></i>
            </span>
          </div>
        </div>
        <div class="action-bar">
          <div class="change-number">
            <span>x1</span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="bottom-bar">
      <div class="bottom-bar-block"></div>
      <div class="bottom-bar-block"></div>
      <div class="bottom-bar-block">
        <p>
          合计积分：
          <span>{{allPrice}}</span>
        </p>
      </div>
      <div class="bottom-bar-block">
        <cube-button @click="submit()">提交订单</cube-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.orderPage {
  padding: 16px 10px 32px 10px;
  .order-info {
    background-color: $white;
    width: 100%;
    padding: 0 10px;
    border-radius: 6px;
    height: 110px;
    margin-bottom: 10px;

    .user-info {
      height: 46px;
      border-bottom: 1px solid $grey-4;
      font-size: $font-size-bigger;
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
        line-height: 42px;
        text-align: left;
        float: left;
        color: $grey-3;
        .content-1 {
          float: left;
          font-weight: bold;
          width: 100%;
        }
        .content-2 {
          float: left;
          color: $grey-2;
          line-height: 22px;
          margin-top: -10px;
        }
      }
      i {
        color: $grey-2;
        position: absolute;
        top: 22px;
        right: 0;
      }
    }
  }

  .item-list {
    background-color: $white;
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

          color: #784b1e;
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
            font-size: $font-size-bigger;
            color: $grey-2;
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

  .bottom-bar {
    position: fixed;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    background-color: $white;
    height: 70px;
    display: flex;
    .bottom-bar-block {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bottom-bar-block:nth-of-type(1) {
      display: flex;
      flex: 1.5;
      justify-content: flex-start;
      font-size: $font-size-bigger;
      color: $grey-2;
    }
    .bottom-bar-block:nth-of-type(2) {
      flex: 0.5;
    }
    .bottom-bar-block:nth-of-type(3) {
      flex: 1.5;
      p {
        line-height: 40px;
        font-size: $font-size-bigger;
        height: 40px;
        color: $grey-2;
        span {
          color: $orange-1;
          font-weight: bold;
          font-size: $font-size-large;
        }
      }
    }

    .bottom-bar-block:nth-of-type(4) {
      flex: 2;
      .cube-btn {
        font-size: $font-size-more-large;
        width: 80%;
        border-radius: 40px;
        background-color: $orange-1;
      }
       .cube-btn:active {
        background-color: $orange-2;
      }
    }
  }
}
</style>
<script>
import service from '../javascript/common/services'
export default {
  name: 'orderPage',
  data () {
    return {
      money: 10,
      checked: true,
      number: 1,
      checkList: [1, 4],
      checkedItemList: this.$route.params.checkedItemList,
      positionList: [
        { text: '本部(南京)', value: '南京市云龙山路88号' },
        { text: '南宁研发中心', value: '佛子岭路荣和e中心A座722' },
        { text: '深圳研发中心', value: '农轩路农轩100大院' },
        { text: '广州研发中心', value: '高迅大厦1703室' },
        { text: '重庆研发中心', value: '汉国中心B505-506' },
        { text: '大连研发中心', value: '现代服务业总部大厦' },
        { text: '上海研发中心', value: '浦星公路797号5栋B座3楼' },
        { text: '武汉研发中心', value: '武汉软件新城一期A4栋B座四楼' },
        { text: '内蒙研发中心', value: '呼和浩特市公安局' },
        { text: '石家庄研发中心', value: '金立方大厦2407室' },
        { text: '青岛研发中心', value: '中山路18号' },
        { text: '北京研发中心', value: '嘉悦广场1号楼1302' },
        { text: '杭州研发中心', value: '近江时代大厦c902' },
        { text: '沈阳研发中心', value: '市府恒隆办公楼1号楼1913室' },
        { text: '太原研发中心', value: '坞城南路56' },
        { text: '长春研发中心', value: '长春市公安局（人民广场）' },
        { text: '贵州研发中心', value: '德福中心A7-10-7' },
        { text: '成都研发中心', value: '航天科技大厦7楼707B' },
        { text: '新疆研发中心', value: '钱塘江路外滩一号27楼2712室' },
        { text: '郑州研发中心', value: '世玺中心1212室' },
        { text: '天津研发中心', value: '天津市公安局东门' },
        { text: '合肥研发中心', value: '合肥市公安局' },
        { text: '西安研发中心', value: '立人科技园B座6F' },
        { text: '无固定地址', value: '请星空下联系“周祺”，安排邮寄' }
      ],
      postionName: '请选择',
      positionValue: '请选择'
    }
  },
  computed: {
    username () {
      return 'zzy'
    },
    allPrice () {
      let _self = this
      let price = 0
      _self.checkedItemList.forEach(function (item) {
        if (item.checked) {
          price += item.item.price * item.number
        }
      })
      return price
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
    submit () {
      var _self = this

      if (_self.positionValue === '请选择') {
        this.$createDialog({
          type: 'error',
          content: `请先选择地址！`,
          icon: 'cubeic-alert'
        }).show()
        return
      }

      var r = confirm('确认提交订单?')
      if (r === true) {
        // let itemIdList = ''
        // let typeIndexList = ''
        // let numberList = ''

        // console.log(_self.checkedItemList)

        // _self.checkedItemList.forEach(function (item, index) {
        //   if (index !== _self.checkedItemList.length - 1) {
        //     itemIdList += item.item._id + ','
        //     typeIndexList += item.typeIndex + ','
        //     numberList += item.number + ','
        //   } else {
        //     itemIdList += item.item._id
        //     typeIndexList += item.typeIndex
        //     numberList += item.number
        //   }
        // })

        service.buyCart({
          user_name: this.$store.getters.getName,
          address: _self.positionValue,
          phone: 12342342341
        }).then(function (res) {
          if (res.data.status_code !== 200) {
            alert('error:' + res.data.message + '-' + res.data.data.msg)
          }
          _self.$store.commit(
            'changeShoppingCartNumber',
            (_self.$store.getters.getShoppingCartNumber - _self.checkedItemList.length)
          )

          service.getCartInfo({}).then(function (res) {
            if (res.data.status_code !== 200) {
              alert('error:' + res.data.message + '-' + res.data.data.msg)
            }
            _self.$store.commit(
              'changeBalance',
              res.data.data.balance
            )
            _self.goPage('orderResultPage')
          })
        })

        // service.addOrder({
        //   userId: _self.$store.getters.getId,
        //   itemIdList: itemIdList,
        //   typeIndexList: typeIndexList,
        //   numberList: numberList,
        //   position: _self.positionValue
        // }).then(function (res) {
        //   if (res.data.status !== 200) {
        //     alert('error:' + res.data.message + '-' + res.data.data.msg)
        //   }
        //   _self.$store.commit(
        //     'changeShoppingCartNumber',
        //     (_self.$store.getters.getShoppingCartNumber - _self.checkedItemList.length)
        //   )
        //   service.getUserInfo({
        //     id: _self.$store.getters.getId
        //   }).then(function (res) {
        //     if (res.data.status !== 200) {
        //       alert('error:' + res.data.message + '-' + res.data.data.msg)
        //     }
        //     _self.$store.commit(
        //       'changeConsumption',
        //       res.data.data.consumption
        //     )
        //     _self.goPage('orderResultPage')
        //   })
        // })
      } else {

      }
    },
    showPicker () {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '地址选择',
          data: [this.positionList],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      this.postionName = selectedText[0]
      this.positionValue = selectedVal[0]
    },
    cancelHandle () {

    }
  },
  mounted: function () {
    var _self = this
    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }
  }
}
</script>
