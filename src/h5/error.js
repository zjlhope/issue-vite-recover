import Vue from 'vue'
import App from './App.vue'
// import localStore from '@/utils/localstore';

const dom_btn_refresh = document.getElementById("btn-refresh");

const error_context = localStore.getSessionItem("error-context") || {}

dom_btn_refresh.href = error_context.returnUrl || "./"

if(error_context.error) console.error(error_context.error)
    
new Vue({
    el: "#app",
    render: h => h(App)
})
