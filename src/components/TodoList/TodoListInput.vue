<script setup lang="ts">
import type { Item } from '@/components/TodoList/TodoList.vue';
import { ref } from 'vue';

const props = defineProps<{
  items: Item[];
  addTask: (taskName: string) => void;
}>()

const taskName = ref<string>('');
const error = ref<string>('');

const validate = () => {
  if (taskName.value === '') {
    error.value = 'タスク名を入力してください';
    return false;
  }

  if (props.items.some(item => item.name === taskName.value)) {
    error.value = 'そのタスクは既に存在しています';
    return false;
  }

  error.value = '';
  return true
}


const submitHandler = () => {
  if (!validate()) return;
  props.addTask(taskName.value);
  taskName.value = '';
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div class="container">
      <input class="task-name-input" :class="{ error: Boolean(error) }" type="text" v-model="taskName"
        placeholder="ここにタスク名を入力" @change="() => validate()">
      <button class="submit-button" type="submit">追加</button>
    </div>
    <div class="validation-message" v-if="Boolean(error)">
      {{ error }}
    </div>
  </form>
</template>

<style scoped>
.container {
  display: flex;
  gap: 16px;
}

.task-name-input {
  flex: 1;
  width: 100%;
  padding: 8px 16px;
  border: 1px solid rgb(55, 58, 64);
  outline: none;
  background-color: transparent;
  border-radius: 2px;
  font-size: 16px;
  box-sizing: border-box;
  transition: all .2s;
  color: #ccc;
}

.task-name-input:focus {
  border-color: hsl(153, 47%, 40%);
}

.task-name-input.error {
  border-color: hsl(0, 47%, 50%);
}

.submit-button {
  padding: 8px 16px;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: hsl(153, 47%, 40%);
  color: #eee;
  cursor: pointer;
}

.submit-button:hover {
  background-color: hsl(153, 47%, 35%);
}

.submit-button:active {
  background-color: hsl(153, 47%, 30%);
  transform: translateY(1px);
}

.validation-message {
  color: hsl(0, 47%, 50%);
}
</style>