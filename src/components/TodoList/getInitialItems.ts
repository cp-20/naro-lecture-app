import type { Item } from "@/components/TodoList/TodoList.vue";

export const getInitialItems = (): Item[] => {
  const defaultItems: Item[] = [{
    id: 1,
    name: '牛乳を買う',
    done: true
  }, {
    id: 2,

    name: 'Vue 3の勉強をする',
    done: false
  }, {
    id: 3,
    name: '髪を切る',
    done: false
  }]
  
  const localStorageItems = localStorage.getItem('todo-items');
  
  const initialItems = localStorageItems ? JSON.parse(localStorageItems) : defaultItems;
  
  return initialItems;
}