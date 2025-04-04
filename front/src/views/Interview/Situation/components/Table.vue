<!--
 * @Description: 表格控件
 * @Version: 1.0.1
 * @Author: Chen
 * @Date: 2022-01-31 11:05:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-27 00:03:41
-->
!<template>
	<div class="">
		<el-table
			:data="tableDatas"
			style="width: 100%"
			border
			class="table-box"
			:max-height="tableMaxHeight"
		>
			<el-table-column
				align="center"
				fixed="left"
				label="简历推送日期"
				width="100"
			>
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-date-picker
							v-model="newLine.date"
							type="date"
							size="small"
							value-format="yyyy-MM-dd"
							placeholder="选择日期"
						></el-date-picker>
					</div>
					<div v-else>{{ scope.row.date }}</div>
				</template>
			</el-table-column>
			<el-table-column
				fixed="left"
				align="center"
				label="简历推送是否计入周报"
				width="60"
			>
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.isinitWeek"
							size="small"
							placeholder="请选择性别"
						>
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</div>
					<div v-else>
						{{
							scope.row.isinitWeek != null
								? scope.row.isinitWeek
									? "是"
									: "否"
								: ""
						}}
					</div>
				</template>
			</el-table-column>
			<el-table-column
				fixed="left"
				align="center"
				label="一级招聘渠道"
				width="85"
			>
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.channelId"
							size="small"
							placeholder="请选择渠道"
							@change="onChangeChannel"
						>
							<el-option
								v-for="(item, index) in channelOptions"
								:key="item + '_channelOptions_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</div>
					<div v-else>{{ scope.row.channelName }}</div>
				</template>
			</el-table-column>
			<el-table-column
				fixed="left"
				align="center"
				label="二级招聘渠道"
				width="85"
			>
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-if="subChannel.length > 0"
							v-model="newLine.subChannelId"
							size="small"
							placeholder="请选择二级渠道"
							@change="onChangeSubChannel"
						>
							<el-option
								v-for="(item, index) in subChannel"
								:key="item + '_subChannels_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
						<el-input
							v-else
							v-model="newLine.subChannelName"
							size="small"
							placeholder="请输入"
						></el-input>
					</div>
					<div v-else>{{ scope.row.subChannelName }}</div>
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				label="候选人姓名"
				fixed="left"
				width="80"
			>
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.name"
							size="small"
							placeholder="请输入姓名"
						></el-input>
					</div>
					<div v-else>{{ scope.row.name }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="英文姓名" width="80">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.EnglishName"
							size="small"
							placeholder="请输入英文姓名"
						></el-input>
					</div>
					<div v-else>{{ scope.row.EnglishName }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="性别" width="60">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.sex"
							size="small"
							placeholder="请选择性别"
						>
							<el-option label="男" :value="1"></el-option>
							<el-option label="女" :value="0"></el-option>
						</el-select>
					</div>
					<div v-else>
						{{
							scope.row.sex != null
								? scope.row.sex
									? "男"
									: "女"
								: ""
						}}
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="电话" width="110">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.phoneNum"
							size="small"
							placeholder="请输入电话"
						></el-input>
					</div>
					<div v-else>{{ scope.row.phoneNum }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="邮箱" width="130">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.email"
							size="small"
							placeholder="请输入邮箱"
						></el-input>
					</div>
					<div v-else>{{ scope.row.email }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="所在城市" width="85">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.city"
							size="small"
							placeholder="请输入城市"
						></el-input>
					</div>
					<div v-else>{{ scope.row.city }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="毕业学校" width="100">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							@change="schoolChange"
							v-model="newLine.school"
							size="small"
							placeholder="请输入毕业学校"
						></el-input>
					</div>
					<div v-else>{{ scope.row.school }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="学校性质" width="85">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.schoolPropertyId"
							size="small"
							placeholder="请选择学校性质"
						>
							<el-option
								v-for="(item, index) in schoolProperty"
								:key="item + '_schoolProperty_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</div>
					<div v-else>{{ scope.row.schoolPropertyName }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="专业" width="100">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.major"
							size="small"
							placeholder="请输入专业"
						></el-input>
					</div>
					<div v-else>{{ scope.row.major }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="学历" width="60">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.degreeId"
							size="small"
							placeholder="请选择学历"
						>
							<el-option
								v-for="(item, index) in degrees"
								:key="item + '_degrees_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</div>
					<div v-else>{{ scope.row.degreeName }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="全日制" width="60">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-radio v-model="newLine.isFullTime" :label="1"
							>是</el-radio
						>
						<el-radio v-model="newLine.isFullTime" :label="0"
							>否</el-radio
						>
					</div>
					<div v-else>
						{{
							scope.row.isFullTime !== "" &&
							scope.row.isFullTime !== null
								? scope.row.isFullTime
									? "是"
									: "否"
								: ""
						}}
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="毕业时间" width="95">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-date-picker
							v-model="newLine.graduationDate"
							type="month"
							size="small"
							value-format="yyyy-MM-dd"
							placeholder="选择日期"
						></el-date-picker>
					</div>
					<div v-else>{{ scope.row.graduationDate }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="在职" width="60">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-radio v-model="newLine.isWork" :label="1"
							>是</el-radio
						>
						<el-radio v-model="newLine.isWork" :label="0"
							>否</el-radio
						>
					</div>
					<div v-else>
						{{
							scope.row.isWork !== "" && scope.row.isWork !== null
								? scope.row.isWork
									? "是"
									: "否"
								: ""
						}}
					</div>
				</template>
			</el-table-column>
			<!-- <el-table-column align="center" label="通知日期" width="100">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-date-picker
							v-model="newLine.remindDate"
							type="date"
							size="small"
							value-format="yyyy-MM-dd"
							placeholder="选择日期"
						></el-date-picker>
					</div>
					<div v-else>{{ scope.row.remindDate }}</div>
				</template>
			</el-table-column> -->
			<el-table-column
				align="center"
				label="主要工作经历（公司&岗位名称）"
				width="160"
			>
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							type="textarea"
							autosize
							placeholder="请输入"
							v-model="newLine.experience"
						></el-input>
					</div>
					<div class="remark-situation" v-else>
						<el-tooltip
							:content="scope.row.experience"
							popper-class="remark-tooltip"
							placement="top"
						>
							<pre>{{ scope.row.experience }}</pre>
						</el-tooltip>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="应聘部门" width="100">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.apartmentId"
							placeholder="请选择部门"
							size="small"
							@change="newLine.jobId = ''"
						>
							<el-option
								v-for="(item, index) in jobOptions"
								:key="item + '_apartment_' + index"
								:label="item.apartmentName"
								:value="item.apartmentId"
							></el-option>
						</el-select>
					</div>
					<div
						class="major"
						:style="{
							'background-color':
								majorsColor[scope.row.apartmentId]
						}"
						v-else
					>
						{{ scope.row.apartmentName }}
					</div>
				</template>
			</el-table-column>
			<el-table-column width="100" align="center" label="应聘职位">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.jobId"
							placeholder="请选择职位"
							size="small"
						>
							<el-option
								v-for="(item, index) in jobs"
								:key="item + '_jobOptions_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</div>
					<div
						class="major"
						:style="{
							'background-color':
								majorsColor[scope.row.apartmentId]
						}"
						v-else
					>
						{{ scope.row.jobName }}
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="HKGAI/科大" width="85">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.companyId"
							placeholder="请选择"
							size="small"
						>
							<el-option
								v-for="(item, index) in companies"
								:key="item + '_companyOptions_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</div>
					<div v-else>{{ scope.row.companyName }}</div>
				</template>
			</el-table-column>

			<el-table-column width="60" align="center" label="类别">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-select
							v-model="newLine.typeId"
							placeholder="请选择类别"
							size="small"
						>
							<el-option
								v-for="(item, index) in types"
								:key="item + '_typesOptions_' + index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</div>
					<div v-else>
						{{ scope.row.typeName }}
					</div>
				</template>
			</el-table-column>
			<!-- 面试信息 -->
			<template v-if="schedulesLabels.length > 0">
				<el-table-column
					v-for="(item, index) in schedulesLabels"
					:key="'schedules_' + item"
					align="center"
					:label="schedulesLabels[index]"
				>
					<el-table-column width="95" align="center" label="面试形式">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.schedules[index]
										? scope.row.schedules[index].modeName
										: ""
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column width="95" align="center" label="面试日期">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.schedules[index]
										? scope.row.schedules[index]
												.interviewDate
										: ""
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column width="95" align="center" label="面试时点">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.schedules[index]
										? scope.row.schedules[index]
												.interviewTime
										: ""
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column width="95" align="center" label="面试官">
						<template slot-scope="scope">
							<div>
								{{
									scope.row.schedules[index]
										? scope.row.schedules[index]
												.interviewerName
										: ""
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column
						width="95"
						align="center"
						label="面试评价"
					>
						<template slot-scope="scope">
							<el-tooltip
								:content="
									scope.row.schedules[index]
										? scope.row.schedules[index]
												.interviewerCommitment
										: ''
								"
								popper-class="remark-tooltip"
								placement="top"
							>
								<pre>{{
									scope.row.schedules[index]
										? scope.row.schedules[index]
												.interviewerCommitment
										: ""
								}}</pre>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table-column>
			</template>
			<el-table-column
				v-if="statusId !== 'pass' && statusId !== 'attendInterview'"
				align="center"
				label="到面"
				width="85"
			>
				<template slot-scope="scope">
					<div>
						<el-switch
							v-if="
								statusId == 'firstInterview' ||
									statusId == 'secondInterview' ||
									statusId == 'thirdInterview'
							"
							@change="handleData(scope.row, 12)"
							v-model="scope.row.isArrivalInterview"
							active-color="#13ce66"
							inactive-color="#ff4949"
							:active-value="1"
							:inactive-value="0"
						>
						</el-switch>
						<div v-else>
							{{
								scope.row.isArrivalInterview !== "" &&
								scope.row.isArrivalInterview !== null
									? scope.row.isArrivalInterview
										? "是"
										: "否"
									: ""
							}}
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="跟进事项" width="85">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.todoList"
							size="small"
							placeholder="请输入"
						></el-input>
					</div>
					<div v-else>{{ scope.row.todoList }}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="后续跟进人员" width="85">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							v-model="newLine.followUp"
							size="small"
							placeholder="请输入"
						></el-input>
					</div>
					<div v-else>{{ scope.row.followUp }}</div>
				</template>
			</el-table-column>
			<el-table-column
				v-if="joinDateShow"
				align="center"
				label="入职部门"
				prop="joinApartmentName"
				width="95"
			>
			</el-table-column>
			<el-table-column
				v-if="joinDateShow"
				align="center"
				label="Offer 岗位"
				prop="joinJobName"
				width="95"
			>
			</el-table-column>
			<el-table-column
				v-if="joinDateShow"
				align="center"
				label="直属上级"
				prop="manager"
				width="95"
			>
			</el-table-column>
			<el-table-column
				v-if="joinDateShow"
				align="center"
				label="base"
				prop="base"
				width="95"
			>
			</el-table-column>
			<el-table-column
				v-if="joinDateShow"
				align="center"
				label="入职时间"
				prop="joinDate"
				width="95"
			>
			</el-table-column>
			<el-table-column
				v-if="joinDateShow"
				align="center"
				label="试用期满时间"
				prop="trialDate"
				width="95"
			>
			</el-table-column>
			<el-table-column
				v-if="joinDateShow"
				align="center"
				label="离职时间"
				prop="leaveDate"
				width="95"
			>
			</el-table-column>
			<el-table-column align="center" label="简历	" width="100">
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'"></div>
					<div v-else class="material">
						<div v-for="item in scope.row.fileList" :key="item.url">
							<a :href="item.url" target="_blank">{{
								item.name
							}}</a>
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column
				v-if="stageId == 6"
				align="center"
				label="淘汰状态"
				prop="statusName"
				width="95"
			>
			</el-table-column>
			<el-table-column
				v-if="salaryNegotiationRecordShow"
				align="center"
				label="谈薪记录"
				prop="salaryNegotiationRecord"
				width="130"
			>
			</el-table-column>
			<el-table-column
				align="center"
				fixed="right"
				label="备注"
				width="130"
			>
				<template slot-scope="scope">
					<div v-if="scope.$index == 0 && tableStatus == 'add'">
						<el-input
							type="textarea"
							autosize
							placeholder="请输入备注"
							v-model="newLine.remark"
						></el-input>
					</div>
					<div class="remark-situation" v-else>
						<el-tooltip
							:content="scope.row.remark"
							popper-class="remark-tooltip"
							placement="top"
						>
							<pre>{{ scope.row.remark }}</pre>
						</el-tooltip>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				align="center"
				label="操作"
				width="150"
			>
				<template slot-scope="scope">
					<div v-if="tableStatus == 'view' || scope.$index > 0">
						<el-link
							v-if="statusId == 'pass'"
							@click="handleData(scope.row, 0)"
							type="info"
							class="modify"
							>去约面</el-link
						>
						<el-link
							v-if="statusId == 'attendInterview'"
							@click="handleData(scope.row, 1)"
							type="info"
							class="modify"
							>去一面</el-link
						>
						<!-- <el-link
							v-if="statusId == 'attendInterview'"
							@click="handleData(scope.row, 11)"
							type="info"
							class="modify"
							>设置提醒</el-link
						> -->
						<el-link
							v-if="statusId == 'firstInterview'"
							@click="handleData(scope.row, 2)"
							type="info"
							class="modify"
							>去二面</el-link
						>
						<el-link
							v-if="statusId == 'secondInterview'"
							@click="handleData(scope.row, 3)"
							type="info"
							class="modify"
							>去三面</el-link
						>
						<el-link
							v-if="statusId == 'thirdInterview'"
							@click="handleData(scope.row, 13)"
							type="info"
							class="modify"
							>去四面</el-link
						>
						<el-link
							v-if="statusId == 'employ'"
							@click="handleData(scope.row, 5)"
							type="info"
							class="modify"
							>已发测算表</el-link
						>
						<el-link
							v-if="statusId == 'contacted'"
							@click="handleData(scope.row, 6)"
							type="info"
							class="modify"
							>提交</el-link
						>
						<el-link
							v-if="statusId == 'submitTable'"
							@click="handleData(scope.row, 14)"
							type="info"
							class="modify"
							>定薪</el-link
						>
						<el-link
							v-if="statusId == 'salaryNnegotiation'"
							@click="handleData(scope.row, 15)"
							type="info"
							class="modify"
							>去审批</el-link
						>
						<el-link
							v-if="statusId == 'offerApproval'"
							@click="handleData(scope.row, 7)"
							type="info"
							class="modify"
							>通过</el-link
						>
						<el-link
							v-if="statusId == 'offerConfirm'"
							@click="handleData(scope.row, 8)"
							type="info"
							class="modify"
							>接受 Offer</el-link
						>
						<el-link
							v-if="statusId == 'joining'"
							@click="handleData(scope.row, 9)"
							type="info"
							class="modify"
							>到岗</el-link
						>
						<el-link
							v-if="stageId != 5 && stageId != 6"
							@click="handleData(scope.row, 10)"
							type="info"
							class="modify"
							>去人才库</el-link
						>
						<el-link
							v-if="
								statusId == 'firstInterview' ||
									statusId == 'secondInterview' ||
									statusId == 'thirdInterview' ||
									statusId == 'forthInterview'
							"
							@click="handleData(scope.row, 4)"
							type="info"
							class="modify"
							>录用</el-link
						>
						<el-link
							@click="editData(scope.row)"
							type="info"
							class="modify"
							>修改</el-link
						>
						<el-link
							v-if="
								tableStatus == 'view' &&
									(statusId == 'pass' ||
										statusId == 'attendInterview')
							"
							@click="copyData(scope.row)"
							type="info"
							class="modify"
							>复制</el-link
						>
						<el-link @click="deleteData(scope.row)" type="info"
							>删除</el-link
						>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	props: {
		// 面试阶段：1=初筛，2=面试，3=录用，4=待入职，5=到岗，6=人才库
		stageId: { type: Number, default: 1 },
		// 当前简历列表对应状态
		statusId: { type: String, default: "" },
		// 表格状态：view=查看，add=新增
		tableStatus: { type: String, default: "view" },
		// 新增数据
		newLine: { type: Object, default: () => {} },
		// 表格数据
		tableDatas: { type: Array, default: () => [] },
		// 招聘渠道数组
		channelOptions: { type: Array, default: () => [] },
		// 部门职位数组
		jobOptions: { type: Array, default: () => [] },
		// 面试官数组
		interviewerOptions: { type: Array, default: () => [] },
		// 学校性质数组
		schoolProperty: { type: Array, default: () => [] },
		// 学历数组
		degrees: { type: Array, default: () => [] },
		// 985名单
		school985: { type: Array, default: () => [] },
		// 211名单
		school211: { type: Array, default: () => [] },
		// 面试形式数组
		modes: { type: Array, default: () => [] },
		// 类别数组
		types: { type: Array, default: () => [] },
		// 签署公司数组（HKGAI/科大）
		companies: { type: Array, default: () => [] }
	},
	data() {
		return {
			// 专业颜色
			majorsColor: {
				0: "#ff9933",
				1: "#0099cc",
				2: "#99cc00",
				3: "#cc9999",
				4: "#ffcc33",
				5: "#009999",
				6: "#3ab55a"
			}
		}
	},

	created() {},
	watch: {},
	computed: {
		// 表格最大高度
		tableMaxHeight() {
			return this.stageId != 2 && this.stageId != 3 ? 662 : 610
		},
		// 招聘职位
		jobs() {
			const apartmentId = this.newLine.apartmentId
			return apartmentId !== ""
				? this.jobOptions.find(
						item => item.apartmentId === this.newLine.apartmentId
				  ).jobs
				: []
		},
		// 二级招聘渠道
		subChannel() {
			const channelId = this.newLine.channelId
			return channelId !== ""
				? this.channelOptions.find(
						item => item.id === this.newLine.channelId
				  ).subChannel
				: []
		},
		salaryNegotiationRecordShow() {
			//已提交，待定薪、 谈薪、Offer 审批、Offer 发出、 待入职、到岗状态时，入职时间显示
			const hasJoin = [
				'submitTable',
				"salaryNnegotiation",
				"offerApproval",
				"offerConfirm",
				"joining",
				"join"
			]
			if (this.stageId == 6) {
				return true
			} else if (hasJoin.includes(this.statusId)) {
				return true
			} else {
				return false
			}
		},
		// 入职部门、岗位、直属上级、base、入职时间、试用期满时间、离职时间是否显示
		joinDateShow() {
			// Offer 审批、Offer 发出、 待入职、到岗状态时，入职时间显示
			const hasJoin = ["offerApproval", "offerConfirm", "joining", "join"]
			if (this.stageId == 6) {
				return true
			} else if (hasJoin.includes(this.statusId)) {
				return true
			} else {
				return false
			}
		},
		// 面试信息
		schedulesLabels() {
			let labels = []
			if (this.stageId != 6) {
				switch (this.statusId) {
					case "pass":
					case "attendInterview":
						labels = []
						break
					case "firstInterview":
						labels = ["一面信息"]
						break
					case "secondInterview":
						labels = ["一面信息", "二面信息"]
						break
					case "thirdInterview":
						labels = ["一面信息", "二面信息", "三面信息"]
						break
					default:
						labels = [
							"一面信息",
							"二面信息",
							"三面信息",
							"四面信息"
						]
				}
			} else {
				labels = ["一面信息", "二面信息", "三面信息", "四面信息"]
			}
			return labels
		}
	},

	mounted() {},

	methods: {
		// 编辑表格
		editData(row) {
			this.$emit("editData", row)
		},
		/*
         表格操作
         type: 操作类型： 0=去约面，1=去一面，2=去二面，3=去三面，4=录用，5=已发测算表，
                         6=提交，7=通过，8=接受，9=到岗，10=去人才库,
                         11=设置提醒，12=到面，13=去四面，14=定薪，15=去审批
         */
		handleData(row, type) {
			console.log(type, "type====")
			const operateInfo = {
				type: type,
				data: row
			}
			this.$emit("operate", operateInfo)
		},
		schoolChange(val) {
			if (this.school985.includes(val)) {
				this.newLine.schoolPropertyId = 0
			} else if (this.school211.includes(val)) {
				this.newLine.schoolPropertyId = 1
			} else {
				this.newLine.schoolPropertyId = 5
			}
		},
		// 复制数据
		copyData(row) {
			this.$emit("copyData", row)
		},
		// 删除表格
		deleteData(row) {
			this.$emit("deleteData", row)
		},
		// 一级渠道改变
		onChangeChannel() {
			this.newLine.subChannelId = ""
			this.newLine.subChannelName = ""
		},
		// 二级渠道改变
		onChangeSubChannel(value) {
			this.newLine.subChannelName = this.subChannel.find(
				item => item.id === value
			).name
		}
	}
}
</script>
<style scoped lang="less">
.table-box {
	.modify {
		padding-right: 5px;
		border-right: 1px solid #c5c5c5;
		margin-right: 5px;
	}
	.major {
		color: #fff;
		border-radius: 4px;
	}
	.remark-situation {
		height: 30px;
		text-align: left;
	}
	.material {
		height: 30px;
		overflow: auto;

		&::-webkit-scrollbar {
			width: 6px; /* 横向滚动条 */
			height: 7px; /* 纵向滚动条 必写 */
		}
		&::-webkit-scrollbar-track-piece {
			background: #fff; // 滚动条背景颜色
		}
		/* 滚动条的滑块 */
		&::-webkit-scrollbar-thumb {
			background: #ddd;
			border-radius: 3.5px;
		}
	}
}
</style>
<style lang="less">
.remark-tooltip {
	width: 278px;
	line-height: 1.5;
	font-size: 14px;
	background: #828181 !important;
}
</style>
