//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)

//引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

//配置路由
export default new VueRouter({
    routes: [
        //重定向
        {
            path: '*',
            redirect: '/home'
        },
        {
            path: "/home",
            component: Home,
            meta: {show: true}
        },
        {
            path: "/search/:keyword?", // params参数可传可不传(加了问号)
            name: 'search',
            component: Search,
            meta: {show: true}

        },
        {
            path: "/login",
            component: Login,
            meta: {show: false}

        },
        {
            path: "/register",
            component: Register,
            meta: {show: false}

        },
 
    ]
})