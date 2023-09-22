import vue from 'vue'
import vuex from 'vuex'
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopcart'
import user from './user'
import trade from './trade'


vue.use(vuex)


export default new vuex.Store({
   modules: {
       home,
       search,
       detail,
       shopCart,
       user,
       trade
   }
})