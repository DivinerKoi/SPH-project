import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符串，且每次执行不能发生变化，游客省份持久储存,便于开发购物车功能
export const getUUID = () => {
    //从本地获取uuid（如果没有则生成一个）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}

