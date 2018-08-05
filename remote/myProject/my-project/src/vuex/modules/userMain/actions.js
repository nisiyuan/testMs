import * as types from './mutation-type'
import serverApi from '@/api/serverApi'

/*
获取所有用户信息
*/
export const getAllUser = ({commit}, data) => {
    var serverConfig = {};
    serverConfig.urls = "http://localhost:3000/mySystem/userinfo_alluser";
    serverConfig.params = data;
    serverConfig.successcb = (res) => {
      if(res.errcode == 0){
        commit(types.SET_ALL_USER,res.data);
        getAllAccess(commit);
      }else{
        console.log("获取所有用户信息失败");
      }
    };
    serverConfig.errorcb = (error) => {
        console.log("获取所有用户信息失败");
    };
    serverApi.getHttpServer(serverConfig);
}
/**
 添加用户
 */
export const addUserInfo = ({commit},data) => {
  var serverConfig = {};
    serverConfig.urls = "http://localhost:3000/mySystem/userinfo_addUser";
    serverConfig.params = data;
    serverConfig.successcb = (res) => {
      if(res.errcode == 0){
        commit(types.SET_ALL_USER,res.data);
        getAllAccess(commit);
      }else{
        commit(types.CHANGE_ERR_MSG,res.data.errorMsg);
      }
    };
    serverConfig.errorcb = (error) => {
        console.log("添加教师失败");
    };
    serverApi.postHttpServer(serverConfig);
}

/**
 编辑用户
 */
export const editUserInfo = ({commit},data) => {
  var serverConfig = {};
    serverConfig.urls = "http://localhost:3000/mySystem/userinfo_editUser";
    serverConfig.params = data;
    serverConfig.successcb = (res) => {
      if(res.errcode == 0){
        commit(types.SET_ALL_USER,res.data);
        getAllAccess(commit);
      }else{
        commit(types.CHANGE_ERR_MSG,res.data.errorMsg);
      }
    };
    serverConfig.errorcb = (error) => {
        console.log("添加教师失败");
    };
    serverApi.postHttpServer(serverConfig);
}
/**
 * 删除用户
*/
export const delUserInfo = ({commit},data) => {
  var serverConfig = {};
    serverConfig.urls = "http://localhost:3000/mySystem/userinfo_delUser";
    serverConfig.params = data;
    serverConfig.successcb = (res) => {
      if(res.errcode == 0){
        commit(types.SET_ALL_USER,res.data);
        getAllAccess(commit);
      }
    };
    serverConfig.errorcb = (error) => {
        console.log("删除教师失败");
    };
    serverApi.getHttpServer(serverConfig);
}

/**
 修改个人信息
 */
export const changeMyInfo = ({commit,dispatch},data) => {
  var serverConfig = {};
    serverConfig.urls = "http://localhost:3000/mySystem/userinfo_myInfo";
    serverConfig.params = data;
    serverConfig.successcb = (res) => {
      if(res.errcode == 0){
        dispatch(resetUserInfo,res.data[0]);
      }
    };
    serverConfig.errorcb = (error) => {
        console.log("修改个人信息失败");
    };
    serverApi.postHttpServer(serverConfig);
}
export const changeCurModel = ({commit},data) =>{
    commit(types.CHANGE_CUR_MODEL,data);
}

function getAllAccess(commit){
  var serverConfig = {};
    serverConfig.urls = "http://localhost:3000/mySystem/all_access";
    serverConfig.successcb = (res) => {
      if(res.errcode == 0){
        commit(types.SET_ALL_ACCESS,res.data);
      }else{
        console.log("获取所有用户权限信息失败");
      }
    };
    serverConfig.errorcb = (error) => {
        console.log("获取所有用户权限信息失败");
    };
    serverApi.getHttpServer(serverConfig);

}