<template>
  <div></div>
</template>
<script>
export default {
  methods: {
    bianji(subCategoryId, id) {
      if (
        subCategoryId === 1 ||
        subCategoryId === 2 ||
        subCategoryId === 3 ||
        subCategoryId === 4 ||
        subCategoryId === 5 ||
        subCategoryId === 6 ||
        subCategoryId === 7 ||
        subCategoryId === 8 ||
        subCategoryId === 9 ||
        subCategoryId === 10 ||
        subCategoryId === 47 ||
        subCategoryId === 48 ||
        subCategoryId === 49 ||
        subCategoryId === 50 ||
        subCategoryId === 51
      ) {
        this.innerVisible_one = true
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          let data2 = JSON.parse(res.templateContent) // 根据获取到的字段名动态生成title和输入框
          this.taskNameMap.clear()
          this.test_models = []
          for (var key3 in data2) {
            let id = key3.substring(0, key3.lastIndexOf('_'))
            let type = key3.substring(key3.lastIndexOf('_'), key3.length)
            let s = {
              name: data2[key3], // 具体的值
              id: id, // 输入框的id
              type: type // 输入框的类型
            }
            this.tasklist.push(s) // this.tasklist存储的是name，id，type
            // let t = id // 键名["rsId", "geneId", "source", "haploidType"]
            this.test_models.push(id)
            this.test_models.forEach((e, index) => {
              if (e === id) {
                this.taskNameMap.set(id, index)
              }
            })
            // console.log(this.taskNameMap) // 键名对应的下标{"rsId" => 0, "geneId" => 1, "source" => 2, "haploidType" => 3}
            // console.log(this.test_models) // 键名["rsId", "geneId", "source", "haploidType"]
          }
          let obj = JSON.parse(res.taskMessage) // 输入框中的值
          // console.log(obj) // 获取返回的res.taskMessage数据{id: 48, geneId: 25, name: "CYP2D6*5(del)", rsId: "", haploidType: "",}
          // obj就是输入框中的值
          for (let i in obj) {
            // console.log(obj[i]) // 具体获取到那一个输入框的值
            this.test_model[this.taskNameMap.get(i)] = obj[i]
          }
          console.log(this.test_model)
          this.two_dialog = res.templateContent // 二层弹窗结构
          this.two_msg = res.taskMessage.literNoteStr // 二层弹窗数据
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
      } else if (subCategoryId === 44) {
        // 说明书信息整理
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_seven = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_seven = true
      } else if (subCategoryId === 57) {
        // 药物商品名            commonUserGenePathwaysContentPage
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.dialogFormVisible2 = true
      } else if (
        subCategoryId === 29 ||
        subCategoryId === 30 ||
        subCategoryId === 17 ||
        subCategoryId === 18
      ) {
        // 国内外药物标签文献的上传(文献名称，3tab)、国内外临床注释文献的上传
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_sixteen = true
      } else if (
        subCategoryId === 26 ||
        subCategoryId === 13 ||
        subCategoryId === 14 ||
        subCategoryId === 21 ||
        subCategoryId === 22 ||
        subCategoryId === 43 ||
        subCategoryId === 53
      ) {
        // 国内外指南文献的上传（PMID，3tab）、国内外药物基因文献的上传、pharmGKB参考文献的上传、基因通路的参考文献上传、文献资料上传
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_thirteen = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_fiveteen = true
      } else if (subCategoryId === 33 || subCategoryId === 34) {
        // 国内外专利注释文献的上传
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_eighteens = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_eighteen = true
      } else if (subCategoryId === 45) {
        // 说明书原文上传
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_nineteen = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_nineteen = true
      } else if (subCategoryId === 46) {
        // 说明书包装图片
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_seven = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_seven = true
      } else if (subCategoryId === 35) {
        // 基因位点频率信息分布（中国）
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_twenty = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_twenty = true
      } else if (subCategoryId === 36) {
        // 基因位点频率信息分布（世界）
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_twentyOne = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_twentyOne = true
      } else if (subCategoryId === 37) {
        // 基因位点频率信息分布（住院病案首页数据统计）
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_twentyTwo = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_twentyTwo = true
      } else if (
        subCategoryId === 11 ||
        subCategoryId === 12 ||
        subCategoryId === 19 ||
        subCategoryId === 20 ||
        subCategoryId === 25 ||
        subCategoryId === 42 ||
        subCategoryId === 52
      ) {
        // 国内外指南注释，国内外药物基因文献的分解， pharmGKB参考文献的分解，基因通路的参考文献提取整理，文献资料整理
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_three = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible = true
      } else if (
        subCategoryId === 27 ||
        subCategoryId === 28 ||
        subCategoryId === 15 ||
        subCategoryId === 16
      ) {
        // 国内外药物标签注释，国内外临床注释
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_twentyThree = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_twentyThree = true
      } else if (subCategoryId === 31 || subCategoryId === 32) {
        // 国内外专利注释
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_eighteen = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_eighteen = true
      } else if (subCategoryId === 39) {
        // 药物基因参与通路描述
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_four = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_four = true
      } else if (subCategoryId === 40) {
        // 药物基因组成部分
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_eleven = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_eleven = true
      } else if (subCategoryId === 41) {
        // 药物基因相关通路
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_six = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_six = true
      } else if (subCategoryId === 55) {
        // 药物医保目录查询
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_eight = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_eight = true
      } else if (subCategoryId === 56) {
        // 药物相互作用
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_nine = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_nine = true
      } else if (subCategoryId === 23) {
        // 药物基因位点用药建议
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_ten = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_ten = true
      } else if (subCategoryId === 24) {
        // 药物基因用药建议
        this.subCategoryId = subCategoryId
        this.tasklist = []
        getGene() // 获取位点基本信息里面得options
          .then(res => {
            this.geneList = res
            // console.log(this.geneList)
          })
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          console.log(res)
          this.taskname = res.name // 将点击数据名称赋值到input框中
          this.two_dialog = res.templateContent // 二层弹窗结构
          let taskMessage = JSON.parse(res.taskMessage) // 二层弹窗数据
          console.log(taskMessage)
          this.tableData_twelve = taskMessage // 将获取到的数据放到对应数组中去，然后由对应弹窗中的:data进行双向数据绑定
          if (taskMessage != null && taskMessage != '') {
            taskMessage.forEach((item, index) => {
              console.log(item)
              console.log(index)
              if (item.literNoteStr != '') {
                this.literNoteStrMap.set(item.id, JSON.parse(item.literNoteStr))
                this.test_model[this.taskNameMap.get(index)] = obj[index]
              }
            })
          }
        })
        this.outerVisible_twelve = true
      }
    }
  }
}
</script>
<style lang="">
</style>
