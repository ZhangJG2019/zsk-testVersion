<template>
  <div class="login">
    <YHeaders> </YHeaders>
    <div class="activity-panel">
      <!-- 中间Logo -->
      <ul style="text-align: center;margin:82px 0 76px 0;">
        <li>
          <img
            src="../../../static/images/homeLogo.png"
            alt=""
            style="width:380px;height:62px;"
          />
        </li>
      </ul>
      <!-- 中间Logo -->
      <!-- 中间搜索框 -->
      <ul style="text-align: center;">
        <li>
          <div class="nav-listss">
            <el-input
              size="large"
              style="width:860px;"
              placeholder="请输入基因/药物/药物-基因检索"
              icon="search"
              v-model="userinput"
              :minlength="1"
              :maxlength="100"
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              suffix-icon="el-icon-search"
              @keydown.enter.native="handleIconClick"
              @change="handleIconClick"
            >
            </el-input>
          </div>
        </li>
      </ul>
      <!-- 中间搜索框 -->
      <!-- 热门 -->
      <div class="clearfix"></div>
      <div class="msgInf">
        <ul class="hotMsg">
          <li>
            <span><strong>热门 : </strong></span>
          </li>
          <li>
            <span
              ><a href="####"><strong> 奥美拉搓</strong></a></span
            >
          </li>
          <li>
            <span
              ><a href="####"><strong> 美托洛尔</strong></a></span
            >
          </li>
          <li>
            <span
              ><a href="####"><strong> 氨氯地平</strong></a></span
            >
          </li>
          <li>
            <span
              ><a href="####"><strong> 氢氯噻嗪</strong></a></span
            >
          </li>
          <li>
            <span
              ><a href="####"><strong> 氯沙坦</strong></a></span
            >
          </li>
        </ul>
      </div>
      <div class="clearfix"></div>
      <!-- 热门 -->
      <!-- 中间八大类 -->
      <ul class="box">
        <!-- 中间内容区域 start -->
        <li
          class="center_content"
          style="background-color:rgba(254, 97, 129,0.3);margin:0 auto;"
          @click="gene"
        >
          <img
            src="../../../static/images/newimg/gene.png"
            style="width:50px;height:50px;"
          />
          <a href="" class="title">基因</a>
          <!-- <a class="num">123</a> -->
          <a class="num" v-text="genenum"></a>
        </li>
        <li style="width:40px;height:220px;"></li>
        <li
          class="center_content"
          style="background-color:rgba(95, 196, 109,0.5);"
          @click="drug"
        >
          <img
            src="../../../static/images/newimg/drug.png"
            style="width:50px;height:50px"
          />
          <a href="" class="title">药物</a>
          <!-- <a class="num">456</a> -->
          <a class="num" v-text="drugnum"></a>
        </li>
        <li style="width:40px;height:220px;"></li>
        <li
          class="center_content"
          style="background-color:rgba(102, 97, 213,0.5);"
          @click="drugGenePair"
        >
          <img
            src="../../../static/images/newimg/drug_gene.png"
            style="width:50px;height:50px"
          />
          <a href="" class="title">药物基因对</a>
          <!-- <a class="num">789</a> -->
          <a class="num" v-text="drugGenePairnum"></a>
        </li>
        <li style="width:40px;height:220px;"></li>
        <li
          class="center_content"
          style="background-color:rgba(1, 196, 195,0.5);"
          @click="authority"
        >
          <img
            src="../../../static/images/newimg/authority.png"
            style="width:50px;height:50px"
          />
          <a href="" class="title">临床指南</a>
          <!-- <a class="num">987</a> -->
          <a class="num" v-text="authoritynum"></a>
        </li>
        <li style="width:40px;height:220px;"></li>
        <li
          class="center_content"
          style="background-color:rgba(98, 182, 229,0.5);"
          @click="drugLabels"
        >
          <img
            src="../../../static/images/newimg/drugLabels.png"
            style="width:50px;height:50px"
          />
          <a href="" class="title">药物标签</a>
          <!-- <a class="num">654</a> -->
          <a class="num" v-text="drugLabelsnum"></a>
        </li>
        <li style="width:40px;height:220px;"></li>
        <li
          class="center_content"
          style="background-color:rgba(255, 103, 101,0.5);"
          @click="clinicalNotes"
        >
          <!-- <li class="center_content"> -->
          <img
            src="../../../static/images/newimg/clinicalNotes.png"
            style="width:50px;height:50px"
          />
          <a href="" class="title">临床注释</a>
          <!-- <a class="num">321</a> -->
          <a class="num" v-text="clinicalNotesnum"></a>
        </li>
        <li style="width:40px;height:220px;"></li>
        <li
          class="center_content"
          style="background-color:rgba(125, 198, 145,0.5);"
          @click="clinicalTrials"
        >
          <img
            src="../../../static/images/newimg/clinicalTrials.png"
            style="width:50px;height:50px"
          />
          <a href="" class="title">临床实验</a>
          <!-- <a class="num">1314</a> -->
          <a class="num" v-text="clinicalTrialsnum"></a>
        </li>
        <li style="width:40px;height:220px;"></li>
        <li
          class="center_content"
          style="background-color:rgba(254, 171, 28,0.5);"
          @click="patent"
        >
          <img
            src="../../../static/images/newimg/patent.png"
            style="width:50px;height:50px"
          />
          <a href="" class="title">专利</a>
          <!-- <a class="num">521</a> -->
          <a class="num" v-text="patentnum"></a>
        </li>
        <!-- 中间内容区域 end-->
      </ul>
      <div class="clearfix"></div>
      <!-- 中间八大类 -->
      <!-- 底部最新任务和最新动态区域 start (OK)-->
      <div class="guide_ul">
        <div class="cent_left" style="width:64%;float:left;">
          <div class="left_title">
            <p>
              <span>
                <strong style="font-size:18px;margin:0 10px;">
                  最新任务</strong
                ></span
              ><span style="float:right;text-align: center;">更多></span>
            </p>
          </div>
          <div class="left_cent">
            <ul>
              <li
                style="width:100%;background-color:#fff;"
                v-for="(item, key) in newTask"
                :key="key"
              >
                <div
                  class="right_left"
                  style="float:left; padding:2.5rem .9375rem;"
                >
                  <span
                    class="iconfont icon-jiyinsuanfa"
                    style="font-size:40px;"
                  ></span>
                </div>
                <div
                  class="right_right"
                  style="float:left;width:90%;border-bottom:1px solid #eee;padding:20px 0;cursor:pointer;"
                >
                  <div
                    class="left_content"
                    style="float:left; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width:80%;"
                  >
                    <span style="font-size: 1.2rem;"
                      ><strong v-text="item.name"></strong>
                    </span>
                    <p style="margin:10px 0;">
                      创建时间 <strong> : </strong>
                      <span
                        style="font-size: 0.5rem;padding-left:1.25rem;"
                        v-text="item.createTime"
                      >
                      </span>
                    </p>
                    <p>
                      创建者 <strong> : </strong>
                      <span
                        style="font-size: 0.5rem;padding-left:2rem;"
                        v-text="item.createrName"
                      >
                      </span>
                    </p>
                  </div>
                  <el-button
                    type="primary"
                    @click="lingqu()"
                    style="padding:10px 20px"
                    >领取任务
                  </el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cent_right" style="width:30%;float:right;">
          <div class="left_title">
            <p>
              <strong style="font-size:18px;"> 最新动态</strong>
            </p>
          </div>
          <div class="right_cent">
            <ul v-for="(item, key) in topNewss" :key="key">
              <li v-text="item.title"></li>
            </ul>
          </div>
          <div class="right_img">
            <img src="../../../static/images/newimg/u166.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 底部最新任务和最新动态区域 end -->
    </div>
    <div class="clearfix"></div>
    <YFooter></YFooter>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YHeaders from '/common/headers'
