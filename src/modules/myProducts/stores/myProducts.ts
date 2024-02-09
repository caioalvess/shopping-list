import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { MyProductsProps } from "../types/myProductsType";
import type { AddNewProductProps } from "../types/addNewProductType";
import { useRoute } from "vue-router";

type UpdateProductProps = {
  id: string;
  name?: string;
  price?: string;
  amount?: string;
  checked?: boolean;
};

export const useMyProductsStore = defineStore("myProducts", () => {
  const route = useRoute();
  const listId = ref(route.params.id as string);
  const myProducts = ref<MyProductsProps[]>([]);

  function addNewProduct({ name, price, amount }: AddNewProductProps) {
    const total = (Number(price) * Number(amount)).toFixed(2);
    const newProduct = {
      id: uuidv4(),
      listId: listId.value,
      checked: false,
      name,
      price,
      amount,
      total,
    };

    myProducts.value.push(newProduct);
    updateLocalStorage();
  }

  function checkProduct(id: string) {
    myProducts.value.forEach((product: MyProductsProps) => {
      if (product.id === id) {
        product.checked = !product.checked;
      }
    });

    updateLocalStorage();
  }

  function deleteAllProducts() {
    myProducts.value = [];
    updateLocalStorage();
  }

  function deleteProductById(id: string) {
    const restOfProducts = myProducts.value.filter(
      (product: MyProductsProps) => product.id !== id
    );

    myProducts.value = restOfProducts;

    updateLocalStorage();
  }

  const otherProductsById = computed(() => {
    return getLocalStorage().filter(
      (res: MyProductsProps) => res.listId !== listId.value
    );
  });

  function getLocalStorage() {
    return JSON.parse(localStorage.getItem("myProducts") || "[]");
  }

  function updateLocalStorage() {
    localStorage.setItem(
      "myProducts",
      JSON.stringify([...otherProductsById.value, ...myProducts.value])
    );
  }

  onMounted(() => {
    if (!localStorage.getItem("myProducts")) {
      localStorage.setItem("myProducts", JSON.stringify(myProducts.value));
    } else {
      const localStorageProducts = JSON.parse(
        localStorage.getItem("myProducts") || "[]"
      );

      const productsByListId = localStorageProducts.filter(
        (res: MyProductsProps) => res.listId === route.params.id
      );
      myProducts.value.push(...productsByListId);
    }
  });

  return {
    myProducts,
    addNewProduct,
    checkProduct,
    deleteAllProducts,
    deleteProductById
  };
});
