//购物车列表仓库
import {reqCartList} from "@/api/index"
const state = {
    cartList: []
}
const actions = {
    //获取购物车列表数据
   async getCartList(context){
        let result = await reqCartList()
        // console.log(result)
        if(result.code == 200){
            context.commit('GETCARTLIST',result.data)
        }
    }
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}