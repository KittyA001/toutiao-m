import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)
const loginToken = 'loginToken'
export default new Vuex.Store({
  state: {
    // user: null
    // 因为store 数据刷新后就初始化了，需要本地存储保持持久性
    // user: JSON.parse(window.localStorage.getItem(loginToken))
    user: getItem(loginToken) // 返回一个对象里边保护token值
  },
  mutations: {
    upDataUser (state, payload) {
      state.user = payload
      // 本地存储Token值
      // window.localStorage.setItem(loginToken, JSON.stringify(state.user))
      setItem(loginToken, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
