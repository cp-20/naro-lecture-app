<script setup lang="ts">
import ItemList from '@/components/ItemList/ItemList.vue';
import ClickCounter from './ClickCounter.vue'
import TodoList from '@/components/TodoList/TodoList.vue';
import ClockView from '@/components/Clock/ClockView.vue';

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="container">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <ClickCounter /> -->
    <!-- <ItemList /> -->
    <!-- <TodoList /> -->
    <ClockView />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 64px;
}
</style>