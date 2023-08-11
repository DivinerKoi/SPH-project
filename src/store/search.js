import {reqGetSearchInfo} from '@/api'

//home模块小仓库
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state,searchList) {
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit},params={}){
        //params形参，是当用户派发action时，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        // console.log(result)
        // console.log(params)
        if(result.code == 200){ 
            commit("GETSEARCHLIST",result.data)
        }
    }
}
// 计算属性，可用于简化数据
const getters = {
    attrsList(state){
        //这样写存在小问题，例如当网络断开，数据没有请求成功，会返回undefined
        return state.searchList.attrsList
    },
    goodsList(state){
        //模拟场景：没有网络情况下请求不到数据就返回一个空数组
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    }
}

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}