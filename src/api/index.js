//当前模块，API进行统一管理
import requests from './request'
// 用mock模拟数据请求
import mockRequests from './mockAjax'

//三级联动接口
export const reqCategoryList = () => {
    //发请求 axios发请求返回promise对象
    return requests({url: '/product/getBaseCategoryList',method: 'get'})
}
//获取banner （首页轮播图数据）
export const reqGetBannerList = () => {
    return mockRequests({url: '/banner',method: 'get'})
}
//获取floor组件数据
export const reqGetFloorList = () => {
    return mockRequests({url: '/floor',method: 'get'})
}

//获取Search模块的数据，当前这个接口给服务器传递一个默认参数params至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:"post",data:params})

//获取商品详情 /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({url: `/item/${skuId}`,method: 'get'})

//将产品添加到购物车中（）
export const reqAddOrUpdateCart = (skuId,skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表 /api/cart/cartList
export const reqCartList = () => requests({url: '/cart/cartList', method:'get'})