<template>
  <div id="layout">
    <LayoutHeader />
    <LayoutNav />
    <LayoutMain />  
  </div>
  

</template>

<script type="text/ecmascript-6">

import LayoutHeader from './Components/Header'
import LayoutNav from './Components/Nav'
import LayoutMain from './Components/Main'

export default {
  name: '',
  components: {LayoutHeader,LayoutNav,LayoutMain},
  setup () {},
}
</script>
<style  scoped lang="scss" >
#layout{
  background-color: #f7f7f7;
}
</style>
