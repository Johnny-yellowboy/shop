import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Users from '@/components/users/Users'
import Roles from '@/components/rights/Roles'
import Rights from '@/components/rights/Rights'
import Categories from '@/components/categories/Categories'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/categories',
          component: Categories
        }
      ]
    }
  ]
})

// const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }

  let token = localStorage.getItem('loginToken')
  // console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
