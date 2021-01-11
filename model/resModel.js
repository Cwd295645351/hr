/*
 * @Description: 返回结果模板
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-03 21:55:50
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-12 00:00:52
 */
class BaseModel {
	constructor(data, message) {
		if (typeof data === null) {
			this.message = message;
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

export class SuccessModel extends BaseModel {
	constructor(data, message) {
		super(data, message);
		this.retCode = 0;
	}
}

export class ErrorModel extends BaseModel {
	constructor(data, message) {
		super(data, message);
		this.retCode = 1;
	}
}
