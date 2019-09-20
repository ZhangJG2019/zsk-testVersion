/* eslint-disable no-debugger */
<template>
  <div class="searchContent">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <el-col :span="24">
      <div style="height:6rem;background-color:#fafbfd;width:100%;">
        <div class="center" style="width:76.5rem;margin:0 auto;height:100%;">
          <img
            src="../../../static/images/gene4.png"
            style="width:70px;height:70px;margin:15px 0 0 20px;opacity:0.4;"
            alt=""
          />
          <!-- <span v-text="searchName">ACE抑制剂途径，药效学 </span> -->
          <span
            style="font-size:30px;margin-left:10px;font-weight:200;line-height:100px;height:100px;vertical-align: top;"
            >ACE抑制剂途径，药效学
          </span>
        </div>
      </div>
    </el-col>
    <el-card class="box-card" style="width:76.5rem; margin:0 auto;">
      <div class="tablecontent">
        <div class="content_title">
          <el-tabs tab-position="left" style="height: 200px;">
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>
          <el-row>
            <!-- 左侧菜单栏 -->
            <!-- 右侧内容区 -->
            <el-col :span="24"> </el-col>
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
import 'jquery'
import 'element-ui'
// import axios from 'axios'
export default {
  // 生命周期函数

  data() {
    return {
      // tabPosition: 'left', // 控制tab栏显示位置
      searchName: '',
      searchKey: 'gene', // 子组件Yheader传过来的搜索关键字
      getGene: [], // 获取列表所有具体数据存放的数组，点击复选框，发ajax重新请求所对应的新数据
      geneList: [],
      totalNum: 0, // 复选框数据（括号里面的数字）的总数
      keytitle: [],
      type: '',
      filter_input: '',
      map: new Map(),
      ids: ''
    }
  },
  created() {},
  mounted() {},
  methods: {},
  components: {
    YShelf,
    YButton,
    YHeader,
    YFooter
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.right_title .search_title li:hover {
  background-color: #ddd;
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
.right_right:hover {
  background-color: #e3effc;
}
.right_right img {
  width: 3.125rem;
  height: 3.8125rem;
}
.clearfix {
  margin-bottom: 20px;
}
.right_title {
  padding-left: 1.4rem;
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
