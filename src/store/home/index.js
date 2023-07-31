import {reqCategoryList,reqGetBannerList} from '@/api'

//home模块小仓库
const state = {
    categoryList: [],
    bannerList: []
}
const mutations = {
    //接受actions处理出来的数据
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
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
    //获取mock模拟数据的banner数据
    async getBannerList(context){
      let result = await reqGetBannerList()
      console.log(result)
      if(result.code == 200){
          context.commit("GETBANNERLIST",result.data)
      }
    }
}
const getters = {}
// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}