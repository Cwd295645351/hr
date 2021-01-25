/*
 * @Description: 公共方法
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2021-01-23 13:21:47
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-25 21:40:56
 */

const USER_INFO_KEY = "userInfo";
const EXPIRE_AT = "expiresAt";

// 获取完整登录信息
export function getUserInfo(){
    const userInfoStr = window.sessionStorage.getItem(USER_INFO_KEY);
    const userInfo = userInfoStr && JSON.parse(userInfoStr);
    return userInfo || null;
}

// 退出登录
export function logout() {
    window.sessionStorage.removeItem(USER_INFO_KEY);
    window.sessionStorage.removeItem(EXPIRE_AT);
    
    if( window.refreshTokenTimer ){
        clearTimeout(window.refreshTokenTimer);
        window.refreshTokenTimer = null;
    }
    window.location.reload();    

}

// 获取token过期时长
export function getExpireSeconds() {
    const userInfo = getUserInfo();
    const expireSeconds = userInfo && userInfo.expiresIn;
    return expireSeconds;
}

// 刷新需要主动刷新token时间戳
export function refreshExpireStamp( secondsExpiresIn ) {
    if( secondsExpiresIn > 0 ){
        const MS_ONE_SECOND = 1000;
        const nextStamp = new Date().getTime() + secondsExpiresIn * MS_ONE_SECOND;
        sessionStorage.setItem(
            EXPIRE_AT,
            nextStamp,
        );
    }
}

// 刷新用户信息
export function refreshUserInfo(refreshInfo){
    let userInfo = getUserInfo();
    userInfo = {
        ...userInfo,
        ...refreshInfo,
    };
    window.sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

