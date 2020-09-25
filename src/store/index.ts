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
    image: {
      fileName: 'ac73302fe56e086405681961-1600962210951.jpg',
      url:
        'http://image-uploader-fdcaf9f0e.herokuapp.com/uploads/ac73302fe56e086405681961-1600962210951.jpg'
    }
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
