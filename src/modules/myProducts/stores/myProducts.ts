import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import type { MyProductsProps } from "@/modules/myProducts/types/myProductsType";
import type { AddNewProductProps } from "@/modules/myProducts/types/addNewProductType";

import { v4 as uuidv4 } from "uuid";

export const useMyProductsStore = defineStore("myProducts", () => {
  const route = useRoute();

  const products = ref<MyProductsProps>();

  function addNewProduct({ name, price, amount }: AddNewProductProps) {
    const total = (Number(price) * Number(amount)).toFixed(2);
    const newProduct = {
      id: uuidv4(),
      checked: false,
      name,
      price,
      amount,
      total,
    };
    products.value?.data.push(newProduct);
    return localStorage.setItem(
      "productLists",
      JSON.stringify([...getLocalStorage(), products.value])
    );
  }

  const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("productLists") || "[]");
  };

  onMounted(() => {
    if (!localStorage.getItem("productLists")) {
      const newProductsList = [
        {
          listId: route.params.id,
          data: [],
        },
      ];
      localStorage.setItem("productLists", JSON.stringify(newProductsList));

      const productLists = JSON.parse(
        localStorage.getItem("productLists") || "[]"
      );

      return (products.value = productLists[0]);
    } else {
      const productLists = JSON.parse(
        localStorage.getItem("productLists") || "[]"
      );

      console.log(productLists);

      // const products = productLists.filter((res: any) => {
      //   return res.listId === route.params.id;
      // });

      // console.log(products);
    }
  });

  return {
    products,
    addNewProduct,
  };
});
