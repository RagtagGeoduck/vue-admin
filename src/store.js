import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:false,
    count: 10
  },
  getters:{
    count: state => state + 10
  }
  ,
  mutations: {
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse;
    },
    SET_COUNT(state, value){
      state.count += value
    }
  },
  actions: {}
});
