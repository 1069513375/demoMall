import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './components/common/toast';

Vue.config.productionTip = false
//Event Bus，类似于vuex
Vue.prototype.$bus = new Vue();
Vue.use(Toast);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
