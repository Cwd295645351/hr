/*
 * @Description: url配置
 * @Version:
 * @Author: Chen
 * @Date: 2021-01-05 21:22:02
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-25 22:26:20
 */

export const HOST = process.env.NODE_ENV == "production" ? window.location.origin : "http://127.0.0.1:8000";

export const LOGIN = `${HOST}/api/user/login`; // 登录
export const REFRESH_TOKEN = `${HOST}/api/user/refreshToken`; // 刷新token

export const GET_MAJOR_LIST = `${HOST}/api/common/getMajorList`; // 获取专业列表
export const GET_CHANNEL_LIST = `${HOST}/api/common/getChannelList`; // 获取渠道列表
export const GET_STATUS_LIST = `${HOST}/api/common/getStatusList`; // 获取渠道列表

export const GET_INTERVIEW_LIST = `${HOST}/api/situation/getList`; // 获取面试情况
export const ADD_INTERVIEWEE = `${HOST}/api/situation/addInterviewee`; // 新增面试者
export const IMPORT_INTERVIEWEE = `${HOST}/api/situation/importInterviewee`; // 批量导入面试者
export const EDIT_INTERVIEWEE = `${HOST}/api/situation/editInterviewee`; // 修改面试者
export const DELETE_INTERVIEWEE = `${HOST}/api/situation/deleteInterviewee`; // 删除面试者

export const GET_INTERVIEW_STATISTICS = `${HOST}/api/statistics/getStatisticsData`; // 获取面试统计信息
export const GET_ENTRY_RATE = `${HOST}/api/statistics/getEntryRate`; // 获取不同专业入职比例
export const GET_ORIGIN_NUM_LIST = `${HOST}/api/statistics/getOriginNumsList`; // 获取初始简历列表
export const ADD_ORIGIN_NUM = `${HOST}/api/statistics/addOriginNums`; // 新增初始简历数
export const EDIT_ORIGIN_NUM = `${HOST}/api/statistics/editOriginNums`; // 编辑初始简历数
export const DELETE_ORIGIN_NUM = `${HOST}/api/statistics/deleteOriginNums`; // 删除初始简历数

export const GET_SCHEDULE = `${HOST}/api/schedule/getSchedule`; // 获取面试日程

export const GET_JOIN_INFO_LIST = `${HOST}/api/joinInfo/getList`; // 获取入职信息列表
export const ADD_JOIN_INFO = `${HOST}/api/joinInfo/addInfo`; // 添加入职信息
export const EDIT_JOIN_INFO = `${HOST}/api/joinInfo/editInfo`; // 编辑入职信息
export const HIDE_JOIN_INFO = `${HOST}/api/joinInfo/hideInfo`; // 隐藏入职信息

export const FILE_UPLOAD = `${HOST}/api/common/uploadFile`; // 文件上传