<!--
 * @Author: 陈伟栋
 * @Date: 2020-11-15 21:01:01
 * @LastEditTime: 2020-11-16 00:10:16
 * @LastEditors: Please set LastEditors
 * @Description: 面试情况
 * @FilePath: \hr-manage\src\views\Interview\Situation\Situation.vue
-->
<template>
  <div class="situation">
    <div class="searchBar">
      <el-form :inline="true" :model="searchCondition">
        <el-form-item size="small" label="起止日期:">
          <el-date-picker
            v-model="searchCondition.beginDate"
            type="date"
            placeholder="选择开始日期"
            :picker-options="beginDateOptions"
          >
          </el-date-picker>
          ~
          <el-date-picker
            v-model="searchCondition.endDate"
            type="date"
            placeholder="选择结束日期"
            :picker-options="endDateOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item size="small" label="专业:">
          <el-select v-model="searchCondition.major" placeholder="请选择专业">
            <el-option
              v-for="(item, index) in majorOptions"
              :key="item + '_' + index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="渠道:">
          <el-select v-model="searchCondition.region" placeholder="请选择渠道">
            <el-option
              v-for="(item, index) in regionOptions"
              :key="item + '_' + index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="姓名:">
          <el-input
            v-model="searchCondition.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item size="small" label="手机号:">
          <el-input
            v-model="searchCondition.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item size="small" label="邮箱:">
          <el-input
            v-model="searchCondition.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-popover
            placement="bottom"
            title="更多信息"
            width="400"
            trigger="click"
          >
            <div class="more-info">
              <el-form
                ref="moreInfo"
                :model="searchCondition.moreInfo"
                label-width="80px"
              >
                <el-form-item label="通过初筛">
                  <el-switch
                    v-model="searchCondition.moreInfo.isPass"
                  ></el-switch>
                </el-form-item>
              </el-form>
              <el-form
                ref="moreInfo"
                :model="searchCondition.moreInfo"
                label-width="80px"
              >
                <el-form-item label="参加面试">
                  <el-switch
                    v-model="searchCondition.moreInfo.isInterview"
                  ></el-switch>
                </el-form-item>
              </el-form>
              <el-form
                ref="moreInfo"
                :model="searchCondition.moreInfo"
                label-width="80px"
              >
                <el-form-item label="是否到面">
                  <el-switch
                    v-model="searchCondition.moreInfo.isFaceInterview"
                  ></el-switch>
                </el-form-item>
              </el-form>
              <el-form
                ref="moreInfo"
                :model="searchCondition.moreInfo"
                label-width="80px"
              >
                <el-form-item label="是否录用">
                  <el-switch
                    v-model="searchCondition.moreInfo.isEmployment"
                  ></el-switch>
                </el-form-item>
              </el-form>
              <el-form
                ref="moreInfo"
                :model="searchCondition.moreInfo"
                label-width="80px"
              >
                <el-form-item label="是否入职">
                  <el-switch
                    v-model="searchCondition.moreInfo.isEntry"
                  ></el-switch>
                </el-form-item>
              </el-form>
            </div>
            <el-link slot="reference" type="info">更多</el-link>
          </el-popover>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let that = this;
    return {
      beginDateOptions: {
        disabledDate(time) {
          if (that.searchCondition.endDate != "") {
            return time.getTime() > that.searchCondition.endDate;
          } else {
            return false;
          }
        },
      },
      endDateOptions: {
        disabledDate(time) {
          if (that.searchCondition.beginDate != "") {
            return time.getTime() < that.searchCondition.beginDate;
          } else {
            return false;
          }
        },
      },
      // 渠道数组
      regionOptions: [
        {
          label: "BOSS",
          value: "1",
        },
        {
          label: "建筑英才网(投递)",
          value: "2",
        },
        {
          label: "建筑英才网(搜索)",
          value: "3",
        },
      ],
      // 专业数组
      majorOptions: [
        {
          label: "建筑",
          value: "1",
        },
        {
          label: "结构",
          value: "2",
        },
        {
          label: "给排水",
          value: "3",
        },
        {
          label: "弱电",
          value: "4",
        },
        {
          label: "暖通",
          value: "5",
        },
      ],
      // 搜索条件
      searchCondition: {
        beginDate: "", // 开始日期
        endDate: "", // 结束日期
        name: "", // 姓名
        major: "", // 专业
        region: "", // 来源,
        phone: "", // 手机号
        email: "", // 邮箱
        moreInfo: {
          isPass: false,
          isInterview: false,
          isFaceInterview: false,
          isEmployment: false,
          isEntry: false,
        },
      },
    };
  },
  methods: {
    // 搜索
    search() {},
  },
};
</script>

<style lang='less' scoped>
.situation {
  margin: 10px;
  .searchBar {
    .el-form {
      display: flex;
      align-items: center;
      .el-form-item {
        margin-left: 10px;
        /deep/ .el-form-item__label {
          padding-right: 5px;
        }
      }
    }
  }
}
.el-popover {
  .more-info {
    .el-form-item {
      margin: 0;
    }
  }
}
</style>

