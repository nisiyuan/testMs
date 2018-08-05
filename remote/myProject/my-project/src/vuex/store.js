/**
 * Created by baijing on 2016/12/29.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import userMain from './modules/userMain'
import quesMain from './modules/quesMain'
import testMain from './modules/testMain'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        userMain,
        quesMain,
        testMain,
    },
    strict: false
})