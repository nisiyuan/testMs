import * as types from './mutation-type'

const mutations = {
    //设置学科权限
    [types.SET_TESTS](state,data){
        state.allTests = data;
    },
}

export default mutations