<template>
  <div class="border-solid border-2 rounded border-gray-800 p-4 flex flex-col">
    <h3 class="text-xl font-medium mb-3">{{ props.title }}</h3>
    <p class="font-normal text-gray-800">Created at {{ props.createdAt }}</p>
    <div class="h-full flex justify-between items-end mt-4">
      <button
        type="button"
        class="h-10 w-24 flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Enter
      </button>
      <button
        v-on:click="setShowModal(true)"
        type="button"
        class="h-10 w-24 flex justify-center items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Delete
      </button>
    </div>
  </div>
  <Modal :title="`Delete list ${props.title}`" :show="showModal">
    <DeleteListById />
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import DeleteListById from "./DeleteListById.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

const showModal = ref(false);

function setShowModal(show: boolean) {
  return (showModal.value = show);
}
</script>
