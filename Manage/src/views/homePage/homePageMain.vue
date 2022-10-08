<template>
  <div class="home-page-main">
    <div class="count-box-container">
      <div class="count-box" v-for="(item,index) in countType" :key="index">
        <div class="count-name">{{item.name}}</div>
        <div class="count-num" v-if="index < countType.length-2">{{item.count | numFormatMoney}}</div>
        <div class="count-num" v-else-if="index < countType.length-1">{{item.count}}</div>
        <div class="count-ranking" v-else>
          <div
            class="top-3"
            v-for="(rank, rankIndex) in item.ranking"
            :key="rankIndex"
            :class="{active: rankIndex == 0}"
          >TOP{{rankIndex + 1}} &nbsp;&nbsp;&nbsp;&nbsp; {{rank}}</div>
        </div>
      </div>
    </div>
    <div class="intergration-chart">
       <div id="intChart1"></div>
    </div>
     <div class="intergration-chart">
       <div id="intChart2"></div>
    </div>
    <div class="intergration-chart">
       <div id="intChart3"></div>
    </div>
    <div class="gift-num-overview">
      <div id="giftChart"></div>
    </div>
    <div class="develop-center-container">
      <div class="exchange-number">
        <div class="exchange-chart" id="exchangeChart1"></div>
      </div>
      <div class="exchange-rate">
        <div class="select-container">
          <el-select v-model="areaValue" placeholder="请选择">
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="exchange-chart" id="exchangeChart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "../../utils/cookie.js";
import { checkLogin, getIntData } from "../../apis/data.js";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      countType: [
        {
          name: "参与线上游戏人数",
          count: 2364
        },
        {
          name: "已兑换礼品人数",
          count: 1364
        },
        {
          name: "礼品兑换率",
          count: "57.7%"
        },
        {
          name: "最受喜爱的礼品TOP3",
          ranking: ["纪念币", "荷包", "异形抱枕"]
        }
      ],
      areaOptions: [
        {
          value: "0",
          label: "华中地区"
        },
        {
          value: "1",
          label: "华北地区"
        },
        {
          value: "2",
          label: "东北地区"
        },
        {
          value: "3",
          label: "华南地区"
        },
        {
          value: "4",
          label: "西北地区"
        }
      ],
      areaValue: "0"
    };
  },
  methods: {
    loadAccountInfo() {
      let accountInfo = cookie.getCookie("accountInfo");
      if (!Boolean(accountInfo)) {
        this.isCheck = false;
        return false;
      } else {
        this.ruleForm.username = accountInfo.split("&")[0];
        this.ruleForm.password = accountInfo.split("&")[1];
        this.isCheck = true;
      }
    },
    dealIntData() {
      checkLogin().then(res => {
        getIntData().then(res => {
          if (Number(res.data.status) === 200) {
            res.data.data.forEach(item => {
                item.allScore = item.onlineScore + item.underTheLineScore;
                item.leftScore = item.underTheLineScore + item.onlineScore - item.consumption;
            });

            let needData;
            let leftAll = 0,
              onlineAll = 0,
              underlineAll = 0,
              consumeAll = 0;

            needData = res.data.data;
            let totalDistribution = {
              _1_to_20: 0,
              _21_to_40: 0,
              _41_to_60: 0,
              _61_to_80: 0,
              _81_to_100: 0,
              _101_to_120: 0,
              _121_to_140: 0,
              _141_to_194: 0
            };
            let consumeDistribution = {
              _1_to_20: 0,
              _21_to_40: 0,
              _41_to_60: 0,
              _61_to_80: 0,
              _81_to_100: 0,
              _101_to_120: 0,
              _121_to_140: 0,
              _141_to_180: 0
            };
            let leftDistribution = {
              _1_to_20: 0,
              _21_to_40: 0,
              _41_to_60: 0,
              _61_to_80: 0,
              _81_to_100: 0,
              _101_to_180: 0
            };

            let unlinePeople = 0;
            let offlinePeople = 0; 
            needData.forEach(item => {
                if(item.allScore === 0) {
                   
                }else if(item.allScore >= 1 && item.allScore <= 20){
                   totalDistribution._1_to_20 += 1
                }else if(item.allScore >= 21 && item.allScore <= 40) {
                   totalDistribution._21_to_40 += 1
                }else if(item.allScore >= 41 && item.allScore <= 60){
                   totalDistribution._41_to_60 += 1
                }else if(item.allScore >= 61 && item.allScore <= 80) {
                   totalDistribution._61_to_80 += 1
                }else if(item.allScore >= 81 && item.allScore <= 100) {
                   totalDistribution._81_to_100 += 1
                }else if(item.allScore >= 101 && item.allScore <= 120){
                   totalDistribution._101_to_120 += 1
                }else if(item.allScore >= 121 && item.allScore <= 140) {
                   totalDistribution._121_to_140 += 1
                }else if(item.allScore >= 141 && item.allScore <= 194){
                   totalDistribution._141_to_194 += 1
                }


                if(item.consumption === 0) {
                   
                }else if(item.consumption >= 1 && item.consumption <= 20){
                   consumeDistribution._1_to_20 += 1
                }else if(item.consumption >= 21 && item.consumption <= 40) {
                   consumeDistribution._21_to_40 += 1
                }else if(item.consumption >= 41 && item.consumption <= 60){
                   consumeDistribution._41_to_60 += 1
                }else if(item.consumption >= 61 && item.consumption <= 80) {
                   consumeDistribution._61_to_80 += 1
                }else if(item.consumption >= 81 && item.consumption <= 100) {
                   consumeDistribution._81_to_100 += 1
                }else if(item.consumption >= 101 && item.consumption <= 120){
                   consumeDistribution._101_to_120 += 1
                }else if(item.consumption >= 121 && item.consumption <= 140) {
                   consumeDistribution._121_to_140 += 1
                }else if(item.consumption >= 141 && item.consumption <= 180){
                   consumeDistribution._141_to_180 += 1
                }

              
                if(item.leftScore === 0) {
                   
                }else if(item.leftScore >= 1 && item.leftScore <= 20){
                   leftDistribution._1_to_20 += 1
                }else if(item.leftScore >= 21 && item.leftScore <= 40) {
                   leftDistribution._21_to_40 += 1
                }else if(item.leftScore >= 41 && item.leftScore <= 60){
                   leftDistribution._41_to_60 += 1
                }else if(item.leftScore >= 61 && item.leftScore <= 80) {
                   leftDistribution._61_to_80 += 1
                }else if(item.leftScore >= 81 && item.leftScore <= 100) {
                   leftDistribution._81_to_100 += 1
                }else if(item.leftScore >= 101 && item.leftScore <= 180){
                   leftDistribution._101_to_180 += 1
                }
                

                if(item.onlineScore > 0) {
                  unlinePeople = unlinePeople + 1;
                }

                if(item.underTheLineScore > 0) {
                  offlinePeople = offlinePeople + 1;
                }
              
            });
            console.log('线上参与总人数：', unlinePeople)
            console.log('线下参与总人数：', offlinePeople)

            //绘制总积分饼图
            let intChart1 = this.$echarts.init(document.getElementById("intChart1"));
            intChart1.setOption({
                title: {
                    text: '总积分',
                    subtext: '分数段占比',
                    left: 'center',
                    padding: [0, 0, 0, 24]
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     bottom: 10,
                //     left: 'center',
                //     data: ['1-20分', '21-40分','41-60分','61-80分','81-100分','101-120分','121-140分','141-160分','161-200分']
                // },
                 color: ["#60acfc", "#a6b727", "#5bc49f", "#feb64d", "#32d3eb", "#9287e7", "#565c8a", "#fec306","#838383", "#ff7c7c",],
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {value:totalDistribution._1_to_20,name: `1-20分  (${totalDistribution._1_to_20}人)`},
                            {value:totalDistribution._21_to_40,name: `21-40分  (${totalDistribution._21_to_40}人)`},
                            {value:totalDistribution._41_to_60, name: `41-60分  (${totalDistribution._41_to_60}人)`},
                            {value:totalDistribution._61_to_80, name: `61-80分  (${totalDistribution._61_to_80}人)`},
                            {value:totalDistribution._81_to_100, name: `81-100分  (${totalDistribution._81_to_100}人)`},
                            {value:totalDistribution._101_to_120, name: `101-120分  (${totalDistribution._101_to_120}人)`},
                            {value:totalDistribution._121_to_140, name: `121-140分  (${totalDistribution._121_to_140}人)`},
                            {value:totalDistribution._141_to_194, name: `141-194分  (${totalDistribution._141_to_194}人)`}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
           

            //绘制消耗积分饼图
            let intChart2 = this.$echarts.init(document.getElementById("intChart2"));
            intChart2.setOption({
                title: {
                    text: '消耗积分',
                    subtext: '分数段占比',
                    left: 'center',
                    padding: [0, 0, 0, 24]
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7", "#565c8a", "#a6b727","#fec306", "#838383",],
                // legend: {
                //     // orient: 'vertical',
                //     // top: 'middle',
                //     bottom: 10,
                //     left: 'center',
                //     data: ['1-20分', '21-40分','41-60分','61-80分','81-100分','101-120分','121-140分','141-160分','161-200分']
                // },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {value:consumeDistribution._1_to_20,name: `1-20分  (${consumeDistribution._1_to_20}人)`},
                            {value:consumeDistribution._21_to_40,name: `21-40分  (${consumeDistribution._21_to_40}人)`},
                            {value:consumeDistribution._41_to_60, name: `41-60分  (${consumeDistribution._41_to_60}人)`},
                            {value:consumeDistribution._61_to_80, name: `61-80分  (${consumeDistribution._61_to_80}人)`},
                            {value:consumeDistribution._81_to_100, name: `81-100分  (${consumeDistribution._81_to_100}人)`},
                            {value:consumeDistribution._101_to_120, name: `101-200分  (${consumeDistribution._101_to_120}人)`},
                            {value:consumeDistribution._121_to_140, name: `121-140分  (${consumeDistribution._121_to_140}人)`},
                            {value:consumeDistribution._141_to_180, name: `141-180分  (${consumeDistribution._141_to_180}人)`}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });

            //绘制剩余积分饼图
            let intChart3 = this.$echarts.init(document.getElementById("intChart3"));
            intChart3.setOption({
                title: {
                    text: '剩余积分',
                    subtext: '分数段占比',
                    left: 'center',
                    padding: [0, 0, 0, 24]
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7", "#565c8a", "#a6b727","#fec306", "#838383",],
                // legend: {
                //     // orient: 'vertical',
                //     // top: 'middle',
                //     bottom: 10,
                //     left: 'center',
                //     data: ['1-20分', '21-40分','41-60分','61-80分','81-100分','101-120分','121-140分','141-160分','161-200分']
                // },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {value:leftDistribution._1_to_20,name: `1-20分  (${leftDistribution._1_to_20}人)`},
                            {value:leftDistribution._21_to_40,name: `21-40分  (${leftDistribution._21_to_40}人)`},
                            {value:leftDistribution._41_to_60, name: `41-60分  (${leftDistribution._41_to_60}人)`},
                            {value:leftDistribution._61_to_80, name: `61-80分  (${leftDistribution._61_to_80}人)`},
                            {value:leftDistribution._81_to_100, name: `81-100分  (${leftDistribution._81_to_100}人)`},
                            {value:leftDistribution._101_to_180, name: `101-180分  (${leftDistribution._101_to_180}人)`}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
          }
        });
      });
    },
    initGiftChart() {
      let giftChart = this.$echarts.init(document.getElementById("giftChart"));
      // 绘制图表
      giftChart.setOption({
        title: {
          text: "礼品数量概览",
          padding: [0, 0, 0, 24]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["总量", "已兑换"]
        },
        xAxis: {
          data: [
            "纪念币",
            "荷包",
            "T恤",
            "豪华鼠标垫",
            "签字笔",
            "笔筒",
            "火火侠公仔",
            "化妆镜"
          ],
          axisLable: {
            textStyle: {
              color: "rgba(255,255,255,.3)"
            }
          }
        },
        yAxis: {
          axisLable: {
            textStyle: {
              color: "rgba(255,255,255,.3)"
            }
          }
        },
        series: [
          {
            name: "总量",
            type: "bar",
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: "rgba(25,46,94, .5)"
              }
            },
            barWidth: "20%",
            data: [40, 20, 36, 10, 10, 20, 30, 29]
          },
          {
            name: "已兑换",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: "rgb(164,205,238)"
              }
            },
            data: [20, 14, 22, 4, 6, 15, 22, 18]
          }
        ]
      });
    },
    initExchangeChart1() {
      let chart1 = this.$echarts.init(
        document.getElementById("exchangeChart1")
      );
      // 绘制图表
      chart1.setOption({
        title: {
          text: "研发中心兑换人数概览",
          padding: [0, 0, 0, 24]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "value",
          axisLable: {
            textStyle: {
              color: "rgba(255,255,255,.3)"
            }
          }
        },
        yAxis: {
          type: "category",
          data: [
            "南京",
            "上海",
            "青岛",
            "杭州",
            "合肥",
            "江苏省办",
            "武汉",
            "郑州"
          ],
          axisLable: {
            textStyle: {
              color: "rgba(255,255,255,.3)"
            }
          }
        },
        series: [
          {
            name: "兑换人数",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: "#ed6f61"
              }
            },
            data: [20, 14, 22, 4, 6, 15, 22, 18]
          }
        ]
      });
    },
    initExchangeChart2() {
      let chart2 = this.$echarts.init(
        document.getElementById("exchangeChart2")
      );
      // 绘制图表
      chart2.setOption({
        title: {
          text: "研发中心兑换占比",
          padding: [0, 0, 0, 24]
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: ["#7fb6fa", "#fb7777"],
        legend: {
          bottom: 10,
          left: "center",
          data: ["已兑换", "未兑换"]
        },
        graphic: {
          type: "text",
          left: "center",
          top: "250px",
          z: 2,
          zlevel: 100,
          style: {
            text: "南京参与总人数 900人",
            fill: "#a2aabb",
            width: 200,
            height: 49,
            font: "bolder 48px"
          }
        },
        series: [
          {
            name: "研发中心兑换占比",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 780, name: "已兑换" },
              { value: 120, name: "未兑换" }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    let self = this;
    this.loadAccountInfo();
    document.addEventListener("keydown", function(e) {
      if (e.keyCode === 13) {
      }
    });
    this.dealIntData();
    this.initGiftChart();
    this.initExchangeChart1();
    this.initExchangeChart2();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.home-page-main {
  height: calc(100% - 64px);
  overflow-x: hidden;
  overflow-y: auto;
}
.count-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 24px 0;
  .count-box {
    width: 22%;
    height: 106px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #303133;
    padding-left: 16px;
    transition: all ease 0.3s;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      width: calc(22% + 4px);
      height: calc(106px + 2px);
    }
    .count-name {
      height: 32px;
      line-height: 42px;
      color: #bfcbd9;
    }
    .count-num {
      font-size: 32px;
      font-weight: bold;
      margin-top: 12px;
    }
    .count-ranking {
      font-size: 12px;
      font-weight: bold;
      .top-3 {
        margin-top: 8px;
      }
      .top-3.active {
        color: #e6a23c;
      }
    }
  }
}
.intergration-chart {
  height: 440px;
  margin: 0 24px;
  padding-top: 12px;
  background: #fff;
  width: 45%;
  display: inline-block;
  #intChart1, #intChart2, #intChart3 {
    width: 100%;
    height: 100%;
  }
}
.gift-num-overview {
  height: 400px;
  margin: 0 24px;
  padding-top: 12px;
  background: #fff;
  #giftChart {
    width: 100%;
    height: 100%;
  }
}
.develop-center-container {
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 14px;
  padding: 24px 0 48px 0;
  > div {
    width: 48%;
    background: #fff;
    padding-top: 16px;
  }
  .exchange-chart {
    width: 100%;
    height: 100%;
  }
  .exchange-rate {
    position: relative;
    .select-container {
      position: absolute;
      right: 8px;
      top: 8px;
      z-index: 9;
    }
  }
}
</style>
