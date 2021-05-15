<template>
  <div id="main-wrap">
    ./Layout/Components/Main.vue
    <router-view></router-view>
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
  position:fixed;
  top:75px;
  left: $navMenu;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
