<template>
  <div class="orderPage">
     <div class="order-info">
      <div class="order-info-title">
        <img alt="Vue logo" src="../assets/image/title-1.png" />
      </div>
      <div class="order-info-in">
         <div class="item-list-block">
            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee21612b3397db86e9891'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee21612b3397db86e9891'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee21612b3397db86e9891'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee21612b3397db86e9891'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>
            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee23112b3397db86e989f'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee23112b3397db86e989f'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee23112b3397db86e989f'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee23112b3397db86e989f'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>
             <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee24212b3397db86e98a6'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee24212b3397db86e98a6'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee24212b3397db86e98a6'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee24212b3397db86e98a6'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

             <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee24d12b3397db86e98ae'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee24d12b3397db86e98ae'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee24d12b3397db86e98ae'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee24d12b3397db86e98ae'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee25c12b3397db86e98bb'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee25c12b3397db86e98bb'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee25c12b3397db86e98bb'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee25c12b3397db86e98bb'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee26e12b3397db86e98c3'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee26e12b3397db86e98c3'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee26e12b3397db86e98c3'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee26e12b3397db86e98c3'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee29412b3397db86e98d4'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee29412b3397db86e98d4'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee29412b3397db86e98d4'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee29412b3397db86e98d4'].time}}</span>
                </div>
              </div>
            </div>

         </div>

      </div>
    </div>

     <!-- <div class="order-info" style="display:none"> -->
      <!-- <div class="order-info-title">
        <img alt="Vue logo" src="../assets/image/title-2.png" />
      </div>
      <div class="order-info-in">
         <div class="item-list-block">
            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d54b525ff5c53cb0fd0c6c0'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d54b525ff5c53cb0fd0c6c0'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d54b525ff5c53cb0fd0c6c0'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d54b525ff5c53cb0fd0c6c0'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>
            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee29412b3397db86e98d4'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee29412b3397db86e98d4'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee29412b3397db86e98d4'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee29412b3397db86e98d4'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>
             <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee2a812b3397db86e98de'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee2a812b3397db86e98de'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee2a812b3397db86e98de'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee2a812b3397db86e98de'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee2bf12b3397db86e98eb'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee2bf12b3397db86e98eb'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee2bf12b3397db86e98eb'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee2bf12b3397db86e98eb'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee2cc12b3397db86e98f6'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee2cc12b3397db86e98f6'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee2cc12b3397db86e98f6'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee2cc12b3397db86e98f6'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee2d712b3397db86e9900'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee2d712b3397db86e9900'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee2d712b3397db86e9900'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee2d712b3397db86e9900'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5d7ee2e412b3397db86e9906'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5d7ee2e412b3397db86e9906'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5d7ee2e412b3397db86e9906'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5d7ee2e412b3397db86e9906'].time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line"></div>

            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="allGameInfo['5da3d0e7ab6d04fe96cde88b'].img" />
              </div>
              <div class="item-info">
                <div class="title">
                  <span>{{allGameInfo['5da3d0e7ab6d04fe96cde88b'].number}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{allGameInfo['5da3d0e7ab6d04fe96cde88b'].name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{allGameInfo['5da3d0e7ab6d04fe96cde88b'].time}}</span>
                </div>
              </div>
            </div>
         </div>
      </div>
    </div> -->

    <!-- <div class="order-info"  v-if="onlineLogList.length > 0">
      <div class="order-info-title">
        <img alt="Vue logo" src="../assets/image/title-1.png" />
      </div>
      <div class="order-info-in">
         <div class="item-list-block" v-for="(item,index) in onlineLogList" v-bind:key="index">
            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="item.img" />
              </div>
              <div class="item-info">
                <div class="title" :class="{'gery':item.number < 0}">
                  <span>{{item.numberStr}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{item.time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line" v-if="index !== (onlineLogList.length - 1)"></div>
         </div>

      </div>
    </div>
     <div class="order-info" v-if="underTheLineLogList.length > 0">
      <div class="order-info-title">
        <img alt="Vue logo" src="../assets/image/title-2.png" />
      </div>
      <div class="order-info-in">
        <div class="item-list-block" v-for="(item,index) in underTheLineLogList" v-bind:key="index">
            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="item.img" />
              </div>
              <div class="item-info">
                <div class="title" :class="{'gery':item.number < 0}">
                  <span>{{item.numberStr}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{item.time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line" v-if="index !== (underTheLineLogList.length - 1)"></div>
         </div>
      </div>
    </div>
     <div class="order-info"  v-if="consumptionLogList.length > 0">
      <div class="order-info-title">
        <img alt="Vue logo" src="../assets/image/title-3.png" />
      </div>
      <div class="order-info-in">
        <div class="item-list-block" v-for="(item,index) in consumptionLogList" v-bind:key="index">
            <div class="item-list-in">
              <div class="check-bar">
                <img alt="Vue logo" :src="item.img" />
              </div>
              <div class="item-info">
                <div class="title" :class="{'gery':item.number < 0}">
                  <span>{{item.numberStr}}</span>
                  <span>积分</span>
                </div>
                <div class="more">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="action-bar">
                <div class="change-number">
                  <span>{{item.time}}</span>
                </div>
              </div>
            </div>
            <div class="item-list-line" v-if="index !== (consumptionLogList.length - 1)"></div>
         </div>
      </div>
    </div> -->
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
    // max-height: 400px;
    overflow-y:auto;
    padding-bottom: 10px;
    .order-info-title {
      height: 40px;

      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 22px;
        width: 90px;
      }
    }
    .order-info-in {
      width: 100%;
      padding: 0 10px;
      // max-height: 400px;
      overflow-y: scroll;
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
          flex: 2;
          height: 100%;
          .title {
            height: 50%;
            font-weight: bold;
            color: $orange-1;
            line-height: 40px;
            text-align: left;
            font-size: $font-size-large;
            &.gery{
               color: $grey-1;
            }
            span:nth-of-type(2) {
              font-size: $font-size-bigger;
            }
          }
          .more {
            height: 50%;
            line-height: 16px;
            margin-top: -2px;
            text-align: left;
            span:nth-of-type(1) {
              font-size: $font-size-bigger;
              color: $brown-1;
            }
          }
        }
        .action-bar {
          flex: 2.2;
          height: 100%;
          .change-number {
            height: 50%;
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span {
              font-size: $font-size-small;
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
  }
}
</style>

<script>
import service from '../javascript/common/services'

export default {
  name: 'home',
  data () {
    return {
      onlineLogList: [
        {
          'number': 2,
          'numberStr': '2',
          'name': '前世今生',
          'time': '16:08',
          'img': '/gameImg/前世今生.png'
        }
      ],
      underTheLineLogList: [
        {
          'number': 2,
          'numberStr': '2',
          'name': '前世今生',
          'time': '16:08',
          'img': '/gameImg/前世今生.png'
        }
      ],
      consumptionLogList: [
        {
          'number': -100,
          'numberStr': '-100',
          'name': '消费(鼠标*1，徽章*1)',
          'time': '16:08',
          'img': '/gameImg/前世今生.png'
        }
      ],
      gameId2Name: {
        '5d7ee21612b3397db86e9891': '方言猜一猜',
        '5d7ee23112b3397db86e989f': '一个都不能死',
        '5d7ee24212b3397db86e98a6': '见缝插针',
        '5d7ee24d12b3397db86e98ae': '漂流瓶',
        '5d7ee25c12b3397db86e98bb': '拼图',
        '5d7ee26e12b3397db86e98c3': '棍子英雄',
        '5d7ee29412b3397db86e98d4': '书法画扇'
        // '5d7ee2a812b3397db86e98de': '印染体验',
        // '5d7ee2b512b3397db86e98e5': '汉服拍照',
        // '5d7ee2bf12b3397db86e98eb': '套圈',
        // '5d7ee2cc12b3397db86e98f6': '跳百索',
        // '5d7ee2d712b3397db86e9900': '抛绣球',
        // '5d7ee2e412b3397db86e9906': '漂流小球',
        // '5da3d0e7ab6d04fe96cde88b': '极客坊'
      },
      allGameInfo: {
        '5d7ee21612b3397db86e9891': {
          'number': 0,
          'name': '方言猜一猜',
          'time': '--',
          'timeO': 0,
          'img': '/gameImg/前世今生.png'
        },
        '5d7ee23112b3397db86e989f': {
          'number': 0,
          'name': '一个都不能死',
          'time': '--',
          'timeO': 0,
          'img': '/gameImg/投壶.png'
        },
        '5d7ee24212b3397db86e98a6': {
          'number': 0,
          'name': '见缝插针',
          'time': '--',
          'timeO': 0,
          'img': '/gameImg/写给心中的TA.png'
        },
        '5d7ee24d12b3397db86e98ae': {
          'number': 0,
          'name': '漂流瓶',
          'time': '--',
          'timeO': 0,
          'img': '/gameImg/烽火传军情.png'
        },
        '5d7ee25c12b3397db86e98bb': {
          'number': 0,
          'name': '拼图',
          'time': '--',
          'timeO': 0,
          'img': '/gameImg/bug来袭.png'
        },
        '5d7ee26e12b3397db86e98c3': {
          'number': 0,
          'name': '棍子英雄',
          'time': '--',
          'timeO': 0,
          'img': '/gameImg/棍子英雄.png'
        },
        '5d7ee29412b3397db86e98d4': {
          'number': 0,
          'name': '书法画扇',
          'time': '--',
          'timeO': 0,
          'img': '/gameImg/书法画扇.png'
        }
        // '5d7ee26e12b3397db86e98c3': {
        //   'number': 0,
        //   'name': '纸鸢作战',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/纸鸢作战.png'
        // }
        // '5d7ee29412b3397db86e98d4': {
        //   'number': 0,
        //   'name': '书法画扇',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/书法画扇.png'
        // },
        // '5d7ee2a812b3397db86e98de': {
        //   'number': 0,
        //   'name': '印染体验',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/印染体验.png'
        // },
        // '5d7ee2b512b3397db86e98e5': {
        //   'number': 0,
        //   'name': '汉服拍照',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/汉服拍照.png'
        // },
        // '5d7ee2bf12b3397db86e98eb': {
        //   'number': 0,
        //   'name': '套圈',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/套圈.png'
        // },
        // '5d7ee2cc12b3397db86e98f6': {
        //   'number': 0,
        //   'name': '跳百索',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/跳百索.png'
        // },
        // '5d7ee2d712b3397db86e9900': {
        //   'number': 0,
        //   'name': '抛绣球',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/抛绣球.png'
        // },
        // '5d7ee2e412b3397db86e9906': {
        //   'number': 0,
        //   'name': '漂流小球',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/漂流小球.png'
        // },
        // '5da3d0e7ab6d04fe96cde88b': {
        //   'number': 0,
        //   'name': '极客坊',
        //   'time': '--',
        //   'timeO': 0,
        //   'img': '/gameImg/极客坊.png'
        // }
      }
    }
  },
  computed: {},
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goPage (nameIn) {
      var _self = this
      _self.$router.push({ name: nameIn })
    },

    getLogList () {
      var _self = this
      // _self.onlineLogList = []
      // _self.underTheLineLogList = []
      // _self.consumptionLogList = []

      service.getUserFragment({}).then(function (res) {
        if (res.data.status_code !== 200) {
          alert('error:' + res.data.message + '-' + res.data.data.msg)
        }
        let logList = res.data.data
        _self.allGameInfo['5d7ee21612b3397db86e9891'].number = logList[0]
        _self.allGameInfo['5d7ee23112b3397db86e989f'].number = logList[1]
        _self.allGameInfo['5d7ee24212b3397db86e98a6'].number = logList[2]
        _self.allGameInfo['5d7ee24d12b3397db86e98ae'].number = logList[3]
        _self.allGameInfo['5d7ee25c12b3397db86e98bb'].number = logList[4]
        _self.allGameInfo['5d7ee26e12b3397db86e98c3'].number = logList[5]
        _self.allGameInfo['5d7ee29412b3397db86e98d4'].number = logList[6]
      })

      // service.getLogList({
      //   userId: _self.$store.getters.getId
      // }).then(function (res) {
      //   if (res.data.status !== 200) {
      //     alert('error:' + res.data.message + '-' + res.data.data.msg)
      //   }
      //   let logList = res.data.data
      //   logList.forEach(element => {
      //     var data = {
      //       'number': element.changeNumber,
      //       'numberStr': element.changeNumber < 0 ? element.changeNumber.toString() : '+' + element.changeNumber.toString(),
      //       'name': element.msg,
      //       'time': element.timeStr,
      //       'img': '/gameImg/' + element.msg + '.png'
      //     }
      //     if (element.type === 1) {
      //       data.name = _self.gameId2Name[element.gameId] + '-' + data.name
      //       data.img = '/gameImg/' + _self.gameId2Name[element.gameId] + '.png'
      //       _self.onlineLogList.push(data)
      //     } else if (element.type === 2) {
      //       data.name = _self.gameId2Name[element.gameId] + '-' + data.name
      //       data.img = '/gameImg/' + _self.gameId2Name[element.gameId] + '.png'
      //       _self.underTheLineLogList.push(data)
      //     } else if (element.type === 3) {
      //       _self.consumptionLogList.push(data)
      //     }

      //     if (element.type === 1 || element.type === 2) {
      //       if (element.gameId !== '') {
      //         _self.allGameInfo[element.gameId].number += element.changeNumber

      //         if (_self.allGameInfo[element.gameId].timeO < element.time) {
      //           _self.allGameInfo[element.gameId].time = element.timeStr
      //         }
      //       }
      //     }
      //   })
      //   _self.onlineLogList.reverse()
      //   _self.underTheLineLogList.reverse()
      //   _self.consumptionLogList.reverse()
      // })
    }
  },
  mounted: function () {
    var _self = this
    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }
    _self.getLogList()
  }
}
</script>
