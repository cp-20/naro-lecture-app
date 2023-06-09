<script setup lang="ts">
import type { Item, Tab } from '@/components/TodoList/TodoList.vue';
import { ref } from 'vue';

const props = defineProps<{
  item: Item;
  activeTab: Tab;
  switchState: (state: boolean) => void;
  deleteItem: () => void;
}>();

const willUnmount = ref(false);

const checkboxHandler = () => {
  if (props.activeTab === 'all') {
    props.switchState(!props.item.done)
    return
  }

  willUnmount.value = true;
  setTimeout(() => {
    props.switchState(!props.item.done)
  }, 300);
}
</script>

<template>
  <label class="todo-item" :class="{ fadeout: willUnmount }">
    <div class="checkbox">
      <input type="checkbox" :checked="item.done" @change="checkboxHandler" />
      <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
          fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </div>
    <span class="task-name">{{ item.name }}</span>
    <button class="delete-button" @click="deleteItem">削除</button>
  </label>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  transition: all .3s ease;
}

.todo-item:hover {
  background-color: rgba(128, 128, 128, .1);
}

.todo-item.fadeout {
  opacity: 0;
  transform: translateX(8px);
}

.checkbox {
  position: relative;
  display: inline-grid;
  place-items: center;
}

.checkbox>input {
  margin-right: 8px;
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: solid 1px #aaa;
  border-radius: 2px;
  transition: all .1s ease;
}

.checkbox>input:checked {
  background-color: #42b983;
  border-color: #42b983;
}

.checkbox>svg {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  color: #eee;
  visibility: hidden;
  transform: translateY(2px);
  opacity: 0;
  transition: all .1s ease;
}

.checkbox>input:checked~svg {
  visibility: visible;
  opacity: 1;
  transform: translateY(0px);
}

.task-name {
  font-size: 16px;
}

.delete-button {
  margin-left: auto;
  padding: 4px 8px;
  border-radius: 2px;
  border: none;
  background-color: transparent;
  color: #aaa;
  cursor: pointer;
}

.delete-button:hover {
  background-color: rgba(128, 128, 128, .2);
}
</style>
