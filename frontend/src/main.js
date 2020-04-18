import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'
import VueSvgGauge from 'vue-svg-gauge'
import './registerServiceWorker'


Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.1.9:5000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))
Vue.use(VueSvgGauge)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
