import Vue from "vue";
import Router from "vue-router";
import Login from '../views/Login/index.vue'
import Layout from '../views/Layout'

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      // name: "home",
      // component: Home
      redirect: "login",
      hidden:true,
      meta: {
        name: "主页"
      }
    },
    {
      path: "/login",
      name: "login",
      hidden:true,
      meta:{
        name: "登陆",
      },
      component: Login
    },
    {
      path: "/console",
      name: "Console",
      redirect: "InfoIndex",
      meta:{
        name: "控制台",
        icon: "el-icon-odometer",
        sIcon: "dash-board"
      },
      // component: () => import("../views/Layout/index.vue"),
      component: Layout,
      children: [{
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }]
    },
    {
      path: "/info",
      name: "Info",
      meta: {
        name: "信息管理",
        icon: "el-icon-tickets",
        sIcon: "list"

      },
      component: Layout,
      children: [
        {
          path: "/infoIndex",
          name: "InfoIndex",
          meta: {
            name: "信息列表",
            
          },
          component: () => import("../views/Info/index.vue")
        },
        {
          path: "/infoCategory",
          name: "InfoCategory",
          meta: {
            name: "信息分类",
          },
          component: () => import("../views/Info/category.vue")
        }
      ]
    },
    {
      path: "/user",
      name: "User",
      meta: {
        name: "用户管理",
        icon: "el-icon-user",
        sIcon: "user"

      },
      component: Layout,
      children:[
        {
          path: "/userIndex",
          name: "UserIndex",
          meta: {
            name: "用户列表",
          },
          component: () => import("../views/User/index.vue"),
        },
      ]
    }
  ]
});