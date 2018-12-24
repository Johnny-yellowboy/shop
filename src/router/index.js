import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import User from '@/components/User'
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
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: '/user',
          component: User
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
  console.log(token)
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
