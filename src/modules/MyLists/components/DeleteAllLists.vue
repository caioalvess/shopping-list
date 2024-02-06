<template>
  <div class="h-full flex-1 flex flex-col">
    <p class="mb-5">Are you sure you want to delete all lists?</p>

    <div class="h-full flex-1 flex items-end gap-4 py-6">
      <button
        @click="handleConfirm"
        type="submit"
        class="h-10 min-w-24 flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Confirm
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
</template>

<script setup lang="ts">
const emit = defineEmits(["confirm", "cancel"]);

function handleConfirm() {
  return emit("confirm");
}

function handleCancel() {
  return emit("cancel");
}
</script>
