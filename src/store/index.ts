import { Nullable } from '@/common/types'
import { createStore } from 'vuex'

export interface RootState {
  image: Nullable<{
    fileName: string
    url: string
  }>
}

export const store = createStore<RootState>({
  state: {
    image: null
  },
  mutations: {
    SET_IMAGE: (state, payload) => (state.image = payload)
  },
  actions: {
    setImage({ commit }, payload) {
      commit('SET_IMAGE', payload)
    }
  }
})

export default store
