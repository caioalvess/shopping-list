<template>
  <div>
    <p>Are you sure you want to delete the {{ productName }} product?</p>

    <div class="action-container">
      <button class="btn btn-primary" @click="handleConfirm" type="submit">
        Confirm
      </button>
      <button class="btn btn-negative" @click="handleCancel" type="button">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["confirm", "cancel"]);
const { productName } = defineProps<{ productName: string }>();

function handleConfirm() {
  return emit("confirm");
}

function handleCancel() {
  return emit("cancel");
}
</script>

<style scoped>
p {
  margin-bottom: 20px;
}
.action-container {
  height: 100%;

  display: flex;
  align-items: flex-end;
  gap: 20px;
}
</style>
