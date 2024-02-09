<template>
  <div class="wrapper">
    <Title>Lista carrefour</Title>
    <div class="action-container">
      <button
        class="btn btn-primary"
        @click="openModal('addNewProduct')"
        type="button"
      >
        Add new product
      </button>
      <button
        class="btn btn-negative"
        @click="openModal('deleteAllProducts')"
        type="button"
      >
        Delete all
      </button>
    </div>
    <div class="content">
      <ProductCard
        v-for="product in myProductsStore.myProducts"
        :key="product.id"
        :name="product.name"
        :amount="product.amount"
        :checked="product.checked"
        :id="product.id"
        :listId="product.listId"
        :total="product.total"
        :price="product.price"
      />
    </div>
  </div>
  <Modal
    :title="
      modalComponent === 'addNewProduct'
        ? 'Add new product'
        : 'Delete all products'
    "
    :show="showModal"
  >
    <AddNewProduct
      v-if="modalComponent === 'addNewProduct'"
      v-model:name="product.name"
      v-model:price="product.price"
      v-model:amount="product.amount"
      @submit="addNewProduct"
      @cancel="closeModal"
    />
    <DeleteAllProducts
      v-else
      @cancel="closeModal"
      @confirm="deleteAllProducts"
    />
  </Modal>
</template>

<script setup lang="ts">
import Title from "@/components/Title.vue";
import ProductCard from "@/modules/myProducts/components/ProductCard.vue";
import Modal from "@/components/Modal.vue";
import AddNewProduct from "@/modules/myProducts/components/AddNewProduct.vue";
import DeleteAllProducts from "../components/DeleteAllProducts.vue";
import { onMounted, ref } from "vue";

import { useMyProducts } from "@/modules/myProducts/composables/useMyProducts";
import { useMyProductsStore } from "../stores/myProducts";

const products = useMyProducts();
const myProductsStore = useMyProductsStore();

const showModal = ref(false);
const modalComponent = ref("");

const product = ref({
  name: "",
  price: "",
  amount: "1",
});

function openModal(component: string) {
  modalComponent.value = component;
  showModal.value = true;
}

function closeModal() {
  if (modalComponent.value === "addNewProduct") {
    product.value.name = "";
    product.value.price = "";
  }
  showModal.value = false;
}

function addNewProduct() {
  myProductsStore.addNewProduct(product.value);
  closeModal();
}

function deleteAllProducts() {
  myProductsStore.deleteAllProducts();
  closeModal();
}
</script>

<style scoped>
.action-container {
  display: flex;

  gap: 20px;
}

.content {
  display: grid;
  padding: 24px 0;
  grid-auto-flow: row;
  gap: 1.5rem;

  @media (min-width: 547px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1120px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
