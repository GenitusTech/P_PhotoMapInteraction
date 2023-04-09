import { createRouter, createWebHistory } from "vue-router";

import PageOpenStreetMap from "../pages/Home.vue";

const routes = [{ path: "/", name: "OSM", component: PageOpenStreetMap }];

const Router = createRouter({
    history: createWebHistory(),
    routes,
});

export default Router;