import YFooter from '/common/footer'
import { sendmsg, userInfo } from '/api/index.js'
import 'element-ui'
import 'jquery'
import axios from 'axios'
import { getStore, setStore } from '/utils/storage.js'
import store from '../../store/index.js'
// 格式化时间函数 1
var formatDate = function(value) {
  let a = value.split('')
  return a[0]
}
// 格式化时间函数 2
export default {
  // 生命周期函数
  created() {
    this.getNum() // 八大类数量
    this.getTopNewss() // 最新动态
    this.getname() // 获取用户信息
  },
  data() {
    return {
      // 新版界面  开始
      // 中间八个分类 1
      genenum: '',
      drugnum: '',
      drugGenePairnum: '',
      authoritynum: '',
      drugLabelsnum: '',
      clinicalNotesnum: '',
      clinicalTrialsnum: '',
      patentnum: '',
      // 中间八个分类 2
      newTask: [],
      // 新版界面  结束
      userinput: '',
      total: '',
      articleTitle: '', // 小标题
      articleLinkUrl: '', // 小标题链接=具体内容页面
      columnTitle: '', // 分组大标题
      columnLinkUrl: '', // 分组大标题链接【最新事件，最新研究内容，公告】
      date: new Date(),
      error: false,
      home: [],
      loading: true,
      notify: '1',
      dialogVisible: false,
      timer: '',
      sizeForm: {
        email: '',
        msgcontent: '',
        msgcode: ''
      },
      // 最新动态5条
      topNewss: [],
      // 接收最新事件列表信息
      topNews: [],
      // 接收最新研究内容列表信息
      newContent: [],
      // 接收公告列表信息
      notice: []
    }
  },
  computed: {
    count() {
      return this.$store.state.login
    }
  },
  methods: {
    // 新版界面  开始
    // 首页八大模块数据数量(改造未完成，缺少最新任务)
    getNum() {
      var url1 = '/apis/taskApi/countAllNum'
      axios({
        method: 'get',
        url: url1
      }).then(res => {
        // console.log(res)
        // console.log(res.data)
        let a = JSON.parse(res.data)
        // console.log(a)
        for (let i in a) {
          // console.log(i)
          if (i === 'patent') {
            this.patentnum = a[i]
          } else if (i === 'drugsGenes') {
            this.drugGenePairnum = a[i]
          } else if (i === 'drugs') {
            this.drugnum = a[i]
          } else if (i === 'genes') {
            this.genenum = a[i]
          } else if (i === 'clinicalGuidelines') {
            this.authoritynum = a[i]
          } else if (i === 'drugLabels') {
            this.drugLabelsnum = a[i]
          } else if (i === 'clinicalAnnotation') {
            this.clinicalNotesnum = a[i]
          } else if (i === 'clinicalTrial') {
            this.clinicalTrialsnum = a[i]
          }
        }
        this.newTask = JSON.parse(a.taskInfoes)
        // console.log(b)
      })
    },
    // 获取用户信息
    getname() {
      userInfo().then(res => {
        // console.log(res)
        // console.log(res[0].data.user.username)
        // console.log(res[0].data.user)
        let menuCode = new Set()
        // if (res.data !== '' && res.data !== null && res.data !== undefined) {
        if (
          res[0].data.user !== '' &&
          res[0].data.user !== null &&
          res[0].data.user !== undefined
        ) {
          let user = res[0].data.user
          let role = user.roleVo
          if (role !== null) {
            role.permissionVoList.map(item =>
              item.menuList.map(it => menuCode.add(it.code))
            )
          }
          user.roleVo = menuCode
          store.commit('RECORD_USERINFO', {
            info: user
          })
          setStore('userInfo', user)
        } else {
          this.$message({
            message: '用户信息未获取到',
            type: 'error'
          })
        }
        // console.log(menuCode)
      })
    },
    // 最新动态
    getTopNewss() {
      var url = '/apis/cms/api/getColumnNewList?num=5'
      // var url = '../../../static/data/home_topNews.json'
      axios.defaults.withCredentials = true
      // axios.defaults.headers.common['Authentication-Token'] =
      //   window.localStorage.token
      axios({
        method: 'get',
        url: url,
        withCredentials: true
      }).then(res => {
        // console.log(res)
        // console.log(res.data[0].publishTime)
        // 把获得好的最新事件 赋予topNews 给成员
        this.topNewss = res.data
        // console.log(res.data.publishTime)
        // console.log(curTime)
        if (this.topNewss.length > 0) {
          this.columnLinkUrl = res.data[0].columnLinkUrl
          // console.log(this.columnLinkUrl)
          let url = this.columnLinkUrl.split('/html/')
          // console.log(url)
          let u = url[1].split('/')
          // console.log(u)
          let a = u[0]
          // console.log(a)
          if (a === '') {
            a = u[1]
          }
          this.columnLinkUrl = url[0] + '/' + a + '/index.html'
        } else {
          let zuixin = '.zuixin'
          this.showdiv(zuixin)
        }
      })
    },
    // 新版界面  结束

    lingqu() {
      alert('领取任务成功')
    },
    // 搜索框
    handleIconClick(ev) {
      if (this.$route.path === '/queryAllResult') {
        this.$router.push({
          path: '/queryAllResult',
          query: {
            key: this.userinput
          }
        })
        this.$emit('sousuo', this.userinput)
      } else {
        this.$router.push({
          path: '/queryAllResult',
          query: {
            key: this.userinput
          }
        })
        this.$emit('sousuo', this.userinput)
      }
    },
    querySearchAsync(queryString, cb) {
      if (this.userinput === undefined) {
        cb([])
        return
      }
      this.userinput = this.userinput.trim()
      if (this.userinput === '') {
        cb([])
        return
      } else {
        this.loadAll()
        setTimeout(() => {
          cb(this.searchResults)
        }, 300)
      }
    },
    handleSelect(item) {
      this.userinput = item.value
    },
    // 知识库用户跳转
    zskyonghu() {
      let routeData = this.$router.resolve({ path: '/taskUser' })
      window.open(routeData.href, '_blank')
    },
    // 下载跳转
    xiazai() {
      let routeData = this.$router.resolve({ path: '/download' })
      window.open(routeData.href, '_blank')
    },
    // 帮助跳转
    bangzhu() {
      let routeData = this.$router.resolve({ path: '/help' })
      window.open(routeData.href, '_blank')
    },
    // 任务大厅栏目条转
    tanchaung() {
      let userInfo = getStore('userInfo')
      // if (userInfo !== null && userInfo !== '') {
      // if (userInfo !== undefined) {
      if (userInfo === undefined || (userInfo !== null || userInfo !== '')) {
        // window.location.href = 'http://47.105.75.254/#/taskhall'
        let routeData = this.$router.resolve({ path: '/taskhall' })
        window.open(routeData.href, '_blank')
        // window.open('http://localhost:1111/#/taskhall')
        //  path: '/taskall'
      } else {
        // debugger
        // alert(111111111)
        this.$message({
          message: '请登录后查看',
          type: 'warning'
        })
      }
    },

    // 发送留言
    sentemail(sizeForm) {
      this.$refs[sizeForm].validate(valid => {
        if (valid) {
          // console.log(this.$refs[sizeForm])
          let data = new FormData()
          data.append('email', this.sizeForm.email)
          data.append('msgcontent', this.sizeForm.msgcontent)
          sendmsg(data)
            .then(res => {
              if (res.status === 1) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.sizeForm.email = null
                this.sizeForm.msgcontent = null
                return
              } else {
                this.$message.error(res.message)
                return
              }
            })
            .catch(res => {
              // console.log(111111111111)
              // this.$message({
              //   message: res.message,
              //   type: 'error'
              // })
            })
        } else {
          this.$message({
            message: '请补全信息',
            type: 'error'
          })
          return false
        }
      })
    },
    // 基因
    gene() {
      let routeData = this.$router.resolve({ path: '/gene' })
      window.open(routeData.href, '_blank')
    },
    // 药物
    drug() {
      let routeData = this.$router.resolve({ path: '/drug' })
      window.open(routeData.href, '_blank')
    },
    // 药物基因对
    drugGenePair() {
      let routeData = this.$router.resolve({ path: '/drugGenePair' })
      window.open(routeData.href, '_blank')
    },
    // 权威指南
    authority() {
      let routeData = this.$router.resolve({ path: '/authority' })
      window.open(routeData.href, '_blank')
    },
    // 药物标签
    drugLabels() {
      let routeData = this.$router.resolve({ path: '/drugLabels' })
      window.open(routeData.href, '_blank')
    },
    // 临床注释
    clinicalNotes() {
      let routeData = this.$router.resolve({ path: '/clinicalNotes' })
      window.open(routeData.href, '_blank')
    },
    // 临床实验
    clinicalTrials() {
      let routeData = this.$router.resolve({ path: '/clinicalTrials' })
      window.open(routeData.href, '_blank')
    },
    // 专利
    patent() {
      let routeData = this.$router.resolve({ path: '/patent' })
      window.open(routeData.href, '_blank')
    }
  },
  mounted() {
    // 背景添加函数
    // function bgc(color, tagName) {
    //   $(tagName).each(function(i, e) {
    //     $(e).css('background-color', color[i])
    //   })
    // }
    // 业务划分区域
    // bgc(['#35be9b', '#8bc255', '#56bde3', '#f78228'], '.guide_ul li')
    // 中间内容区域
    // bgc(
    //   [
    //     '#fe6181',
    //     '#5fc46d',
    //     '#6661d5',
    //     '#01c4c3',
    //     '#62b6e5',
    //     '#ff6765',
    //     '#7dc691',
    //     '#feab1c'
    //   ],
    //   ' .slide_center ul li'
    // )
    // 业务划分区域页面跳转 1
    // $('.guide_ul li').click(function() {
    //   $('a', this)[0].click()
    // })
  },
  components: {
    YHeaders,
    YFooter,
    YShelf
  },
  filters: {
    formatDate: formatDate // 最新事件的时间处理函数
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.main {
  background-color: #fff !important;
}
.right_cent ul {
  padding-left: 25px;
}
.right_cent ul li {
  height: 30px;
  list-style: disc;
  font-size: 15px;
}
.left_title {
  padding: 10px;
  margin-bottom: 20px;
}
.right_img {
  float: right;
  margin: 3rem 1.25rem 0 0;
}
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

.right_right img {
  width: 3.125rem;
  height: 3.8125rem;
}
.hotMsg {
  // display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 1.25rem;
  margin: 0 0 0 22.5rem;
}
.hotMsg li {
  float: left;
  margin-right: 1.25rem;
}
.hotMsg li strong {
  color: #000;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
  line-height: 0;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
.el-textarea .el-textarea__inner {
  // 然后找到对应的类名，在这里将拉伸去掉即可
  resize: none;
}
// 自己加的
#box {
  display: flex;
}
.left {
  width: 326px;
}
.right {
  width: 286px;
}
#center {
  background: pink;
  /*flex:1*/
  /*等价于*/
  flex-grow: 1;
  text-align: center;
}
.left_content {
  border-top: 0;
  // padding-top: 10px;
  box-sizing: border-box;
  // background-color: #fff;
}

