<template>
  <div class="h-full flex-1 flex flex-col">
    <form
      class="h-full flex flex-col relative gap-5"
      @submit.prevent="handleSubmit"
    >
      <div>
        <label
          for="productName"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Name</label
        >
        <input
          required
          type="text"
          id="productName"
          v-model="productName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="1kg Feijão"
        />
      </div>

      <div>
        <label
          for="productPrice"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Price</label
        >
        <input
          required
          type="text"
          id="productPrice"
          v-model="productPrice"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="R$ 6,89"
        />
      </div>
      <div>
        <label
          for="productAmount"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Amount</label
        >
        <input
          required
          type="string"
          id="productAmount"
          v-model="productAmount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Lista de compras prezunic"
        />
      </div>
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
    </form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["submit", "cancel"]);

const productName = defineModel<string>("name");
const productPrice = defineModel<string>("price");
const productAmount = defineModel<string>("amount");

function handleSubmit() {
  return emit("submit");
}

function handleCancel() {
  return emit("cancel");
}
</script>
