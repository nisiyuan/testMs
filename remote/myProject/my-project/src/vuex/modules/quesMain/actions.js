import * as types from './mutation-type'
import serverApi from '@/api/serverApi'

/*
获取学科
*/
export const getAllSubject = ({commit}, data) => {
  var serverConfig = {};
  serverConfig.urls = "http://localhost:3000/mySystem/getSubject";
  serverConfig.params = data;
  serverConfig.successcb = (res) => {
    if(res.errcode == 0){
      commit(types.SET_SUBJECTS,res.data)
    }
  };
  serverConfig.errorcb = (error) => {
      console.log("获得学科信息失败")
  };
  serverApi.getHttpServer(serverConfig);
}
//设置当前选中学科
export const selectSub = ({commit}, data) => {
    commit(types.CHANGE_CUR_SUBJECT, data);
}
//查询当前科目下的题目
export const selQues = ({commit},data) => {
  var serverConfig = {};
  serverConfig.urls = "http://localhost:3000/mySystem/getQues";
  serverConfig.params = data;
  serverConfig.successcb = (res) => {
    if(res.errcode == 0){
      commit(types.SET_QUES,res.data);
    }
  };
  serverConfig.errorcb = (error) => {
      console.log("获得题目信息失败")
  };
  serverApi.getHttpServer(serverConfig);

}
//添加一个题目
export const addQues = ({commit},data) => {
  var serverConfig = {};
  serverConfig.urls = "http://localhost:3000/mySystem/addQues";
  serverConfig.params = data;
  serverConfig.successcb = (res) => {
    if(res.errcode == 0){
      commit(types.SET_QUES,res.data);
    }
  };
  serverConfig.errorcb = (error) => {
      console.log("添加题目失败")
  };
  serverApi.postHttpServer(serverConfig);
}
//修改题目
export const editQues = ({commit},data) => {
  var serverConfig = {};
  serverConfig.urls = "http://localhost:3000/mySystem/editQues";
  serverConfig.params = data;
  serverConfig.successcb = (res) => {
    if(res.errcode == 0){
      commit(types.SET_QUES,res.data);
    }
  };
  serverConfig.errorcb = (error) => {
      console.log("修改题目失败")
  };
  serverApi.postHttpServer(serverConfig);
}
//设置当前操作题目
export const curQues = ({commit},data) => {
  commit(types.SET_CUR_QUES,data);
}
//删除题目
export const delQues = ({commit},data) => {
  var serverConfig = {};
  serverConfig.urls = "http://localhost:3000/mySystem/delQues";
  serverConfig.params = data;
  serverConfig.successcb = (res) => {
    if(res.errcode == 0){
      commit(types.SET_QUES,res.data);
    }
  };
  serverConfig.errorcb = (error) => {
      console.log("删除题目失败")
  };
  serverApi.getHttpServer(serverConfig);
}

