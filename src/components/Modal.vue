<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="w-full h-screen bg-black bg-opacity-30 absolute top-0 right-0 flex justify-center items-center"
    >
      <div
        class="flex flex-col w-full h-screen sm:w-8/12 md:w-6/12 sm:h-auto lg:w-5/12 sm:border-2 border-none sm:border-solid sm:border-gray-700 bg-white rounded px-6"
      >
        <Subtitle>{{ title }}</Subtitle>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Subtitle from "./Subtitle.vue";

const { title, show } = defineProps<{
  title: string;
  show: boolean;
}>();
</script>
