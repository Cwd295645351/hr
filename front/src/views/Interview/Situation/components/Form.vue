<!--
 * @Description: 编辑面试情况表单数据
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2022-03-16 10:26:27
-->
<template>
	<div class="form-box">
		<el-form :model="editLine" label-width="130px" label-position="left">
			<el-form-item label="简历推送日期">
				<el-date-picker
					v-model="editLine.date"
					type="date"
					size="small"
					value-format="yyyy-MM-dd"
					placeholder="选择日期"
					clearable
				></el-date-picker>
			</el-form-item>
			<el-form-item label="应聘部门">
				<el-select
					v-model="editLine.apartmentId"
					placeholder="请选择部门"
					size="small"
					clearable
					@change="editLine.jobId = ''"
				>
					<el-option
						v-for="(item, index) in jobOptions"
						:key="item + '_apartment_' + index"
						:label="item.apartmentName"
						:value="item.apartmentId"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="应聘职位">
				<el-select
					v-model="editLine.jobId"
					placeholder="请选择职位"
					size="small"
					clearable
				>
					<el-option
						v-for="(item, index) in jobs"
						:key="item + '_jobOptions_' + index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="类别">
				<el-select
					v-model="editLine.typeId"
					placeholder="请选择类别"
					size="small"
					clearable
				>
					<el-option
						v-for="(item, index) in types"
						:key="item + '_typesOptions_' + index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="招聘渠道">
				<el-select
					v-model="editLine.channelId"
					size="small"
					placeholder="请选择渠道"
					clearable
				>
					<el-option
						v-for="(item, index) in channelOptions"
						:key="item + '_channelOptions_' + index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input
					v-model="editLine.name"
					size="small"
					placeholder="请输入姓名"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select
					v-model="editLine.sex"
					size="small"
					placeholder="请选择性别"
					clearable
				>
					<el-option label="男" :value="1"></el-option>
					<el-option label="女" :value="0"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="电话">
				<el-input
					v-model="editLine.phoneNum"
					size="small"
					placeholder="请输入电话"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input
					v-model="editLine.email"
					size="small"
					placeholder="请输入邮箱"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="所在城市">
				<el-input
					v-model="editLine.city"
					size="small"
					placeholder="请输入城市"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="毕业学校">
				<el-input
					v-model="editLine.school"
					size="small"
					placeholder="请输入毕业学校"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="学校性质">
				<el-select
					v-model="editLine.schoolPropertyId"
					size="small"
					placeholder="请选择学校性质"
					clearable
				>
					<el-option
						v-for="(item, index) in schoolProperty"
						:key="item + '_schoolProperty_' + index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学历">
				<el-select
					v-model="editLine.degreeId"
					size="small"
					placeholder="请选择学历"
					clearable
				>
					<el-option
						v-for="(item, index) in degrees"
						:key="item + '_degrees_' + index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="全日制">
				<el-radio v-model="editLine.isFullTime" :label="1">是</el-radio>
				<el-radio v-model="editLine.isFullTime" :label="0">否</el-radio>
			</el-form-item>
			<el-form-item label="毕业时间">
				<el-date-picker
					v-model="editLine.graduationDate"
					type="month"
					size="small"
					value-format="yyyy-MM-dd"
					placeholder="选择日期"
					clearable
				></el-date-picker>
			</el-form-item>
			<el-form-item label="在职">
				<el-radio v-model="editLine.isWork" :label="1">是</el-radio>
				<el-radio v-model="editLine.isWork" :label="0">否</el-radio>
			</el-form-item>
			<el-form-item label="通知日期">
				<el-date-picker
					v-model="editLine.remindDate"
					type="date"
					size="small"
					value-format="yyyy-MM-dd"
					placeholder="选择日期"
					clearable
				></el-date-picker>
			</el-form-item>

			<el-form-item label="当前简历状态">
				<el-select
					v-model="editLine.statusId"
					size="small"
					placeholder="请选择简历状态"
					clearable
				>
					<el-option
						v-for="(item, index) in statuses"
						:key="item + '_statusOptions_' + index"
						:label="item.name"
						:value="item.id"
					></el-option>
				</el-select>
			</el-form-item>

			<template>
				<div
					v-for="(item, index) in schedulesLabels"
					:key="'interview' + index"
				>
					<el-divider>{{ item }}</el-divider>

					<el-form-item label="面试形式">
						<el-select
							v-model="editLine.schedules[index].modeId"
							size="small"
							placeholder="请选择面试形式"
						>
							<el-option
								v-for="(item, index) in modes"
								:key="item.name + '_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="面试日期">
						<el-date-picker
							v-model="editLine.schedules[index].interviewDate"
							type="date"
							size="small"
							placeholder="选择日期"
							clearable
						></el-date-picker>
					</el-form-item>
					<el-form-item label="面试时间">
						<el-time-select
							v-model="editLine.schedules[index].interviewTime"
							size="small"
							placeholder="选择时间"
							:picker-options="{
								start: '09:00',
								step: '00:15',
								end: '20:00'
							}"
							clearable
						></el-time-select>
					</el-form-item>
					<el-form-item label="面试官">
						<el-select
							v-model="editLine.schedules[index].interviewerId"
							placeholder="请选择面试官"
							multiple
							size="small"
						>
							<el-option
								v-for="(item, index) in interviewerOptions"
								:key="item.name + '_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
				</div>
			</template>
			<el-divider></el-divider>
			<el-form-item label="到面">
				<el-switch
					@change="handleData(scope.row, 12)"
					v-model="editLine.isArrivalInterview"
					active-color="#13ce66"
					inactive-color="#ff4949"
					:active-value="1"
					:inactive-value="0"
				>
				</el-switch>
			</el-form-item>
			<el-form-item label="备注">
				<el-input
					type="textarea"
					autosize
					placeholder="请输入备注"
					v-model="editLine.remark"
				></el-input>
			</el-form-item>
			<el-form-item label="入职时间" v-if="joinDateShow">
				<el-date-picker
					v-model="editLine.joinDate"
					type="date"
					size="small"
					value-format="yyyy-MM-dd"
					placeholder="请选择入职时间"
					clearable
				></el-date-picker>
			</el-form-item>
			<el-form-item label="相关材料">
				<el-upload
					ref="upload"
					:action="url"
					:on-preview="handlePreview"
					:on-change="fileChange"
					:on-remove="handleRemove"
					:headers="fileUploadHeaders"
					:file-list="editLine.fileList"
					:auto-upload="false"
				>
					<el-button slot="trigger" size="small" type="primary"
						>选取文件</el-button
					>
					<el-button
						style="margin-left: 10px"
						size="small"
						type="success"
						@click="submitUpload"
						>上传到服务器</el-button
					>
				</el-upload>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { FILE_UPLOAD, HOST } from "../../../../../apis/InterviewUrlConfig"

