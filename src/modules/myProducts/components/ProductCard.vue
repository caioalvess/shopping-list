<template>
  <div class="container">
    <div class="title" @click="openModal('updateProduct')">{{ name }}</div>
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
      v-if="modalComponent === 'deleteProductById'"
      v-model:productName="productName"
      @confirm="deleteProductById(id)"
      @cancel="closeModal"
    />

    <UpdateProduct
      v-else
      :defaultName="name"
      :defaultPrice="price"
      :defaultAmount="amount"
      v-model:name="newProductName"
      v-model:price="newProductPrice"
      v-model:amount="newProductAmount"
      @confirm="updateProduct(id)"
      @cancel="closeModal"
    />
  </Modal>
</template>

<script setup lang="ts">
import type { MyProductsProps } from "@/modules/myProducts/types/myProductsType";
import { useMyProductsStore } from "../stores/myProducts";
import { ref } from "vue";
import DeleteAllProducts from "./DeleteAllProducts.vue";
import Modal from "@/components/Modal.vue";
import DeleteProductById from "./DeleteProductById.vue";
import UpdateProduct from "./UpdateProduct.vue";

const { id, name, checked, price, amount, total } =
  defineProps<MyProductsProps>();

const myProductsStore = useMyProductsStore();

const productName = ref(name);

const newProductName = ref("");
const newProductPrice = ref("");
const newProductAmount = ref("");

const showModal = ref(false);
const modalComponent = ref("");

function deleteProductById(id: string) {
  myProductsStore.deleteProductById(id);
  closeModal();
}

function updateProduct(id: string) {
  const data = {
    id,
    name: newProductName.value,
    price: newProductPrice.value,
    amount: newProductAmount.value,
  };

  myProductsStore.updateProduct(data);
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
