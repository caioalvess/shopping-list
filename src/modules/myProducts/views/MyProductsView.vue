<template>
  <div class="container">
    <Title>Lista carrefour</Title>
    <div class="action-container">
      <button class="nes-btn is-primary" @click="openModal" type="button">Add new product</button>
      <button class="nes-btn is-error" type="button">Delete all</button>
    </div>
    <ProductsTable :data="products.myProducts.value" />
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
import Title from "@/components/Title.vue";
import ProductsTable from "@/modules/myProducts/components/ProductsTable.vue";
import Modal from "@/components/Modal.vue";
import AddNewProduct from "@/modules/myProducts/components/AddNewProduct.vue";
import { ref } from "vue";

import { useMyProducts } from "@/modules/myProducts/composables/useMyProducts";

const products = useMyProducts();

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
  products.addNewProduct(product.value);
  return closeModal();
}
</script>

<style scoped>
.container {
  @media (min-width: 900px) {
    width: 80%;

    margin: 0 auto;
    padding: 20px 0;
  }

  width: 100%;
  padding: 10px;
}

.action-container {
  display: flex;

  gap: 16px;
}
</style>