import { createRouter, createWebHistory } from "vue-router";

import MyLists from "@/modules/MyLists/views/MyLists.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: MyLists,
    },
  ],
});

export default router;
