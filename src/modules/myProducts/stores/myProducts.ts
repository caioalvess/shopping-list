import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export const useMyProductsStore = defineStore("myProducts", () => {
  const route = useRoute();

  const products = ref({
    listId: "faf7e301-c89f-4711-b516-9faff73b423e",
    data: [
      {
        id: "1",
        checked: false,
        name: "Arroz",
        price: "10",
        amount: "2",
      },
      {
        id: "1",
        checked: false,
        name: "Feijão",
        price: "7",
        amount: "1",
      },
      {
        id: "1",
        checked: false,
        name: "Macarrão",
        price: "1.87",
        amount: "3",
      },
    ],
  });

  onMounted(() => {});

  return {
    products,
  };
});
