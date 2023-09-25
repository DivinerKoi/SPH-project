//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
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
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import myOrder from "@/pages/Center/myOrder"
import groupOrder from "@/pages/Center/groupOrder"




//配置路由
let router = new VueRouter({
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
            // component: Home,
            //路由懒加载的写法
            component: () => import('@/pages/Home') ,
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
            path: "/ShopCart",
            name: 'ShopCart',
            component: ShopCart,
            meta: {show: false}
        },
        {   //结算
            path: "/Trade",
            name: 'Trade',
            component: Trade,
            meta: {show: false},
            beforeEnter: (to, from, next) => {
                // 正常去结算页面(/Trade)是从 /ShopCart路由进去的 ，如果不是就next(false)
                if(from.path == '/ShopCart'){
                    next()
                }else {
                    next(false)
                }
            }
        },
        {   //支付
            path: "/Pay",
            name: 'Pay',
            component: Pay,
            meta: {show: false},
            beforeEnter: (to, from, next) => {
                // 
                if(from.path == '/Trade'){
                    next()
                }else {
                    next(false)
                }
            }
        },
        {   //支付成功
            path: "/PaySuccess",
            name: 'PaySuccess',
            component: PaySuccess,
            meta: {show: false}
        },
        {   //支付成功后查看订单页
            path: "/Center",
            name: 'Center',
            component: Center,
            meta: {show: false},
            //二级路由
            children: [
                {
                    path: "/Center",
                    redirect: "/Center/myOrder"
                },
                {
                    path: "myOrder",
                    name: 'myOrder',
                    component: myOrder,
                },
                {
                    path: "groupOrder",
                    name: 'groupOrder',
                    component: groupOrder,
                }
            ]
        },
 
    ]
})
router.beforeEach(async(to,from,next) => {
    const token = store.state.user.token
    const name = store.state.user.userInfo.name
    if(token){
        //通过判断是否有token表示用户是否登录，实现用户登录后不能去login页面，停留在/home
        if(to.path == '/login'){
            next('/home')
        }else {
            //登陆了，但是不是跳转到login
            //判断跳转非login路由时，是否存在登录后的用户信息，因为之前只是在home页面派发actions
            if(name){
                next()
            }else{
                //如果没有用户信息，则派发actions
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token过期，获取不到用户信息，重新登录
                    //清除token
                    await store.dispatch('userLogout')
                    next('/login')
                    // console.log(error.message)
                }
            }
        }
    }else {
        // 用户未登录: 不能去交易相关、不能去支付相关(pay||paysuccess)、不能去个人中心
        let toPath = to.path
        if(toPath.indexOf('/Trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            // 在未登录时用户点击需要登录才能进去的页面，
            // 把这个信息存储在地址栏中，用户登录后直接去想要去的路由 结合login组件的userLogin()方法
            next('/login?redirect='+toPath)
        }else {
            next()
        }
        
    }
})

export default router