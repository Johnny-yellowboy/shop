// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/base.less'
// 使用element-tree-grid
import ElTreeGrid from 'element-tree-grid'
// 导入axios
import axios from 'axios'

// 注册为全局的组件 el-table-tree-column支持el-table-column所有属性
Vue.component('el-table-tree-column', ElTreeGrid)
// 吧axios绑定给vue的原型
Vue.prototype.axios = axios
// 给axios对象设置一个全局的默认baseURL,后续接口可以不用写baseURL了
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 给axios配置请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem('loginToken')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 通过响应拦截器，直接返回 res.data
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 安装elementui插件
Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