.center_content {
  width: 100%;
  // height: 12.5rem;
  text-align: center;
}

.center_content img {
  width: 50px;
  height: 40px;
  margin: 20px auto;
}
.center_content a.title {
  display: block;
  font-size: 26px;
  color: #000;
  margin-bottom: 20px;
}
.center_content .num {
  font-size: 26px;
  color: #000;
}
.el-form--label-top .el-form-item__label {
  font-size: 16px !important;
  padding-left: 10px;
}
.el-form-item {
  margin: 10px 0 10px 0;
}
/* 底部业务划分区域 */

.guide_ul {
  width: 90%;
  height: 400px;
  margin: 40px auto 0;
}

/* 底部轮播图 */
* {
  margin: 0px;
  padding: 0px;
}
#box {
  width: 1200px;
  height: 65px;
  overflow: hidden;
  position: relative;
  background: #f2f2f2;
}
#box ul {
  position: absolute;
  left: 0px;
  right: 0px;
}
#box ul li {
  float: left;
  list-style: none;
  width: 118px;
  height: 58px;
  padding: 10px 0;
  box-sizing: border-box;
}

// .right_bottom {
//   // padding: 10px !important;
// }

.home {
  display: flex;
  flex-direction: column;
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page {
  position: absolute;
  width: 100%;
  top: 470px;
  z-index: 30;
  .dots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .dot-active {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: whitesmoke;
      border-radius: 8px;
      margin-right: 10px;
      cursor: pointer;
    }
    .dot {
      opacity: 0.2;
    }
  }
}

