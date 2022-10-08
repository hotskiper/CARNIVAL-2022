<template>
  <div class="pastLife" ref="imageWrapper">
    <div class="camera-out">
        <video  class="h5video" id="h5sVideo1" width="100%" height="100%" autoplay webkit-playsinline
               playsinline>
        </video>
        <canvas id="V2I_canvas" v-show="isShow"></canvas>
        <div class="ui">
          <!-- <button @click="toImage">dadsa</button> -->
          <img class="img-icon" :src="imgUrl" width="100" height="100" />
          <!-- <img class="img-mask" src="../assets/image/pastLife-bg.png" alt /> -->

          <cube-slide class="img-mask" :data="items" :auto-play="false" @change='imgMaskChange'/>
          <img class="left-arrow" src="../assets/image/left.png" alt="">
          <img class="right-arrow" src="../assets/image/right.png" alt="">
          <div v-show="!hideButton2" class="result-mask">
              <img :src="imgUrl" alt="">
              <cube-button  @click="goPage('home')" :class="{'show':!hideButton3}" >返回首页</cube-button>
          </div>
        </div>
    </div>
    <div class="page-down">
      <div class="sendBox" :class="{'isHide':this.isHide}">
        <div class="title">
          <p>{{$store.getters.getName}}的前世传奇</p>
          <img src="../assets/image/toHer-bg-left.png" alt />
          <img src="../assets/image/toHer-bg-right.png" alt />
        </div>
        <div class="content">
          <div
            class="describe"><span>{{text}}</span><br/>{{character}}</div>
          <img src="../assets/image/toHer-content-bg-left.png" alt />
          <img src="../assets/image/toHer-content-bg-right.png" alt />
          <cube-button @click="takePhoto()" v-show="!hideButton1">确认前世</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.pastLife {
  padding:0;
  height: 100vh;
  width: 100vw;

  .camera-out{
    position: relative;
      height: 100%;
      width: 100%;
      background-color:  #b0854f;
      .left-arrow{
        position: absolute;
        top: 220px;
        left: 10px;
        transform: scale(0.4);
        animation:shine1 1s infinite linear ;
        animation-direction:alternate;
      }
      .right-arrow{
        position: absolute;
        top: 220px;
        right: 10px;
        transform: scale(0.4);
        animation:shine2 1s infinite linear ;
        animation-direction:alternate;
      }

      @keyframes shine1 {
        0%{
           left: 10px;
        }
        100%{
           left: 4px;
        }
      }

       @keyframes shine2 {
        0%{
           right: 10px;
        }
        100%{
           right: 4px;
        }
      }

      video{
        position: absolute;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
        object-fit: fill
      }
      canvas{
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
      }
      .ui{
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
        .img-icon{
            display: none
          }
        .img-mask{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .result-mask{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 99;
          img{
            width: 100%;
          }
          .cube-btn {
            font-size: $font-size-more-large;
            width: 80%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -50px;
            border-radius: 40px;
            background-color: $orange-1;
            transition: 0.3s;
          }
          .cube-btn.show{
            bottom: 20px;
          }
          .cube-btn:active {
            background-color: $orange-2;
          }
        }

      }
  }
  .page-down {
    .sendBox {
      width: 100%;
      height: 250px;
      background-color: #b0854f;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      position: fixed;
      bottom: 0;
      transition: 0.3s all;

      &.isHide {
        bottom: -250px;
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
          line-height: 1.75;
          letter-spacing: 1.75px;
          word-wrap: break-word;
          word-break: break-all;
          span{
            //  font-weight: normal;
             color: $grey-1;
             font-style:italic;
          }
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
import html2canvas from 'html2canvas'
import { setTimeout } from 'timers'
import service from '../javascript/common/services'

export default {
  name: 'pastLife',
  data () {
    return {
      isHide: true,
      typeSelect: 1,
      isShow: false,
      imgUrl: '',
      hideButton1: false,
      hideButton2: true,
      hideButton3: true,
      text: '',
      items: [
        {
          url: '',
          image: '/pastLife/1.jpg',
          textList: [
            '"体挂连环镔铁铠，战袍风飐猩红，雕青镌玉更玲珑。"',
            '"嵌宝头盔稳戴，磨银铠甲重披。素罗袍上绣花枝，狮蛮带琼瑶密砌。"',
            '"绣袍巧制鹦哥绿，战服轻裁柳叶黄。顶上缨花红灿烂，手执金丝铁杆枪。"'
          ]
        },
        {
          url: '',
          image: '/pastLife/2.jpg',
          textList: [
            '"绣旗飘挂动天兵，金甲绿袍相称，赤兔马腾腾紫霞，青龙刀凛凛寒冰。"',
            '"对对红旗间翠袍，争飞战马转山腰。日烘旗帜青龙见，风摆旌旗朱雀摇。"',
            '"黄金铠甲寒光迸，水银盔展兜鍪重。面如重枣美须髯，锦征袍上蟠双凤。"',
            '"紫骝骏马猛如龙，玉勒锦鞍双兽并。宝刀灿灿霜雪光，冠世英雄不可当。"'
          ]
        },
        {
          url: '',
          image: '/pastLife/3.jpg',
          textList: [
            '"伐罪安民，军机宜迅，兼程进。羽扇纶巾，令下山河震"',
            '"整乾坤，清四海，怎肯教鱼龙一混。"',
            '"得志也，羽扇纶巾，再不去践长途，客身难进。"',
            '"武侯乘素舆，葛巾，白羽扇，指挥三军。"'
          ]
        },
        {
          url: '',
          image: '/pastLife/4.jpg',
          textList: [
            '"二龙争战决雌雄，赤壁楼船扫地空。"',
            '"交兵不假挥长剑，已破英雄百万师。"',
            '"帐前斫案决大计，赤壁火船烧战旗。"',
            '"我今送客放舟去，江山如旧还英雄。"'
          ]
        },
        {
          url: '',
          image: '/pastLife/5.jpg',
          textList: [
            '"寄信秦楼下，因书秋雁归。"',
            '"猗兰恩宠歇，昭阳幸御稀。朝辞汉阙去，夕见胡尘飞。"',
            '"榆钱不买千金笑，柳带何须百宝妆。"',
            '"凤仪亭上彩云飞,园中牡丹恋翠微,龙楼宝殿失颜色,羞把琼姿迎朝晖。"',
            '"焚香一拜月羞藏,娇语三声百草香。取义舍身为家国,须眉不让永留芳。"'
          ]
        }
      ],
      characterList: [
        '前世的你，如阳光一般，精力充沛，这也是你个性中闪闪发亮的地方。',
        '前世的你，如水一般，是一个喜欢给予和制造气氛的人，和你在一起的人通常会有一种被温柔包围的感觉。',
        '前世的你，你的全身都散发着中性力量，即使你是一个女孩子，从言行举止来看，也分辨不出来，这也是你的个性所在。',
        '前世的你，具有木型的特质，是一个不论做什么事都很认真的人。基本上没有脾气，性格很稳定。',
        '前世的你，如风一样自由。你的脑筋转的很快，头脑灵活，所以有很多的表现机会。',
        '前世的你，如花般美丽。是一个很会打扮的人。看见美的东西就一定要去研究。你的个性很独特。',
        '前世的你，是那种浑身都充满神秘色彩的人，就如天上的月亮一般呈现各种形态。',
        '前世的你，有着敢于面对现实的勇气，有很强的领导才能。',
        '前世的你，是一个如火般热请的人，你的感情也如火一样真挚，感人，热烈。'
      ],
      character: '前世的你，如阳光一般，精力充沛，这也是你个性中闪闪发亮的地方。'
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
    downLoadImg () {
      var _self = this
      if (window.navigator.msSaveOrOpenBlob) {
        var bstr = atob(_self.imgUrl.split(',')[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        var blob = new Blob([u8arr])
        window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')

        console.log(1)
      } else {
        // 这里就按照chrome等新版浏览器来处理
        const a = document.createElement('a')
        a.href = _self.imgUrl
        a.setAttribute('download', 'chart-download')
        // a.click()
      }
    },

    toImage () {
      // 本地图片，base64图片其实不存在截图跨域，但这里vue的src显示为unknow所以无法截图
      var _self = this
      var canvas = document.getElementById('V2I_canvas')
      if (!canvas.getContext) {
        alert('您的浏览器暂不支持canvas')
        return false
      } else {
        var context = canvas.getContext('2d')
        var video = document.getElementById('h5sVideo1')

        console.log(video)

        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        // context.drawImage(video, 170, 65, 316, 350,0,0,canvas.width, canvas.height);
        _self.isShow = true
        setTimeout(function () {
          html2canvas(_self.$refs.imageWrapper).then(canvas => {
            let dataURL = canvas.toDataURL('image/png')
            _self.imgUrl = dataURL

            // _self.downLoadImg()
            _self.hideButton2 = false
            setTimeout(function () {
              const toast = _self.$createToast({
                type: 'txt',
                time: 3000,
                txt: '获得积分+6'
              })
              toast.show()
              _self.hideButton3 = false
            }, 100)
          })
        }, 500)
      }
    },
    changeTypeSelect (number) {
      var _self = this
      _self.typeSelect = number
    },
    takePhoto () {
      var _self = this
      _self.hideButton1 = true
      _self.toImage()
      service.addScore({
        'id': _self.$store.getters.getId,
        'number': 6,
        'type': 'add',
        'numberType': 'online',
        'gameId': '5d54b50eff5c53cb0fd0c6bb',
        'msg': '前世今生'
      }).then(function (res) {

      })
    },
    imgMaskChange (index) {
      var _self = this
      _self.text = _self.items[index].textList[Math.floor(Math.random() * _self.items[index].textList.length)]

      _self.isHide = true
      setTimeout(function () {
        _self.isHide = false
      }, 300)
    }

  },
  mounted: function () {
    var _self = this
    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }

    /*
    function getUserMedia (constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        // 最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
      } else if (navigator.webkitGetUserMedia) {
        // webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
      } else if (navigator.mozGetUserMedia) {
        // firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error)
      } else if (navigator.getUserMedia) {
        // 旧版API
        navigator.getUserMedia(constraints, success, error)
      }
    }

    let video = document.getElementById('h5sVideo1')

    function success (stream) {
      let CompatibleURL = window.URL || window.webkitURL
      video.srcObject = stream
      video.play()
    }

    function error (error) {
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`)
    }

    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      // 调用用户媒体设备, 访问摄像头
      // getUserMedia({video : {width: 857, height: 643}}, success, error);
      getUserMedia({ 'video': { 'facingMode': 'user' } }, success, error) // { video: true }
    } else {
      alert('不支持访问用户媒体')
    }
    */

    _self.isHide = true
    setTimeout(function () {
      _self.text = _self.items[0].textList[Math.floor(Math.random() * _self.items[0].textList.length)]
      _self.isHide = false
    }, 500)
    let nameList = _self.$store.getters.getName.split('')

    let nameNumber = 0
    nameList.forEach(element => {
      nameNumber += parseInt(element.charCodeAt())
    })
    _self.character = _self.characterList[nameNumber % _self.characterList.length]
  }
}
</script>
