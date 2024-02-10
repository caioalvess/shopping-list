import { createRouter, createWebHistory } from "vue-router";

import MyLists from "@/modules/myLists/views/MyListsView.vue";
import MyProducts from "@/modules/myProducts/views/MyProductsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "myLists",
      component: MyLists,
    },
    {
      path: "/myProducts/:id/:name",
      name: "myProducts",
      component: MyProducts,
    },
  ],
});

export default router;
