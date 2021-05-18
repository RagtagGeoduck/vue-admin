import Vue from "vue";
import Vuex from "vuex";
import Cookie from 'cookie_js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // isCollapse:false,
    isCollapse:JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    // isCollapse:JSON.parse(localStorage.getItem("isCollapse")) || false,
    // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
    count: 10
  },
  getters:{
    count: state => state + 10
  }
  ,
  mutations: {
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse;
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
      // localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
      // Cookie.set("isCollapse2", JSON.stringify(state.isCollapse));
    },
    SET_COUNT(state, value){
      state.count += value
    }
  },
  actions: {}
});
