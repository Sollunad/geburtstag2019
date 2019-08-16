import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage
    },
  ]
})
