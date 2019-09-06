<template>
  <!-- <div class="checkout"> -->
  <div class="taskhalls">
    <y-header> <div slot="nav"></div></y-header>
    <div class="activity-panel">
      <ul class="box">
        <!-- 左侧内容区域  start-->
        <li style="margin-right:10px;background-color:#fff;">
          <div class="main_content">
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>任务大厅</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 顶部筛选条件 1-->
            <div class="task_classify clearfix">
              <ul class="task_class " style="border-bottom:1px solid #ccc">
                <strong class="fl">任务类型 :</strong>
                <li class="fl anow"><a>全部</a></li>
                <li class="fl"><a>基本信息类</a></li>
                <li class="fl"><a>注释类信息</a></li>
                <li class="fl"><a>文献原文指标分解整理</a></li>
                <li class="fl"><a>上传</a></li>
                <li class="fl"><a>数据统计</a></li>
              </ul>
              <!-- <ul class="task_power">
                <span class="fl">任务权限 :</span>
                <li class="fl actived">全部</li>
                <li class="fl">完全开放</li>
                <li class="fl">勋章开放</li>
              </ul> -->
              <el-select
                v-model="value1"
                multiple
                style="width:800px;"
                class="taskchoose"
              >
                <!-- 二级筛选条件循环 -->
                <el-option
                  id="task"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="overflow: auto;height:36px;"
                >
                </el-option>
              </el-select>
            </div>
            <!-- 顶部筛选条件 2-->
            <!-- 左侧具体内容区 1-->
            <div class="slide_center news">
              <ul>
                <!-- 任务搜索框 1-->
                <li style="float:right;margin-bottom:13px">
                  <el-autocomplete
                    icon="search"
                    v-model="input"
                    minlength="1"
                    maxlength="100"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                    :on-icon-click="handleIconClick"
                    @keydown.enter.native="handleIconClick"
                  >
                  </el-autocomplete>
                </li>
                <!-- 任务搜索框 2-->
                <!-- 任务大厅具体列表数据展示 1-->
                <li
                  class="center_content"
                  v-for="(item, key) in taskhall"
                  :key="key"
                  :id="item.subCategoryId"
                  @current-change="handleCurrentChange"
                >
                  <img
                    src="../../../static/images/liwu.png"
                    alt=""
                    style="color:blue;float:left!important; display:inline-block;"
                  />
                  <!-- @click="See(item.articleLinkUrl)" -->
                  <a
                    class="title"
                    style="float:left!important; display:inline-block;"
                    v-text="item.name"
                    :id="item.id"
                  ></a>
                  <!-- <el-button
                    :id="item.id"
                    type="primary"
                    @click="lingqu(item.id)"
                    :disabled="disabled"
                    v-if="disabled == false"
                    style="margin-left:15px"
                    >领取
                  </el-button> -->
                  <el-button
                    :id="item.id"
                    type="button"
                    @click="bianji(item.subCategoryId, item.id)"
                    v-if="disabled == false"
                    v-text="btntxt"
                  >
                  </el-button>
                </li>
                <!-- 任务大厅具体列表数据展示 2-->
                <!-- 分页 1-->
                <li
                  style="height:60px;line-height:60px;  "
                  class="center_content"
                >
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[8, 20, 30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    style="float:right;margin:25px 10px 0 0;"
                  >
                  </el-pagination>
                </li>
                <!-- 分页 2-->
              </ul>
            </div>
            <!-- 左侧具体内容区 1-->
          </div>
        </li>
        <!-- 左侧内容区域  end-->
        <!-- 右侧内容区域 start-->
        <li class="side-left left" style="margin-right:10px;">
          <div class="side_left ">
            <!-- 帮助指南 -->
            <div class=" news " style="width:326px;">
              <h2>
                <a @click="See(columnLinkUrl)"><strong>帮助指南</strong></a>
              </h2>
              <ul class="left_ul left_content">
                <li v-for="(item, key) in topNews" :key="key">
                  <span v-text="item.id"></span>
                  <a
                    @click="See(item.articleLinkUrl)"
                    v-text="item.articleTitle"
                  >
                  </a>
                </li>
              </ul>
            </div>
            <!-- 常见问题 -->
            <div class=" news" style="width:326px;margin-top:18px">
              <h2>
                <a @click="See(columnLinkUrl)"><strong>常见问题</strong></a>
              </h2>
              <ul id="newlog" class="left_content">
                <li v-for="(item, key) in newContent" :key="key">
                  <span v-text="item.id" class="new_content "></span>
                  <a
                    @click="See(item.articleLinkUrl)"
                    v-text="item.articleTitle"
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <!-- 右侧内容区域 end-->
      </ul>
    </div>
    <y-footer></y-footer>
    <!-- 弹窗 1-->
    <el-dialog
      width="30%"
      title="位点基本信息"
      :visible.sync="innerVisible_one"
      :append-to-body="true"
    >
      <li style="margin-bottom:10px;">
        <span style="float:left;width:100px;">任务名称:</span>
        <el-input
          style="width:83%"
          :disabled="true"
          :value="this.taskname"
        ></el-input>
        <!-- v-text="res.data.name" -->
      </li>
      <li
        class="center_content"
        v-for="(item, key_one) in tasklist"
        :key="key_one"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <!-- 此处的input框中v-model的值通过res.data返回回来的数据进行填充 -->
        <el-input
          class="readonly"
          style="width:83%"
          v-model="test_model[taskNameMap.get(item.id)]"
          v-if="item.type.indexOf('_input') >= 0"
          :id="item.id"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="test_model[taskNameMap.get(item.id)]"
          v-if="item.type.indexOf('_textarea') >= 0"
          :id="item.id"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          filterable
          v-model="test_model[taskNameMap.get(item.id)]"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
          :id="item.id"
        >
          <el-option
            v-for="(item, key) in geneList"
            :key="key"
            :id="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
          <!-- item.id代表当前option提交到后代的id -->
          <!-- item.name代表当前option在列表中显示的名称 -->
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible_one = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="save"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 弹窗 1-->

    <!-- 弹窗 2 -->
    <div class="two">
      <el-dialog
        title="药物通用名"
        :visible.sync="dialogFormVisible2"
        class="two"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestWord">
              <div class="insertbutton">
                <el-button @click="addLine_two" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="drugGenericName" label="药物通用名">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugGenericName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugTradeName" label="药物商品名">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugTradeName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="approvalNumber" label="批准文号">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.approvalNumber"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="specifications" label="规格">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.specifications"
                    ></el-input>
                  </template> </el-table-column
                ><el-table-column prop="originPlace" label="国家/厂家">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.originPlace"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <!-- <el-button
                    class="delete"
                    size="mini"
                    v-if="!scope.row.editing"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除
                  </el-button> -->
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogFormVisible2 = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="dialogFormVisible2 = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 2 -->

    <!-- 弹窗 3 -->
    <div class="three">
      <el-dialog title="外层 Dialog 编辑任务3" :visible.sync="outerVisible">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestThree">
              <div class="insertbutton">
                <el-button @click="addLine_three" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_three" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="PMID">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_three(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog3（不带three）"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 3 -->

    <!-- 弹窗 23 -->
    <div class="twentyThree">
      <el-dialog title="外层 国内外药物标签注释23" :visible.sync="outerVisible_twentyThree">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestThree">
              <div class="insertbutton">
                <el-button @click="addLine_twentyThree" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twentyThree" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twentyThree(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twentyThree = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twentyThree = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog3（不带three）"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 23 -->


    <!-- 弹窗 15 和14一样，调用13的弹窗及内容,且包含评论内容-->
    <div class="fiveteen">
      <el-dialog
        title="外层 Dialog 国内外指南文献的上传 15 和14一样，含评论内容"
        :visible.sync="outerVisible_fiveteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_thirteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_thirteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="PMID">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_thirteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_fiveteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_fiveteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 15 -->

    <!-- 弹窗 16 国内外药物标签文献的上传，含评论内容-->
    <div class="sixteen">
      <el-dialog
        title="外层 Dialog 国内外药物标签文献的上传，含评论内容"
        :visible.sync="outerVisible_sixteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_sixteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_sixteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_sixteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_sixteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_sixteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 16 -->

    <!-- 弹窗 18 国内外药物标签文献的上传，含评论内容-->
    <div class="eighteen">
      <el-dialog
        title="外层 Dialog 国内外专利注释文献的上传，含评论内容"
        :visible.sync="outerVisible_eighteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_eighteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_eighteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="公开号">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_eighteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文献上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_eighteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_eighteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 18 -->

    <!-- 弹窗 19 说明书原文上传，含评论内容-->
    <div class="nineteen">
      <el-dialog
        title="外层 Dialog 说明书原文上传，含评论内容"
        :visible.sync="outerVisible_nineteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="药品说明书整理" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_nineteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_nineteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="说明书来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="通用名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >查看</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="原文上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column label="包装图片上传">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.drugInstruction_picture"
                      @click="yulan"
                      >预览？？？？？？？[无效果]</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_nineteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="说明书原文上传" name="three">
            <div class="">
              <el-upload
                style="display:inline-block"
                :limit="2"
                class="upload-demo"
                ref="upload"
                action="/hqx/knowledge/importKnowledge"
                :file-list="fileList"
                :http-request="uploadSectionFile"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary" plain
                  >选取文件</el-button
                >
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  icon="el-icon-upload2"
                  type="success"
                  @click="submitUpload"
                  >导入</el-button
                >
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_nineteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_nineteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="内层 Dialog 图片预览"
      :visible.sync="innerVisible_img"
      :append-to-body="true"
    >
      <!-- 图片上传 1-->
      <!-- <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload> -->
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible_img = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_imgshow">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 19 -->

    <!-- 弹窗 7 -->
    <div class="seven">
      <el-dialog
        title="外层 Dialog 说明书包装图片"
        :visible.sync="outerVisible_seven"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="药品说明书整理" name="second">
            <div class="TestSeven">
              <div class="insertbutton">
                <el-button @click="addLine_seven" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_seven" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="说明书来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="通用名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="内容提取">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="bianji1(this.id)"
                      >编辑</el-button
                    >
                    <el-button
                      type="textarea"
                      style="display:none;"
                      v-model="scope.row.liter_content"
                    ></el-button>
                  </template>
                </el-table-column>
                <el-table-column label="原文上传" prop="accessoryId_value">
                  <template slot-scope="scope">
                    <el-select
                      style="width:83%"
                      v-model="scope.row.accessoryId_value"
                      clearable
                      placeholder="请选择"
                    >
                      <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option> -->
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="包装图片上传">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.drugInstruction_picture"
                      @click="yulan"
                      >预览</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_seven(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_seven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_seven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 药品说明书整理-编辑(动态生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="内层 Dialog 图片预览"
      :visible.sync="innerVisible_img"
      :append-to-body="true"
    >
      <!-- 图片上传 1-->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible_img = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_imgshow">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- 图片上传 2-->
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 7 -->

    <!-- 弹窗 18 国内外药物标签文献的上传，含评论内容-->
    <div class="eighteen">
      <el-dialog
        title="外层 Dialog 国内外专利注释"
        :visible.sync="outerVisible_eighteen"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_eighteen" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_eighteen" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="公开号">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="文献名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="文献内容提取">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.approvalNumber"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="accessoryId" label="文献上传">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.accessoryId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_eighteen(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_eighteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_eighteen = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog13"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
          <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') > 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div
          id="history"
          v-if="item.type.indexOf('_ckeditor') >= 0"
          style="width:100%"
        ></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 18 -->

    <!-- 弹窗 20 3GBio基因位点频率地理分布（中国）-->
    <div class="twenty">
      <el-dialog
        title="外层 Dialog 3GBio基因位点频率地理分布，含评论内容"
        :visible.sync="outerVisible_twenty"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_twenty" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twenty" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="dataSource" label="数据来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.dataSource"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="year" label="年份">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.year"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="project" label="项目">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.project"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="area" label="地区">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.area"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="receiveLaboratory" label="收检实验室">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.receiveLaboratory"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.sex"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="ageGroup" label="年龄段">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.ageGroup"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="sampleType" label="样本类别">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.sampleType"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="porResultId" label="位点结果">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.porResultId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="testAmount" label="检测量">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.testAmount"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twenty(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twenty = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twenty = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 20 -->

    <!-- 弹窗 21 3GBio基因位点频率地理分布（世界）-->
    <div class="twentyOne">
      <el-dialog
        title="外层 Dialog 3GBio基因位点频率地理分布(世界)，含评论内容"
        :visible.sync="outerVisible_twentyOne"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_twentyOne" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twentyOne" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="dataSource" label="数据来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.dataSource"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column prop="project" label="项目">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.project"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="fatherRace" label="父种族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.fatherRace"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="race" label="种族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.race"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="area" label="所处地区">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.area"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="porResultId" label="位点结果">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.porResultId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="testAmount" label="检测量">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.testAmount"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twentyOne(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twentyOne = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twentyOne = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 21 -->

    <!-- 弹窗 22 3GBio住院病案首页数据统计 -->
    <div class="twentyTwo">
      <el-dialog
        title="外层 Dialog 3GBio住院病案首页数据统计，含评论内容"
        :visible.sync="outerVisible_twentyTwo"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFiveteen">
              <div class="insertbutton">
                <el-button @click="addLine_twentyTwo" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twentyTwo" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="dataSource" label="数据来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.dataSource"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column prop="project" label="项目">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.project"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.sex"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="ageGroup" label="年龄段">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.ageGroup"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="nation" label="民族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.nation"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="nativePlace" label="籍贯">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.nativePlace"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="porResultId" label="位点结果">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.porResultId"></el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="testAmount" label="检测量">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.testAmount"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twentyTwo(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twentyTwo = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twentyTwo = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 22 -->

    <!-- 弹窗 4 -->
    <div class="four">
      <el-dialog
        title="外层 Dialog 任务信息整理"
        :visible.sync="outerVisible_four"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
           <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestFour">
              <div class="insertbutton">
                <el-button @click="addLine_four" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_four" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="Pathways">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="RELATED PATHWAYS">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.relatedPathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="PUBLICATION">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.publication"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="Authors">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.authors"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="更多信息">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="bianji">编辑</el-button>
                  </template>
                </el-table-column>

                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_four(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_four = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_four = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 任务信息整理"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 4 -->

    <!-- 弹窗 11 -->
    <div class="eleven">
      <el-dialog
        title="外层 Dialog 任务信息整理（药物基因组成部分）"
        :visible.sync="outerVisible_eleven"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
             <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestEleven">
              <div class="insertbutton">
                <el-button @click="addLine_eleven" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_eleven" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pathways" label="Pathways">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugs" label="Drugs/Drug Classes">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugs"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="genes" label="Genes">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.genes"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="diseases" label="Diseases">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.diseases"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="更多信息">
                  <template slot-scope="scope" prop="liter_content">
                    <el-button type="primary" @click="bianji">编辑</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_eleven(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_eleven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_eleven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 任务信息整理(动态生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 11 -->

    <!-- 弹窗 6 -->
    <div class="six">
      <el-dialog
        title="外层 Dialog 任务信息整理（药物基因相关通路）"
        :visible.sync="outerVisible_six"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestSix">
              <div class="insertbutton">
                <el-button @click="addLine_six" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_six" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pathways" label="Pathways">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="relatedPathways"
                  label="Related Pathways"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.relatedPathways"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_six(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_six = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_six = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 6 -->

    <!-- 弹窗 7 -->
    <div class="seven">
      <el-dialog
        title="外层 Dialog 药品说明书整理"
        :visible.sync="outerVisible_seven"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="药品说明书整理" name="second">
            <div class="TestSeven">
              <div class="insertbutton">
                <el-button @click="addLine_seven" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_seven" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="pmid" label="说明书来源">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.pmid"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="通用名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="内容提取">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="bianji">编辑</el-button>
                    <el-button
                      type="textarea"
                      style="display:none;"
                      v-model="scope.row.liter_content"
                    ></el-button>
                  </template>
                </el-table-column>
                <el-table-column label="原文上传" prop="accessoryId_value">
                  <template slot-scope="scope">
                    <el-select
                      style="width:83%"
                      v-model="scope.row.accessoryId_value"
                      clearable
                      placeholder="请选择"
                    >
                      <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option> -->
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="包装图片上传">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.drugInstruction_picture"
                      @click="yulan"
                      >预览</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_seven(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_seven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_seven = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 药品说明书整理-编辑(动态生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="内层 Dialog 图片预览"
      :visible.sync="innerVisible_img"
      :append-to-body="true"
    >
      <!-- 图片上传 1-->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible_img = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >关闭</el-button
        >
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_imgshow">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- 图片上传 2-->
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 7 -->

    <!-- 弹窗 8 -->
    <div class="eight">
      <el-dialog
        title="外层 Dialog （药物医保目录查询）"
        :visible.sync="outerVisible_eight"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestEight">
              <div class="insertbutton">
                <el-button @click="addLine_eight" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_eight" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="medicalInsuranceArea" label="医保地区">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.medicalInsuranceArea"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="number" label="编号">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.number"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugName" label="药品名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugName"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugForm" label="剂型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugForm"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="drugClassification" label="药品类别">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.drugClassification"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="medicalInsuranceCategory"
                  label="医保类别"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.medicalInsuranceCategory"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="supplementaryInformation"
                  label="增补情况"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.supplementaryInformation"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="changes" label="变更情况">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.changes"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.remarks"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_eight(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_eight = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_eight = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 8 -->

    <!-- 弹窗 9 -->
    <div class="nine">
      <el-dialog
        title="外层 Dialog （药物相互作用）"
        :visible.sync="outerVisible_nine"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestNine">
              <div class="insertbutton">
                <el-button @click="addLine_nine" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_nine" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="药品名称">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.name"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="interactiveDrugs" label="相互作用的药品">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.interactiveDrugs"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="effectiveness" label="作用效果">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.effectiveness"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_nine(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_nine = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_nine = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 9 -->

    <!-- 弹窗 10 -->
    <div class="ten">
      <el-dialog
        title="外层 Dialog （药物基因位点用药建议）"
        :visible.sync="outerVisible_ten"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              任务名称：
              <el-input suffix-icon="el-icon-date" v-model="input_three">
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestEight">
              <div class="insertbutton">
                <el-button @click="addLine_ten" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_ten" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column prop="medicationType" label="用药类型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.medicationType"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="evidenceLevel" label="询证等级">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.evidenceLevel"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="race" label="种族">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.race"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="raceDetails" label="种族详情">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.raceDetails"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="phenotypes" label="表型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.phenotypes"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="genotype" label="基因型">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.genotype"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="porMedicationSuggestionEnglish"
                  label="药物基因位点用药建议（英文）"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.porMedicationSuggestionEnglish"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="porMedicationSuggestionChinese"
                  label="药物基因位点用药建议（中文）"
                >
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.porMedicationSuggestionChinese"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_ten(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_ten = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_ten = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 弹窗 10 -->

   <!-- 弹窗 12 -->
    <div class="twelve">
      <el-dialog
        title="外层 Dialog（药物基因用药建议）"
        :visible.sync="outerVisible_twelve"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="任务信息" name="first">
            <div class="">
              <span style="float:left;width:100px;">任务名称:</span>
              <el-input
                style="width:83%"
                :disabled="true"
                :value="this.taskname"
              ></el-input>
              <br />
              <span style="float:left;width:100px;margin-top:10px"
                >评论内容:</span
              >
              <el-input
                type="textarea"
                style="width:83%;margin-top:10px"
                prefix-icon="el-icon-search"
                v-model="input2"
              >
              </el-input>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务编辑" name="second">
            <div class="TestTwelve">
              <div class="insertbutton">
                <el-button @click="addLine_twelve" class="addrow"
                  >添加行数</el-button
                >
              </div>
              <el-table :data="tableData_twelve" style="width: 100%">
                <el-table-column prop="xuhao" label="序号" width="100px">
                  <template slot-scope="scope">
                    <label v-text="scope.$index + 1"></label>
                  </template>
                </el-table-column>
                <el-table-column label="组合型" prop="liter_content">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      v-model="scope.row.liter_content"
                      @click="bianji"
                      >编辑</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="conclusion" label="用药建议">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      v-model="scope.row.conclusion"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="caozuo" label="操作">
                  <template slot-scope="scope">
                    <div class="insertbutton">
                      <i
                        class="el-icon-delete delete"
                        size="mini"
                        v-if="!scope.row.editing"
                        icon="el-icon-delete"
                        @click="handleDelete_twelve(scope.$index, scope.row)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="outerVisible_twelve = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="save"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >确 定</el-button
          >
          <el-button
            @click="outerVisible_twelve = false"
            style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
            >放弃任务</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 内层弹窗 开始-->
    <el-dialog
      width="30%"
      title="内层 Dialog 任务信息整理(动态生成，非表中生成)"
      :visible.sync="innerVisible"
      :append-to-body="true"
    >
      <li
        class="center_content"
        v-for="(item, key_three) in tasklist"
        :key="key_three"
        style="margin-bottom:10px;"
      >
        <span style="float:left;width:100px;" v-text="item.name"></span>
        <el-input
          v-model="form.name"
          style="width:83%"
          v-if="item.type.indexOf('_input') >= 0"
        ></el-input>
        <el-input
          style="width:83%"
          type="textarea"
          :rows="2"
          v-model="textarea"
          v-if="item.type.indexOf('_textarea') >= 0"
        >
        </el-input>
        <el-select
          v-model="form.region"
          style="width:83%"
          v-if="item.type.indexOf('_select') >= 0"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <!-- v-if="item.type.indexOf('_ckeditor') >= 0" -->
        <div id="item.value"></div>
      </li>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="innerVisible = false"
          style="margin:3px 0 0 10px; width:90px;height:40px;font-size:16px;vertical-align:middle;"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内层弹窗 结束-->
    <!-- 弹窗 12 -->

  </div>
</template>
<script>
import YShelf from '/components/shelf'
import YButton from '/components/YButton'
import YHeader from '/common/header'
import YFooter from '/common/footer'
import { taskHall, getGene, getSearch } from '/api/taskhall.js' // , Save
import { getStore } from '/utils/storage.js'

import 'jquery'
import 'element-ui'
import axios from 'axios'
// import Editor from 'wangeditor'

export default {
  // 生命周期函数
  created() {
    this.getHelp() // 帮助指南
    this.getProblems() // 常见问题
    // this.getNum() // 左侧内容数字
    this.getTaskList() // 任务大厅列表
    // this.zsktest() // 任务大厅select数据列表
  },
  data() {
    return {
      test_model: [],
      // 弹窗 1
      geneList: [], // 基因名称下拉列表// 获取gene下拉列表数据
      taskname: '', // 位点基本信息-固定任务名称
      readonly: true,
      input_thirteen: '', // 任务信息弹窗中的评论内容
      accessoryId_value: '',
      dialogImageUrl: '',
      activeName: 'first',
      input1: '',
      input2: '',
      input_three: '',
      tableData: [
        {
          drugGenericName: '',
          caozuo: '',
          approvalNumber: '',
          specifications: '',
          drugTradeName: '',
          originPlace: ''
        }
      ],
      tableData_three: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
      tableData_four: [
        {
          pathways: '',
          relatedPathways: '',
          publication: '',
          authors: '',
          caozuo: ''
        }
      ],
      tableData_five: [
        {
          pathways: '',
          drugs: '',
          genes: '',
          diseases: ''
        }
      ],
      tableData_six: [
        {
          pathways: '',
          relatedPathways: ''
        }
      ],
      tableData_seven: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          drugInstruction_picture: ''
        }
      ],
      tableData_eight: [
        {
          medicalInsuranceArea: '',
          number: '',
          drugName: '',
          drugForm: '',
          drugClassification: '',
          medicalInsuranceCategory: '',
          supplementaryInformation: '',
          changes: '',
          remarks: ''
        }
      ],
      tableData_nine: [
        {
          name: '',
          interactiveDrugs: '',
          effectiveness: ''
        }
      ],
      tableData_ten: [
        {
          medicationType: '',
          evidenceLevel: '',
          race: '',
          raceDetails: '',
          phenotypes: '',
          genotype: '',
          porMedicationSuggestionEnglish: '',
          porMedicationSuggestionChinese: ''
        }
      ],
      tableData_eleven: [
        {
          pathways: '',
          drugs: '',
          genes: '',
          diseases: ''
        }
      ],
      tableData_twelve: [
        {
          conclusion: ''
        }
      ],
      tableData_thirteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_fourteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
      tableData_fiveteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_sixteen: [
        {
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_seventeen: [
        {
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
      tableData_eighteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          drugInstruction_picture: '',
          currentTaskComment: ''
        }
      ],
      tableData_nineteen: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: '',
          currentTaskComment: ''
        }
      ],
      tableData_twenty: [
        {
          dataSource: '',
          year: '',
          project: '',
          area: '',
          receiveLaboratory: '',
          sex: '',
          ageGroup: '',
          sampleType: '',
          porResultId: '',
          testAmount: '',
          currentTaskComment: ''
        }
      ],
      tableData_twentyOne: [
        {
          dataSource: '',
          project: '',
          fatherRace: '',
          race: '',
          area: '',
          porResultId: '',
          testAmount: '',
          currentTaskComment: ''
        }
      ],
      tableData_twentyTwo: [
        {
          dataSource: '',
          project: '',
          sex: '',
          ageGroup: '',
          nation: '',
          nativePlace: '',
          currentTaskComment: ''
        }
      ],
      tableData_twentyThree: [
        {
          pmid: '',
          name: '',
          liter_content: '',
          accessoryId: ''
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      innerVisible_img: false,
      dialogVisible_imgshow: false,
      outerVisible: false,
      innerVisible: false,
      innerVisible_one: false,
      outerVisible_four: false,
      outerVisible_five: false,
      outerVisible_six: false,
      outerVisible_seven: false,
      outerVisible_eight: false,
      outerVisible_nine: false,
      outerVisible_ten: false,
      outerVisible_eleven: false,
      outerVisible_twelve: false,
      outerVisible_thirteen: false,
      outerVisible_fourteen: false, // 国外指南文献的上传,国内指南文献的上传,
      outerVisible_fiveteen: false, // 国内外药物基因文献的上传
      outerVisible_sixteen: false, // 国内外药物标签文献的上传 有评论内容
      outerVisible_seventeen: false, // 国内外药物标签文献的上传 无评论内容。。国内外临床注释文献的上传
      outerVisible_eighteen: false, // 国内外专利注释文献的上传 有评论内容,无评论内容
      outerVisible_nineteen: false, // 说明书原文上传、、说明书包装图片
      outerVisible_twenty: false, // 3GBio基因位点频率地理分布【中国 】
      outerVisible_twentyOne: false, // 3GBio基因位点频率地理分布【世界 】
      outerVisible_twentyTwo: false, // 3GBio住院病案首页数据统计
      outerVisible_twentyThree: false, // 国内外药物标签注释

      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      textarea: '',
      formLabelWidth: '100px',
      tasklist: [],
      // task: { id: '' },
      taskNameMap: new Map(),
      fileList: [], // 上传文件列表
      // 弹窗 2
      value1: [],
      // 二级筛选条件
      options: [
        {
          value: '选项1',
          label: '位点基本信息位点基本信息位点基本信息位点基本信息位点基本信息'
        },
        {
          value: '选项2',
          label:
            '药物基本信息位点基本信息位点基本信息位点基本信息位点基本信息位点基本信息'
        },
        {
          value: '选项3',
          label:
            '基因基本信息基因基本信息基因基本信息基因基本信息基因基本信息基因基本信息基因基本信息'
        },
        {
          value: '选项4',
          label: '疾病基本信息'
        },
        {
          value: '选项5',
          label: '项目基本信息'
        }
      ],
      subCategoryId: '', // 任务大厅每一条数据对应弹窗id
      id: '', // 任务大厅弹窗内容id
      taskTitleUrl: '',
      btntxt: '编辑',
      disabled: false,
      currentPage4: 1,
      input: '',
      input3: '',
      select: '',
      // 中间八个分类 1
      genenum: '',
      drugnum: '',
      drugGenePairnum: '',
      authoritynum: '',
      drugLabelsnum: '',
      // 中间八个分类 2
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
      topNews: [], // 帮助指南列表信息
      newContent: [], // 常见问题列表信息
      taskhall: [], // 暂存请求到的任务大厅数据
      total: 1, // 最大条数,初始化默认为1
      currentPage: 1, // 当前页
      pageSize: 8, // 每页8条
      flag: 'true'
    }
  },
  mounted() {
    // 菜单切换高亮显示 1
    $(document).ready(function() {
      $('.task_class li').click(function() {
        $(this)
          .addClass('anow')
          .siblings()
          .removeClass('anow')
      })
    })
    // 菜单切换高亮显示 2
  },
  methods: {
    bianji1(id) {
      // 内层弹窗
      this.innerVisible_one = true
      this.tasklist = []
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
        this.taskname = res.name // 将点击数据名称赋值到input框中
        let obj = JSON.parse(res.taskMessage) // 输入框中的值
        console.log(obj) // 获取返回的res.taskMessage数据{id: 48, geneId: 25, name: "CYP2D6*5(del)", rsId: "", haploidType: "",}
        for (let i in obj) {
          // console.log(obj[i]) // 具体获取到那一个输入框的值
          this.test_model[this.taskNameMap.get(i)] = obj[i]
        }
      })
    },
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
          this.taskname = res.name // 将点击数据名称赋值到input框中
          let obj = JSON.parse(res.taskMessage) // 输入框中的值
          console.log(obj) // 获取返回的res.taskMessage数据{id: 48, geneId: 25, name: "CYP2D6*5(del)", rsId: "", haploidType: "",}
          for (let i in obj) {
            // console.log(obj[i]) // 具体获取到那一个输入框的值
            this.test_model[this.taskNameMap.get(i)] = obj[i]
          }
        })
      } else if (subCategoryId === 57) {
        // 药物商品名            commonUserGenePathwaysContentPage
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.dialogFormVisible2 = true
      } else if (
        subCategoryId === 29 ||
        subCategoryId === 30 ||
        subCategoryId === 17 ||
        subCategoryId === 18
      ) {
        // 国内外药物标签文献的上传(文献名称，3tab)、国内外临床注释文献的上传
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
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
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_fiveteen = true
      } else if (subCategoryId === 33 || subCategoryId === 34) {
        // 国内外专利注释文献的上传
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_eighteen = true
      } else if (subCategoryId === 45) {
        // 说明书原文上传
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_nineteen = true
      } else if (subCategoryId === 46) {
        // 说明书包装图片
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_seven = true
      } else if (subCategoryId === 35) {
        // 基因位点频率信息分布（中国）
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_twenty = true
      } else if (subCategoryId === 36) {
        // 基因位点频率信息分布（世界）
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_twentyOne = true
      } else if (subCategoryId === 37) {
        // 基因位点频率信息分布（住院病案首页数据统计）
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_twentyTwo = true
      } else if (subCategoryId === 11 || subCategoryId === 12 || subCategoryId === 19 || subCategoryId === 20 || subCategoryId === 25 || subCategoryId === 42 || subCategoryId === 52) {
        // 国内外指南注释，国内外药物基因文献的分解， pharmGKB参考文献的分解，基因通路的参考文献提取整理，文献资料整理
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible = true
      } else if (subCategoryId === 27 || subCategoryId === 28 || subCategoryId === 15 || subCategoryId === 16) {
        // 国内外药物标签注释，国内外临床注释
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_twentyThree = true
      } else if (subCategoryId === 31 || subCategoryId === 32) {
        // 国内外专利注释
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_eighteen = true
      } else if (subCategoryId === 39) {
        // 药物基因参与通路描述
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_four = true
      } else if (subCategoryId === 40) {
        // 药物基因组成部分
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_eleven = true
      } else if (subCategoryId === 41) {
        // 药物基因相关通路
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_six = true
      } else if (subCategoryId === 44) {
        // 说明书信息整理
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_seven = true
      } else if (subCategoryId === 55) {
        // 药物医保目录查询
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_eight = true
      } else if (subCategoryId === 56) {
        // 药物相互作用
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_nine = true
      } else if (subCategoryId === 23) {
        // 药物基因位点用药建议
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_ten = true
      } else if (subCategoryId === 24) {
        // 药物基因用药建议
        let data = new FormData()
        data.append('id', id)
        getSearch(data).then(res => {
          this.taskname = res.name // 将点击数据名称赋值到input框中
        })
        this.outerVisible_twelve = true
      }
    },
    // 获取任务大厅数据列表
    getTaskList() {
      if (this.flag) {
        this.flag = false
        let data = new FormData()
        data.append('page', this.currentPage)
        data.append('rows', this.pageSize)
        data.append(
          'order',
          'convert(t.`create_time` USING gbk) COLLATE gbk_chinese_ci'
        )
        data.append('search', 'false')
        data.append('orderType', 'asc')
        taskHall(data)
          .then(res => {
            // console.log(res)
            this.taskhall = res.list
            this.name = res.list[0].name
            this.subCategoryId = res.list[0].subCategoryId
            this.id = res.list[0].id
            this.total = res.total
            this.currentPage = res.pageNum
            this.flag = true
          })
          .catch(res => {
            this.flag = true
          })
      }
    },
    // 弹窗中确定提交按钮
    save() {
      let data = new FormData()
      this.taskNameMap.forEach((index, value) => {
        // this.$set(this.task, value, value + 1232321)
        data.append(value, this.test_model[index])
        // console.log(data.get(value)) // 获取到输入框中的具体值
      })
      // Save(data)
      //   .then(res => {
      //     console.log(res)
      //     // console.log(res.list[0])
      //   })
      //   .catch(console.log('请求失败'))
      this.innerVisible = false
      // 这部分应该是保存提交你添加的内容tasklist
      // console.log(JSON.stringify(this.tableData_five))
      // console.log(JSON.stringify(this.tableData))
    },
    // zsktest() {},
    // 上传文献
    submitUpload() {
      let list = document.getElementsByClassName(
        'el-upload-list__item is-ready'
      )
      if (list.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要导入的模板！'
        })
        return
      }
      this.$refs.upload.submit()
    },
    uploadSectionFile(param) {
      var fileObj = param.file
      // FormData 对象
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      form.append('userId', this.userId)
      form.append('userName', this.userName)
      this.GLOBAL.POST('/hqx/knowledge/importKnowledge', form).then(res => {
        if (res.data.success === true) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.fileList = []
        } else {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.fileList = []
        }
      })
    },
    // 上传图片1
    handleRemove(file) {
      // console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible_imgshow = true
    },
    handleDownload(file) {
      // console.log(file)
    },
    // 上传图片2
    yulan() {
      this.innerVisible_img = true
    },
    // 富文本编辑器(meiyou)
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    addLine_two() {
      // 添加行数
      var newValue = {
        drugGenericName: '',
        drugTradeName: '',
        approvalNumber: '',
        specifications: '',
        originPlace: '',
        caozuo: ''
      }
      // 添加新的行数
      this.tableData.push(newValue)
    },
    addLine_three() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        accessoryId: '',
        caozuo: ''
      }
      // 添加新的行数
      this.tableData_three.push(newValue)
    },
    addLine_four() {
      // 添加行数
      var newValue = {
        pathways: '',
        relatedPathways: '',
        publication: '',
        authors: '',
        caozuo: ''
      }
      // 添加新的行数
      this.tableData_four.push(newValue)
    },
    addLine_five() {
      // 添加行数
      var newValue = {
        pathways: '',
        drugs: '',
        genes: '',
        diseases: ''
      }
      // 添加新的行数
      this.tableData_five.push(newValue)
    },
    addLine_six() {
      // 添加行数
      var newValue = {
        pathways: '',
        relatedPathways: ''
      }
      // 添加新的行数
      this.tableData_six.push(newValue)
    },
    addLine_seven() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        drugInstruction_picture: ''
      }
      // 添加新的行数
      this.tableData_seven.push(newValue)
    },
    addLine_eight() {
      // 添加行数
      var newValue = {
        medicalInsuranceArea: '',
        number: '',
        drugName: '',
        drugForm: '',
        drugClassification: '',
        medicalInsuranceCategory: '',
        supplementaryInformation: '',
        changes: '',
        remarks: ''
      }
      // 添加新的行数
      this.tableData_eight.push(newValue)
    },
    addLine_nine() {
      // 添加行数
      var newValue = {
        name: '',
        interactiveDrugs: '',
        effectiveness: ''
      }
      // 添加新的行数
      this.tableData_nine.push(newValue)
    },
    addLine_ten() {
      // 添加行数
      var newValue = {
        medicationType: '',
        evidenceLevel: '',
        race: '',
        raceDetails: '',
        phenotypes: '',
        genotype: '',
        porMedicationSuggestionEnglish: '',
        porMedicationSuggestionChinese: ''
      }
      // 添加新的行数
      this.tableData_ten.push(newValue)
    },
    addLine_eleven() {
      // 添加行数
      var newValue = {
        pathways: '',
        drugs: '',
        genes: '',
        diseases: ''
      }
      // 添加新的行数
      this.tableData_eleven.push(newValue)
    },
    addLine_twelve() {
      // 添加行数
      var newValue = {
        conclusion: ''
      }
      // 添加新的行数
      this.tableData_twelve.push(newValue)
    },
    addLine_thirteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_thirteen.push(newValue)
    },
    addLine_fourteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: ''
      }
      // 添加新的行数
      this.tableData_fourteen.push(newValue)
    },
    addLine_fiveteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_fiveteen.push(newValue)
    },
    addLine_sixteen() {
      // 添加行数
      var newValue = {
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_sixteen.push(newValue)
    },
    addLine_seventeen() {
      // 添加行数
      var newValue = {
        name: '',
        liter_content: '',
        accessoryId: ''
      }
      // 添加新的行数
      this.tableData_seventeen.push(newValue)
    },
    addLine_eighteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_eighteen.push(newValue)
    },
    addLine_nineteen() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: '',
        drugInstruction_picture: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_nineteen.push(newValue)
    },
    addLine_twenty() {
      // 添加行数
      var newValue = {
        dataSource: '',
        year: '',
        project: '',
        area: '',
        receiveLaboratory: '',
        sex: '',
        ageGroup: '',
        sampleType: '',
        porResultId: '',
        testAmount: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_twenty.push(newValue)
    },
    addLine_twentyOne() {
      // 添加行数
      var newValue = {
        dataSource: '',
        project: '',
        fatherRace: '',
        race: '',
        area: '',
        porResultId: '',
        testAmount: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_twentyOne.push(newValue)
    },
    addLine_twentyTwo() {
      // 添加行数
      var newValue = {
        dataSource: '',
        project: '',
        sex: '',
        ageGroup: '',
        nation: '',
        nativePlace: '',
        currentTaskComment: ''
      }
      // 添加新的行数
      this.tableData_twentyTwo.push(newValue)
    },
    addLine_twentyThree() {
      // 添加行数
      var newValue = {
        pmid: '',
        name: '',
        liter_content: '',
        accessoryId: ''
      }
      // 添加新的行数
      this.tableData_twentyThree.push(newValue)
    },
    // 删除行23
    handleDelete_twentyThree(index) {
      // console.log(index)
      // 删除行数
      this.tableData_twentyThree.splice(index, 1)
    },
    // 删除行22
    handleDelete_twentyTwo(index) {
      // console.log(index)
      // 删除行数
      this.tableData_twentyTwo.splice(index, 1)
    },
    // 删除行21
    handleDelete_twentyOne(index) {
      // console.log(index)
      // 删除行数
      this.tableData_twentyOne.splice(index, 1)
    },
    // 删除行20
    handleDelete_twenty(index) {
      // console.log(index)
      // 删除行数
      this.tableData_twenty.splice(index, 1)
    },
    // 删除行19
    handleDelete_nineteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_nineteen.splice(index, 1)
    },
    // 删除行18
    handleDelete_eighteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_eighteen.splice(index, 1)
    },
    // 删除行17
    handleDelete_seventeen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_seventeen.splice(index, 1)
    },
    // 删除行16
    handleDelete_sixteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_sixteen.splice(index, 1)
    },
    // 删除行15
    handleDelete_fiveteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_fiveteen.splice(index, 1)
    },
    // 删除行14
    handleDelete_fourteen(index) {
      // console.log(index)
      // 删除行数
      this.tableData_fourteen.splice(index, 1)
    },
    // 删除行13
    handleDelete_thirteen(index) {
      console.log(index)
      // 删除行数
      this.tableData_thirteen.splice(index, 1)
    },
    // 删除行12
    handleDelete_twelve(index) {
      console.log(index)
      // 删除行数
      this.tableData_twelve.splice(index, 1)
    },
    // 删除行11
    handleDelete_eleven(index) {
      console.log(index)
      // 删除行数
      this.tableData_eleven.splice(index, 1)
    },
    // 删除行10
    handleDelete_ten(index) {
      console.log(index)
      // 删除行数
      this.tableData_ten.splice(index, 1)
    },
    // 删除行9
    handleDelete_nine(index) {
      console.log(index)
      // 删除行数
      this.tableData_nine.splice(index, 1)
    },
    // 删除行8
    handleDelete_eight(index) {
      console.log(index)
      // 删除行数
      this.tableData_eight.splice(index, 1)
    },
    // 删除行7
    handleDelete_seven(index) {
      console.log(index)
      // 删除行数
      this.tableData_seven.splice(index, 1)
    },
    // 删除行6
    handleDelete_six(index) {
      console.log(index)
      // 删除行数
      this.tableData_six.splice(index, 1)
    },
    // 删除行5
    handleDelete_five(index) {
      console.log(index)
      // 删除行数
      this.tableData_five.splice(index, 1)
    },
    // 删除行4
    handleDelete_four(index) {
      console.log(index)
      // 删除行数
      this.tableData_four.splice(index, 1)
    },
    // 删除行3
    handleDelete_three(index) {
      // console.log(index)
      // 删除行数
      this.tableData_three.splice(index, 1)
    },
    // 删除行2
    handleDelete(index) {
      // console.log(index)
      // 删除行数
      this.tableData.splice(index, 1)
    },

    lingqu(id) {
      var judge = getStore('token')
      // if (judge === 'false') {
      if (judge === 'true') {
        this.disabled = true
      } else {
        $('#someElement').attr('display', 'none')
        this.$message.error({
          message: '你还未登录，请先登录',
          type: 'error'
        })
      }
    },
    // 任务列表数据分页 1
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val // 动态改变
      this.getTaskList() // 重新获取数据列表
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val // 动态改变
      this.getTaskList() // 重新获取数据列表
    },
    // 任务列表数据分页 2
    // 查询信息
    handleIconClick(ev) {
      if (this.$route.path === '/search') {
        this.$router.push({
          path: '/refreshsearch',
          query: {
            key: this.input
          }
        })
      } else {
        this.$router.push({
          path: '/search',
          query: {
            key: this.input
          }
        })
      }
    },
    // 搜索框
    querySearchAsync(queryString, cb) {
      if (this.input === undefined) {
        cb([])
        return
      }
      this.input = this.input.trim()
      if (this.input === '') {
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
      this.input = item.value
    },
    // 帮助指南
    getHelp() {
      // var topNew = '最新事件'
      // var url = '/apis/cms/api/getColumnNewList?title=' + topNew
      var url = 'static/data/home_gethelp.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // console.log(res)
        // console.log(res.data[0].columnTitle)
        // 把获得好的最新事件 赋予topNews 给成员
        this.topNews = res.data
        this.columnLinkUrl = res.data[0].columnLinkUrl
      })
    },
    // 常见问题
    getProblems() {
      // var newContent = '常见问题'
      // var url = '/apis/cms/api/getColumnNewList?title=' + newContent
      var url = 'static/data/home_newContent.json'
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // 把获得好的最新事件 赋予 给NewContent成员
        this.newContent = res.data
        this.columnLinkUrl = res.data[0].columnLinkUrl
      })
    },
    // cms页面跳转
    See(e) {
      window.location = e
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
//中间顶部筛选条件 1
// .el-select .el-input {
//   width: 130px;
// }
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.task_classify {
  width: 100%;
  background-color: #fafafa;
  height: 100px;
  padding: 15px;
  box-sizing: border-box;
}
.task_classify .task_power {
  margin-top: 10px;
}
.task_classify ul {
  height: 36px;
  line-height: 20px;
}
.task_classify ul li {
  margin: 0 10px;
  padding: 0 20px;
  cursor: pointer;
}
.task_class li.anow {
  border: 2px solid #13cb6a;
}
.task_classify ul li.fl {
  float: left;
}
//中间顶部筛选条件 2
// .el-textarea .el-textarea__inner {
//   // 然后找到对应的类名，在这里将拉伸去掉即可
//   resize: none;
// }
#box {
  display: flex;
}
.left {
  width: 326px;
}
.news h2 {
  height: 56px;
  line-height: 56px;
  background: #ffffff;
  color: rgb(66, 126, 236);
  border: 1px solid #ddd;
  border-bottom: 3px solid #cdcdcd;
  border-radius: 3px 3px 0 0;
  -webkit-border-radius: 3px 3px 0 0;
}
.news h2 a {
  color: rgb(66, 126, 236);
  box-sizing: border-box;
  display: block;
  text-decoration: none;
}
.news h2 strong {
  font: bold 20px 'microsoft yahei';
  height: 56px;
  padding: 0px 24px;
  box-sizing: border-box;
}
.news h2 strong:hover {
  border-bottom: 3px solid #417eec;
  padding-bottom: 14px;
}
.left_content {
  border: 1px solid #ddd;
  border-top: 0;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: #fff;
}
.news .left_ul {
  height: 334px;
  overflow: hidden;
}
.news #newlog {
  height: 386px;
  overflow: hidden;
  padding-top: 15px;
  box-sizing: border-box;
}
.news ul li {
  width: 263px;
  height: 40px;
  line-height: 40px;
  padding: 0 0 0 20px;
  float: left;
  overflow: hidden;
}
.news ul li a {
  color: #666;
}
.side_left ul li {
  width: 300px;
  box-sizing: border-box;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.side_left ul span {
  margin-right: 15px;
  width: 10px;
  height: 10px;
}
.slide_center ul {
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.slide_center ul .num {
  position: absolute;
  bottom: 5px;
  right: 20px;
  font-size: 30px;
  color: white;
}
.slide_center ul li.center_content {
  width: 870px;
  height: 120px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  border-top: 1px solid #ccc;
}
.slide_center ul li.center_content img {
  width: 50px;
  height: 50px;
  float: left;
  margin-top: 35px;
}
.slide_center ul li a.title {
  font-size: 20px;
  float: left;
  margin-left: 1.25rem;
  margin-top: 2.5rem;
}
.slide_center ul li button {
  height: 2.5rem;
  width: 7rem;
  float: right;
  margin: 2.5rem;
  border-radius: 1.5625rem;
}
.side_left .news .right_content {
  height: 217px;
  background-color: #fafafa;
}
.side_left .right_content li {
  width: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tel {
  margin-top: 20px;
  background-color: #fff;
  border-left: 1px solid #ccc;
  // padding-bottom: 20px;
}
.Message {
  background-color: #fff;
  margin-top: 20px;
}
.Message h2 {
  line-height: 56px;
  font-size: 15px;
  color: black;
  background-color: #f1f1f1;
}
.el-form--label-top .el-form-item__label {
  font-size: 16px !important;
  padding-left: 10px;
}
.el-form-item {
  margin: 10px 0 10px 0;
}
.left_form {
  margin-left: 10px;
}
.Message .left_form label {
  font-size: 14px;
  margin: 15px 0 5px 0 !important;
  display: inline-block;
}
.left_form input {
  height: 26px;
  width: 238px;
  // background-color: #f8f8f8;
}
.left_form .auth_code {
  vertical-align: middle;
  width: 50px;
  float: left;
}
.left_form a {
  vertical-align: middle;
  width: 95px;
  height: 30px;
  background-color: #17c2ce;
  display: inline-block;
  line-height: 30px;
  padding-left: 15px;
  box-sizing: border-box;
}
/* 底部业务划分区域 */
.guide {
  height: 120px;
}
.guide_ul {
  float: left;
  margin-left: 10px;
}
.guide_ul li {
  float: left;
  width: 285px;
  height: 76px;
  margin: 20px 0 0 20px;
  cursor: pointer;
}
.guide_ul li:first-child {
  margin-left: 0;
}
.guide_ul li i {
  font-size: 45px;
  color: white;
  margin: 15px 0 0 15px;
  float: left;
}
.guide_ul li p {
  margin-left: 16px;
  height: 76px;
  line-height: 76px;
  /* display: inline-block; */
  font-size: 20px;
  color: #fff;
  float: left;
}
/* .partners{height: 94px;} */
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
// 自己加的
.center_content {
  position: relative;
}
.guide {
  width: 1200px;
}
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
    margin-top: 15px;
    box-sizing: border-box;
    // border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 8px;
    background: #ededed;
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
// 清除浮动
.clearfix {
  zoom: 1;
} /*==for IE6/7 Maxthon2==*/
.clearfix :after {
  clear: both;
  content: '.';
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
} /*==for FF/chrome/opera/IE8==*/
</style>

<style>
/* .readonly:first-child {
  readonly: 'value';
} */
.insertbutton .addrow {
  width: 90px;
  height: 30px;
  border-radius: 15px;
  color: #20a0ff;
  border-color: #20a0ff;
  float: right;
}
.insertbutton .delete {
  /* width: 90px;
  height: 30px;
  border-radius: 15px; */
  font-size: 20px;
  color: hsla(3, 82%, 69%, 0.77);
}

.three .el-dialog--small,

.five .el-dialog--small,
.six .el-dialog--small,
.seven .el-dialog--small,
.nine .el-dialog--small,
.thirteen .el-dialog--small,
.fourteen .el-dialog--small,
.fiveteen .el-dialog--small,
.sixteen .el-dialog--small,
.seventeen .el-dialog--small,
.eighteen .el-dialog--small,.twentyThree .el-dialog--small {
  width: 86% !important;
}
.two .el-dialog--small,
.four .el-dialog--small,
.eight .el-dialog--small,
.ten .el-dialog--small,
.eleven .el-dialog--small,
.nineteen .el-dialog--small,
.twenty .el-dialog--small,
.twentyOne .el-dialog--small,
.twentyTwo .el-dialog--small {
  width: 100% !important;
}
.el-dialog__header {
  background-color: #eee;
  padding: 10px;
}

.el-tag .el-select__tags-text {
  float: left !important;
}
.el-tag .el-icon-close {
  float: left !important;
  margin-top: 4px;
}
.el-icon-caret-top {
  margin-top: 2px !important;
}
.el-select__tags {
  float: left;
  height: 60px;
  overflow: auto;
}
.el-select__tags::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.el-select__tags::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.2);
}

.el-select__tags::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.1);
}
.el-select__tags span.el-tag {
  float: left;
}
</style>
