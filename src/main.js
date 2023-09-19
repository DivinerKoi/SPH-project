import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//--全局组件
import TypeNav from '@/components/TypeNav' //三级联动
import Carousel from '@/components/Carousel' //轮播图
import Pagination from '@/components/Pagination'
//注册为全局组件 (第一个参数：全局组件的名称，第二个参数：哪一个组件)
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name,Pagination)
//运行Mockserver.js ===mock数据
import '@/mock/mockServer'
//引入swiper样式（轮播图）
import "swiper/css/swiper.css"

Vue.config.productionTip = false
Vue.use(router)

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
