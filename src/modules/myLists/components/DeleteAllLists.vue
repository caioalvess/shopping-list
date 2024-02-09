<template>
  <p>Are you sure you want to delete all lists?</p>

  <div class="action-container">
    <button class="btn btn-primary" @click="handleConfirm" type="submit">
      Confirm
    </button>
    <button class="btn btn-negative" @click="handleCancel" type="button">
      Cancel
    </button>
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

<style scoped>
.wrapper {
  height: 100%;

  flex: 1;
  display: flex;
  flex-direction: column;
}

p {
  margin-bottom: 20px;
}
.action-container {
  height: 100%;

  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
</style>
