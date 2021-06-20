<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="pull-left header-icon img-wrap">
        <img class="img-size" src="../../../assets/head.jpg" alt="" />
      </div>
      <div class="pull-left user-info header-icon">{{ username }}</div>
      <div class="pull-left header-icon" @click="exit">
        <svg-icon iconClass="power" className="power"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { computed } from "@vue/composition-api";
import SvgIcon from "../../../icon/SvgIcon.vue";
export default {
  name: "",
  components: { SvgIcon },
  setup(props, context) {
    const username = computed(() => context.root.$store.state.app.username);
    const navMenuState = () => {
      context.root.$store.commit("app/SET_COLLAPSE");
      // context.root.$store.dispatch('testAction');
    };

    // 函数 -------------------------------------------------- 函数 ⬇️
    const exit = () => {
      context.root.$confirm("此操作将退出登陆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          context.root.$store.dispatch("app/exit").then(() => {
            context.root.$router.push({
              name: "Login",
            });
          });
        })
        .catch(() => {
          context.root.$message({
            type: "info",
            message: "已取消登出",
          });
        });
    };
    // 函数 -------------------------------------------------- 函数 ⬆️

    return {
      navMenuState,
      username,
      // function -------------------------------------------------- function
      exit,
    };
  },
};
</script>
<style  scoped lang="scss" >
// @import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  // box-shadow:0, 3px, 16px, 0 rgba(0,0,0,0.1);
  // -webkit-box-shadow:0 3px 16px 0 rgba(0,0,0,0.1);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  // z-index: 99;
  line-height: 75px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.svg-icon {
  color: black;
  fill: currentColor;
  margin-right: 0px;
}
.header-icon {
  padding: 0 30px;

  svg {
    margin-bottom: -10px;
    cursor: pointer;
    font-size: 25px;
  }
}
.user-info {
  height: 100%;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 25px;
  }
}
.img-wrap {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -25px;
}
.img-size {
  width: 30px;
  border-radius: 50%;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenu-min;
  }
}
</style>
