import service from "@/utils/request";

/**
 * 获取验证码
 */
export function GetSms(data) {
    service.request({
        method: "post",
        url: "/getSms/",
        data
    })
}

/**
 * 登录
 */
export function login() {

}

/**
 * 获取用户角色
 */
export function getUserRule() {

}

/**
 * 注册
 */
export function register() {

}