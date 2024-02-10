import { defineStore } from "pinia";
import { onMounted, ref } from "vue";

import type { myListsProps } from "../types/myListsType";
import type { addNewListProps } from "../types/addNewListType";

import { v4 as uuidv4 } from "uuid";
import type { updateListProps } from "../types/updateListType";

export const useMyListsStore = defineStore("myLists", () => {
  const lists = ref<myListsProps[]>([]);

  function addNewList(data: addNewListProps) {
    const newList = {
      id: uuidv4(),
      title: data.name,
      createdAt: new Date().toDateString(),
    };

    lists.value.push(newList);
    return updateLocalStorage();
  }

  function deleteListById(id: string) {
    lists.value = lists.value.filter((res: myListsProps) => res.id !== id);
    return updateLocalStorage();
  }

  function deleteAllLists() {
    lists.value = [];
    return updateLocalStorage();
  }

  function updateList({ id, newListTitle }: updateListProps) {
    lists.value.forEach((product) => {
      if (product.id === id) {
        product.title = newListTitle;
      }
    });
    return updateLocalStorage();
  }

  function updateLocalStorage() {
    return localStorage.setItem("myLists", JSON.stringify(lists.value));
  }

  onMounted(() => {
    const localStorageLists = JSON.parse(
      localStorage.getItem("myLists") || "[]"
    );
    return lists.value.push(...localStorageLists);
  });

  return {
    lists,
    addNewList,
    deleteListById,
    deleteAllLists,
    updateList,
  };
});
