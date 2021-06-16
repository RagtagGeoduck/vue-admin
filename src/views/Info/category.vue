<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="20">
        <!-- 分类栏 -->
        <el-col :span="8">
          <div class="category_wrap">
            <div class="category">
              <!-- 一级分类 -->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                一级分类-名称
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4 >
              <!-- 子集分类 -->
              <ul>
                <li>
                  子集分类-名称
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  子集分类-名称
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  子集分类-名称
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
              <!-- 一级分类 -->
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                一级分类-名称
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4 >
              <!-- 子集分类 -->
              <ul>
                <li>
                  子集分类-名称
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  子集分类-名称
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  子集分类-名称
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
          <el-form :label-position="labelPosition" label-width="142px" :model="formLabelAlign" class="form-wrap">
            <el-form-item label="名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
        </el-form>
        </el-col>
        
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { reactive } from '@vue/composition-api';
export default {
  name: '',
  components: {},
  setup (props) {
    // data 数据
    const labelPosition = 'right';
    const formLabelAlign = reactive({
          name: '',
          region: '',
          type: ''
        })



    // return 返回
    return {
      // data 数据-return
      labelPosition, formLabelAlign
    }
  }
}
</script>
<style  scoped lang="scss" >
@import "@/styles/config.scss";

.category_wrap{
  div:first-child{
    &:before{top:20px}
  }
  div:last-child{
    &:before{bottom:20px}
  }
}
.menu-title{
  line-height: 44px;
  // 未生效
  padding-left: 22px;
  background-color: #f3f3f3;
  border-radius: 5px;
}

.category{
  position: relative;
  line-height: 44px;
  cursor: pointer;
  // 垂直虚线的css
  &:before{
    content: '';
    position: absolute;
    left: 26px;
    top:0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }

  h4{
    position: relative;
    padding-left: 40px;

  }
  // 解决图标被虚线挡住的问题
  svg{
      position: absolute;
      left: 14px;
      top: 10px;
      background-color: #fff;
      font-size: 17px;

  }
  li{
    position: relative;
    // margin-left: 20px;
    margin-left: -12px;
    padding-left: 36px;
    // 水平虚线的css样式
    &:before{
      content:"";
      position: absolute;
      left:0;
      top:22px;
      width:32px;
      border-bottom:1px dotted #000
    }
  }

  // 设置移入后显示三个按钮选项
  li, h4{
    border-radius: 5px;
    @include webkit(transition, all .5s ease 0s);
    &:hover{
      background-color: #f3f3f3;
      .button-group{display: block;}
    }
  }
  .button-group{
    display:none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top:-1px;
    button{font-size: 12px;}

  }
}
.hr-e9e9e9{
  width: calc(100% + 60px);
  margin-left: -30px;  
  margin-top: 30px;
  margin-bottom: 30px;
  color: #e9e9e9;
}

// 表单样式
.form-wrap{
  width:410px;
  padding-top: 26px;
}
</style>
