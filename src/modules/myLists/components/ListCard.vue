<template>
  <div class="container">
    <h2 @click="openModal('updateList')">
      {{ title }}
    </h2>
    <p>Created at {{ createdAt }}</p>
    <div class="action-container">
      <button
        class="btn btn-positive"
        @click="setRouterProducts(id)"
        type="button"
      >
        Enter
      </button>
      <button
        class="btn btn-negative"
        @click="openModal('deleteListById')"
        type="button"
      >
        Delete
      </button>
    </div>
  </div>
  <Modal
    :title="
      modalComponent === 'deleteListById'
        ? `Delete list ${title}`
        : `Update list ${title}`
    "
    :show="showModal"
  >
    <DeleteListById
      v-if="modalComponent === 'deleteListById'"
      @confirm="deleteListById(id)"
      @cancel="closeModal"
      :listName="title"
    />

    <UpdateList
      v-else
      :defaultTitle="title"
      v-model:title="newListTitle"
      @submit="updateList(id)"
      @cancel="closeModal"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import DeleteListById from "./DeleteListById.vue";
import UpdateList from "./UpdateList.vue";
import { useMyListsStore } from "@/modules/myLists/stores/myLists";
import { useMyProductsStore } from "@/modules/myProducts/stores/myProducts";
import { useRoute, useRouter } from "vue-router";
import type { MyProductsProps } from "@/modules/myProducts/types/myProductsType";

const { id, title, createdAt } = defineProps<{
  id: string;
  title: string;
  createdAt: string;
}>();
const router = useRouter();

const myListsStore = useMyListsStore();
const myProductsStore = useMyProductsStore();

const showModal = ref(false);
const modalComponent = ref("");
const newListTitle = ref("");

function openModal(component: string) {
  modalComponent.value = component;
  return (showModal.value = true);
}

function closeModal() {
  return (showModal.value = false);
}

function deleteListById(id: string) {
  myListsStore.deleteListById(id);
  return closeModal();
}

function updateList(id: string) {
  const data = {
    id,
    newListTitle: newListTitle.value,
  };
  myListsStore.updateList(data);
  return closeModal();
}

function setRouterProducts(id: string) {
  if (localStorage.getItem("myProducts")) {
    const localStorageProducts = JSON.parse(
      localStorage.getItem("myProducts") || "[]"
    );

    const productsByListId = localStorageProducts.filter(
      (res: MyProductsProps) => res.listId === id
    );
    myProductsStore.myProducts = productsByListId;
  }

  myProductsStore.listId = id;
  router.push({ name: "myProducts", params: { id, name: title } });
}
</script>

<style scoped>
p {
  text-align: left;
}
.action-container {
  display: flex;
  gap: 20px;
}
</style>
