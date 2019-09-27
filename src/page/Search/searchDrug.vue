<template>
  <div class="searchContent">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <!-- 顶部标签名 1-->
    <el-col :span="24">
      <div style="height:6rem;background-color:#fafbfd;width:100%;">
        <div class="center" style="width:76.5rem;margin:0 auto;height:100%;">
          <img
            src="../../../static/images/gene4.png"
            style="width:70px;height:70px;margin:15px 0 0 20px;opacity:0.4;"
            alt=""
          />
          <!-- <span style="font-size:30px;margin-left:10px;font-weight:200;line-height:100px;height:100px;vertical-align: top;" v-text="drugName">
 </span> -->
          <span
            style="font-size:30px;margin-left:10px;font-weight:200;line-height:100px;height:100px;vertical-align: top;"
            >ABT-751
          </span>
        </div>
      </div>
    </el-col>
    <!-- 顶部标签名 1-->
    <!-- 中间内容 1-->
    <el-card class="box-card" style="width:76.5rem; margin:0 auto;">
      <div class="tablecontent">
        <el-tabs tab-position="left" style="height: 100%;" class="tab">
          <el-tab-pane label="总结">
            <el-col :span="24" style="padding-left:15px;">
              <!-- <span v-text="searchName">名称&代码 </span> -->
              <p style="font-size:25px;font-weight:500;">药物基本信息</p>
              <br />
              <p>
                <span style="font-size:18px;font-weight:500;">药物I类:</span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >消化道及代谢 </span
                ><br />
                <span style="font-size:18px;font-weight:500;">药物II类: </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >治疗与胃酸分泌相关疾病的药物
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;">药物III类: </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >消化道溃疡和胃食管返流病治疗药物
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;">药物VI类: </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >质子泵抑制药
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;"
                  >药物中文名称:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >奥美拉唑
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;"
                  >药物英文名称:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >omeprazole
                </span>
                <br />
                <span style="font-size:18px;font-weight:500;"
                  >药物ATC编码:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                  >A02BC01
                </span>
              </p>
              <br />
              <p style="margin-bottom:30px;">
                <span style="font-size:25px;font-weight:500;"
                  >药物商品名:
                </span>
                <br />
                <span
                  style="font-size:15px;height:20px;line-height:30px;font-weight:100;"
                >
                  奥美拉唑肠溶胶囊, 艾司奥美拉唑镁肠溶片, 奥美拉唑钠肠溶片,
                  奥美拉唑肠溶片, 注射用奥美拉唑钠, 注射用奥美拉唑钠(静脉滴注),
                  奥美拉唑镁肠溶片, 注射用艾司奥美拉唑钠, 艾司奥美拉唑肠溶胶囊
                </span>
                <br />
              </p>
              <br />

              <el-row style="margin:10px 0 60px 0;">
                <el-col :span="7">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >临床指南<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 35
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外临床指南<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(30)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内专家共识<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(5)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >药物标签<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 50
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外药物标签<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(50)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内CFDA<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(10)</span>
                        <!-- (
                        <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >临床试验<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; <span>(10)</span
                        ><!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )--></font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外临床试验<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(7)</span>
                        <!--( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内临床试验<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(3)</span
                        ><!-- ( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>

              <el-row style="margin-bottom:10px;">
                <el-col :span="7">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >临床注释<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 75
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外临床注释<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(40)</span
                        ><!-- ( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >通路<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 5
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外通路<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(3)</span>
                        <!-- ( 
                        <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                      <li>
                        国内通路<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(2)</span>
                        <!--( 
                        <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="gq-category" data-section="Literature">
                    <h3>
                      <font class="h3_title" style="vertical-align: inherit;"
                        >专利<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp; ( 5
                        <!-- <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> -->
                        )</font
                      >
                    </h3>
                    <ul class="ncbi-unstyled-list">
                      <li>
                        国外专利<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(0)</span>
                        <!-- ( 
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span>
                        ) -->
                      </li>
                      <li>
                        国内专利<!--<span
                      :id="item.code"
                      class="left_title"
                      v-text="item.name"
                    ></span> -->
                        &nbsp;&nbsp;<span>(5)</span>
                        <!--( 5
                         <span
                      v-text="
                        map.get(item.code) === undefined
                          ? 0
                          : map.get(item.code)
                      "
                    ></span> 
                        )-->
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="临床指南">
            <el-tabs type="border-card">
              <el-tab-pane label="国内专家共识">
                <el-table
                  :data="Data_guide"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column prop="title" label="题目" align="center">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="国外临床指南">
                <el-table
                  :data="guide_foreign"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="source" label="source" align="center">
                  </el-table-column>
                  <el-table-column prop="drugs" label="drugs" align="center">
                  </el-table-column>
                  <el-table-column prop="genes" label="genes" align="center">
                  </el-table-column>
                  <el-table-column prop="title" label="title" align="center">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="药物标签">
            <el-tabs type="border-card">
              <el-tab-pane label="国内CFDA">
                <el-table
                  :data="CFDA_china"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="source" label="来源" align="center">
                  </el-table-column>
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="title" label="题目" align="center">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="国外药物标签">
                <el-table
                  :data="druglabel_foreign"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    prop="pgxLevel"
                    label="pgxLevel"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="source" label="source" align="center">
                  </el-table-column>
                  <el-table-column prop="drugs" label="drugs" align="center">
                  </el-table-column>
                  <el-table-column prop="genes" label="genes" align="center">
                  </el-table-column>
                  <el-table-column prop="title" label="title" align="center">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="临床注释">
            <el-tabs type="border-card">
              <el-tab-pane label="临床注释">
                <el-table
                  :data="clinicalNotes"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    prop="CertificateGrade"
                    label="询证等级"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="siteRSID"
                    label="位点RSID"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="phenotypic"
                    label="表型"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="临床试验">
            <el-tabs type="border-card">
              <el-tab-pane label="国内临床试验">
                <el-table
                  :data="clinicalTrials_china"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="RegisteredSubject"
                    label="注册题目"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="Registration"
                    label="登记号"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="indications"
                    label="适应症"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="RegistrationTime"
                    label="登记时间"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="国外临床试验">
                <el-table
                  :data="clinicalTrials_foreign"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="testSubject"
                    label="试验题目"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="intervention"
                    label="干预"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="disease" label="疾病" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="startTime"
                    label="开始时间"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="专利">
            <el-tabs type="border-card">
              <el-tab-pane label="国内专利">
                <el-table
                  :data="patent_china"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="ApplicatioNumber"
                    label="申请号"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="public" label="公开号" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="名称" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="applicant"
                    label="申请（专利权）人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="inventor"
                    label="发明（设计）人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="applyTime"
                    label="申请日"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="publicTime"
                    label="公开日"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="国外专利">
                <el-table
                  :data="patent_foreign"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="ApplicatioNumber"
                    label="申请号"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="public" label="公开号" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="名称" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="applicant"
                    label="申请（专利权）人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="inventor"
                    label="发明（设计）人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="applyTime"
                    label="申请日"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="publicTime"
                    label="公开日"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="参与通路">
            <el-tabs type="border-card">
              <el-tab-pane label="参与通路">
                <el-table
                  :data="CYpathway"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    prop="pathWays"
                    label="pathWays"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="drugClasses"
                    label="drugs/drugClasses"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="genes" label="genes" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="diseases"
                    label="diseases"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="药物扩展数据">
            <el-tabs type="border-card">
              <el-tab-pane label="药物扩展数据">
                <el-table
                  :data="drugLabel"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="drugChina"
                    label="药物中文名称"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="drugForeign"
                    label="药物英文名称"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="drugATC"
                    label="药物ATC编码"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="基因扩展标签">
            <el-tabs type="border-card">
              <el-tab-pane label="基因扩展标签"
                ><el-table
                  :data="geneLabel"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="drug" label="药物" align="center">
                  </el-table-column>
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column prop="geneId" label="基因ID" align="center">
                  </el-table-column>
                  <el-table-column prop="alias" label="别名" align="center">
                  </el-table-column>
                  <el-table-column prop="describe" label="描述" align="center">
                  </el-table-column>
                  <el-table-column prop="location" label="位置" align="center">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="数据统计">
            <el-tabs type="border-card">
              <el-tab-pane label="数据统计">
                <el-table
                  :data="Data_statistics"
                  height="250"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="gene" label="基因" align="center">
                  </el-table-column>
                  <el-table-column prop="site" label="位点" align="center">
                  </el-table-column>
                  <el-table-column prop="RSID" label="RSID" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="drugFrequency"
                    label="基因频率"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <!-- <el-tab-pane label="疾病扩展数据">
            <el-tabs type="border-card">
              <el-tab-pane label="疾病扩展数据">暂无数据~</el-tab-pane>
            </el-tabs>
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </el-card>
    <!-- 中间内容 1-->
    <y-footer></y-footer>
  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import YHeader from '/common/header'
import YFooter from '/common/footer'
import { getContent } from '/api/search'
import 'jquery'
import 'element-ui'
// import axios from 'axios'
export default {
  created() {
    this.getGeneContent()
  },
  // 生命周期函数
  data() {
    return {
      Data_guide: [], // 国内专家共识
      guide_foreign: [], // 国外临床指南
      CFDA_china: [], // 国内CFDA
      druglabel_foreign: [], // 国外药物标签
      clinicalNotes: [], // 临床注释
      clinicalTrials_china: [], // 国内临床试验
      clinicalTrials_foreign: [], // 国外临床试验
      patent_china: [], // 国内专利
      patent_foreign: [], // 国外专利
      CYpathway: [], // 参与通路
      drugLabel: [], // 药物扩展数据
      geneLabel: [], // 基因扩展标签
      Data_statistics: [], // 数据统计

      // tabPosition: 'left', // 控制tab栏显示位置
      searchKey: 'gene', // 子组件Yheader传过来的搜索关键字
      getGene: [], // 获取列表所有具体数据存放的数组，点击复选框，发ajax重新请求所对应的新数据
      geneList: [],
      totalNum: 0, // 复选框数据（括号里面的数字）的总数
      keytitle: [],
      filter_input: '',
      map: new Map(),
      ids: '',
      type: '',
      id: '',
      num: 1,
      drugName: '', // 药物中文名称:
      drug1: '', // 药物I
      drug2: '', // 药物II类:
      drug3: '', // 药物III类:
      drug4: '', // 药物VI类:
      englishName: '', // 药物英文名称
      atcCode: '', // 药物ATC编码:
      clinicalGuidelines: 0, // 临床指南
      CGforeignnum: 0, // 国外临床指南
      CGchina: 0, // 国内专家共识
      drugTitle: 0, // 药物标签
      DTforeignnum: 0, // 国外药物标签
      DTchina: 0, // 国内CFDA
      clinicalTest: 0, // 临床试验
      CTforeignnum: 0, // 国外临床试验
      CTchina: 0, // 国内临床试验
      clinicalAnnotation: 0, // 临床注释
      CAnum: 0, // 国外临床注释
      pathways: 0, // 通路
      PWforeignnum: 0, // 国外通路
      PWchina: 0, // 国内通路
      patent: 0, // 专利
      PTforeignnum: 0, // 国外专利
      PTchina: 0 // 国内专利
    }
  },
  methods: {
    getGeneContent() {
      let a = window.location.href
      // console.log(a)
      let b = a.split('?')
      // console.log(b)
      let c = b[1].split('&')
      // console.log(c)
      let d = c[0].split('=')
      // console.log(d)
      this.type = d[1]
      // console.log(this.type)
      let e = c[1].split('=')
      // console.log(e)
      this.id = e[1]
      // console.log(this.id)
      let data = new FormData()
      data.append('id', this.id)
      data.append('type', this.type)
      data.append('num', this.num)
      getContent(data).then(res => {
        console.log(res)
        let a = JSON.parse(res)
        this.drugName = a.drugName
        this.drug1 = a.drug1
        this.drug2 = a.drug2
        this.drug3 = a.drug3
        this.drug4 = a.drug4
        this.englishName = a.englishName
        this.atcCode = a.atcCode
        this.clinicalGuidelines = a.clinicalGuidelines // 临床指南
        this.CGforeignnum = a.CGforeignnum // 国外临床指南
        this.CGchina = a.CGchina // 国内专家共识
        this.drugTitle = a.drugTitle // 药物标签
        this.DTforeignnum = a.DTforeignnum // 国外药物标签
        this.DTchina = a.DTchina // 国内CFDA
        this.clinicalTest = a.clinicalTest // 临床试验
        this.CTforeignnum = a.CTforeignnum // 国外临床试验
        this.CTchina = a.CTchina // 国内临床试验
        this.clinicalAnnotation = a.clinicalAnnotation // 临床注释
        this.CAnum = a.CAnum // 国外临床注释
        this.pathways = a.pathways // 通路
        this.PWforeignnum = a.PWforeignnum // 国外通路
        this.PWchina = a.PWchina // 国内通路
        this.patent = a.patent // 专利
        this.PTforeignnum = a.PTforeignnum // 国外专利
        this.PTchina = a.PTchina // 国内专利
      })
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
.gq-category {
  border-top: 5px solid #9bdaf1;
  border-bottom: 1px solid #ccc;
}
.gq-category .h3_title {
  font-size: 1.4375rem;
  height: 4rem;
  line-height: 4rem;
}
.gq-category .ncbi-unstyled-list li {
  font-size: 1rem;
  line-height: 2.5rem;
  border-top: 1px solid #ccc;
}
.gq-category .ncbi-unstyled-list li span {
  float: right;
}
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
