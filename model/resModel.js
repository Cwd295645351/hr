/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-03 21:55:50
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-11 00:15:53
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
