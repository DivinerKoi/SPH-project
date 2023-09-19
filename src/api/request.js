//对于axios进行二次 封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
//引入store，用于给请求头带上uuid游客临时身份
import store from '@/store'



//1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL: "/api",
    //代表请求超时的时间
    timeout: 5000
})
//请求拦截器，在发请求之前，请求拦截器可以检测到，可以在发请求之前去做一些事情
requests.interceptors.request.use((config) => {
    
    //请求头添加一个字段，（userTempId）该字段需要与后台对接
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }


    // console.log(config)
    nprogress.start() // 加载进度条
    return config
})

//响应拦截器，
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到
    nprogress.done()
    return res.data
    
},(error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('false'))
})

export default requests