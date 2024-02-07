<template>
  <div class="container mx-auto">
    <Title>Lista carrefour</Title>
    <div class="flex gap-4">
      <button
        @click="openModal"
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Add new product
      </button>
      <button
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Delete all
      </button>
    </div>
    <ProductsTable :data="myProductsStore.products?.data" />
  </div>
  <Modal title="Add new product" :show="showModal">
    <AddNewProduct
      v-model:name="product.name"
      v-model:price="product.price"
      v-model:amount="product.amount"
      @submit="addNewProduct"
      @cancel="closeModal"
    />
  </Modal>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Title from "@/components/Title.vue";
import ProductsTable from "@/modules/myProducts/components/ProductsTable.vue";
import { useMyProductsStore } from "@/modules/myProducts/stores/myProducts";
import Modal from "@/components/Modal.vue";
import AddNewProduct from "@/modules/myProducts/components/AddNewProduct.vue";
import { ref } from "vue";

const route = useRoute();
const myProductsStore = useMyProductsStore();

const showModal = ref(false);

const product = ref({
  name: "",
  price: "",
  amount: "1",
});

function openModal() {
  return (showModal.value = true);
}

function closeModal() {
  return (showModal.value = false);
}

function addNewProduct() {
  myProductsStore.addNewProduct(product.value);
  return console.log(product.value);
}
</script>
