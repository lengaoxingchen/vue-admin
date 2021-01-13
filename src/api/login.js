import service from "@/utils/request";

/**
 * 获取验证码
 */
export function GetSms(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data
    })
}

/**
 * 登录
 */
export function Login() {

}

/**
 * 获取用户角色
 */
export function GetUserRule() {

}

/**
 * 注册
 */
export function Register(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}