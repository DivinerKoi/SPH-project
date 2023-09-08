//购物车列表仓库
import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from "@/api/index"
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
    },
    // 切换商品选中状态
    async updateCheckedById(context,{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok!'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部选中的商品
    deleteAllCheckedCart(context){
        let promiseAll = []
        context.getters.cartList.cartInfoList.forEach(item => {
            //这里派发了dispatch('deleteCartListById'),用到了async 返回的结果是一个promise
            let promise = item.isChecked == 1 ? context.dispatch('deleteCartListById',item.skuId) : ''
            //把遍历的所有结果push到promiseAll里用promise.all()方法
            promiseAll.push(promise)
        });
        //Promise.all([promise1,promise2,promise3])只有数组里的所有promise对象都成功，返回结果即为成功
        return Promise.all(promiseAll)
    },
    //修改全选按钮的状态
    updateAllCartChecked({dispatch,getters},isChecked){
        let promiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById',{skuId: item.skuId,isChecked})
            promiseAll.push(promise)
        })
        console.log(Promise.all(promiseAll))
        return Promise.all(promiseAll)
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