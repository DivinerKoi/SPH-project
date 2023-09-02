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
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess" 
import ShopCart from "@/pages/ShopCart" 

//配置路由
export default new VueRouter({
    //路由跳转默认滚动条在最顶上
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {y:0}
    },
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
        {   //商品详情
            path: "/detail/:skuId",
            name: 'detail',
            component: Detail,
            meta: {show: true}
        },
        {   //添加购物车成功
            // path: "/addCartSuccess/:skuId/:skuNum",
            path: "/addCartSuccess",
            name: 'addCartSuccess',
            component: AddCartSuccess,
            meta: {show: false}
        },
        {   //购物车
            path: "/ShopCart/",
            name: 'ShopCart',
            component: ShopCart,
            meta: {show: false}
        },
 
    ]
})