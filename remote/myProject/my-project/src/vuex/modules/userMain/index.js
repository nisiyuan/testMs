import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  curModel:0,//默认第一个模块
  allUserInfo:{},//所有用户信息
  teacherErrMsg:"",
}

export default{
  state,
  actions,
  getters,
  mutations
}
