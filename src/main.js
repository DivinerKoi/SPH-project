import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//--全局组件
import TypeNav from '@/components/TypeNav' //三级联动
import Carousel from '@/components/Carousel' //轮播图
import Pagination from '@/components/Pagination'//分页组件
// 按需引入 Element
import { Button,MessageBox } from 'element-ui';
//注册为全局组件 (第一个参数：全局组件的名称，第二个参数：哪一个组件)
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)
// ElementUI注册组建的时候还有一种写法，挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//运行Mockserver.js ===mock数据
import '@/mock/mockServer'
//引入swiper样式（轮播图）
import "swiper/css/swiper.css"
//全局引入api,放到原型上
import * as API from '@/api'

Vue.config.productionTip = false
Vue.use(router)

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
