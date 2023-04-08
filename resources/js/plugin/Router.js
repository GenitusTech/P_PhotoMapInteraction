import { createRouter, createWebHistory } from "vue-router";

import PageHome from "../pages/Home.vue";

const routes = [{ path: "/", name: "home", component: PageHome }];

const Router = createRouter({
    history: createWebHistory(),
    routes,
});

export default Router;
