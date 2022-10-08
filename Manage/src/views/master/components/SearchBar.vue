<template>
    <div class="searchbar">
        <div>
            <span>任务名称</span>
            <input @keyup="handleSearchChange" v-model="taskname" placeholder="请输入任务名称"/>
        </div>
        <el-button v-show="routename == 'Complete'" type="primary" size="mini" @click="searcList" class="pull-right">
            搜索
        </el-button>
        <div class="pull-right posi-real" v-show="routename == 'Complete'">
            <span class="s-label">创建时间</span>
            <el-date-picker
                    v-model="creattime"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    size="small"

            >
            </el-date-picker>
        </div>
    </div>
</template>

<script>
  export default {
    name: "searchBar",
    props: {
      routename: ''

    },
    data() {

      return {
        taskname: '',
        creattime: '',
      }

    },
    computed: {},
    methods: {
      searcList() {
        this.$emit('handleDateChange', this.creattime || ['', ''])
      },
      handleSearchChange(e) {
        this.$emit('handleSearchChange', e.target.value)
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";

    .searchbar {
        @include clearfix;
        font-size: 14px;
        background: #fff;
        color: #333333;
        padding: 24px;
        border-bottom: 1px solid rgba(207, 214, 228, 1);
        input {
            width: 336px;
            height: 32px;
            background-color: rgba(255, 255, 255, 1);
            border-radius: 3px 3px 3px 3px;
            border: solid 1px rgba(207, 214, 228, 1);
            padding: 8px;
        }
        span {
            margin-right: 8px;
        }
        div {
            display: inline-block;
        }
        .s-label {
            position: relative;
            top: -10px;
        }
        .pull-right {
            float: right;
        }
        .posi-real {
            position: relative;
        }
        i {
            font-size: 16px;
            position: absolute;
            top: 8px;
            right: 8px;
            color: #a2aabb;
        }
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 336px !important;
    }


</style>