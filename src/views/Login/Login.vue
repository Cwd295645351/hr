<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-14 23:31:26
 * @LastEditTime: 2020-11-26 23:22:36
 * @LastEditors: Please set LastEditors
 * @Description: 登录页
 * @FilePath: \hr-manage\src\views\login\login.vue
-->
<template>
  <div class="login">
    <div class="login-box">
      <div class="title">HR管理系统</div>
      <div class="form">
        <el-form label-position="left" :model="form" :rules="rules" ref="form">
          <el-form-item prop="user">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="form.user"
              @keyup.enter.native="login('form')"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              @keyup.enter.native="login('form')"
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
      rules: {
        user: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入用户名"));
              }
              let reg = /^[A-Za-z\d]*$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("用户名只能由英文和数字组成"));
              }
            },
            trigger: "change",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 登录
    login(formName) {
      console.log("账户", this.form.user, "密码", this.form.password);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push("/main");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #f4f4f4;
  .login-box {
    width: 400px;
    height: 300px;
    background: white;
    position: absolute;
    border-radius: 20px;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    .title {
      font-weight: bold;
      font-size: 35px;
      height: 60px;
      margin: 20px;
    }
    .form {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
