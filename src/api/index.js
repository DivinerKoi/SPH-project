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

//删除购物车商品  /api/cart/deleteCart/{skuId}   method: DELETE
export const reqDeleteCartById = (skuId) => requests({url: `/cart/deleteCart/${skuId}`,method:'DELETE'})

//购物车修改全选状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuID,isChecked) => requests({url: `/cart/checkCart/${skuID}/${isChecked}`,method:'get'})

//获取验证码，用于用户注册 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method:'get'})

//注册的接口 /api/user/passport/register  参数：phone password code
export const reqUserRegister = (data) => requests({url: "/user/passport/register",data: data, method:'post'})

//登录接口  /api/user/passport/login
export const reqUserLogin = (data) => requests({url: '/user/passport/login', data, method:'post'})