.activity-panel {
  width: 1220px;
  margin: 0 auto;
  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 40px;
    box-sizing: border-box;
    // border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 8px;
    // background: #ededed;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  }
  .content {
    float: left;
    position: relative;
    box-sizing: border-box;
    width: 25%;
    height: 200px;
    text-align: center;
  }
  .content ::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
    border-left: 1px solid #f2f2f2;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    content: '';
    pointer-events: none;
  }
  .i {
    width: 305px;
    height: 200px;
  }
  .cover-link {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
      repeat;
  }
  a {
    color: #5079d9;
    cursor: pointer;
    transition: all 0.15s ease-out;
    text-decoration: none;
  }
  a:hover {
    // box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
    transition: all 0.15s ease;
  }
}

.banner,
.banner span,
.banner div {
  font-family: 'Microsoft YaHei';
  transition: all 0.3s;
  transition-timing-function: linear;
}

.banner {
  cursor: pointer;
  perspective: 3000px;
  position: relative;
  z-index: 19;
  margin: 0 auto;
  width: 1220px;
}

.bg {
  position: relative;
  width: 1220px;
  height: 500px;
  margin: 20px auto;
  background-size: 100% 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transform: rotateY(0deg) rotateX(0deg);
  & div {
    position: relative;
    height: 100%;
    width: 100%;
  }
}

