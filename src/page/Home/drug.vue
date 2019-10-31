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
                  >药物</el-breadcrumb-item
                >
              </el-breadcrumb>
            </el-col>
            <el-col :span="24"
              ><p
                style="font-size: 3.5625rem;font-family:microsoft yahei;margin-bottom:1.25rem;font-weight:100;"
              >
                药物(drug)
              </p>
              <p style="text-indent:2em;font-size:1.1rem;">
                基因（遗传因子）是产生一条多肽链或功能RNA所需的全部核苷酸序列。基因支持着生命的基本构造和性能。储存着生命的种族、血型、孕育、生长、凋亡等过程的全部信息。环境和遗传的互相依赖，演绎着生命的繁衍、细胞分裂和蛋白质合成等重要生理过程。生物体的生、长、衰、病、老、死等一切生命现象都与基因有关。它也是决定生命健康的内在因素。因此，基因具有双重属性：物质性（存在方式）和信息性（根本属性）。
              </p>
              <br />
              <p style="text-indent:2em;font-size:1.1rem;">
                带有遗传讯息的DNA片段称为基因，其他的DNA序列，有些直接以自身构造发挥作用，有些则参与调控遗传讯息的表现。组成简单生命最少要265到350个基因。（这涉及到了基因工作组的力量，人类的基因工作组与果蝇的基本相似）
              </p></el-col
            >
          </el-row>
          <el-row style="margin-top:30px;">
            <!-- 右侧内容区 -->
            <el-col :span="24">
              <!-- 过滤输入框和数据总数 -->
              <div style="font-size:18px;margin: 0 auto;width:600px;">
                <el-input
                  style="width:600px;"
                  placeholder="请输入内容"
                  class="input-with-select"
                  v-model="userinput"
                  :minlength="1"
                  :maxlength="100"
                  @select="handleSelect"
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
              <!-- 下方具体数据展示列表 -->
              <commonTable
                :columns="columns"
                :data="tableData"
                :pager="page"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
              >
              </commonTable>
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
// import { gainDrug } from '/api/index.js'
// import $ from 'jquery'
import 'element-ui'
import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
      columns: [
        { prop: 'id', label: 'id', width: '150', align: 'center' },
        {
          prop: 'date',
          label: '日期',
          width: '150',
          align: 'center'
        },
        {
          prop: 'name',
          label: '姓名',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        { prop: 'address', label: '地址', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1, // 当前页
        limit: 5, // 每页5条
        sizes: [5, 10, 20],
        total: 0 // 最大条数,初始化默认为1
      },
      dataAll: [], // 存放全部的假数据
      flag1: 'true', // 分页中，点击下一页
      drugData: [],
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
  created() {
    this.getNotice()
    this.getNoticeTitle()
    this.getDrugList()
  },
  mounted() {
    this.tableData = []
    this.page.total = this.tableData.length
  },
  methods: {
    // 重新渲染name列
    formatter(row, column, cellValue) {
      console.log(row)
      console.log(column)
      console.log(cellValue)
      return 'hello ' + row.name
    },
    getDrugList() {
      this.drugData = []
      if (this.flag1) {
        this.flag1 = false
        var url1 = '../../../static/data/drugTitle.json'
        axios({
          method: 'get',
          url: url1,
          params: {}
        }).then(res => {
          this.page.total = res.data.length
          this.dataAll = res.data
          this.tableData = this.dataAll.slice(0, 5)
        })
      }
    },
    // 任务列表数据分页 1
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.page.limit = val // 动态改变
      this.tableData = this.dataAll.slice(0, val)
      // console.log(1111)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page.pageNo = val // 动态改变
      let a = val * this.page.limit
      let b = (val - 1) * this.page.limit
      this.tableData = this.dataAll.slice(b, a)
      this.getDrugList() // 重新获取数据列表
      // console.log(2222)
    },
    // 任务列表数据分页 2
    // 搜索
    handleIconClick(ev) {
      console.log(222)
    },
    handleSelect(item) {
      this.userinput = item.value
    },
    // 所有基因数据列表获取
    getNotice() {
      // var gonggao = '公告'
      // var url = '/apis/cms/api/getColumnNewList?title=' + gonggao
      var url = 'static/data/getGene.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // 把获得好的数据 赋予 给getGene成员
        this.getGene = res.data
        this.geneList = this.getGene
        this.totalNum = this.getGene.length
        // console.log(res)
        for (let i = 0; i < this.getGene.length; i++) {
          this.map.set(
            this.getGene[i].typeId,
            this.map.get(this.getGene[i].typeId) == null
              ? 1
              : this.map.get(this.getGene[i].typeId) + 1
          )
        }
      })
    },
    // 基因数据左侧标题获取
    getNoticeTitle() {
      // var gonggao = '公告'
      // var url = '/apis/cms/api/getColumnNewList?title=' + gonggao
      var url = 'static/data/getGenetitle2.json'
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
    handleCheckedTypesChange(id) {
      this.geneList = []
      if (this.ids.indexOf(id + ',') === -1) {
        this.ids += id + ','
      } else {
        this.ids = this.ids.replace(id + ',', '')
      }
      console.log(this.ids)
      if (this.ids === '') {
        this.geneList = this.getGene
        return
      }
      for (let i = 0; i < this.getGene.length; i++) {
        let typeId = this.getGene[i].typeId + ','
        if (this.ids.indexOf(typeId) !== -1) {
          this.geneList.push(this.getGene[i])
        }
      }
      // var url = 'static/data/getGene.json'
      // axios({ methods: 'get', url: url }).then(res => {
      //   // console.log(res.data)
      //   for (let i = 0; i < this.getGene.length; i++) {
      //     this.map.set(
      //       this.getGene[i].typeId,
      //       this.map.get(this.getGene[i].typeId) == null
      //         ? 1
      //         : this.map.get(this.getGene[i].typeId) + 1
      //     )
      //   }
      // })
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
