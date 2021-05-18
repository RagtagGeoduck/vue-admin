<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
    <div class="pull-right">
      <div class="pull-left header-icon img-wrap"><img class="img-size" src="../../../assets/head.jpg" alt=""></div>
      <div class="pull-left user-info header-icon">管理员</div>
      <div class="pull-left header-icon"><svg-icon iconClass="power" className="power"></svg-icon></div>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
import SvgIcon from '../../../icon/SvgIcon.vue'
export default {
  name: '',
  components: {SvgIcon},
  setup (props, context) {
    const navMenuState = ()=>{
      context.root.$store.commit('SET_COLLAPSE');
    }
    return {
      navMenuState,
      
    }
  },
}
</script>
<style  scoped lang="scss" >
// @import "../../../styles/config.scss";
#header-wrap{
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  // box-shadow:0, 3px, 16px, 0 rgba(0,0,0,0.1);
  // -webkit-box-shadow:0 3px 16px 0 rgba(0,0,0,0.1);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,0.1));
  // z-index: 99;
  line-height: 75px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all .3s ease 0s);
}
.svg-icon{
  color:black;
  fill: currentColor;
  margin-right:0px;
}
.header-icon{
  padding: 0 30px;
  
  svg{
    margin-bottom: -10px;
    cursor: pointer;
    font-size: 25px;
  }
}
.user-info{
  height:100%;
  border-right: 1px solid #ededed;
  + .header-icon{
    padding:0 25px;
  }
}
.img-wrap{
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -25px;

}
.img-size{
  width:30px;
  border-radius: 50%;
}
.open{#header-wrap{left: $navMenu;}}
.close{#header-wrap{left: $navMenu-min}}
</style>
