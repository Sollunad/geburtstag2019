import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import zircle from 'zircle';
import 'zircle/dist/zircle.css';

Vue.config.productionTip = false;
Vue.use(zircle);

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
