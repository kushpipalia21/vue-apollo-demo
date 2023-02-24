import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/add-user",
    name: "add-user",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddUser.vue"),
  },
  {
    path: "/user/:id",
    name: "single-user",
    component: () => import("../components/SingleUser.vue"),
  },
  {
    path: "/edit-user/:id",
    name: "edit-user",
    component: () => import("../components/EditUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
