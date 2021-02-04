<!--
 * @Description: 登录页
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-25 23:47:49
-->
<template>
    <div class="login">
        <div class="login-box">
            <div class="title">信息统计</div>
            <div class="form">
                <el-form
                    label-position="left"
                    :model="form"
                    :rules="rules"
                    ref="form"
                >
                    <el-form-item prop="username">
                        <el-input
                            prefix-icon="el-icon-user-solid"
                            v-model="form.username"
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
                        <el-button type="primary" @click="login('form')"
                            >登录</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from "../../../apis/login";
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error("请输入用户名"));
                            }
                            let reg = /^[A-Za-z\d]*$/;
                            if (reg.test(value)) {
                                callback();
                            } else {
                                callback(
                                    new Error("用户名只能由英文和数字组成")
                                );
                            }
                        },
                        trigger: "change"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        // 登录
        async login(formName) {
            console.log("账户", this.form.username, "密码", this.form.password);
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const {
                        data: { data, retCode, message }
                    } = await login(this.form);
                    if (retCode === 0) {
                        sessionStorage.setItem(
                            "userInfo",
                            JSON.stringify(data)
                        );
                        const MS_ONE_SECOND = 1000;
                        const nowDateStr = new Date().getTime();
                        const expiresAt =
                            nowDateStr + data.expiresIn * MS_ONE_SECOND;
                        // const expiresAt = nowDateStr + 20000;
                        sessionStorage.setItem("expiresAt", expiresAt);
                        this.$router.push("/main/interview");
                    } else {
                        this.$message.error(message);
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
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
