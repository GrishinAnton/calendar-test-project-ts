import Vue from 'vue';
import App from './App';
import store from './store';

//Styles
import "./assets/styles/app.sass";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
