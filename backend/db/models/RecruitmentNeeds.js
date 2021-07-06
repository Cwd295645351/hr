/*
 * @Description: 招聘需求对象
 * @Version:
 * @Author:
 * @Date: 2021-07-06 21:45:27
 * @LastEditors: Chen
 * @LastEditTime: 2021-07-06 23:10:25
 */
import mongoose from "../db";
import dayjs from "dayjs";

const RecruitmentNeedsSchema = mongoose.Schema({
    userId: {
        // 用户id
        type: String,
        required: true
    },
    date: {
        // 登记时间
        type: Date,
        get: (v) => {
            if (v) {
                return dayjs(v).format("YYYY-MM-DD");
            } else {
                return "";
            }
        }
    },
    majorId: {
        // 专业id
        type: String
    },
    majorName: {
        // 专业名称
        type: String
    },
    apartment: {
        // 部门
        type: String
    },
    property: {
        // 性质
        type: String
    },
    num: {
        // 人数
        type: String
    },
    demand: {
        // 具体要求
        type: String
    },
    hopeArrivalTime: {
        // 希望到岗时间
        type: String
    },
    actualArrivalTime: {
        // 实际到岗时间
        type: String
    },
    schedule: {
        // 进度
        type: String
    },
    remark: {
        // 备注
        type: String
    },
    
    
}, { timestamps: true });

// 使格式化时间能输出
RecruitmentNeedsSchema.set("toJSON", { getters: true });

// Model 对应 collection
const RecruitmentNeeds = mongoose.model(
	"recruitmentneed",
	RecruitmentNeedsSchema
);

export default RecruitmentNeeds;
