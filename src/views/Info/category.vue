<template>
  <div id="category">
    <el-button type="danger" @click="addFirstCategoryStatus"
      >添加一级分类</el-button
    >
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="20">
        <!-- 分类栏 -->
        <el-col :span="8">
          <div class="category_wrap">
            <div
              class="category"
              v-for="firstItem in category.item"
              :key="firstItem.id"
            >
              <!-- 一级分类 -->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round
                    >添加子级</el-button
                  >
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <!-- 子集分类 -->
              <ul v-if="firstItem.children">
                <li v-for="childItem in firstItem.children" :key="childItem.id">
                  {{ childItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>

        <!-- 表单 -->
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form
            :label-position="labelPosition"
            label-width="142px"
            :model="form"
            class="form-wrap"
            ref="categoryForm"
          >
            <el-form-item
              label="一级分类名称"
              v-if="category_first_input"
              prop="firstCategoryName"
            >
              <el-input v-model="form.firstCategoryName"></el-input>
            </el-form-item>
            <el-form-item
              label="二级分类名称"
              v-if="category_children_input"
              prop="childrenCategoryName"
            >
              <el-input v-model="form.childrenCategoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :disabled="submit_button_disable"
                :loading="submit_button_loading"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { reactive, ref, onMounted } from '@vue/composition-api';
import {AddFirstCategory, GetCategory} from '@/api/news';
export default {
  name: '',
  components: {},
  setup (props, context) {
    // data 数据
    const labelPosition = 'right';
    const form = reactive({
          firstCategoryName: '',
          childrenCategoryName: '',
        })
    const category_first_input = ref(true);
    const category_children_input = ref(true);

    // data - 按钮
    const submit_button_type = ref('');
    const submit_button_disable = ref(false);
    const submit_button_loading = ref(false);

    const category = reactive({
      item:[
        {
          id:'1',
          category_name:"一级分类-1"
        },
        {
          id:"2",
          category_name:'一级分类-2',
          children:[
            {
              id:"4",
              category_name:'二级分类=1'
            },
            {
              id:"5",
              category_name:'二级分类=2'
            },
          ]
        }
      ]
    })

    // method 方法 ----------------------------------------------------------------------开始
    const addFirstCategoryStatus = () =>{
      category_first_input.value = true;
      category_children_input.value = true;
    }

    // method - submit提交表单
    const submit = () => {
      addFirstCategory();
    }

    // method-submit-添加一级分类
    const addFirstCategory = () => {
      // alert('addFirstCategory');
      if(!form.firstCategoryName.trim()){
        context.root.$message({
          message:'一级分类不能为空',
          type:'error'
        })
        return false;
      }
      submit_button_loading.value = true;
      AddFirstCategory({categoryName: form.firstCategoryName}).then(response => {
        let data = response.data;
        // console.log(data)
        if(data.resCode === 0){
          context.root.$message({
            message: data.message,
            type: "success"
          })
          category.item.push(data.data)   // 直接push到列表中
        }
        // getCategory();  // 调用接口刷新界面，缺点: 消耗资源
        submit_button_loading.value = false;
        context.refs.categoryForm.resetFields();
      }).catch(error => {
        console.log(error);
        submit_button_loading.value = true;
        context.refs.categoryForm.resetFields();
      })
    }

    // method-category-获取分类
    const getCategory = () => {
      GetCategory({}).then(response =>{
        console.log(response);
        let data = response.data.data;
        category.item = data;

      }).catch(error =>{
        console.log(error)
      })
    }
    // method 方法 ----------------------------------------------------------------------结束

    /*
       生命周期
    */
    onMounted(()=>{
      getCategory();
    })

    // return 返回
    return {
      // data 数据-return
      labelPosition, form, category_first_input, category_children_input,
      submit_button_type, submit_button_disable,submit_button_loading,
      category,
      // method 方法
      addFirstCategoryStatus, submit,
      addFirstCategory, getCategory,
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/styles/config.scss";

.category_wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.menu-title {
  line-height: 44px;
  // 未生效
  padding-left: 22px;
  background-color: #f3f3f3;
  border-radius: 5px;
}

.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  // 垂直虚线的css
  &:before {
    content: "";
    position: absolute;
    left: 26px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }

  h4 {
    position: relative;
    padding-left: 40px;
  }
  // 解决图标被虚线挡住的问题
  svg {
    position: absolute;
    left: 14px;
    top: 10px;
    background-color: #fff;
    font-size: 17px;
  }
  li {
    position: relative;
    // margin-left: 20px;
    margin-left: -12px;
    padding-left: 36px;
    // 水平虚线的css样式
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }

  // 设置移入后显示三个按钮选项
  li,
  h4 {
    border-radius: 5px;
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
  .button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button {
      font-size: 12px;
    }
  }
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: #e9e9e9;
}

// 表单样式
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
</style>
