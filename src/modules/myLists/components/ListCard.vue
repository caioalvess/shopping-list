<template>
  <div class="nes-container with-title is-centered">
    <h2 class="title" @click="openModal('updateList')">
      {{ title }}
    </h2>
    <p>Created at {{ createdAt }}</p>
    <div class="action-container">
      <button
        class="nes-btn is-success"
        @click="$router.push(`/myProducts/${id}`)"
        type="button"
      >
        Enter
      </button>
      <button
        class="nes-btn is-error"
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

const { id, title, createdAt } = defineProps<{
  id: string;
  title: string;
  createdAt: string;
}>();

const myListsStore = useMyListsStore();

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
</script>

<style scoped>
p {
  text-align: left;
}
.action-container {
  display: flex;
  justify-content: space-between;
}
</style>
