/*
 * @Description:
 * @Version:
 * @Author:
 * @Date: 2021-01-03 22:21:36
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-03 22:23:23
 */
import mongoose from "../db";

const UserSchema = mongoose.Schema({
	username: String,
	password: String
});

const User = mongoose.model("users", UserSchema);

export default User;
