<template>
  <div class="toHer">
    <div class="page-1" v-show="page === 1">
      <div class="describe">汉朝是一个英雄和美女辈出的年代。让我们一起来跨越两千年，领略汉朝的英雄美女吧。</div>
      <img class="page-1-bg" src="../assets/image/toHer-page1-bg-left.png" alt />
      <img class="page-1-bg" src="../assets/image/toHer-page1-bg-right.png" alt />
      <div class="picture-content">
        <p>选中下面的英雄美女，发送给你心中的TA吧</p>
        <div class="img-out" @click="showPage2(index)"  v-for="(item,index) in $store.getters.getPlayerList" v-bind:key="index">
          <img alt="Vue logo" :src="item.img1" />
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="page-1-bottom">本页面中的人物形象图片均来自互联网，仅供公司内部娱乐使用,请勿用于公司对外宣传。</div>
    </div>
    <div class="page-2" v-show="page === 2">
      <img class="toHerBg" alt="Vue logo" :src="$store.getters.getPlayerList[playerIndex].img2" />
      <div class="sendBox" :class="{'isHide':this.isHide}">
        <div class="title">
          <p>{{$store.getters.getPlayerList[playerIndex].name}}</p>
          <img src="../assets/image/toHer-bg-left.png" alt />
          <img src="../assets/image/toHer-bg-right.png" alt />
        </div>
        <div class="content">
          <div
            class="describe"
          >{{$store.getters.getPlayerList[playerIndex].describe}}</div>
          <img src="../assets/image/toHer-content-bg-left.png" alt />
          <img src="../assets/image/toHer-content-bg-right.png" alt />

          <div class="send-number">
            <p>接收人</p>
            <input type="text" placeholder="请输入接收人姓名或者工号" v-model="recipientName"/>
          </div>
          <div class="send-message">
            <p>内容</p>
            <textarea class="send-message-content" type="text" v-model="content" placeholder="请输入想说的话"></textarea>
            <div class="randomContent" @click="randomContent()">换一换</div>
          </div>
          <cube-button @click="send()">发送得积分</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.toHer {
  .page-1 {
    width: 100%;
    background-color: #b0854f;
    padding: 6px;
    position: relative;

    .describe {
      line-height: 24px;
      font-size: $font-size-middle;
      color: $brown-4;
      height: 62px;
      padding: 8px 29px 0 29px;
      text-align: left;
      letter-spacing: 1.75px;
    }
    .page-1-bg {
      height: 32px;
      width: 5px;
    }
    .page-1-bg:nth-of-type(1) {
      position: absolute;
      top: 21px;
      left: 14px;
    }
    .page-1-bg:nth-of-type(2) {
      position: absolute;
      top: 21px;
      right: 14px;
    }
    .picture-content {
      padding: 10px;
      background-color: $brown-4;
      border-radius: 5px;
      position: relative;
      p {
        height: 34px;
        width: 100%;
        float: left;
        color: $grey-7;
        font-size: $font-size-middle;
        font-weight: bold;
        text-align: left;
        line-height: 34px;
      }
      .img-out {
        width: 50%;
        float: left;
        padding: 5px;
        padding-left: 0;
        position: relative;
        &:active {
          opacity: 0.7;
        }
        img {
          width: 100%;
          float: left;
          border-radius: 5px;
        }
        p {
          position: absolute;
          bottom: 5px;
          line-height: 38px;
          text-align: center;
          width: calc(100% - 5px);
          background-color: rgba(0, 0, 0, 0.5);
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          color: $brown-4;
          font-size: $font-size-middle;
        }

        &:after {
          content: "";
          display: block;
          clear: both;
        }
        &:nth-of-type(2n) {
          padding-left: 5px;
          padding-right: 0;
        }
      }
    }
    .picture-content:after {
      content: "";
      display: block;
      clear: both;
    }

    .page-1-bottom{
      padding: 10px 4px 4px 4px;
      text-align: left;
      color: $brown-4;
      font-size: $font-size-smaller;
    }
  }
  .page-2 {
    .toHerBg {
      width: 100%;
    }
    .sendBox {
      width: 100%;
      height: 390px;
      background-color: #b0854f;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      position: fixed;
      bottom: 0;
      transition: 0.5s all;

      &.isHide {
        bottom: -390px;
      }

      .title {
        height: 55px;
        position: relative;
        p {
          line-height: 55px;
          font-size: $font-size-large;
          color: $brown-3;
        }
        img {
          height: 19px;
          width: 5px;
        }
        img:nth-of-type(1) {
          position: absolute;
          top: 18px;
          left: 12px;
        }
        img:nth-of-type(2) {
          position: absolute;
          top: 18px;
          right: 12px;
        }
      }
      .content {
        height: 335px;
        width: calc(100% - 12px);
        margin: 0 6px;
        background-color: $brown-4;
        position: relative;
        .describe {
          height: 115px;
          text-align: left;
          font-size: $font-size-middle;
          color: $grey-7;
          padding: 0 18px;
          display: table-cell;
          vertical-align: middle;
          font-weight: bold;
          line-height: 1.6;
          letter-spacing: 1.75px;
        }
        img {
          height: 114px;
          width: 24px;
        }
        img:nth-of-type(1) {
          position: absolute;
          top: 0;
          left: 0;
        }
        img:nth-of-type(2) {
          position: absolute;
          top: 0;
          right: 0;
        }
        .send-number {
          height: 50px;
          margin: 10px 10px 0 10px;
          width: calc(100% - 20px);
          border-radius: 5px;
          background-color: $brown-5;
          padding: 0 10px;
          p {
            float: left;
            color: $grey-7;
            font-size: $font-size-middle;
            font-weight: bold;
            line-height: 50px;
            text-align: left;
            width: 50px;
          }
          input {
            float: left;
            width: 220px;
            height: 40px;
            padding-left: 5px;
            background-color: rgba(0, 0, 0, 0);
            color: $grey-3;
            margin-top: 4px;
            font-size: $font-size-middle;
          }

          input::-webkit-input-placeholder {
            color: $brown-7;
          }
          input::-moz-input-placeholder {
            color: $brown-7;
          }
          input::-ms-input-placeholder {
            color: $brown-7;
          }

        }

        .send-message {
          height: 70px;
          margin: 10px 10px 0 10px;
          width: calc(100% - 20px);
          border-radius: 5px;
          background-color: $brown-5;
          padding: 0 10px;
          position: relative;
          p {
            float: left;
            color: $grey-7;
            font-size: $font-size-middle;
            font-weight: bold;
            line-height: 50px;
            text-align: left;
            width: 50px;
          }
          .send-message-content {
            float: left;
            width: 220px;
            height: 40px;
            padding-left: 5px;
            background-color: rgba(0, 0, 0, 0);
            color: $grey-3;
            margin-top: 16px;
            font-size: $font-size-middle;
            border: none;
            resize: none;
          }

          textarea::-webkit-input-placeholder {
            color: $brown-7;
          }
          textarea::-moz-input-placeholder {
            color: $brown-7;
          }
          textarea::-ms-input-placeholder {
            color: $brown-7;
          }

          .randomContent{
            position:absolute;
            right: 10px;
            top: 14px;
            color: $orange-1;
            font-size: $font-size-middle;
            font-weight: bold;
          }
        }

        .cube-btn {
          font-size: $font-size-more-large;
          width: 80%;
          margin-left: 10%;
          margin-top: 14px;
          border-radius: 40px;
          background-color: $orange-1;
        }
        .cube-btn:active {
          background-color: $orange-2;
        }
      }
    }
  }
}
</style>

