<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
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
// @import "../../../styles/config.scss"; // 添加到了main.scss
#main-wrap{
  height:100vh;
  // position:fixed;
  // top:75px;
  // left: $navMenu;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // box-sizing: border-box;
  // -webkit-box-sizing: border-box;
}
.main-content{
  width:100%;
  height:100%;
  padding:$LayoutHeader + 30px 30px 0 $navMenu + 30px;
  // box-sizing: border-box;
  // -webkit-box-sizing: border-box;
  @include webkit(transition, all .3s ease 0s);
}
.content{
  width:100%;
  height:100%;
  background-color: #fff;
  padding:30px 30px 0 30px;
  // box-sizing: border-box;
  // -webkit-box-sizing: border-box;
  border-radius: 5px;
  @include webkit(box-sizing, border-box);
}
.open{
  .main-content{padding-left: $navMenu + 30px;}
}
.close{
  .main-content{padding-left: $navMenu-min + 30px}
}
</style>
