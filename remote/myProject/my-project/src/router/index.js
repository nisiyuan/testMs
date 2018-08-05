import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import index from '@/views/indexMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
