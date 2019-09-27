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
                  >基因</el-breadcrumb-item
                >
              </el-breadcrumb>
            </el-col>
            <el-col :span="24"
              ><p
                style="font-size: 2.5625rem;font-family:microsoft yahei;margin-bottom:1.25rem;font-weight:100;"
              >
                基因(gene)
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
              <el-table :data="geneData" style="width: 100%;margin-top:40px;">
                <el-table-column
                  prop="gene"
                  label="基因"
                  width="100"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="geneChina"
                  label="项目中文名称"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="haploidType"
                  label="单倍型"
                  width="150"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="variationSite"
                  label="变异位点"
                  width="150"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="siteRSID"
                  label="位点RSID"
                  width="150"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="基因频率(中国南方人群)" align="center">
                  <el-table-column prop="GG" width="140" align="center">
                  </el-table-column>
                  <el-table-column prop="GA" width="140" align="center">
                  </el-table-column>
                  <el-table-column prop="AA" width="140" align="center">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  prop="source"
                  label="来源"
                  width="150"
                  align="center"
                >
                </el-table-column>
              </el-table>
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
import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
      geneData: [
        {
          gene: 'UGT1A1', // 基因
          geneChina: '伊立替康-UGT1A1', // 项目中文名称
          haploidType: 'UGT1A1*6', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: 'rs4148323', // 位点RSID
          GG: 'GG:72.4%(n=72)', // 基因频率(中国南方人群)
          GA: 'GA:23.8%(n=23)', // 基因频率(中国南方人群)
          AA: 'AA:3.8%(n=5)', // 基因频率(中国南方人群)
          source: '1000基因组' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: '昂丹司琼-CYP2D6', // 项目中文名称
          haploidType: '', // 单倍型
          variationSite: 'CYP2D6*10(C188T)', // 变异位点
          siteRSID: 'rs1065852', // 位点RSID
          GG: 'GG:19.0%(n=72)', // 基因频率(中国南方人群)
          GA: 'GA:39.1%(n=23)', // 基因频率(中国南方人群)
          AA: 'AA:41.9%(n=5)', // 基因频率(中国南方人群)
          source: '1000基因组' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: '托烷司琼-CYP2D6', // 项目中文名称
          haploidType: 'CYP2D6*5', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: '', // 位点RSID
          GG: '', // 基因频率(中国南方人群)
          GA: '', // 基因频率(中国南方人群)
          AA: '', // 基因频率(中国南方人群)
          source: 'LIS系统' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: '普罗帕酮-CYP2D6', // 项目中文名称
          haploidType: 'CYP2D6*14', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: 'rs5030865', // 位点RSID
          GG: 'CC:100.0%(n=72)', // 基因频率(中国南方人群)
          GA: 'TT:0(n=23)', // 基因频率(中国南方人群)
          AA: 'CT:0(n=5)', // 基因频率(中国南方人群)
          source: '1000基因组' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: '美托洛尔-CYP2D6', // 项目中文名称
          haploidType: '', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: '', // 位点RSID
          GG: '', // 基因频率(中国南方人群)
          GA: '', // 基因频率(中国南方人群)
          AA: '', // 基因频率(中国南方人群)
          source: '' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: '卡维地洛-CYP2D6', // 项目中文名称
          haploidType: '', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: '', // 位点RSID
          GG: '', // 基因频率(中国南方人群)
          GA: '', // 基因频率(中国南方人群)
          AA: '', // 基因频率(中国南方人群)
          source: '' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: '他莫普芬-CYP2D6', // 项目中文名称
          haploidType: '', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: '', // 位点RSID
          GG: '', // 基因频率(中国南方人群)
          GA: '', // 基因频率(中国南方人群)
          AA: '', // 基因频率(中国南方人群)
          source: '' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: ' 可待因-CYP2D6', // 项目中文名称
          haploidType: '', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: '', // 位点RSID
          GG: '', // 基因频率(中国南方人群)
          GA: '', // 基因频率(中国南方人群)
          AA: '', // 基因频率(中国南方人群)
          source: '' // 来源
        },
        {
          gene: 'CYP2D6', // 基因
          geneChina: '曲马多-CYP2D6', // 项目中文名称
          haploidType: '', // 单倍型
          variationSite: '', // 变异位点
          siteRSID: '', // 位点RSID
          GG: '', // 基因频率(中国南方人群)
          GA: '', // 基因频率(中国南方人群)
          AA: '', // 基因频率(中国南方人群)
          source: '' // 来源
        }
      ],
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
  },
  methods: {
    // 搜索
    handleIconClick(ev) {
      console.log(222)
    },
    handleSelect(item) {
      this.userinput = item.value
    },
    // 所有基因数据列表获取
    getNotice() {
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
