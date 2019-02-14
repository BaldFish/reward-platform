import Vue from 'vue'
import Router from 'vue-router'
import myLogin from '@/components/login/login'
import myHome from '@/components/home/home'
import myUserManagement from '@/components/home/userManagement/userManagement'
import myUserQuery from '@/components/home/userManagement/userQuery'
import myAccountRanking from '@/components/home/userManagement/accountRanking'
import myYuanDouRecharge from '@/components/home/userManagement/yuanDouRecharge'
import myAssetQuery from '@/components/home/userManagement/assetQuery'
import myUserDetails from '@/components/home/userManagement/userDetails'
import mySystemManagement from '@/components/home/systemManagement/systemManagement'
import myBannerList from '@/components/home/systemManagement/bannerList'
import myAddBanner from '@/components/home/systemManagement/addBanner'
import myArticleManagement from '@/components/home/articleManagement/articleManagement'
import myCategoryList from '@/components/home/articleManagement/categoryList'
import myArticleList from '@/components/home/articleManagement/articleList'
import myAddArticle from '@/components/home/articleManagement/addArticle'
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
          redirect:"/home/userManagement",
        },
        {
          path: '/home/userManagement',
          component: myUserManagement,
          children:[
            {
              path: '',
              redirect:"/home/userManagement/userQuery",
            },
            {
              path: '/home/userManagement/userQuery',
              name: 'userQuery',
              component: myUserQuery,
            },
            {
              path: '/home/userManagement/accountRanking',
              name: 'accountRanking',
              component: myAccountRanking,
            },
            {
              path: '/home/userManagement/yuanDouRecharge',
              name: 'yuanDouRecharge',
              component: myYuanDouRecharge,
            },
            {
              path: '/home/userManagement/assetQuery',
              name: 'assetQuery',
              component: myAssetQuery,
            },
            {
              path: '/home/userManagement/userDetails',
              name: 'userDetails',
              component: myUserDetails,
            },
          ]
        },
        {
          path: '/home/systemManagement',
          component: mySystemManagement,
          children:[
            {
              path: '',
              redirect:"/home/systemManagement/bannerList",
            },
            {
              path: '/home/systemManagement/bannerList',
              name: 'bannerList',
              component: myBannerList,
            },
            {
              path: '/home/systemManagement/addBanner',
              name: 'addBanner',
              component: myAddBanner,
            },
          ]
        },
        {
          path: '/home/articleManagement',
          component: myArticleManagement,
          children:[
            {
              path: '',
              redirect:"/home/articleManagement/addArticle",
            },
            {
              path: '/home/articleManagement/categoryList',
              name: 'categoryList',
              component: myCategoryList,
            },
            {
              path: '/home/articleManagement/articleList',
              name: 'articleList',
              component: myArticleList,
            },
            {
              path: '/home/articleManagement/addArticle',
              name: 'addArticle',
              component: myAddArticle,
            },
          ]
        },
      ]
    },
  ]
})
