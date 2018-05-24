<template>
  <div id="app">
    <router-view></router-view>
    <Tab/>
  </div>
</template>

<script>
import Tab from '@/base/Tab.vue'

export default {
  name: 'App',
  data(){
    return {}
  },
  components:{
    Tab
  }
}
</script>

<style>
  * { margin: 0; padding: 0;}
  a { text-decoration: none;}
  ul,li { list-style: none;}
  .content {
    position: fixed;
    top: 40px;
    bottom: 50px;
    width: 100%;
    overflow: auto;
  }
</style>
