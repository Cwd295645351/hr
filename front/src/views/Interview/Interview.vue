<!--
 * @Description: 面试
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-07 17:14:47
-->
<template>
    <div class="interview">
        <div class="aside">
            <el-menu
                @select="chooseMenu"
                :collapse="true"
                background-color="#545c64"
                :default-active="activeMenu"
            >
                <el-menu-item
                    v-for="(item, index) in menus"
                    :key="index"
                    :index="item.route"
                >
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main">
            <Situation v-if="activeMenu == 'situation'"></Situation>
            <Statistics v-else-if="activeMenu == 'statistics'"></Statistics>
            <OriginNums v-else-if="activeMenu == 'originNums'"></OriginNums>
            <Schedule v-else-if="activeMenu == 'schedule'"></Schedule>
            <JoinInfo v-else-if="activeMenu == 'joinInfo'"></JoinInfo>
            <RecruitmentNeeds
                v-else-if="activeMenu == 'recruitmentNeeds'"
            ></RecruitmentNeeds>
        </div>
    </div>
</template>

<script>
import Situation from "./Situation/Situation";
import Statistics from "./Statistics/Statistics";
import OriginNums from "./OriginNums/OriginNums";
import Schedule from "./Schedule/Schedule";
import JoinInfo from "./joinInfo/JoinInfo";
import RecruitmentNeeds from "./recruitmentNeeds/RecruitmentNeeds";
export default {
    components: {
        Situation,
        Statistics,
        Schedule,
        OriginNums,
        JoinInfo,
        RecruitmentNeeds
    },
    data() {
        return {
            // 当前菜单
            activeMenu: "",
            // 所有菜单
            menus: [
                {
                    title: "面试日程",
                    route: "schedule",
                    icon: "el-icon-date"
                },
                {
                    title: "面试情况",
                    route: "situation",
                    icon: "el-icon-document"
                },
                /* {
                    title: "统计信息",
                    route: "statistics",
                    icon: "el-icon-pie-chart"
                },
                {
                    title: "初始简历",
                    route: "originNums",
                    icon: "el-icon-notebook-2"
                },
                {
                    title: "入职信息",
                    route: "joinInfo",
                    icon: "el-icon-s-management"
                }, */
                {
                    title: "需求登记",
                    route: "recruitmentNeeds",
                    icon: "el-icon-s-order"
                }
            ]
        };
    },
    created() {
        let menu = sessionStorage.getItem("menu");
        this.activeMenu = menu ? menu : "schedule";
    },
    watch: {
        activeMenu(newValue) {
            sessionStorage.setItem("menu", this.activeMenu);
        }
    },
    methods: {
        // 选择菜单
        chooseMenu(index) {
            this.activeMenu = index;
        }
    }
};
</script>

<style lang='less' scoped>
.interview {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    .aside {
        .el-menu {
            height: 100%;
            width: 65px;
            .el-menu-item {
                font-size: 16px;
            }
        }
    }
    .main {
        width: calc(100% - 65px);
        height: 100%;
        overflow-x: hidden;
    }
}
</style>
