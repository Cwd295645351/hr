export default [
	{
		stageId: 1,
		stageName: "初筛简历",
		status: [
			{
				id: "pass",
				name: "通过初筛"
			}
		]
	},
	{
		stageId: 2,
		stageName: "面试",
		status: [
			{
				id: "attendInterview",
				name: "约面"
			},
			{
				id: "firstInterview",
				name: "一面"
			},
			{
				id: "secondInterview",
				name: "二面"
			},
			{
				id: "thirdInterview",
				name: "三面"
			},
			{
				id: "forthInterview",
				name: "四面"
			}
		]
	},
	{
		stageId: 3,
		stageName: "录用",
		status: [
			{
				id: "employ",
				name: "意向录用，待联系"
			},
			{
				id: "contacted",
				name: "已联系，待回复"
			},
			{
				id: "offerApproval",
				name: "offer审批"
			},
			{
				id: "offerConfirm",
				name: "offer确认"
			}
		]
	},
	{
		stageId: 4,
		stageName: "待入职",
		status: [
			{
				id: "joining",
				name: "待入职"
			}
		]
	},
	{
		stageId: 5,
		stageName: "到岗",
		status: [
			{
				id: "join",
				name: "到岗"
			}
		]
	},
	{
		stageId: 6,
		stageName: "人才库",
		status: [
			{
				id: 0,
				name: "复筛未通过"
			},
			{
				id: 1,
				name: "一面未应约"
			},
			{
				id: 2,
				name: "一面未通过"
			},
			{
				id: 3,
				name: "一面爽约"
			},
			{
				id: 4,
				name: "二面未应约"
			},
			{
				id: 5,
				name: "二面未通过"
			},
			{
				id: 6,
				name: "二面爽约"
			},
			{
				id: 7,
				name: "三面未应约"
			},
			{
				id: 8,
				name: "三面未通过"
			},
			{
				id: 9,
				name: "三面爽约"
			},
			{
				id: 10,
				name: "拒offer(待联系)"
			},
			{
				id: 11,
				name: "拒offer(已联系)"
			},
			{
				id: 12,
				name: "offer审批不通过"
			},
			{
				id: 13,
				name: "拒offer(offer确认)"
			},
			{
				id: 14,
				name: "毁约"
			}
		]
	}
];
