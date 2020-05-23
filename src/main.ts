import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import '@/scss/main.scss';
Vue.config.productionTip = false;

// @ts-ignore
import VueApollo from 'vue-apollo';
Vue.use(VueApollo);

import apolloClient from './apolloClient';
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});

new Vue({
  router,
  apolloProvider,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
