import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import zircle from 'zircle';
import VuePlyr from 'vue-plyr';
import 'zircle/dist/zircle.css';

Vue.config.productionTip = false;
Vue.use(zircle);
Vue.use(VuePlyr);

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
