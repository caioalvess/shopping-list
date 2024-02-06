import { defineStore } from "pinia";
import { onMounted, reactive } from "vue";

import type { myListsProps } from "../types/myListsType";
import type { addNewListProps } from "../types/addNewListType";

import { v4 as uuidv4 } from "uuid";

export const useMyListsStore = defineStore("myLists", () => {
  const lists = reactive<myListsProps[]>([]);

  function addNewList(data: addNewListProps) {
    const newList = {
      id: uuidv4(),
      title: data.name,
      createdAt: new Date().toDateString(),
    };

    lists.push(newList);
    return localStorage.setItem("myLists", JSON.stringify(lists));
  }

  onMounted(() => {
    const localStorageLists = JSON.parse(
      localStorage.getItem("myLists") || "[]"
    );

    return lists.push(...localStorageLists);
  });

  return {
    lists,
    addNewList,
  };
});
