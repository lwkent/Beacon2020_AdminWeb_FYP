import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import signup from  './components/Signup.vue'
import signin from  './components/Signin.vue'
import addnew from  './components/AddNew.vue'
import edit from  './components/Edit.vue'
import socialshare from  './components/SocialShare.vue'
import mainTab from  './components/mainTab.vue'
import perosnaldetail from  './components/UserPersonelDetail.vue'
import UserPersonelDetail from  './components/UserProfile.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/editProfile',
      name: 'UserPersonelDetail',
      component: UserPersonelDetail
    },
    {
      path: '/',
      name: 'mainTab',
      component: mainTab
    },
    {
      path: '/perosnaldetail',
      name: 'perosnaldetail',
      component: perosnaldetail
    },
    {
      path: '/socialshare',
      name: 'socialshare',
      component: socialshare
    },
    {
      path:'/signup',
      name :'signup',
      component: signup
    },
    {
      path:'/addnew',
      name :'addnew',
      component: addnew
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    },
    {
      path:'/signin',
      name :'signin',
      component: signin
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
