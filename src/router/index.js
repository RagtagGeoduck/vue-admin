import Vue from "vue";
import Router from "vue-router";
import Login from '../views/Login/index.vue'

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      // name: "home",
      // component: Home
      redirect: "login",
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/console",
      name: "Console",
      component: () => import("../views/Layout/index.vue"),
      children: [{
        path: "/console-index",
        name: "Console-index",
        component: () => import("../views/Console/index.vue")
      }]
    }
  ]
});