import { computed, onMounted, ref } from "vue";
import type { MyProductsProps } from "../types/myProductsType";
import type { AddNewProductProps } from "../types/addNewProductType";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";
export function useMyProducts() {
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

  const otherProductsById = computed(() => {
    return getLocalStorage().filter(
      (res: MyProductsProps) => res.listId !== listId.value
    );
  });

  function updateLocalStorage() {
    return localStorage.setItem(
      "myProducts",
      JSON.stringify([...otherProductsById.value, ...myProducts.value])
    );
  }

  function getLocalStorage() {
    return JSON.parse(localStorage.getItem("myProducts") || "[]");
  }

  onMounted(() => {
    if (!localStorage.getItem("myProducts")) {
      localStorage.setItem("myProducts", JSON.stringify(myProducts.value));
    } else {
      const localStorageProducts = JSON.parse(
        localStorage.getItem("myProducts") || "[]"
      );

      const productsByListId = localStorageProducts.filter(
        (res: MyProductsProps) => res.listId === listId.value
      );
      myProducts.value.push(...productsByListId);

      console.log(myProducts.value)
    }
  });

  return {
    myProducts,
    addNewProduct,
  };
}
