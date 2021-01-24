/*
 * @Description: url配置
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-05 21:22:02
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-24 17:20:15
 */

const HOST = process.env == "production" ? window.location.origin : "http://127.0.0.1:8000";

export const LOGIN = `${HOST}/api/user/login`; // 登录
export const REFRESH_TOKEN = `${HOST}/api/user/refreshToken`; // 刷新token

export const GET_MAJOR_LIST = `${HOST}/api/common/getMajorList`; // 获取专业列表
export const GET_CHANNEL_LIST = `${HOST}/api/common/getChannelList`; // 获取渠道列表

export const GET_INTERVIEW_LIST = `${HOST}/api/situation/getList`; // 获取面试情况
export const ADD_INTERVIEWEE = `${HOST}/api/situation/addInterviewee`; // 新增面试者
export const EDIT_INTERVIEWEE = `${HOST}/api/situation/editInterviewee`; // 修改面试者

export const GET_INTERVIEW_STATISTICS = `${HOST}/api/statistics/getStatisticsData`; // 获取面试统计信息
export const GET_ENTRY_RATE = `${HOST}/api/statistics/getEntryRate`; // 获取不同专业入职比例

export const GET_SCHEDULE = `${HOST}/api/schedule/getSchedule`; // 获取面试日程