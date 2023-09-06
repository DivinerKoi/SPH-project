import {reqGoodsInfo,reqAddOrUpdateCart} from '@/api/index';
import { getUUID } from '@/pages/utils/uuid_token';
const state = {
    goodInfo : {},
    uuid_token: getUUID()
}

const actions ={
    async getGoodInfo(context,skuId){
       let result = await reqGoodsInfo(skuId);
    //    console.log(result)
        if(result.code == 200){
            context.commit('GETGOODINFO',result.data)
        }
    },
    // 将产品添加购物车
    async addOrUpdateShopCart(context,{skuId,skuNum}){
        let result = await reqAddOrUpdateCart(skuId,skuNum)
        // console.log(result)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }

}

const mutations = {
    GETGOODINFO(state,goodInfo){    
        state.goodInfo = goodInfo
    }
}

const getters = {
    categoryView(state){
       return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default  {
    state,
    actions,
    mutations,
    getters
}