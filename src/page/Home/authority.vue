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
                <el-breadcrumb-item :to="{ path: '/' }" style="font-size:15px;"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item style="font-size:15px;"
                  >权威指南</el-breadcrumb-item
                >
              </el-breadcrumb>
            </el-col>
            <el-col :span="24"
              ><p
                style="font-size: 2.5625rem;font-family:microsoft yahei;margin-bottom:1.25rem;font-weight:100;"
              >
                权威指南(authority)
              </p>
              <!-- <p style="text-indent:2em;font-size:1.1rem;">
                基因（遗传因子）是产生一条多肽链或功能RNA所需的全部核苷酸序列。基因支持着生命的基本构造和性能。储存着生命的种族、血型、孕育、生长、凋亡等过程的全部信息。环境和遗传的互相依赖，演绎着生命的繁衍、细胞分裂和蛋白质合成等重要生理过程。生物体的生、长、衰、病、老、死等一切生命现象都与基因有关。它也是决定生命健康的内在因素。因此，基因具有双重属性：物质性（存在方式）和信息性（根本属性）。
              </p>
              <br /> -->
              <p style="text-indent:2em;font-size:1.1rem;">
                暂无介绍~
              </p></el-col
            >
          </el-row>
          <el-row style="margin-top:30px;">
            <!-- 左侧菜单栏 -->
            <el-col>
              <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="30"
              >
                <!-- 任务大厅具体列表数据展示 1-->
                <div
                  style="line-height:60px;"
                  class="center_content"
                  v-for="(item, key) in data"
                  :key="key"
                >
                  <span
                    style="color:#8b94a6;font-size:25px;"
                    v-text="item.name"
                  ></span>
                </div>
              </div>
            </el-col>
            <!-- 右侧内容区 -->
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
// import $ from 'jquery'
import 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
      name: '',
      count: 0,
      data: [],
      data2: [],
      busy: false,
      total: 1, // 最大条数,初始化默认为1
      currentPage: 1, // 当前页
      pageSize: 8, // 每页8条
      order: 'uploaddate', // 数据请求参数
      orderType: 'desc' // 数据请求参数
    }
  },
  created() {
    this.getMsgList()
  },
  methods: {
    getMsgList(flag) {
      var topNew = this.currentPage
      var pageSize = this.pageSize
      var orderType = this.orderType
      var order = this.order
      // var url = '../../../static/data/taskhall.json'
      var url =
        '/apis/taskApi/getfiels?page=' +
        topNew +
        '&rows=' +
        pageSize +
        '&orderType=' +
        orderType +
        '&order=' +
        order
      axios.defaults.withCredentials = true
      axios({
        method: 'get',
        url: url,
        withCredentials: true
      }).then(res => {
        // console.log(res.data.list)
        this.currentPage = res.data.pageNum // 当前页
        this.pageSize = res.data.pageSize // 当前页展示条数
        this.total = res.data.total // 返回数据总条数
        this.data = res.data.list
        if (flag) {
          // 多次加载数据
          // this.data = this.data.concat(res.data.list)
          if (res.data.list.length === 0) {
            this.busy = true
          } else {
            this.busy = false
          }
        } else {
          // 第一次加载数据
          this.data = res.data.list
          console.log(1111)
          console.log(this.data)
          // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
          this.busy = false
        }
      })
    },
    loadMore: function() {
      this.busy = true
      console.log(this.currentPage)
      this.currentPage++
      // console.log(this.data)
      // console.log(this.getMsgList())
      this.data = this.data.push(this.getMsgList())
      console.log(this.currentPage)
      this.busy = false
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
