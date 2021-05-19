// 提取（19学时）
const state ={
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    count: 10
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
    }
}
const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then(response => {
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
    actions
};