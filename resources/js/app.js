import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

const Pinia = createPinia();
const app = createApp(App);

import Notifications from "@kyvg/vue3-notification";
import $Bus from "./plugin/Event";
import Axios from "./plugin/axios";
import Router from "./plugin/Router";
import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";
import "./plugin/fontawesome";

app.config.globalProperties.$bus = $Bus;
app.provide("$axios", Axios);
app.use(Notifications);
app.use(Pinia);
app.use(Router);
app.component("FaIcon", FontAwesomeIcon);
app.component("FaLayers", FontAwesomeLayers);
app.component("FaLayersText", FontAwesomeLayersText);
app.mount("#app");
