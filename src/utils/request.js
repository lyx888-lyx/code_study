import axios from "axios";
import {Message, Loading} from "element-ui";
import router from '../router'
// import store from '../store'
let headers = {'content-type': 'application/json'}
let instance = axios.create({
    headers: headers,
})

let loading = null

let rMap = new Map()

instance.defaults.baseURL = "http://112.74.176.108:8081"
instance.defaults.timeout = 10000
instance.defaults.timeoutErrorMessage = "网络请求超时"

// 添加请求拦截器
instance.interceptors.request.use(config => {
        if (rMap.has(config.url)) {
            rMap.get(config.url).f()
            // console.log(rMap)
        }
        if (config.headers) {
            headers = config.headers
        }
        config.cancelToken = new axios.CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            rMap.set(config.url, {f:c, s: new Date(), isRun: true, timer: setTimeout(function () {
                    if (rMap.get(config.url).isRun) {
                        loading = Loading.service({
                            lock: true,
                            text: '拼命的加载数据中',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        })
                    }
                }, 1500)})
        })
        //在请求头加入token，名字要和后端接收请求头的token名字一样
        // config.headers.token = window.localStorage.getItem('token')

        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    })

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
        let data = rMap.get(response.config.url)
        data.isRun = false
        rMap.set(response.config.url, data)
        if (loading !== null) {
            loading.close()
            loading = null
        }

        if (response.config.responseType === 'blob')
            return response.data
        // 对响应数据做点什么
        else if (response.data.status < 0) {
            Message.warning({
                message:response.data.mes,
                duration:1000
            })
        }

        return response.data
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('dates')
            router.push('/')
            location.reload();
            return
        }
        Message.error(error.message)

        let data = rMap.get(error.response.config.url)
        data.isRun = false
        rMap.set(error.response.config.url, data)
        if (loading !== null) {
            loading.close()
            loading = null
        }

        return Promise.reject(error)
    })

export default instance
