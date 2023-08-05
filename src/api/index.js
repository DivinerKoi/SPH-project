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