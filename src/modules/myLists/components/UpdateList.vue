<template>
  <div class="h-full flex-1 flex flex-col">
    <p class="mb-5">
      Do you want to edit this list? Continue changing the values.
    </p>
    <form class="h-full flex flex-col relative" @submit.prevent="handleSubmit">
      <div>
        <label
          for="listName"
          class="block mb-2 text-sm font-medium text-gray-900"
          >List Name</label
        >
        <input
          required
          type="text"
          id="listName"
          v-model="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Lista de compras prezunic"
        />
        <div>
          <div class="h-full flex-1 flex items-end gap-4 py-6">
            <button
              type="submit"
              class="h-10 min-w-24 flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Submit
            </button>
            <button
              @click="handleCancel"
              type="button"
              class="h-10 min-w-24 flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const emit = defineEmits(["submit", "cancel"]);
const { defaultTitle } = defineProps<{ defaultTitle: string }>();

const title = defineModel<string>("title");

function handleSubmit() {
  return emit("submit");
}

function handleCancel() {
  return emit("cancel");
}

onMounted(() => {
  title.value = defaultTitle;
});
</script>
