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
            <el-col style="margin-bottom:20px;">
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
            <!-- 上传表格内容展示区 -->
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
              <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange"
                :show-file-list="false"
                :on-remove="handleRemove"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false"
              >
                <el-button size="small" type="primary">批量上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  注：只 能 上 传 xlsx / xls 文 件
                </div>
              </el-upload>

              <el-table
                :data="tableData"
                style="width:100%!important;"
                align="center"
              >
                <el-table-column prop="zhanghao" label="登录账号" width="180">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="180">
                </el-table-column>
                <el-table-column prop="bumen" label="部门" width="180">
                </el-table-column>
                <el-table-column prop="erjibumen" label="二级部门" width="180">
                </el-table-column>
                <el-table-column prop="zhuangtai" label="状态" width="180">
                </el-table-column>
                <el-table-column prop="id" label="ID" width="180">
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
// import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
      tableData: [],
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
    },
    // 上传excel表格
    handleChange(file, fileList) {
      this.fileTemp = file.raw
      // 判断上传文件格式
      if (this.fileTemp) {
        if (
          this.fileTemp.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          this.fileTemp.type === 'application/vnd.ms-excel'
        ) {
          this.importfxx(this.fileTemp)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    // 移除excel表
    handleRemove(file, fileList) {
      this.fileTemp = null
    },
    importfxx(obj) {
      let _this = this
      // 通过DOM取文件数据
      this.file = obj
      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader()
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = ''
        var rABS = false // 是否将文件读取为二进制字符串
        var pt = this
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result)
          // console.log(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          var XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) // outdata就是读取excel内容之后输出的东西
          this.da = [...outdata]
          // console.log(this.da)
          let arr = []
          this.da.map(v => {
            let obj = {}
            obj.zhanghao = v['zhanghao'] // ip是表的标题
            obj.name = v['name'] // ip是表的标题
            obj.bumen = v['bumen'] // ip是表的标题
            obj.erjibumen = v['erjibumen'] // ip是表的标题
            obj.zhuangtai = v['zhuangtai'] // ip是表的标题
            obj.id = v['id'] // ip是表的标题
            arr.push(obj)
          })
          // console.log(arr)
          // return arr
          // 把读取的excel表格中的内容放进tableData中(这里要改成自己的表的名字)
          _this.tableData = _this.tableData.concat(arr)
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
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
