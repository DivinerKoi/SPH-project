import vue from 'vue'
import vuex from 'vuex'
//引入小仓库
import home from './home'
vue.use(vuex)

// const state = {
//     // count: 1
// }

// const actions = {
//     // add(context,value){
//     //     context.commit('ADD',value)
//     //     console.log('@'+value)
//     //     console.log("#"+context)
//     // }
//     // 解构赋值写法
// //     add({commit}){
// //         commit("ADD")
// //     }
// }

// const mutations = {
//     // ADD(state,value){
//     //     state.count++
//     //     console.log(value)
//     // }
//     // ADD(state){
//     //     state.count++
//     // }
// }

// const getters = {}


export default new vuex.Store({
   modules: {
       home
   }
})