import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as apolloProvider from "./apollo.provider";
import "./assets/tailwind.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(apolloProvider.provider);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
});
app.mount("#app");
