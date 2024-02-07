<template>
  <div class="border-solid border-2 rounded border-gray-800 p-4 flex flex-col">
    <h3
      class="text-xl font-medium mb-3 cursor-pointer"
      @click="openModal('updateList')"
    >
      {{ title }}
    </h3>
    <p class="font-normal text-gray-800">Created at {{ createdAt }}</p>
    <div class="h-full flex justify-between items-end mt-4">
      <button
        @click="$router.push(`/myProducts/${id}`)"
        type="button"
        class="h-10 w-24 flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Enter
      </button>
      <button
        @click="openModal('deleteListById')"
        type="button"
        class="h-10 w-24 flex justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
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
@/modules/myLists/stores/myLists
