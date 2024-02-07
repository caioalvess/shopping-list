<template>
  <div class="container mx-auto">
    <Title>Lista carrefour</Title>
    <div class="flex gap-4">
      <button
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Add new product
      </button>
      <button
        type="button"
        class="h-10 min-w-24 flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Delete all
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Title from "@/components/Title.vue";
import { useMyProductsStore } from "@/modules/myProducts/stores/myProducts";

const route = useRoute();
const myProductsStore = useMyProductsStore();
</script>
