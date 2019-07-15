import Vue from "vue";
//插件引入
import "babel-polyfill";
import './plugins/axios'
import './plugins/filter'
import ErrorPlugin from './plugins/errorPlugin'
import './directive/common'
import moment from './plugins/moment';
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import './theme/elementUI/index.css'
import './assets/js/rem';
// 引入错误全局处理插件
Vue.use(ErrorPlugin)

// 全局引用自定义样式
import 'font-awesome/css/font-awesome.min.css'//font-awesome插件样式文件
import "./assets/css/comment.scss"//管理后台
import './plugins/element.js'

Vue.config.productionTip = false;
/*注册一个全局的总线组件*/
Vue.prototype.$bus = Vue.prototype.$bus || new Vue()
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

/**
 * 增加路由守卫
 * 1 增加判断token是否存在
 * */
/*
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('unicom-token');
    token || to.path==='/login' ? next() : next({path: '/login'})
});*/
