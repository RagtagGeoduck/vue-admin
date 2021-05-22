export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/*
    验证用户名
*/
export function validateUser(email){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(email)?true:false;
}

/*
    验证密码
*/
export function validatePWD(password){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(password)? true:false;
}
/*
    验证验证码
*/
export function validateCOD(code){
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(code)? true:false;
}