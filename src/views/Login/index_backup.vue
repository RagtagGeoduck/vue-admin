<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>

      <!-- 表单开始 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"><div class="grid-content bg-purple"><el-input v-model.number="ruleForm.code"></el-input></div></el-col>
            <el-col :span="9"><div class="grid-content bg-purple"><el-button type="success" class="block">获取验证码</el-button></div></el-col>
          </el-row>
          
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" >提交</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import {stripscript, validateUser, validatePWD, validateCOD} from '@/utils/validate'

export default {
  name: "",
  data() {
    // 表单数据开始
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateUser(value)) {
        callback(new Error("用户名格式错误!"));
      } else {
        callback();
      }
    };

    // 验证密码
    var validatePass = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.password = stripscript(value);  // 将过滤后的数据传递至data中
      value = this.ruleForm.password;               // 将过滤后的数据保存在变量对象data中,用于后面的判断

      // 验证密码
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      }else if(validatePWD(value)){
        callback(new Error("请输入6～20位的数字+字母"));
      }
      else {
        callback();
      }
    };

    // 验证重复密码
    var validatePass2 = (rule, value, callback) => {
      if(this.model === 'login'){
        // console.log(`this.model = ${this.model}, = login`)
        callback();
      }
      // 过滤后的数据
      this.ruleForm.passwords = stripscript(value);  // 将过滤后的数据传递至data中
      value = this.ruleForm.passwords;               // 将过滤后的数据保存在变量对象data中,用于后面的判断

      // 验证密码
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }else if(value != this.ruleForm.password){
        callback(new Error("两次密码输入不一致"));
      }
      else {
        callback();
      }
    };

    var checkCode = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;

      // 提取验证码正则表达式
      // let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }else if(validateCOD(value)){
        return callback(new Error("验证码格式错误"))
      }else{
        callback();
      }
    };
    
    // 表单数据结束
    return {
      menuTab: [
        { txt: "登陆", current: true, type: 'login' },
        { txt: "注册", current: false, type: 'register' },
        
      ],

      // 表单数据开始
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwords: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
      // 表单数据结束
      model:"login"
    };
  },
  methods: {
    toggleMenu(data) {
      console.log(data); // Object
      this.model = data.type;
      // console.log(this.data);  // undefined
      this.menuTab.forEach((element) => {
        element.current = false;
        // element.current = true;
      });
      data.current = true;
    },
    // 表单方法开始
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单方法结束
  },
  mounted() {},
};
</script>
<style  scoped lang="scss">
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    // height: 36px;
    line-height: 36px;
    font-size: 14px;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
  }
}
.current {
    // background-color: #2f4255;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      font-size: 14px;
      color: #fff;
    }
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block{
    display: block;
    width: 100%;
  }
  .login-btn{
    margin-top: 19px;

  }
</style>
