<template>
  <div class="wrapper">
    <Title>My Lists</Title>
    <div class="action-container">
      <button
        class="btn btn-primary"
        @click="openModal('addNewListForm')"
        type="button"
      >
        Create new
      </button>
      <button
        class="btn btn-negative"
        @click="openModal('deleteAllLists')"
        type="button"
      >
        Delete all
      </button>
    </div>
    <div class="content">
      <ListCard
        v-for="list in myListStore.lists"
        :key="list.id"
        :id="list.id"
        :title="list.title"
        :createdAt="list.createdAt"
      />
    </div>
    <Modal
      :title="
        modalComponent === 'addNewListForm'
          ? 'Add New List'
          : 'Delete all lists'
      "
      :show="showModal"
    >
      <AddNewListForm
        v-if="modalComponent === 'addNewListForm'"
        @submit="addNewList"
        @cancel="closeModal(true)"
        v-model:name="newListName"
      />
      <DeleteAllLists v-else @confirm="deleteAllLists" @cancel="closeModal" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/Title.vue";
import ListCard from "@/modules/myLists/components/ListCard.vue";
import AddNewListForm from "@/modules/myLists/components/AddNewListForm.vue";
import DeleteAllLists from "../components/DeleteAllLists.vue";
import Modal from "@/components/Modal.vue";

import { useMyListsStore } from "@/modules/myLists/stores/myLists";

import { ref } from "vue";

const myListStore = useMyListsStore();

const showModal = ref(false);
const newListName = ref("");
const modalComponent = ref("");

function openModal(component: string) {
  modalComponent.value = component;
  return (showModal.value = true);
}

function closeModal(clearValue?: boolean) {
  if (clearValue && newListName.value.length) {
    newListName.value = "";
  }
  return (showModal.value = false);
}

function addNewList() {
  myListStore.addNewList({ name: newListName.value });
  return closeModal(true);
}

function deleteAllLists() {
  myListStore.deleteAllLists();
  return closeModal();
}
</script>

<style scoped>
.action-container {
  display: flex;

  gap: 24px;
}

.content {
  display: grid;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  grid-auto-flow: row;
  gap: 1rem;

  @media (min-width: 547px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1120px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
