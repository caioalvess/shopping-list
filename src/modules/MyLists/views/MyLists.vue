<template>
  <div class="container mx-auto">
    <Title>My Lists</Title>
    <div class="flex gap-4">
      <button
        v-on:click="setShowModal"
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Create new list <PlusIcon class="w-5" />
      </button>
      <button
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Delete all <TrashIcon class="w-5" />
      </button>
    </div>
    <div
      class="my-6 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ListCard
        v-for="list in listsStore.lists"
        :key="list.id"
        :id="list.id"
        :title="list.title"
        :createdAt="list.createdAt"
      />
    </div>
    <Modal title="Add New List" :show="showModal">
      <AddNewListForm />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/Title.vue";
import ListCard from "@/modules/MyLists/components/ListCard.vue";
import AddNewListForm from "@/modules/MyLists/components/AddNewListForm.vue";
import Modal from "@/components/Modal.vue";

import { useMyListsStore } from "@/modules/MyLists/store/myLists";

import { PlusIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const listsStore = useMyListsStore();

const showModal = ref(false);
function setShowModal() {
  return (showModal.value = !showModal.value);
}
</script>
