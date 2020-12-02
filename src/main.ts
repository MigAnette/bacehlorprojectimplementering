import { RootState } from './store';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import DefaultLayout from './layouts/Default.vue';
import NoNavbarLayout  from './layouts/NoNavbar.vue';


// Register layout components
Vue.component('default-layout', DefaultLayout);
Vue.component('no-navbar-layout', NoNavbarLayout);

// Import for vuex
import Vuex from 'vuex';
import { getStoreBuilder } from 'vuex-typex';

Vue.config.productionTip = false

Vue.use(Vuex);
const storeBuilder = getStoreBuilder<RootState>();

new Vue({
  router,
  store: storeBuilder.vuexStore({
    strict: true,
    devtools: true,
  }),
  vuetify,
  render: h => h(App)
}).$mount('#app')
