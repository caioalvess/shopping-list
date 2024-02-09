<template>
  <div class="container">
    <div class="title">{{ name }}</div>
    <div class="content">
      <p>
        Price: <span>R$ {{ Number(price).toFixed(2) }}</span>
      </p>
      <p>
        Amount: <span>{{ amount }}</span>
      </p>
      <p>
        Total: <span>R$ {{ total }}</span>
      </p>
    </div>

    <div>
      <div class="action-container">
        <button
          :class="`btn ${!checked ? 'btn-default' : 'btn-positive'}`"
          type="button"
          @click="myProductsStore.checkProduct(id)"
        >
          Check
        </button>
        <button
          class="btn btn-negative"
          type="button"
          @click="openModal('deleteProductById')"
        >
          Delete
        </button>
      </div>
    </div>
  </div>

  <Modal :show="showModal" :title="`Delete product ${productName}`">
    <DeleteAllProducts
      v-if="modalComponent === 'deleteAllProducts'"
      @confirm="myProductsStore.deleteAllProducts"
      @cancel="closeModal"
    />

    <DeleteProductById
      v-else
      v-model:productName="productName"
      @confirm="deleteProductById(id)"
      @cancel="closeModal"
    />
  </Modal>
</template>

<script setup lang="ts">
import type { MyProductsProps } from "@/modules/myProducts/types/myProductsType";
import { useMyProducts } from "../composables/useMyProducts";
import { useMyProductsStore } from "../stores/myProducts";
import { ref } from "vue";
import DeleteAllProducts from "./DeleteAllProducts.vue";
import Modal from "@/components/Modal.vue";
import DeleteProductById from "./DeleteProductById.vue";

const { id, name, listId, checked, price, amount, total } =
  defineProps<MyProductsProps>();

const products = useMyProducts();
const myProductsStore = useMyProductsStore();

const productName = ref(name);

const showModal = ref(false);
const modalComponent = ref("");

function deleteProductById(id: string) {
  myProductsStore.deleteProductById(id);
  closeModal();
}

function openModal(component: string) {
  modalComponent.value = component;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<style scoped lang="scss">
.content {
  margin-top: 30px;
}

.action-container {
  height: 100%;

  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

span {
  font-size: 12px;
}
</style>