<script>
import { setTimeout } from 'timers'
import service from '../javascript/common/services'
export default {
  name: 'toHer',
  data () {
    return {
      page: 1,
      isHide: true,
      recipientName: '',
      content: '',
      randomName: '',
      playerIndex: 0,
      randomName1: [
        '西楚', '陇右', '定远', '辽东', '北境', '长安', '朝歌', '剑阁', '秦川', '琅琊', '朔方', '白帝城', '潇湘', '即墨', '柴桑', '上党', '奉天', '江夏',
        '酒泉', '襄阳', '洛阳', '汝南', '上党', '天水', '巨鹿', '姑苏', '扶风', '敦煌', '建业', '金陵', '应天', '九原', '武都', '宛城', '临淄', '武威'
      ],
      randomName2: [
        '美髯公', '行者', '赤发鬼', '神行太保', '急先锋', '神机军师', '天目将', '圣手书生', '火眼狻猊', '火眼狻猊', '神算子', '小温侯', '混世魔王',
        '飞天大圣', '黑旋风', '白袍军', '虎师', '虎豹骑', '铁卫', '虎贲', '玄甲', '背嵬', '背嵬', '铁拳', '剑狂', '东邪', '及时雨', '白衣僧', '玉面达摩'
      ],
      randomText: [
        '以技术取烽火今日之辉煌，凭质量登烽火更高之巅峰',
        '技术开创烽火新高度，品质缔造星空更辉煌',
        '消除每个bug，重视每个warning',
        '质量做得好，bug自然少',
        '“质”始而终，方能成功',
        '用创新开拓我们的视野，以质量夯实我们的口碑',
        '英才得展，大展鸿图；高瞻远瞩，步步高升',
        '紫气东来，喜气西来，财气南来，福气北来，四面八方，鸿运通天！',
        '天道酬勤，鲲鹏展翅',
        '愿有前程可奔赴，亦有岁月可回首',
        '道路千万条，学习第一条，让我们一起努力学习吧',
        '愿你沉定又执着，对每件热爱的事物都全力以赴，又满载而归',
        '愿你唱着歌儿一路走，不回首、不畏前途、铭记过去、立足现在、守望未来',
        '愿你以梦为马，随处可栖。梦在远方，路在脚下',
        '愿你三冬暖，春不寒；愿你天黑有灯，下雨有伞；愿你一路上，有良人相伴',
        '愿你能活成自己想要的样子，愿以后的日子，依旧心胸坦荡，笑有阳光',
        '愿走出半生，归来仍是少年。过去已去，未来已来，与时光握手，与岁月言和',
        '愿一生努力，想要的都拥有，得不到的都释怀，不畏将来',
        '愿你脚下有风，胸中有云，心中有月'
      ]
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
    randomContent () {
      var _self = this
      _self.content = _self.randomText[Math.floor(Math.random() * _self.randomText.length)]
    },
    showPage1 () {
      var _self = this
      _self.playerIndex = 0
      _self.page = 1
      _self.isHide = true
    },
    showPage2 (index) {
      var _self = this
      _self.playerIndex = index
      _self.page = 2
      _self.randomContent()
      setTimeout(function () {
        _self.isHide = false
      }, 1)
    },
    send () {
      var _self = this

      if (_self.recipientName === '' || _self.content === '') {
        this.$createDialog({
          type: 'error',
          content: `接收人和内容不能为空！`,
          icon: 'cubeic-alert'
        }).show()
        return
      }

      _self.randomName = _self.randomName1[Math.floor(Math.random() * _self.randomName1.length)] + '-' + _self.randomName2[Math.floor(Math.random() * _self.randomName2.length)]

      // 首先转大写
      let recipientNameStr = _self.recipientName.toUpperCase()

      service.addMessage({
        'senderId': _self.$store.getters.getId,
        'recipientName': recipientNameStr,
        'content': _self.content,
        'randomName': _self.randomName,
        'playerIndex': _self.playerIndex
      }).then(function (res) {
        _self.messageList = res.data.data

        const toast = _self.$createToast({
          type: 'txt',
          time: 3000,
          txt: '发送成功!'
        })
        toast.show()
        _self.showPage1()
        _self.recipientName = ''
      })

      service.addScore({
        'id': _self.$store.getters.getId,
        'number': 6,
        'type': 'add',
        'numberType': 'online',
        'gameId': '5d7ee21612b3397db86e9891',
        'msg': '写给心中的TA'
      }).then(function (res) {

      })
      // _self.goPage('home')
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
