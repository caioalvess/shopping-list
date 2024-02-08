<template>
  <div class="wrapper">
    <p>Choose a name for your list and start adding products!</p>
    <form @submit.prevent="handleSubmit">
      <div class="nes-field">
        <label for="listName">List Name</label>
        <input
          class="nes-input"
          required
          type="text"
          id="listName"
          v-model="name"
          placeholder="Lista de compras prezunic"
        />
        <div>
          <div class="action-container">
            <button class="nes-btn is-primary" type="submit">Submit</button>
            <button
              class="nes-btn is-error"
              @click="handleCancel"
              type="button"
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

form {
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  position: relative;
}

.action-container {
  height: 100%;

  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 20px;

  padding: 20px 0;
}
</style>
