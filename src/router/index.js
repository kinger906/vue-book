import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Add from '@/components/Add'
import Collect from '@/components/Collect'
import Details from '@/components/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {   //路由元信息，方便显示不同，会成为$route的一个属性
        keepAlive: true
      }
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/add',
      component: Add
    },
    {
      path: '/collect',
      component: Collect
    },
    {
      path: '/detail/:bid',
      component: Details,
      name: 'detail'
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
