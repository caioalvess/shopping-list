<template>
  <div>
    <p>Do you want to edit this list? Continue changing the values.</p>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="listName">List Name</label>
        <div>
          <input required type="text" id="listName" v-model="title" />
        </div>
      </div>
      <div class="action-container">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-negative" @click="handleCancel" type="button">
          Cancel
        </button>
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

<style scoped>
.action-container {
  height: 100%;

  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
</style>
