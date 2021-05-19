import cookie from 'cookie_js'

const adminToken = "admin_token";
const usernameKey = "username";

export function getToken(){
    return cookie.get(adminToken);
}

export function setToken(token){
    return cookie.set(adminToken, token);
};

export function setUsername(username){
    return cookie.set(usernameKey, username)
};

export function getUsername(){
    return cookie.get(usernameKey);
}
