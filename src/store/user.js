//登陆注册的仓库 

import { reqGetCode,reqUserRegister,reqUserLogin } from "@/api"
const state = {
    code: '',
    token: ''
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
    //用户登录
    async userLogin(context,data){
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识
        //将来带着token找服务器要用户信息
        if(result.code == 200){
            context.commit('USERLOGIN',result.data.token)
            return 'ok!'
        }else{
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
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}