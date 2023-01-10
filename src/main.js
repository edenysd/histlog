import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Chat from "vue3-beautiful-chat";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(Chat);
app.mount("#app");
