import router from './index'

import {getToken} from '@/utils/app'

// 创建白名单
const whiteRouter = ['/login'];

// 路由守卫
router.beforeEach((to, from, next)=>{
    console.log(to);
    if(getToken()){
        console.log('存在');
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('/login');
            console.log('不存在')
        }
    }
})