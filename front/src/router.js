import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    { path:'/',redirect:"/proxy"},//重定向
    {
      path:'/login',
      name:"login",
      component:()=> import('./views/login/login.vue')
    },
    {//管理平台
      path: "/",
      name: "layout",
      component: () => import("./views/layout/layout.vue"),
      children: [
        {
          path: "proxy",
          name: "proxy",
          component: () => import("./views/proxy/proxy.vue"),
        }
      ]
    }
  ]
});
