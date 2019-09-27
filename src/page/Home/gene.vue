/* eslint-disable no-debugger */
<template>
  <div class="taskhall">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <el-card class="box-card" style="width:76.5rem; margin:0 auto;">
      <div class="tablecontent">
        <div class="content_title">
          <el-row>
            <el-col :span="24" style="margin-bottom:20px;">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }" style="font-size:15px;">
                  首页
                </el-breadcrumb-item>
                <el-breadcrumb-item style="font-size:15px;">
                  基因
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="24">
              <p
                style="font-size: 2.5625rem;font-family:microsoft yahei;margin-bottom:1.25rem;font-weight:100;"
              >
                基因(gene)
              </p>
              <p style="text-indent:2em;font-size:1.1rem;">
                暂无介绍~
              </p>
            </el-col>
          </el-row>
          <el-row style="margin-top:30px;">
            <!-- 右侧内容区 -->
            <el-col :span="24">
              <!-- 过滤输入框 -->
              <div style="font-size:18px;margin: 0 auto;width:600px;">
                <el-input
                  style="width:600px;"
                  placeholder="请输入内容"
                  class="input-with-select"
                  v-model="userinput"
                  :minlength="1"
                  :maxlength="100"
                  @select="handleSelect"
                  :on-icon-click="handleIconClick"
                  @keydown.enter.native="handleIconClick"
                >
                  <el-select
                    style="width:130px;"
                    v-model="select"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option label="全部" value="1"></el-option>
                    <el-option label="具体的基因" value="2"></el-option>
                  </el-select>
                </el-input>
              </div>
              <!-- 下方具体数据展示表格 -->
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <y-footer></y-footer>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import YHeader from '/common/header'
import YFooter from '/common/footer'
import 'element-ui'
// import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
      userinput: '', // 搜索关键字
      select: '',
      getGene: [], // 获取列表所有具体数据存放的数组，点击复选框，发ajax重新请求所对应的新数据
      geneList: [],
      totalNum: 0, // 复选框数据（括号里面的数字）的总数
      keytitle: [],
      type: '',
      map: new Map(),
      ids: ''
    }
  },
  created() {},
  methods: {
    // 给基因频率动态生成列添加id
    forId(index) {
      return 'forid_' + index
    },
    // 搜索
    handleIconClick(ev) {
      console.log(222)
    },
    handleSelect(item) {
      this.userinput = item.value
    }
  },
  components: {
    YShelf,
    YButton,
    YHeader,
    YFooter
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.el-select .el-input {
  width: 130px;
}
.gene_list li:hover {
  // background-color: #f9f9fa;
  background-color: red;
}
.gene_list {
  width: 50rem;
}
.gene_list li {
  width: 100%;
  height: 100%;
}
.gene_list li:hover {
  background-color: green;
  width: 100%;
  height: 100%;
}
.right_img {
  float: right;
  margin: 1rem 1.25rem 0 0;
}
.right_right img {
  width: 3.125rem;
  height: 3.8125rem;
}
.clearfix {
  margin-bottom: 20px;
}
.right_title {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}

.left_type {
  font-size: 20px;
}
.leftmenu li {
  margin-top: 5px;
}

.leftmenu li .left_title {
  font-size: 17px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
