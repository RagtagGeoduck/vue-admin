<template>
  <div>
    <!-- 添加弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="close" width="580px">
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" :label-width="formLabelWidth">
            <el-input placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="内容:" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="6" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="dialogFormVisible = false"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, watchEffect } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  components: {},
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    // ref 数据

    const dialogFormVisible = ref(false);
    const formLabelWidth = ref("70px");

    // reactive 数据
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: "",
    });

    // watch
    watchEffect(() => {
      dialogFormVisible.value = props.flag;
    });

    // 函数
    const close = () =>{
        dialogFormVisible.value = false;
        emit("update:flag", false);
    }

    return {
      // ref 数据
      dialogFormVisible, formLabelWidth,
      // reactive 数据
      form,
      // 函数
      close
    };
  },
};
</script>
<style  scoped lang="scss" >
</style>
