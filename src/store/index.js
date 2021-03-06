import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    getStateCount: (state) => {
      return state.count + 1
    }
  },
  mutations: {
    add(state) {
      state.count = state.count + 1
    },
    reduction(state) {
      state.count = state.count - 1
    }
  }
})

export default store