export default {
	props: {
		// 编辑信息
		editLine: { type: Object, default: () => {} },
		// 招聘渠道
		channelOptions: { type: Array, default: () => [] },
		// 部门职位数组
		jobOptions: { type: Array, default: () => [] },
		// 面试官数组
		interviewerOptions: { type: Array, default: () => [] },
		// 学校性质数组
		schoolProperty: { type: Array, default: () => [] },
		// 学历数组
		degrees: { type: Array, default: () => [] },
		// 面试形式数组
		modes: { type: Array, default: () => [] },
		// 类别数组
		types: { type: Array, default: () => [] },
		// 阶段-简历状态数组
		statusOptions: { type: Array, default: () => [] }
	},
	data() {
		return {
			// 文件上传地址
			url: FILE_UPLOAD,
			schedulesLabels: [] // 面试日程
		}
	},
	computed: {
		// 招聘职位
		jobs() {
			const apartmentId = this.editLine.apartmentId
			console.log(apartmentId, "=====")
			return apartmentId !== ""
				? this.jobOptions.find(
						item => item.apartmentId === this.editLine.apartmentId
				  ).jobs
				: []
		},
		// 状态数组
		statuses() {
			const arr = []
			this.statusOptions.forEach(item => {
				item.status.forEach(ite => {
					const obj = {
						...ite,
						id: item.stageId + "-" + ite.id
					}
					arr.push(obj)
				})
			})
			return arr
		},
		joinDateShow() {
			const hasJoin = [
				"3-offerApproval",
				"3-offerConfirm",
				"4-joining",
				"5-join"
			]
			if (hasJoin.includes(this.editLine.statusId)) {
				return true
			} else {
				return false
			}
		},
		// 文件上传头
		fileUploadHeaders() {
			let userInfo = this.$tools.getUserInfo()
			return {
				Authorization: userInfo ? `Bearer ${userInfo.accessToken}` : ""
			}
		}
	},
	watch: {
		"editLine.statusId": {
			handler(statusId) {
				let labels = []
				const editLine = this.editLine
				const schedules = editLine.schedules
				switch (statusId) {
					case "1-pass":
					case "2-attendInterview":
						labels = []
						editLine.schedules = []
						break
					case "2-firstInterview":
						labels = ["一面信息"]
						if (schedules.length >= 1) {
							editLine.schedules.length = 1
						} else {
							editLine.schedules = [
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 1
								}
							]
						}
						break
					case "2-secondInterview":
						labels = ["一面信息", "二面信息"]
						if (schedules.length >= 2) {
							editLine.schedules.length = 2
						} else if (schedules.length == 1) {
							editLine.schedules.push({
								noticeTime: "",
								modeId: "",
								interviewDate: "",
								interviewTime: "",
								interviewerId: "",
								order: 2
							})
						} else {
							editLine.schedules = [
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 1
								},
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 2
								}
							]
						}
						break
					default:
						labels = ["一面信息", "二面信息", "三面信息"]
						if (schedules.length == 2) {
							editLine.schedules.push({
								noticeTime: "",
								modeId: "",
								interviewDate: "",
								interviewTime: "",
								interviewerId: "",
								order: 3
							})
						} else if (schedules.length == 1) {
							editLine.schedules.push(
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 2
								},
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 3
								}
							)
						} else if (schedules.length == 0) {
							editLine.schedules = [
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 1
								},
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 2
								},
								{
									noticeTime: "",
									modeId: "",
									interviewDate: "",
									interviewTime: "",
									interviewerId: "",
									order: 3
								}
							]
						}
				}
				this.schedulesLabels = labels
			},
			immediate: true
		}
	},
	created() {
		console.log(1)
		const editLine = this.editLine
		editLine.statusId = editLine.stageId + "-" + editLine.statusId
	},
	mounted() {},
	methods: {
		// 文件上传
		submitUpload() {
			this.$refs.upload.submit()
		},
		// 文件移除
		handleRemove(file, fileList) {
			this.editLine.fileList = fileList
		},
		// 文件预览
		handlePreview(file) {
			if (file.status == "success") {
				if (file.url) {
					window.open(file.url, "_blank")
				} else {
					window.open(HOST + file.response.path, "_blank")
				}
			}
		},
		// 文件更改
		fileChange(file, fileList) {
			this.editLine.fileList = fileList
		}
	}
}
</script>

<style lang="less" scoped>
.form-box {
	height: 80vh;
	margin: 20px;
	overflow-y: auto;
	/deep/ .el-form-item__content {
		text-align: left;
		.el-input--small,
		.el-input--small .el-input__inner,
		.el-date-editor.el-input,
		.el-date-editor.el-input__inner,
		.el-textarea {
			width: 370px;
		}
	}
	&::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	&::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		background-color: #ddd;
	}
	&::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		background: transparent;
		border-radius: 10px;
	}
	&::-webkit-scrollbar-track-piece {
		background-color: rgba(0, 0, 0, 0);
		-webkit-border-radius: 6px;
	}
}
</style>
