import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { MyProductsProps } from "../types/myProductsType";
import type { AddNewProductProps } from "../types/addNewProductType";
import type { UpdateProductsProps } from "../types/updateProductsType";
import { useRoute } from "vue-router";

export const useMyProductsStore = defineStore("myProducts", () => {
  const route = useRoute();
  const listId = computed(() => route.params.id as string);
  const myProducts = ref<MyProductsProps[]>([]);

  const inputFilterProducts = ref("");

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

  function updateProduct({ id, name, price, amount }: UpdateProductsProps) {
    myProducts.value.forEach((product: MyProductsProps) => {
      if (product.id === id) {
        product.name = name;
        product.price = price;
        product.amount = amount;
      }
    });

    return updateLocalStorage();
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

  const totalValue = computed(() => {
    const productsTotalValue = myProducts.value
      .filter((product: MyProductsProps) => product.checked)
      .map((product: MyProductsProps) => Number(product.total));
    if (productsTotalValue.length) {
      const sum = productsTotalValue.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      return sum.toFixed(2);
    } else {
      return "0";
    }
  });

  const remainingProducts = computed(() => {
    if (myProducts.value.length) {
      return myProducts.value.filter(
        (product: MyProductsProps) => !product.checked
      ).length;
    } else {
      return 0;
    }
  });

  const amount = computed(() => {
    return myProducts.value.length;
  });

  const searchFilterProducts = computed(() => {
    const lowerCaseInput = inputFilterProducts.value.toLowerCase();
    const matches = myProducts.value.filter((item) =>
      item.name.toLowerCase().includes(lowerCaseInput)
    );
    if (matches) {
      return matches;
    } else {
      return myProducts.value;
    }
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
        (res: MyProductsProps) => res.listId === listId.value
      );
      myProducts.value.push(...productsByListId);
    }
  });

  return {
    inputFilterProducts,
    listId,
    myProducts,
    addNewProduct,
    checkProduct,
    deleteAllProducts,
    deleteProductById,
    updateProduct,
    totalValue,
    remainingProducts,
    amount,
    searchFilterProducts,
  };
});
