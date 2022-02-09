<!--
 * @Description: 系统整体框架
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-02-09 22:14:09
-->
<template>
    <div class="main">
        <div class="top-bar">
            <div class="logo">信息统计</div>
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
            <div @click="logout" class="log-off">退出</div>
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
import { refreshToken } from "../../../apis/login";
export default {
    data() {
        return {
            current_module: "面试",
            modules: [
                {
                    title: "招聘",
                    route: "/main/interview"
                },
                {
                    title: "HR",
                    route: "/main/user"
                },
                {
                    title: "HR",
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
        // 清除心跳
        clearTimeout(window.heartBeatTimer);
    },
    methods: {
        // 心跳监测
        heartBeat() {
            const _this = this;
            const SECONDS_ONE_BEAT = 5; // 心跳频率 s
            let expiresAt = Number(sessionStorage.getItem("expiresAt"));
            if (!window.heartBeatTimer) {
                window.heartBeatTimer = setTimeout(() => {
                    const REFRESH_BEFORE_MS = 10 * 60; //提前 10min 进行请求
                    const nowDateStr = new Date().getTime();
                    const targetStamp = expiresAt - REFRESH_BEFORE_MS * 1000;
                    clearTimeout(window.heartBeatTimer);
                    window.heartBeatTimer = null;
                    if (nowDateStr > expiresAt) {
                        // 当前时间大于过期时间
                        sessionStorage.clear();
                        this.$message.warning("登录已过期，请重新登录");
                        this.$router.push("/login");
                    } else if (nowDateStr > targetStamp) {
                        // 当前需要刷新token时间大于当前时间
                        console.log("请刷新token,当前时间为：", new Date());
                        this.refreshToken();
                    } else {
                        _this.heartBeat();
                    }
                }, SECONDS_ONE_BEAT * 1000);
            }
        },
        // 刷新token
        async refreshToken() {
            const userInfo = this.$tools.getUserInfo();
            const refresh = userInfo.refreshToken;
            const {
                data: { data, message, retCode }
            } = await refreshToken(refresh);
            this.$tools.refreshExpireStamp(data.expiresIn);
            this.$tools.refreshUserInfo(data);
            console.log(
                "下次过期时间为：",
                new Date(Number(sessionStorage.getItem("expiresAt")))
            );
            this.heartBeat();
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
        },
        logout() {
            this.$router.push("/login");
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
            width: 170px;
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
        .log-off {
            position: absolute;
            right: 50px;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            cursor: pointer;
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
