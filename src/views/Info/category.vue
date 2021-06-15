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
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>

              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        
        <!-- 表单 -->
        <el-col :span="16">test1</el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  components: {},
  setup () {},
}
</script>
<style  scoped lang="scss" >
.category_wrap{
  div:first-child{
    &:before{top:20px}
  }
  div:last-child{
    &:before{bottom:20px}
  }
}
.category{
  position: relative;
  line-height: 44px;
  // 垂直虚线的css
  &:before{
    content: '';
    position: absolute;
    border-left: 1px dotted #000;
    width: 32px;
    top:0;
    bottom: 0;
    left: 50px;
  }


  h4{
    padding-left: 40px;
    .svg-icon{
      vertical-align: middle;
    }
  }
  li{
    position: relative;
    margin-left: 11px;
    padding-left: 36px;
    &:before{
      content:"";
      position: absolute;
      width:32px;
      top:22px;
      left:0;
      border:1px dotted #000
    }

  }
  .button-group{
    position: absolute;
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
</style>
