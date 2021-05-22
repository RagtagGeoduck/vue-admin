import Vue from 'vue'
import svgIcon from './SvgIcon.vue'

// Vue.component('svg-icon',svgIcon)

Vue.component('svg-icon',svgIcon)


// 解析svg

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) =>{
    return requireContext.keys().map(requireContext)
}
requireAll(req)
console.log(req);