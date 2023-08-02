import { createRouter, createWebHistory } from "vue-router";
import Profile from "../views/Profile.vue";
import Profile2 from "../views/Profile2.vue";
import HomeLand from "../views/HomeLand.vue";
import Messages from "../views/Messages.vue";
import Create from "../views/Create.vue";
import Update from "../views/Update.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/home/:id",
      name: "userhome",
      component: Home,
      children: [
        {
          path: "homeland",
          component: HomeLand,
        },
        {
          path: "Profile",
          component: Profile,
        },
        {
          path: "",
          component: Profile,
        },
        {
          path: "messages",
          component: Messages,
        },
        {
          path: ":id2",
          component: Profile2,
        },
      ],
    },
  
  ],
});

export default router;
