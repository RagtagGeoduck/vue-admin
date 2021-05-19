import {Login} from '@/api/login'
import {getUsername, setUsername, setToken} from '@/utils/app'
// 提取（19学时）
const state ={
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    count: 10,
    token : '',
    username : getUsername || '',
    
}
const getters ={
    count: state => state + 10
}
const mutations ={
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_COUNT(state, value) {
        state.count += value
    },
    // 设置username && token ----------------------------------------- 设置username && token 开始⬇️
    SET_USERNAME(state, value){
        state.username = value;
    },
    SET_TOKEN(state, value){
        state.token = value;
    }
    // 设置username && token ----------------------------------------- 设置username && token 结束⬆️
}
const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then(response => {
                // 调用commit设置 username&&token ------------------- 调用方法设置 username&&token 开始
                console.log(response)
                let data = response.data.data;
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                // 调用commit username&&token ----------------------- 调用方法设置 username&&token 结束

                // 调用方法设置 username&&token ---------------------- 调用方法设置 username&&token 开始
                setToken(data.token);
                setUsername(data.username);
                // 调用方法设置 username&&token ---------------------- 调用方法设置 username&&token 结束
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    
};