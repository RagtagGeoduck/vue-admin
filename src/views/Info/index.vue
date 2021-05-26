<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="类型:">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="关键字:">
            <el-select v-model="search_key">
              <el-option
                v-for="item in SearchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input v-model="search_keyword" placeholder="请输入内容"></el-input>
        </el-col>
        
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "infoIndex",
  components: {},
  setup(props, context) {
    // 数据
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

    const SearchOptions = reactive([
      {value: "id", label: "ID"},
      {value: "title", label: "标题"}
    ])

    const value = ref("");
    const value1 = ref("");
    const search_key = ref("id");
    const search_keyword = ref("");

    // return
    return {
      formInline,
      options,
      SearchOptions,
      value,
      value1,
      search_key,
      search_keyword
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
</style>
