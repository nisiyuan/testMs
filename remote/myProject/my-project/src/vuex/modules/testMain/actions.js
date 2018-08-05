import * as types from './mutation-type'
import serverApi from '@/api/serverApi'


//查询当前科目下的试卷
export const getAllTests = ({commit},data) => {
  var serverConfig = {};
  serverConfig.urls = "http://localhost:3000/mySystem/getAllTests";
  serverConfig.params = data;
  serverConfig.successcb = (res) => {
    if(res.errcode == 0){
      commit(types.SET_TESTS,res.data);
    }
  };
  serverConfig.errorcb = (error) => {
      console.log("获得试卷信息失败")
  };
  serverApi.getHttpServer(serverConfig);

}


