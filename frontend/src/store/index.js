import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phReading: 0,
    phReadingsHistory: [0],
    temperatureReading: 0,
    temperatureReadingsHistory: [0],

  },
  mutations: {
    savePhReading(state, data) {
      state.phReading = data;
      state.phReadingsHistory.push(parseInt(data));
      state.phReadingsHistory.shift();
    },
    saveTemperatureReading(state,data) {
      state.temperatureReading = data
      state.temperatureReadingsHistory.push(parseInt(data)) 
      state.temperatureReadingsHistory.shift();
    }
  },
  actions: {
    SOCKET_connect() {
      console.log("connected")
    },
    SOCKET_newPhReading(context, payload) {
      context.commit('savePhReading', payload)
    },
    SOCKET_newTemperatureReading(context, payload){
      context.commit('saveTemperatureReading', payload)
    }
  },
  modules: {
  }
})


