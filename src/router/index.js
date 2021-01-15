import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    meta:{
      name:"主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index"),
    meta:{
      name:"登录"
    }
  },
  {
    path: "/console",
    name: "Console",
    redirect:"index",
    component: () => import("../views/Layout/index"),
    children:[{
      path:"/index",
      name:"index",
      component: () => import("../views/Console/index"),
    }],
    meta:{
      name:"控制台"
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
