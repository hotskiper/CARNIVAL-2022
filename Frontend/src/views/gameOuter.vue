<template>
  <div class="gameOuter">
    <img alt="Vue logo" src="../assets/image/bg2.jpg" />
    <img alt="Vue logo" class="img-ab" src="../assets/image/bg4.png" />
    <iframe class="gameContent" ref="iframe" :src="selectGame.url"></iframe>
  </div>
</template>
<style scoped lang="scss">
.gameOuter {
  img {
    width: 100%;
  }
  .img-ab {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .gameContent{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top:0;
    left: 0;
  }
}
</style>
<script>
// @ is an alias to /src
import service from '../javascript/common/services'

export default {
  name: 'gameOuter',
  data () {
    return {
      gameList: [
        {
          'name': '见缝插针',
          'id': '5d7ee24212b3397db86e98a6',
          'url': '/games/game1/index.html'
        },
        {
          'name': '漂流瓶',
          'id': '5d7ee24d12b3397db86e98ae',
          'url': '/games/game2/index.html'
        },
        {
          'name': '拼图',
          'id': '5d7ee25c12b3397db86e98bb',
          'url': '/games/game3/index.html'
        },
        {
          'name': '棍子英雄',
          'id': '5d7ee26e12b3397db86e98c3',
          'url': '/games/game4/index.html'
        },
        {
          'name': '一个都不能死',
          'id': '5d7ee23112b3397db86e989f',
          'url': '/games/game5/index.html'
        }
      ],
      selectGame: {

      },
      iframeWin: {}
    }
  },
  components: {},
  methods: {
    addScore (gameName, number) {
      var _self = this
      service.rewardFragment({
        'game_name': gameName,
        'score': number
      }).then(function (res) {
        console.log('游戏结束', res.data.data)
      })
    },
    throwBottle (content) {
      var _self = this
      service.throwBottle({
        'content': content
      }).then(function (res) {
        if (res.data.status_code === 200) {
          console.log('扔瓶子')
        }
      })
    },
    getBottle () {
      var _self = this
      service.getBottle({}).then(function (res) {
        if (res.data.status_code === 200) {
          console.log('捞瓶子', res.data.data)
        }
        console.log('外部vue向iframe内部传数据')
        // 外部vue向iframe内部传数据
        _self.iframeWin.postMessage({
          cmd: 'transforBottleContent',
          params: {
            'fragment': res.data.data.fragment,
            'content': res.data.data.content
          }
        }, '*')
      })
    },
    getMyBottle () {
      var _self = this
      service.getMyBottle({}).then(function (res) {
        if (res.data.status_code === 200) {
          console.log('我的瓶子', res.data.data)
        }
        console.log('外部vue向iframe内部传数据')
        // 外部vue向iframe内部传数据
        _self.iframeWin.postMessage({
          cmd: 'transforMyBottleData',
          params: {
            'data': res.data.data
          }
        }, '*')
      })
    }
    // addDepartmentsNumber (nameEn) {
    //   var _self = this
    //   service.addDepartmentsNumber({
    //     'nameEn': nameEn
    //   }).then(function (res) {

    //   })
    // },
    // getDepartmentInfo () {
    //   var _self = this
    //   var cityNumberAll = {}
    //   var number = 0
    //   var isSelected = false
    //   service.getDepartmentsList().then(function (res) {
    //     console.log(res.data.data)
    //     res.data.data.forEach(element => {
    //       cityNumberAll[element.nameEn] = element
    //     })

    //     service.getLogList({
    //       userId: _self.$store.getters.getId,
    //       gameId: _self.selectGame.id
    //     }).then(function (res) {
    //       let logList = res.data.data
    //       number = logList.length
    //       if (number > 0) {
    //         isSelected = true
    //       }
    //       setTimeout(function () {
    //         console.log('外部vue向iframe内部传数据')
    //         // 外部vue向iframe内部传数据
    //         _self.iframeWin.postMessage({
    //           cmd: 'getInfo',
    //           params: {
    //             'cityNumberAll': cityNumberAll,
    //             'isSelected': isSelected
    //           }
    //         }, '*')
    //       }, 1000)
    //     })
    //   })
    // }

  },
  mounted: function () {
    var _self = this
    if (_self.$store.getters.getId === '') {
      _self.$router.push({ name: 'home' })
    }
    _self.selectGame = _self.gameList[_self.$store.getters.getGameIndex]
    _self.eventFunc = function (event) {
      // 根据上面制定的结构来解析iframe内部发回来的数据
      const data = event.data
      console.log(666, data)
      // alert(data)
      switch (data.cmd) {
        case 'addScore':
        // 业务逻辑
          _self.addScore(_self.selectGame.name, data.params.number)
          break
        case 'throwBottle':
          _self.throwBottle(data.params.content)
          break
        case 'getBottle':
          _self.getBottle()
          break
        case 'getMyBottle':
          _self.getMyBottle()
          break
        // case 'addDepartmentsNumber':
        // // 烽火传军情-增加点赞数
        //   _self.addScore(_self.selectGame.name, data.params.number)
        //   _self.addDepartmentsNumber(data.params.nameEn)
        //   break
      }
    }

    window.addEventListener('message', _self.eventFunc)

    _self.iframeWin = _self.$refs.iframe.contentWindow

    // if (_self.$store.getters.getGameIndex === 4) {
    //   _self.getDepartmentInfo()
    // }
  },
  beforeDestroy () { // 在组件生命周期结束的时候销毁。
    var _self = this
    window.removeEventListener('message', _self.eventFunc)
  }
}
</script>
