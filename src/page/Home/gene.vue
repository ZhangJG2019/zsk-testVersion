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
              <!-- 下方具体数据展示表格 -->
              <input type="file" @change="importExcel($event.target)" />
              <div
                style="overflow: auto;"
                v-if="tableTbody && tableTbody.length > 0"
              >
                <table
                  class="table table-bordered"
                  style="min-width: 100%;border-collapse:collapse;margin-top:1.25rem;"
                >
                  <thead>
                    <tr class="tableBorder">
                      <th
                        v-for="(item, index) in tableHeader"
                        :key="index"
                        class="th_height"
                        v-text="item"
                      >
                        <!-- {{ item }} -->
                      </th>
                    </tr>
                  </thead>

                  <tbody class="tbody" id="click">
                    <tr
                      v-for="(row, index) in tableTbody"
                      :key="index"
                      class="tableBorder hover"
                      :id="forId(index + 1)"
                    >
                      <td
                        class="th_height hover click"
                        v-for="(col, key) in tableHeader"
                        :key="key"
                        v-text="row[col]"
                        align="center"
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
import 'jquery'

// import axios from 'axios'
export default {
  // 生命周期函数
  data() {
    return {
      wb: '',
      tableHeader: [],
      tableTbody: [],

      tableData: [],
      userinput: '', // 搜索关键字
      select: '',
      getGene: [], // 获取列表所有具体数据存放的数组，点击复选框，发ajax重新请求所对应的新数据
      geneList: [],
      totalNum: 0, // 复选框数据（括号里面的数字）的总数
      keytitle: [],
      type: '',
      map: new Map(),
      ids: '',
      id: ''
    }
  },
  methods: {
    // 给基因频率动态生成列添加id
    forId(index) {
      return 'rowid_' + index
    },
    // 导入表格
    importExcel(obj) {
      if (!obj.files) {
        return
      }
      // eslint-disable-next-line one-var
      let file = obj.files[0],
        types = file.name.split('.')[1], // types是用户上传文件的后缀
        fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(
          item => item === types // types是用户上传文件后缀，item是数组中的每一项
        )
      if (!fileType) {
        // 判断fileType是true还是false
        this.$message({
          message: '格式错误！请重新选择',
          type: 'error'
        })
        return
      }
      this.file2Xce(file).then(tabJson => {
        // 调用file2Xce方法，并通过DOM操作将input里面的内容存放到file里面，获取成功后返回的数据放到tabJson里面
        if (tabJson && tabJson.length > 0) {
          this.tableHeader = Object.keys(tabJson[0])
          // this.tableHeader===Object.keys(tabJson[0])===["zhanghao", "name", "bumen", "erjibumen", "zhuangtai", "id"]获取tabJson数组中第一个对象的内容（列名）
          // Object.keys(tabJson)===["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] 获取tabJson数组中每个对象的key
          this.tableTbody = tabJson // tabJson是excel表中数据条数，用数组包含对象形式展示
          // console.log(tabJson)
        }
      })
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader() // 实例化一个FileReader对象
        reader.onload = function(e) {
          // e表示该事件的一些信息
          // onload是在所有文件读取完成后执行
          let data = e.target.result
          // eslint-disable-next-line no-undef
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          resolve(
            // eslint-disable-next-line no-undef
            XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])
            // 将获取到excel文件中第一页（左下角）的内容解析出来，赋值给reader
          )
          // console.log(this.wb)
          // console.log(this.wb.SheetNames[1])
          // console.log(this.wb.Sheets[this.wb.SheetNames[1]])
        }
        reader.readAsBinaryString(file)
        // reader.readAsArrayBuffer(file)
      })
    }
  },
  mounted() {
    $('#click tr').click(function() {
      document.getElementById('tr').value = this.id // 每行设置不同的id值，该行是获取当前行的唯一值
      $(this.id)
        .addClass('tr_on')
        .siblings('tr')
        // eslint-disable-next-line no-irregular-whitespace
        .removeClass('tr_on') // 这行是进行背景色的切换，backcolor是提前定义好的外部css样式，这里进行添加与删除同类的，即实现了选中改行，其他行颜色去掉。 backcolor 中的属性  要加上 !important ，提高其优先级
    })
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
.tableBorder {
  border: 1px solid #ccc;
  border-collapse: collapse;
  height: 50px;
}
.tbody tr.hover:hover {
  background-color: #eee;
}
.tr_on {
  // background-color: rgb(224, 222, 222) !important;
  background-color: red !important;
}
.th_height {
  // padding: 12px 0;
  height: 40px;
}
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
