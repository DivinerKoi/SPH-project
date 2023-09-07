//购物车列表仓库
import {reqCartList,reqDeleteCartById} from "@/api/index"
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
    },
    //删除购物车商品
    async deleteCartListById(context,skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok!'
        }else{
            return Promise.reject(new Error("faile"))
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