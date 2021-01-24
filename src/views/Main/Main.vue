<!--
 * @Description: 系统整体框架
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-24 22:29:02
-->
<template>
    <div class="main">
        <div class="top-bar">
            <div class="logo">HR管理系统</div>
            <div style="display: flex" v-if="current_module">
                <div
                    v-for="(item, index) in modules"
                    :key="index"
                    :class="[
                        { active: current_module == item.title },
                        'module'
                    ]"
                    @click="chooseModule(item)"
                >
                    {{ item.title }}
                </div>
            </div>
        </div>
        <router-view v-if="current_module"></router-view>
        <!-- <div class="content" v-else>
            <div
                v-for="(item, index) in modules"
                :key="item + index"
                class="module-box"
                @click="chooseModule(item)"
            >
                {{ item.title }}
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            heartBeatTimer: null,
            current_module: "面试系统",
            modules: [
                {
                    title: "面试系统",
                    route: "/main/interview"
                },
                {
                    title: "人员管理",
                    route: "/main/user"
                },
                {
                    title: "薪酬系统",
                    route: "/main/salary"
                }
            ]
        };
    },
    created() {
        let module = sessionStorage.getItem("module");
        if (module) {
            this.current_module = module;
        }
    },
    mounted() {
        sessionStorage.setItem("module", this.current_module);
        this.heartBeat();
    },
    beforeDestroy() {
        // sessionStorage.clear();
    },
    methods: {
        // 心跳监测
        heartBeat() {
            let expireAt = this.$tools.getExpire();
            if (expireAt) {
                this.heartBeatTimer = setInterval(() => {
                    expireAt = this.$tools.getExpire();
                    if (expireAt) {
                        const nowDateStr = new Date().getTime();
                        if (expireAt < nowDateStr) {
                            sessionStorage.clear();
                            clearInterval(this.heartBeatTimer);
                            this.heartBeatTimer = null;
                            this.$message.warning("登录已超时！");
                            this.$router.push("/login");
                        } else if (expireAt - nowDateStr < 20000) {
                            // token即将过期，重新请求token
                        }
                    } else {
                        sessionStorage.clear();
                        clearInterval(this.heartBeatTimer);
                        this.heartBeatTimer = null;
                        this.$message.warning("登录已超时！");
                        this.$router.push("/login");
                    }
                }, 3000);
            } else {
                // 退出网站
                sessionStorage.clear();
                this.$message.warning("登录已超时！");
                this.$router.push("/login");
            }
        },
        // 选择子系统
        chooseModule(item) {
            if (item.title != this.current_module) {
                this.current_module = item.title;
                sessionStorage.setItem("module", this.current_module);
                this.$router.push(item.route);
            }
        },
        // 重新选择子系统
        resetModule() {
            sessionStorage.removeItem("module");
            sessionStorage.removeItem("menu");
            this.current_module = "";
            this.$router.push("/main");
        }
    }
};
</script>

<style lang='less' scoped>
.main {
    height: 100vh;
    width: 100vw;
    .top-bar {
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #f4f4f4;
        box-shadow: 0 8px 10px #f4f4f4;
        background: #00a1ff;
        .logo {
            font-size: 30px;
            color: #fff;
            font-weight: bold;
            height: 100%;
            width: 210px;
            line-height: 60px;
            padding: 0 20px;
            // cursor: pointer;
        }
        .module {
            cursor: pointer;
            padding: 20px;
            font-weight: bold;
            font-size: 20px;
            color: #fff;
        }
        .active {
            color: #0000ff;
        }
    }
    .content {
        padding: 20px;
        display: flex;
        .module-box {
            width: 300px;
            height: 200px;
            font-size: 40px;
            border: 1px solid #eef;
            letter-spacing: 10px;
            color: #606266;
            line-height: 200px;
            margin-right: 20px;
            box-shadow: 10px 10px 10px #eee;
            cursor: pointer;
        }
        .module-box:hover {
            color: #409eff;
            transform: scale(1.01);
            border: 1px solid #409eff;
        }
    }
}
</style>
