import * as types from './mutation-type'

const mutations = {
    //设置学科权限
    [types.SET_SUBJECTS](state,data){
        state.subjects = data;
    },
    //设置选中学科
    [types.CHANGE_CUR_SUBJECT](state,data){
        state.curSub = data;
    },
    //设置选中学科的题目
    [types.SET_QUES](state,data){
        state.allQues = data;
    },
    [types.SET_CUR_QUES](state,data){
        state.curQues = data;
    }
}

export default mutations