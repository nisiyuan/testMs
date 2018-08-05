import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  subjects: [],//学科权限
  curSub:'',//当前选中学科
  allQues:[],//当前学科下的题目
  curQues:{},//当前操作的问题
}

export default{
  state,
  actions,
  getters,
  mutations
}
