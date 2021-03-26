<!--
 * @Description: 登录页
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-03-27 00:04:17
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
        <div class="beian">
            <a href="https://beian.miit.gov.cn/" target="_blank"
                >粤ICP备2021017006号</a
            >
            <a
                target="_blank"
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502007113"
                style="
                    display: inline-block;
                    text-decoration: none;
                    height: 20px;
                    line-height: 20px;
                "
                ><img src="../../assets/beian.png" style="float: left" />
                <p
                    style="
                        float: left;
                        height: 20px;
                        line-height: 20px;
                        margin: 0px 0px 0px 5px;
                        color: #939393;
                    "
                >
                    粤公网安备 44030502007113号
                </p></a
            >
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
    .beian {
        position: absolute;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 100%;
        bottom: 20px;
    }
    .gongan-beian {
        position: absolute;
        width: 100%;
        bottom: 20px;
    }
}
</style>
