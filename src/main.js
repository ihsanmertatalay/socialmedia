
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from './store';
const app = createApp(App)

app.use(router)
app.use(store)

app.use(Toast);
app.mount('#app')
