import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api'

//home模块小仓库
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    //接受actions处理出来的数据,获取三级联动数据
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    // 获取通过mockjs模拟的数据
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
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
    //   console.log(result)
      if(result.code == 200){
          context.commit("GETBANNERLIST",result.data)
      }
    },

    //获取mock模拟出来的floor数据
    async getFloorList(context){
        let result = await reqGetFloorList()
        // console.log(result)
        if(result.code == 200){
            context.commit("GETFLOORLIST",result.data)
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