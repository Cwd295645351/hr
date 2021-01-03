/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-03 21:55:50
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 23:07:54
 */
class BaseModel {
	constructor(data, message) {
		if (typeof data === "string") {
			this.message = data;
			data = null;
			message = null;
		}
		if (data) {
			this.data = data;
		}
		if (message) {
			this.message = message;
		}
	}
}

class SuccessModel extends BaseModel {
	constructor(data, message) {
		super(data, message);
		this.retCode = 0;
	}
}

class ErrorModel extends BaseModel {
	constructor(data, message) {
		super(data, message);
		this.retCode = 1;
	}
}

export default {
	SuccessModel,
	ErrorModel
};