.img1 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}

.img2 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 5px;
  left: 0;
  background-size: 95% 100%;
  border-radius: 10px;
}

.img3 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
}

.a {
  z-index: 20;
  transform: translateZ(40px);
}

.b {
  z-index: 20;
  transform: translateZ(30px);
}

.c {
  transform: translateZ(0px);
}

.sk_item {
  width: 170px;
  height: 225px;
  padding: 0 14px 0 15px;
  > div {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
  }
  img {
    width: 130px;
    height: 130px;
    margin: 17px 0;
  }
  .sk_item_name {
    color: #999;
    display: block;
    max-width: 100%;
    _width: 100%;
    overflow: hidden;
    font-size: 12px;
    text-align: left;
    height: 32px;
    line-height: 16px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .sk_item_price {
    padding: 3px 0;
    height: 25px;
  }
  .price_new {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #f10214;
  }
  .price_origin {
    color: #999;
    font-size: 12px;
  }
}

.box {
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: 29px;
  box-sizing: border-box;
  // border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

ul.box {
  display: flex;
  li {
    // flex: 1;
    img {
      display: block;
      width: 305px;
      height: 200px;
    }
  }
}

.mt30 {
  margin-top: 30px;
}

.hot {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}

.floors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .imgbanner {
    width: 50%;
    height: 430px;
    .cover-link {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      width: 50%;
      height: 430px;
      z-index: 4;
      background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==)
        repeat;
    }
    .cover-link:hover {
      box-shadow: inset 0 0 38px rgba(0, 0, 0, 0.08);
      transition: all 0.15s ease;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

<style lang="scss">
.nav-listss > .el-input > input {
  height: 3.75rem !important;
  line-height: 3.75rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.298039215686275);
  font-size: 18px;
}
</style>
