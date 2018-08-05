import * as types from './mutation-type'

const mutations = {
    //所有用户信息
    [types.SET_ALL_USER](state,data){
        for(var i=0;i<data.length;i++){
            data.access="";
        }
        state.userInfo = data;

    },
    [types.CHANGE_CUR_MODEL](state,data){
        state.curModel = data;
    },
    //添加教师错误信息
    [types.CHANGE_ERR_MSG](state,data){
        state.teacherErrMsg = data;
    },
    [types.SET_ALL_ACCESS](state,data){
        for(var i=0;i<data.length;i++){
            var name = data[i].teacher_name;
            for(var j=0;j<state.userInfo.length;j++){
                if(name == state.userInfo[j].user_name){
                    state.userInfo[j].access = data[i].subject;
                }
            }
        }
        state.allUserInfo = state.userInfo;
    }
   
}

export default mutations