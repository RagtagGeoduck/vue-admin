const app = {
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
        count: 10
    },
    getters: {
        count: state => state + 10
    },
    mutations: {
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse;
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
        },
        SET_COUNT(state, value) {
            state.count += value
        }
    },
    actions: {
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
}
export default app;