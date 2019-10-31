<template>
  <div class="taskhall">
    <y-header @sousuo="getNotice">
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
                  >搜索结果</el-breadcrumb-item
                >
              </el-breadcrumb>
            </el-col>
            <!-- 左侧菜单栏 -->
            <el-col :span="6">
              <ul class="leftmenu">
                <li class="left_type">按类型过滤</li>
                <li class="left_type" style="font-size:15px;">实体类型</li>
                <li v-for="(item, key) in keytitle" :key="key">
                  <el-checkbox
                    name="check10"
                    class="checkboxs"
                    @change="handleCheckedTypesChange(item.code)"
                  >
                    <span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span>
                    &nbsp;&nbsp; (
                    <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span>
                    )
                  </el-checkbox>
                </li>
              </ul>
            </el-col>
            <!-- 右侧内容区 -->
            <el-col :span="18">
              <!-- 下方具体数据展示列表 -->
              <ul class="gene_list">
                <li
                  v-for="(item, key) in geneList"
                  :key="key"
                  style="cursor:pointer;"
                >
                  <div style="float:left; padding-top:32px;">
                    <span
                      class="iconfont icon-jiyinsuanfa"
                      style="font-size:50px;"
                    ></span>
                  </div>
                  <div
                    class="right_right"
                    style="float:left;margin-left:1.75rem;width:90%;border-bottom:1px solid #eee;padding:20px 0;cursor:pointer;"
                  >
                    <div
                      style="float:left; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width:600px;"
                    >
                      <span
                        class="right_title"
                        v-text="item.name"
                        style="font-size: 1.2rem;color:red;"
                        @click="getContent(item.id, item.name, item.type)"
                      >
                      </span>
                      <br />
                      <span
                        class="right_title"
                        style="font-style:italic"
                        v-text="item.typeName"
                      >
                      </span>
                      <br />
                    </div>
                    <img
                      flaot="right"
                      class="right_img"
                      src="../../../static/images/PA165986279-100px.png"
                      alt=""
                    />
                  </div>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import YHeader from '/common/header'
import YFooter from '/common/footer'
// import $ from 'jquery'
import 'element-ui'
import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
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
  created() {
    this.getNoticeTitle()
    // this.searchWord()
    this.getNotice()
  },
  mounted() {},
  methods: {
    // 点击标题跳转到对应
    getContent(id, name, type) {
      // 触发 绑定的 事件，并向外传递参数
      if (type === 'project') {
        let routeData = this.$router.resolve({
          path: '/searchDruGenePair',
          query: {
            key: name
          }
        })
        window.open(routeData.href, '_blank')
      } else if (type === 'gene') {
        let routeData = this.$router.resolve({
          path: '/searchContent',
          query: {
            key: name
          }
        })
        window.open(routeData.href, '_blank')
      } else if (type === 'drug') {
        let routeData = this.$router.resolve({
          path: '/searchDrug',
          query: {
            key: name
          }
        })
        window.open(routeData.href, '_blank')
        // this.$router.push({
        //   path: '/searchDrug',
        //   query: {
        //     word: type,
        //     key: id
        //   }
        // })
      }
    },
    // 接收子组件header传过来的搜索关键字，发送ajax
    getNotice() {
      this.map.clear()
      let searchKey = $('input[icon="search"]').val() // 获取顶部搜索框用户输入的值
      console.log(searchKey)
      if (typeof searchKey === 'undefined' || searchKey === null) {
        searchKey = ''
      }
      var url = 'apis/taskApi/queryAllResult?name=' + searchKey
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // 把获得好的数据 赋予 给getGene成员
        if (res.data !== []) {
          this.getGene = JSON.parse(res.data)
          this.geneList = this.getGene
          this.totalNum = this.geneList.length
          for (let i = 0; i < this.geneList.length; i++) {
            this.map.set(
              this.geneList[i].type,
              this.map.get(this.geneList[i].type) == null
                ? 1
                : this.map.get(this.geneList[i].type) + 1
            )
            console.log(this.geneList[i].type) // 8
          }
        } else {
          this.$message({
            message: '未搜索到相关信息',
            type: 'warning'
          })
        }
      })
    },
    // 基因数据左侧标题获取
    getNoticeTitle() {
      // var biaoti = '标题'
      // var url = '/apis/cms/api/getColumnNewList?title=' + biaoti
      var url = 'static/data/getGenetitle.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // 把获得好的数据 赋予 给getGene成员
        this.keytitle = res.data
        // console.log(res)
      })
    },
    // 点击基因数据标题获取对应列表数据
    handleCheckedTypesChange(code) {
      this.geneList = []
      if (this.ids.indexOf(code + ',') === -1) {
        this.ids += code + ','
      } else {
        this.ids = this.ids.replace(code + ',', '')
      }
      // console.log(this.ids) // project,gene,drug,===用户点的某一个筛选条件
      if (this.ids === '') {
        this.geneList = this.getGene
        return
      }
      for (let i = 0; i < this.getGene.length; i++) {
        let id = this.getGene[i].type + ','
        if (this.ids.indexOf(id) !== -1) {
          this.geneList.push(this.getGene[i])
        }
      }
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
.right_title .search_title li {
  float: left;
  background-color: #eee;
  margin-left: 5px;
}
.right_title .search_title li:hover {
  background-color: #ddd;
}
.right_title {
  padding-left: 1.4rem;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}
.gene_list {
  width: 50rem;
}
.gene_list li {
  width: 100%;
  height: 100%;
}
.gene_list li:hover {
  background-color: #f9f9fa;
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
