import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from './module/app.js';
import login from './module/login.js';

export default new Vuex.Store({
  modules:{
    app,
    login
  }
});