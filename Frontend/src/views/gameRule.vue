<template>
  <div class="gameRule">
    <img alt="Vue logo" src="../assets/image/bg2.jpg" />
    <img alt="Vue logo" class="img-ab-2" src="../assets/image/bg4.png" />
    <img alt="Vue logo" class="img-ab-1" src="../assets/image/bg3.png" />

    <div class="game-block-1">
      <div class="game-block-in" @click="goPage('gameRuleIn',0)"></div>
      <div class="game-block-in" @click="goPage('gameRuleIn',1)"></div>
      <div class="game-block-in" @click="goPage('gameRuleIn',3)"></div>
      <div class="game-block-in" @click="goPage('gameRuleIn',5)"></div>
      <div class="game-block-in" @click="goPage('gameRuleIn',4)"></div>
      <div class="game-block-in" @click="goPage('gameRuleIn',8)"></div>
      <div class="game-block-in" @click="goPage('gameRuleIn',6)"></div>
      <div class="game-block-in" @click="goPage('gameRuleIn',7)"></div>
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
       <div class="light-list-in">
        <div class="light-1"></div>
        <div class="light-2"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.gameRule {
  // padding: 10px 20px;

  img {
    width: 100%;
  }
  .img-ab-1{
    position: absolute;
    top: 0;
    left: 0;
  }
   .img-ab-2{
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .game-block-1 {
    position: absolute;
    height: 600px;
    width: 100%;
    top: 18px;
    left: 0;

    .game-block-in {
      height: 58px;
      width: 58px;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;

    }
    .game-block-in:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .game-block-in:nth-of-type(1) {
      transform: translate(-84px, -220px);
    }
    .game-block-in:nth-of-type(2) {
      transform: translate(26px, -220px);
    }
    .game-block-in:nth-of-type(3) {
      transform: translate(-84px, -130px);
    }
    .game-block-in:nth-of-type(4) {
      transform: translate(26px, -130px);
    }
     .game-block-in:nth-of-type(5) {
      transform: translate(-84px, -38px);
    }
     .game-block-in:nth-of-type(6) {
      transform: translate(26px, -38px);
    }
     .game-block-in:nth-of-type(7) {
      transform: translate(-84px, 54px);
    }
     .game-block-in:nth-of-type(8) {
      transform: translate(26px, 54px);
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
        top: 39px;
        left: 40px;
        animation-delay: 4.4s;
        .light-2{
           animation-delay: 4.4s;
        }
      }
      &:nth-of-type(2){
        top:39px;
        left: 99px;
        animation-delay: 4s;
        .light-2{
           animation-delay: 4s;
        }
      }
      &:nth-of-type(3){
         top:39px;
        right: 99px;
        animation-delay: 3.6s;
        .light-2{
           animation-delay: 3.6s;
        }
      }
      &:nth-of-type(4){
         top: 39px;
        right: 39px;
        animation-delay: 3.2s;
        .light-2{
           animation-delay: 3.2s;
        }
      }
    }
  }
}
</style>
<script>
// @ is an alias to /src

export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    goPage (nameIn, index) {
      var _self = this
      _self.$store.commit(
        'changeUrlStr',
        '/rule/' + index + '.jpg'
      )
      _self.$router.push({ name: nameIn })
    },
    mounted: function () {

    }
  }
}
</script>
