import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'



/**
 * 通用axios get请求
 * @param {object} paramConfig 请求配置参数 
 * 必须字段 urls、params、successcb、errorcb;
 * 可选字段 请求前的拦截器成功和失败回调：beforeReq beforeReqErr
 */
const getHttpServer = (paramConfig) => {
    //默认5s超时
    var timeoutId = setTimeout(function () {
        return paramConfig.errorcb('server timeout')
    }, 5000)
    //配置默认参数
    var paramDefault = {
        beforeReq:null,
        beforeReqErr:null
    };
    //配置签名参数
    // var appTimestamp = rootState.courseInfoData.systemTime;
    // var appSign = getAppSign(parameter, appTimestamp);
    // paramConfig.urls += '?app_id=' + APP_ID + '&app_timestamp=' + appTimestamp + '&app_sign=' + appSign + '&' + biParam;
    // //合并参数
    paramConfig = Object.assign(paramDefault,paramConfig);
    //如果参数有请求前的回调 添加请求拦截器
    if(paramConfig.beforeReq){
        var myInterceptor = axios.interceptors.request.use(config => {
            //对请求成功做些什么
            paramConfig.beforeReq();
            return config;
        }, error => {
            // 对请求错误做些什么
            paramConfig.beforeReqErr && paramConfig.beforeReqErr();
            return Promise.reject(error);
        });
    }
    //发送请求
    // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';  //此处是增加的代码，设置请求头的类型
    axios({
        method:'get',
        url:paramConfig.urls,
        params:paramConfig.params,
        // headers: {'X-Requested-With': 'XMLHttpRequest'},//自定义请求头
        // responseType:'json',//默认
    }).then(res => {
        clearTimeout(timeoutId);
        return paramConfig.successcb(res.data);
    }).catch(error => {
        clearTimeout(timeoutId);
        return paramConfig.errorcb(error);
    })

    //销毁拦截器
    //axios.interceptors.request.eject(myInterceptor);
}

/**
 * 通用axios post请求
 */
const postHttpServer = (paramConfig) => {
    var timeoutId = setTimeout(function () {
        return paramConfig.errorcb('server timeout')
    }, 5000)
    //配置默认参数
    var paramDefault = {
        beforeReq:null,
        beforeReqErr:null
    };
    //合并参数
    paramConfig = Object.assign(paramDefault,paramConfig);
    //如果参数有请求前的回调 添加请求拦截器
    if(paramConfig.beforeReq){
        var myInterceptor = axios.interceptors.request.use(config => {
            //对请求成功做些什么
            paramConfig.beforeReq();
            return config;
        }, error => {
            // 对请求错误做些什么
            paramConfig.beforeReqErr && paramConfig.beforeReqErr();
            return Promise.reject(error);
        });
    }
    axios({
        method:'post',
        data:qs.stringify(paramConfig.params),//post参数需要序列化 key1=value1&key2=value2
        url:paramConfig.urls,
        // responseType:'json',//默认
        headers: {
            // 'X-Requested-With': 'XMLHttpRequest',
        },//自定义请求头
    }).then(response => {
        clearTimeout(timeoutId);
        return paramConfig.successcb(response.data)
    }).catch(error => {
        clearTimeout(timeoutId);
        return paramConfig.errorcb(error)
    })
}



export default {
    getHttpServer,
    postHttpServer,
}
