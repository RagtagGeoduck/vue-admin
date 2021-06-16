import router from './index'

import {getToken, removeToken, removeUsername} from '@/utils/app'
import store from '@/store/index'


// 创建白名单
const whiteRouter = ['/login'];

// 路由守卫
router.beforeEach((to, from, next)=>{
    console.log(to);
    if(getToken()){
        if(to.path == '/login'){
            removeToken();
            removeUsername();
            // 移除 store中state的数据
            store.commit('app/SET_USERNAME', '');
            store.commit('app/SET_TOKEN', '');
            next();
        }else{
            // console.log('存在token');
            next();
        
        }
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('/login');
            console.log('不存在')
        }
    }
})