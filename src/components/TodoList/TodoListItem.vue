<script setup lang="ts">
import type { Item } from '@/components/TodoList/TodoList.vue';

defineProps<{ item: Item, switchState: (state: boolean) => void }>();
</script>

<template>
  <label class="todo-item">
    <div class="checkbox">
      <input type="checkbox" :checked="item.done" @change="() => switchState(!item.done)" />
      <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
          fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </div>
    <span class="task-name">{{ item.name }}</span>
  </label>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
}

.todo-item:hover {
  background-color: rgba(128, 128, 128, .1);
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
}

.checkbox>input:checked~svg {
  visibility: visible;
}

.task-name {
  font-size: 16px;
}
</style>
