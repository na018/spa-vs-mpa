import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Vuetify, // required
  VApp, // required
  transitions,
  VGrid,
  VCard,
  VBtn,
  VProgressCircular,
  VBadge
} from 'vuetify'
import { Ripple } from 'vuetify/es5/directives'
import stylus from 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    transitions,
    VGrid,
    VCard,
    VBtn,
    VProgressCircular,
    VBadge
  },
  directives: {
    Ripple
  }
})

/*import {
  Vuetify,
  VApp,
  VGrid,
  VList,
  VBtn,

} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    VList,
    VBtn,
  }
})*/
// index.js or main.js
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
