import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  isLogin: false,//是否登录
  showWrongMsg: false,//是否展示错误信息
  userInfo:{},//用户信息
  wrongMsg:"",//错误信息
}

export default{
  state,
  actions,
  getters,
  mutations
}
