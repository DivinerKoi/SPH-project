//对于axios进行二次 封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
//这是模拟的


//1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL: "/mock",
    //代表请求超时的时间
    timeout: 5000
})
//请求拦截器，在发请求之前，请求拦截器可以检测到，可以在发请求之前去做一些事情
requests.interceptors.request.use((config) => {
    nprogress.start()
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