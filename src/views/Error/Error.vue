<!--
 * @Description: 错误页
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-05 22:17:35
-->
<template>
    <div class="error">
        <div class="title">
            <div style="font-size: 254px">404</div>
            <div>...error page...</div>
        </div>
        <div class="tip">
            请检查输入的网址是否正确,{{ time }}秒后将
            <a href="#" @click="backToInfo">返回</a>...
        </div>
    </div>
</template>

<script>
export default {
    name: "Error",
    data() {
        return {
            time: 5
        };
    },
    mounted() {
        var that = this;
        setInterval(function () {
            that.time--;
            if (that.time === 0) {
                that.$router.push("/main");
            }
        }, 1000);
    },
    methods: {
        backToInfo() {
            this.$router.push("/main");
        }
    }
};
</script>

<style lang="less" scoped>
.error {
    height: 100vh;
    width: 100vw;
    background: #f4f4f4;
}
.background {
    position: absolute;
    top: 100px;
    left: 610px;
    opacity: 0.1;
    z-index: -1;
}
.title {
    font-size: 100px;
    padding: 200px 539px 0;
    color: #409eff;
}
.tip {
    margin-left: 794px;
    font-weight: bold;
}
</style>
