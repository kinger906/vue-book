<template>
  <div id="app">
    <!-- 需要缓存的 -->
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- 不需要缓存的 -->
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
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
  .fadeIn-enter {
    opacity: 0;
  }
  .fadeIn-enter-active {
    opacity: 1;
    transition: 0.5s linear;
  }
  .fadeIn-leave-active {
    opacity: 0;
    transition: 0.5s linear;
  }
</style>
