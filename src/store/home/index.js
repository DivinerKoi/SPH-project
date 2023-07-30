import {reqCategoryList} from '@/api'

//home模块小仓库
const state = {
    categoryList: []
}
const mutations = {
    //接受actions处理出来的数据
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}
const actions = {
    async categoryList(context){
        let result = await reqCategoryList();
        // console.log(result)
        if(result.code == 200){
            context.commit("CATEGORYLIST",result.data)
        }
    },
}
const getters = {}
// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}