import Vue from 'vue'
import Router from 'vue-router'
import myLogin from '@/components/login/login'
import myHome from '@/components/home/home'
import myIssuingManagement from '@/components/home/issuingManagement'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: myLogin,
    },
    {
      path: '/home',
      component: myHome,
      children:[
        {
          path: '',
          redirect:"/home/issuingManagement",
        },
        {
          path: '/home/issuingManagement',
          name: 'issuingManagement',
          component: myIssuingManagement,
        },
      ]
    },
  ]
})
