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
          <!-- <label>邮箱</label> -->
          <label for="username">邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            id="username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="passwords"
          class="item-form"
          v-show="model === 'register'"
        >
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><div class="grid-content bg-purple">
                <el-input v-model="ruleForm.code"></el-input></div
            ></el-col>
            <el-col :span="9"
              ><div class="grid-content bg-purple">
                <el-button
                  type="success"
                  class="block"
                  @click="getSms()"
                  :disabled="codeButtonStatus.status"
                  >{{ codeButtonStatus.text }}</el-button
                >
              </div></el-col
            >
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
            >{{ model == "login" ? "登陆" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import axios from 'axios'
import sha1 from 'js-sha1'
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateUser,
  validatePWD,
  validateCOD,
} from "@/utils/validate";

export default {
  name: "login",
  setup(props, context) {
    // 这里放置数据，生命周期， 自定义的函数

    /*
      声明表达式函数--------------------------------------------------------------------声明表达式函数
    */
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
      ruleForm.password = stripscript(value); // 将过滤后的数据传递至data中
      value = ruleForm.password; // 将过滤后的数据保存在变量对象data中,用于后面的判断

      // 验证密码
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePWD(value)) {
        callback(new Error("请输入6～20位的数字+字母"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    let validatePass2 = (rule, value, callback) => {
      if (model.value === "login") {
        callback();
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value); // 将过滤后的数据传递至data中
      value = ruleForm.passwords; // 将过滤后的数据保存在变量对象data中,用于后面的判断
      // 验证重复密码
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };

    // 验证验证码
    let checkCode = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      // 提取验证码正则表达式
      // let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (validateCOD(value)) {
        return callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    /*
        声明数据--------------------------------------------------------------------声明数据
    */
    // 表单数据开始
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePass, trigger: "blur" }],
      passwords: [{ validator: validatePass2, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }],
    });
    // 表单数据结束

    // 按钮值
    const menuTab = reactive([
      { txt: "登陆", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    // 模块值
    const model = ref("login");

    // const loginButtonStatus = ref("false");
    const loginButtonStatus = ref(true);
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码",
    });

    // 声明倒计时 计时器
    const timer = ref(null);

    /*
        声明函数--------------------------------------------------------------------声明函数
    */
    // 函数 - 切换按钮
    const toggleMenu = (data) => {
      // console.log(data); // Object
      // 更新 model的值
      model.value = data.type;
      menuTab.forEach((element) => {
        element.current = false;
      });
      data.current = true;
      // console.log(data);
      // 重置按钮的禁用状态
      resetButtonStatus({
        codeBtnStatus:true,
        subBtnStatus:true,
      });

      // 清除计时器
      clearCountDown();

      // 重置表单(此处需要添加ruleForm)
      context.refs["ruleForm"].resetFields();
      codeButtonStatus.text = "获取验证码";
    };
    /*
        函数 - 获取验证码
    */
    const getSms = () => {
      // 用户名为空提示,无需调用接口,直接返回
      if (ruleForm.username == "") {
        context.root.$message.error("用户名不能为空-index.vue");
        return false;
      }
      // 用户名邮箱格式问题
      if (validateUser(ruleForm.username)) {
        context.root.$message.error("用户名格式不正确-index.vue");
        return false;
      }

      // 请求接口
      let requestData = {
        username: ruleForm.username,
        module: model.value,
      };
      // 点击后 验证码按钮 为 禁用状态; 注册按钮为 可用状态
      resetButtonStatus({
        codeBtnStatus:true,
        subBtnStatus:true,
      });
      updateBtnStatus({
        codeBtnStatus:true,
        codeBtnStatusText:"请求中"
      });
      // (codeButtonStatus.status = true), (codeButtonStatus.text = "请求中");
      countDown(5);
      loginButtonStatus.value = false;

      setTimeout(() => {
        GetSms(requestData)
          .then((response) => {
            let data = response.data;
            // console.log(data);
            // console.log(data.message);
            // element-UI 提示框
            context.root.$message({
              message: data.message,
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 2000);
    };
    // 函数 - 提交表单
    const submitForm = (formName) => {
      context.refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功后的操作
          // alert("submit!");
          model.value === "login" ? login() : register();
          // 模拟注册成功
          // toggleMenu(menuTab[0]);
          // clearCountDown();
          // context.root.$router.push({
          //   name: 'Console'
          // })

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    // 函数 - 倒计时
    const countDown = (number) => {
      // 如果存在倒计时, 清除原有的倒计时
      // if(timer.value){clearCountDown};
      if(timer.value){clearInterval(timer.value)};

      let time = number;
      timer.value = setInterval(() => {
        time--;
        codeButtonStatus.text = `倒计时${time}秒`;
        // 清除定时器
        if (time === 0) {
          clearInterval(timer.value);
          codeButtonStatus.status = false;
          codeButtonStatus.text = "再次获取";
        }
      }, 1000);
    };

    // 函数 - 清除定时器
    const clearCountDown = () => {
      // 还原 验证码按钮 默认状态
      codeButtonStatus.status = false;
      codeButtonStatus.value = "获取验证码";
      
      // 清除定时器
      clearInterval(timer.value);
    };

    // 函数 - 表单登陆
    const login = () => {
      let requestData = {
        username : ruleForm.username,
        password : sha1(ruleForm.password),
        code : ruleForm.code
      };
      Login(requestData)
      .then((response)=>{
        let data = response.data
        alert(`${data.message} + 正在跳转页面`);
        console.log(data);
        context.root.$router.push({
          path:"/console"
        })
      }).catch(error=>{
        console.log(requestData.code);
        console.log('登陆失败');
        console.log(error);
      })
    };
    // 函数 - 表单创建
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register",
      };
      Register(requestData)
        .then((response) => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success",
          });
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch((error) => {
          console.log(`函数-提交表单-注册error`), console.log(error);
        });
    };

    // 函数 - 还原 获取验证码 按钮样式
    const resetButtonStatus = (params)=>{
      codeButtonStatus.value = params.codeBtnStatus;
      loginButtonStatus.value = params.codeBtnStatus;
    }

    // 函数 - 更新 获取验证码 按钮样式（数字变化,文字显示）
    const updateBtnStatus = (params) =>{  
      codeButtonStatus.status = params.codeBtnStatus,
      codeButtonStatus.text = params.codeBtnStatusText
    }

    /*
      生命周期-------------------------------------------------------------------- 生命周期
    */
    // 挂载函数
    onMounted(() => {
      // GetSms()
    });

    return {
      // 声明值
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      timer,

      rules,
      ruleForm,

      // 声明函数
      toggleMenu,
      submitForm,
      getSms,
      countDown,
      clearCountDown,
      login,
      register,
      resetButtonStatus,
      updateBtnStatus
    };
  },
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
.block {
  display: block;
  width: 100%;
}
.login-btn {
  margin-top: 19px;
}
</style>
