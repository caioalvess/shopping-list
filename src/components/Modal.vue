<template>
  <Teleport to="body">
    <div v-if="show" class="modal-wrapper">
      <div class="nes-dialog modal" id="dialog-default">
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

<style scoped>
.modal-wrapper {
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.774);
}

.modal {
  width: 100%;
  height: 100vh;

  padding: 30px 30px;

  background-color: white;
  border-color: black;
  border-style: solid;
  border-width: 4px;
}
</style>
