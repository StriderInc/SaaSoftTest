import { createApp } from "vue";

import "@app/styles/index.css";
import App from "@app/App.vue";

import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
