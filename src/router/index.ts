import { createRouter, createWebHistory } from "vue-router";

import MyLists from "@/modules/myLists/views/MyLists.vue";
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
      path: "/myProducts/:id",
      name: "myProducts",
      component: MyProducts,
    },
  ],
});

export default router;