import service from '@/utils/request'

/*
    获取验证码
*/
export function GetSms(data){
    return service.request({
        method: "POST",
        url: "/getSms/",
        data
    })
}

/*
    注册
*/
export function Register(data){
    return service.request({
        method: "POST",
        url: '/register/',
        data
    })
}