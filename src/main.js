import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './layouts/App.vue'
import router from './router'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.config.errorHandler = function (err, vm, info) {
  console.error(err)
}
new Vue({
  render: h => h(App),
  router
}).$mount('#app')


