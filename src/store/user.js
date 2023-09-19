//登陆注册的仓库 

import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"
const state = {
    code: '', //验证码
    token: getToken(), //从localSstorage中拿token
    userInfo: {}
}
const actions = {
    //获取验证码
    async getCode(context,phone){
        let result = await reqGetCode(phone)
        console.log(result)
        if(result.code == 200){
            context.commit('GETCODE',result.data)
            return 'ok!'
        }else {
            return Promise.reject(new Error('faile'))
        }   
    },
    //用户注册
    async userRegister(context,user){
        let result = await reqUserRegister(user)
        console.log(result)
        if(result.code == 200){
            return 'ok!'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录 获取token
    async userLogin(context,data){
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识
        //将来带着token找服务器要用户信息
        console.log(result)
        if(result.code == 200){
            context.commit('USERLOGIN',result.data.token)
            //存储token
            setToken(result.data.token)
            return 'ok!'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息 (在Home组件派发)
    async getUserInfo(context){
        let result = await reqUserInfo()
        console.log(result)
        if(result.code == 200){
            context.commit('GETUSERINFO',result.data)
        }
    },
    // 退出登录
    async userLogout(context) {
        let result = await reqLogout()
        if(result.code == 200){
            context.commit('CLEAR')
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = removeToken()
        state.userInfo = {}
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}