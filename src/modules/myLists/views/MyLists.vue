<template>
  <div class="container mx-auto">
    <Title>My Lists</Title>
    <div class="flex gap-4">
      <button
        @click="openModal('addNewListForm')"
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Create new list
      </button>
      <button
        @click="openModal('deleteAllLists')"
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Delete all
      </button>
    </div>
    <div
      class="my-6 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
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
@/modules/myLists/stores/myLists
