<template>
  <div id="layout" :class="[menuStatus? 'close':'open']">
    <LayoutHeader />
    <LayoutNav />
    <LayoutMain />  
  </div>
</template>

<script type="text/ecmascript-6">

import LayoutHeader from './Components/Header'
import LayoutNav from './Components/Nav'
import LayoutMain from './Components/Main'
import {computed} from "@vue/composition-api"

export default {
  name: '',
  components: {LayoutHeader,LayoutNav,LayoutMain},
  setup (props, context) {
    const menuStatus = computed(()=> context.root.$store.state.isCollapse)

    return{
      menuStatus
    }
  },
}
</script>
<style  scoped lang="scss" >
#layout{
  background-color: #f7f7f7;
}
</style>
