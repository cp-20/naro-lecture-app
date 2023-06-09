<script setup lang="ts">
import TodoListInput from '@/components/TodoList/TodoListInput.vue';
import TodoListItem from '@/components/TodoList/TodoListItem.vue';
import { getInitialItems } from '@/components/TodoList/getInitialItems';
import { computed, ref, watch } from 'vue';

export type Item = {
  id: number;
  name: string;
  done: boolean;
}

const items = ref<Item[]>(getInitialItems());

type Tab = 'all' | 'done' | 'undone';

const activeTab = ref<Tab>('all');
const tabName: Record<Tab, string> = {
  all: 'すべて',
  done: '完了済み',
  undone: '未完了'
}

const switchTab = (tabName: Tab) => {
  activeTab.value = tabName;
}

const currentItems = computed(() => items.value.filter((item) => activeTab.value === 'all' || (activeTab.value === 'done') === item.done));

watch(items, () => {
  localStorage.setItem('todo-items', JSON.stringify(items.value));
}, {
  deep: true
})
</script>

<template>
  <div>
    <div class="tabs">
      <button v-for="tab in Object.entries(tabName) " class="tab" :class="{ active: tab[0] === activeTab }" :key="tab[0]"
        @click="() => switchTab(tab[0] as Tab)">
        {{ tab[1] }}
      </button>
    </div>
    <TodoListItem v-for="item in currentItems" :key="item.id" :item="item"
      :switch-state="(state: boolean) => item.done = state" />
    <div class="spacer"></div>
    <TodoListInput
      :add-task="(taskName: string) => items.push({ id: Date.now() + Math.random(), name: taskName, done: false })" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  margin-bottom: 16px;
}

.tab {
  flex: 1;
  padding: 8px 16px;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  border: none;
  border-bottom: solid 2px #ccc;
  background-color: transparent;
  color: #ccc;
}

.tab:hover {
  background-color: rgb(128, 128, 128, 0.2);
}

.tab.active {
  border-bottom-color: #42b983;
  color: #42b983;
}

.spacer {
  height: 32px;
}
</style>