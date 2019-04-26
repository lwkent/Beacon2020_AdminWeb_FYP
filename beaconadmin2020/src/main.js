import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import chart from 'vue-chartjs'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import * as firebase from 'firebase'
import beacondata from './components/TabItem/BeaconDataList.vue'
import userdatabase from './components/TabItem/UserDatabse.vue'
import userHistory from './components/TabItem/UserHistory.vue'
import userFavourite from './components/TabItem/UserFavoutite.vue'
import statistic from './components/TabItem/Statistic.vue'
import activityGraph from './components/Graph/ActivityGraph.vue'
import VueCharts from 'vue-chartjs'
import AlertCmp from './components/Shared/Alert.vue'
import { Bar, Line } from 'vue-chartjs'


Vue.use(Vuetify)
Vue.use(VueCharts)
Vue.use(chart)
Vue.config.productionTip = false


Vue.component('app-beaconData', beacondata),
Vue.component('app-alert', AlertCmp),
Vue.component('app-Graph', activityGraph),
Vue.component('app-userDatabase', userdatabase)
Vue.component('app-userHistory', userHistory)
Vue.component('app-userFavourite', userFavourite)
Vue.component('app-statistic', statistic)

new Vue({
  router,
  store,
  render: h => h(App),
  created (){
      firebase.initializeApp({
        apiKey: 'AIzaSyB-SNDjmEF6IL-E6CiSvUHBz-22c0GBTGU',
        authDomain: 'beacon2020-d281d.firebaseapp.com',
        databaseURL: 'https://beacon2020-d281d.firebaseio.com',
        projectId: 'beacon2020-d281d',
        storageBucket: 'gs://beacon2020-d281d.appspot.com',
      })
  }
}).$mount('#app')
