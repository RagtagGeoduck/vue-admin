<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      text-color="#fff"
      background-color="transparent"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu  v-if="!item.hidden" :index="index+''" :key="item.id" >
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i :class="item.meta.icon"></i> -->
            <!-- <svg-icon :iconClass="item.meta.sIcon" :className="item.meta.sIcon"></svg-icon> -->
            <!-- <svg-icon-test :iconClass="item.meta.sIcon" :className="item.meta.sIcon"></svg-icon-test> -->
            <svg-icon :iconClass='item.meta.sIcon' :className='item.meta.sIcon'></svg-icon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          
          <!-- 二级菜单 -->
          <el-menu-item
            v-for="(subItem) in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
    
  </div>
  
</template>

<script type="text/ecmascript-6">
import { reactive, ref, isRef, toRefs, onMounted, computed } from "@vue/composition-api";
import SvgIcon from '../../../icon/SvgIcon.vue';
export default {
  name: "navMenu",
  components: {SvgIcon},
  setup(props, { root }) {
    // data 数据 ------------------------------------------------------------ data 数据
    const routers = reactive(root.$router.options.routes);
    // console.log(routers);

    // 函数 ----------------------------------------------------------------- 函数

    // computed 监听--------------------------------------------------------- 监听
    const isCollapse = computed(()=> root.$store.state.app.isCollapse);

    // 挂载 ----------------------------------------------------------------- 挂载

    // return -------------------------------------------------------------- return
    return {
      // 数据
      isCollapse,
      routers,
      // 函数

      
    };
  },
};
</script>
<style  scoped lang="scss" >
// @import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all .3s ease 0s);
  @include webkit(box-sizing, border-box);
}
.logo{
  text-align: center;
  img{
    width:90px;
    margin:28px auto 25px;
    // margin-top: 10px;
  }
}
.open{
  #nav-wrap {width: $navMenu;}
}
.close{
  #nav-wrap {width: $navMenu-min;}
  .logo img{
    width: 70%;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
</style>
