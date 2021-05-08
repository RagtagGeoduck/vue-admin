<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for=" item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      menuTab:[
        {txt: "注册", current:true},
        {txt: "登陆", current:false},
      ]
    };
  },
  methods: {
    toggleMenu(data){
      console.log(data);    // Object
      // console.log(this.data);  // undefined
      this.menuTab.forEach(element => {
        element.current = false;
        // element.current = true;
      });
      data.current = true;

    }
  },
  mounted() {},
};
</script>
<style  scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap{
  width:330px;
  margin:auto;
}
.menu-tab{
  text-align: center;
  li{
    display: inline-block;
    width: 88px;
    // height: 36px;
    line-height: 36px;
    font-size: 14px;
    border-radius: 2px;
    color: #fff;
    cursor:pointer;
  }
.current{
  // background-color: #2f4255;
  background-color: rgba(0,0,0,.1);
}

}
</style>
