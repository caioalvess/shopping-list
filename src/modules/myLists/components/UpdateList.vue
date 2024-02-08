<template>
  <div class="wrapper">
    <p>Do you want to edit this list? Continue changing the values.</p>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="listName">List Name</label>
        <input required type="text" id="listName" v-model="title" />
        <div>
          <div class="action-container">
            <button type="submit">Submit</button>
            <button @click="handleCancel" type="button">Cancel</button>
          </div>
        </div>
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

label {
  display: block;

  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
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
