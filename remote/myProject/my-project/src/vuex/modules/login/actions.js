import * as types from './mutation-type'
import serverApi from '@/api/serverApi'

/*
用户登录
*/
export const userLogin = ({commit}, data) => {
    var serverConfig = {};
    serverConfig.urls = "http://localhost:3000/mySystem/userinfo_login";
    serverConfig.params = data;
    serverConfig.successcb = (res) => {
      if(res.errcode == 0){
        commit(types.SET_USEER_INFO,res.data[0]);
        commit(types.SET_ISLOGIN,true);
      }else{
        commit(types.CHANGE_WRONG_MSG,true);
        commit(types.SET_WORNG_MSG,res.errmsg);
      }
    };
    serverConfig.errorcb = (error) => {
        commit(types.CHANGE_WRONG_MSG,true);
        commit(types.SET_WORNG_MSG,"登录失败，请稍后再试");
        console.log("登录失败");
    };
    serverApi.getHttpServer(serverConfig);
}
/*
重置我的信息
*/
export const resetUserInfo = ({commit},data) => {
    commit(types.SET_USEER_INFO,res.data[0]);
}
/*
报错信息是否展示
*/
export const changeShowWrongMsg = ({commit}, data) => {
    commit(types.CHANGE_WRONG_MSG,data);
}
/*
设置报错信息
*/
export const changeSetWrongMsg = ({commit}, data) => {
    commit(types.SET_WORNG_MSG,data);
}
/*
登出
*/
export const loginOut = ({commit}) => {
    commit(types.SET_ISLOGIN,false);
    commit(types.SET_USEER_INFO,{});
}
  

