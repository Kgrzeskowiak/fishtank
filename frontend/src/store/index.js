import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios').default;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phReading: 0,
    phReadingsHistory: [],
    temperatureReading: 0,
    temperatureReadingsHistory: [],
    alertList: [],
  },
  mutations: {
    savePhReading(state, data) {
      if(typeof(data) == "object") {
        state.phReading = data.value;
      } 
      else {
        state.phReading = data;
      }
    },
    saveTemperatureReading(state,data) {
        if(typeof(data) == "object") {
          state.temperatureReading = data.value;
        } 
        else {
          state.temperatureReading = data;
        }
       
    },
    prepareTemperatureReadingsRecentHistory(state, data){
      data.slice(0,10).forEach(reading => {
        if(state.temperatureReadingsHistory.length < 10) {
          state.temperatureReadingsHistory.push(reading.value)
        }
      })
      state.temperatureReadingsHistory.reverse();
    },
    preparePhReadingsRecentHistory(state, data){
      data.slice(0,10).forEach(reading => {
        if(state.phReadingsHistory.length < 10) {
          state.phReadingsHistory.push(reading.value)
        }
      })
      state.phReadingsHistory.reverse();
    },
    updateTemperatureRecentHistory(state, data) {
      state.temperatureReadingsHistory.push(data);
      while(state.temperatureReadingsHistory.length > 10) {
        state.temperatureReadingsHistory.shift();
      }
    },
    updatePhRecentHistory(state, data) {
      state.phReadingsHistory.push(data);
      if(state.phReadingsHistory.length > 10) {
        state.phReadingsHistory.shift();
      }
    },
    saveAlerts(state, data) {
      data.forEach(alert => {
        if (alert.sensor == 'Water Temperature') {
          alert.sensor = 'Temperatura wody'
        }
        if (alert.sensor == "Ph level") {
          alert.sensor = "Poziom PH"
        }
      })
      state.alertList = data
    }
  },
  actions: {
    getTodayTemperatureReadings(context) {
      axios.get('http://192.168.1.9:3000/getTodayTemperatureReadings/').then(response => {
        context.commit('prepareTemperatureReadingsRecentHistory', response.data);
        context.commit('saveTemperatureReading', response.data[0]);
      })
    },
    getTodayPhReadings(context) {
      axios.get('http://192.168.1.9:3000/getTodayPhReadings/').then(response => {
        context.commit('preparePhReadingsRecentHistory', response.data);
        context.commit('savePhReading', response.data[0]);
      })
    },
    getAlerts(context) {
      axios.get('http://192.168.1.9:3000/getAlerts/').then(response => {
        context.commit('saveAlerts', response.data);
      })
    },
    SOCKET_connect(context) {
      context.dispatch('getTodayTemperatureReadings');
      context.dispatch('getTodayPhReadings');
      context.dispatch('getAlerts');
      console.log("Vuex connected to socket");
    },
    SOCKET_newPhReading(context, payload) {
      context.commit('savePhReading', parseInt(payload));
      context.commit('updatePhRecentHistory', parseInt(payload));
     
    },
    SOCKET_newTemperatureReading(context, payload){
      context.commit('saveTemperatureReading', parseInt(payload));
      context.commit('updateTemperatureRecentHistory', parseInt(payload))
    },
    SOCKET_newAlert(context){
      context.dispatch('getAlerts');
      
    }

  },
  modules: {
  }
})


