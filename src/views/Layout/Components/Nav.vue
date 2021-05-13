<template>
  <div id="nav-wrap">./Layout/Components/Nav.vue</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  components: {},
  setup () {},
}
</script>
<style  scoped lang="scss" >
@import '../../../styles/config.scss' ;
#nav-wrap{
  position:fixed;
  top:0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}
</style>
