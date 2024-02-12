<template>
  <div class="wrapper">
    <nav>
      <div @click="$router.back">
        <img
          src="../../../../public/left-arrow.svg"
          alt="Voltar para o início"
          width="40px"
        />
      </div>
      <Title>{{ $route.params.name }}</Title>
    </nav>

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

    <ProductInfos
      :totalValue="myProductsStore.totalValue"
      :remainingProducts="myProductsStore.remainingProducts"
      :amount="myProductsStore.amount"
    />

    <div v-if="myProductsStore.myProducts.length" class="field input-box">
      <label for="searchProduct">Search</label>
      <div class="filter-box">
        <div class="input">
          <input
            id="searchProduct"
            type="text"
            placeholder="1kg Feijão"
            v-model="inputSearch"
          />
        </div>
        <button class="btn btn-warning" @click="clearSearchInput">X</button>
      </div>
    </div>

    <p v-if="!myProductsStore.myProducts.length">
      Your product list is still empty...
    </p>

    <div v-else class="content">
      <ProductCard
        v-for="product in myProductsStore.searchFilterProducts"
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
import { ref, watchEffect } from "vue";
import { useMyProductsStore } from "../stores/myProducts";
import ProductInfos from "@/modules/myProducts/components/ProductInfos.vue";

const myProductsStore = useMyProductsStore();

const showModal = ref(false);
const modalComponent = ref("");

const product = ref({
  name: "",
  price: "",
  amount: "1",
});

const inputSearch = ref("");

watchEffect(() => {
  myProductsStore.inputFilterProducts = inputSearch.value;
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

function clearSearchInput() {
  inputSearch.value = "";
}
</script>

<style scoped lang="scss">
nav {
  display: flex;
  align-items: center;

  gap: 20px;
}
.action-container {
  display: flex;

  gap: 20px;
}

.input-box {
  margin-top: 20px;

  .filter-box {
    display: flex;
    align-items: center;
    gap: 9px;

    button {
      height: 31px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

p {
  margin-top: 50px;
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
