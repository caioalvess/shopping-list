<template>
  <p>Choose a name for your list and start adding products!</p>
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label for="listName">List Name*</label>
      <div>
        <input
          class="nes-input"
          required
          type="text"
          id="listName"
          v-model="name"
          placeholder="Lista de compras prezunic"
        />
      </div>
    </div>
    <div>
      <div class="action-container">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-negative" @click="handleCancel" type="button">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(["submit", "cancel"]);

const name = defineModel<string>("name");

function handleSubmit() {
  return emit("submit");
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
