import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//注册为全局组件 (第一个参数：全局组件的名称，第二个参数：哪一个组件)
Vue.component(TypeNav.name,TypeNav)
//运行Mockserver.js ===mock数据
import '@/mock/mockServer'
//引入swiper样式（轮播图）
import "swiper/css/swiper.css"




Vue.config.productionTip = false
Vue.use(router)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
