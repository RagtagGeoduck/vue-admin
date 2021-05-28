<template>
  <div>
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline"> -->
    <el-row :gutter="16">
      <el-col :span="3">
        <div class="label-wrap category">
          <label for="">类型</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="label-wrap date">
          <label for="">日期:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              style="width: 100%"
              v-model="dateValue"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap keyword">
          <label for="">关键字:&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="search_key" style="width: 100%">
              <el-option
                v-for="item in SearchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="search_keyword"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%">搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%" @click="dialog_switch = true">新增</el-button>
      </el-col>
    </el-row>
    <!-- </el-form> -->

    <!-- 表格 ----------------------------------------------------------------------开始-->
    <div class="blank_space_30"></div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="title" label="标题" width="830"> </el-table-column>
      <el-table-column prop="category" label="类别" width="130">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="237"> </el-table-column>
      <el-table-column prop="user" label="管理人" width="115">
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="blank_space_30"></div>
    <!-- 表格 ----------------------------------------------------------------------结束-->
    <el-row>
      <el-col :span="12">
        <el-button>批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :total="1000"
          class="pull-right"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 引入Dialog组件 -->
    <DialogInfo :flag.sync="dialog_switch" @close="closeDialog"/>

     <!-- <el-dialog title="收货地址" :visible.sync="dialog_switch">
       test
     </el-dialog> -->
  </div>

</template>

<script type="text/ecmascript-6">
import "../../styles/config.scss";
import DialogInfo from './dialog/info'
import { ref, reactive } from "@vue/composition-api";


export default {
  name: "infoIndex",
  components: {DialogInfo},
  setup(props) {
    // 数据 ---------------------------------------------------------------开始
    const dialog_switch = ref(true);

    const formInline = ref("");


    const options = reactive([
      {
        value: 1,
        label: "国际信息",
      },
      {
        value: 2,
        label: "国内信息",
      },
      {
        value: 3,
        label: "行业信息",
      },
    ]);
    const tableData = reactive([
      {
        title: "习近平致信祝贺中国日报创刊40周年",
        category: "国内新闻",
        date: "2021-05-27",
        user: "管理员",
      },
      {
        title: "创新发展 中国有“数”",
        category: "国内新闻",
        date: "2021-05-27",
        user: "管理员",
      },
      {
        title: "构建人类卫生健康共同体 习近平强调这些关键词",
        category: "国内新闻",
        date: "2021-05-27",
        user: "管理员",
      },
    ]);

    const SearchOptions = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" },
    ]);

    const categoryValue = ref("");
    const dateValue = ref("");
    const search_key = ref("id");
    const search_keyword = ref("");
    // 数据 ---------------------------------------------------------------结束

    // 函数
    const handleSizeChange = (val) => {
      console.log(val)
    }

    const handleCurrentChange = (val) => {
      console.log(val)
    }

    const closeDialog = () =>{
      dialog_switch.value = flase;

    }

    return {
      // ref数据
      dialog_switch,
      tableData,
      formInline,
      options,
      SearchOptions,
      categoryValue,
      dateValue,
      search_key,
      search_keyword,

      // 函数
      handleSizeChange, handleCurrentChange, closeDialog

    };
  },
};
</script>
<style  scoped lang="scss" >
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.keyword {
    @include labelDom(right, 99, 40);
  }
}
</style>
