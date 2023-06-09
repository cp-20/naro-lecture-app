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

export type Tab = 'all' | 'done' | 'undone';

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
      <div class="active-tab-border"></div>
    </div>
    <TodoListItem v-for="item in currentItems" :key="item.id" :item="item"
      :switch-state="(state: boolean) => item.done = state" :delete-item="() => items.splice(items.indexOf(item), 1)"
      :active-tab="activeTab" />
    <div class="spacer"></div>
    <TodoListInput
      :add-task="(taskName: string) => items.push({ id: Date.now() + Math.random(), name: taskName, done: false })"
      :items="items" />
  </div>
</template>

<style scoped>
.tabs {
  position: relative;
  display: flex;
  margin-bottom: 16px;
}

.active-tab-border {
  content: '';
  position: absolute;
  width: 33.33%;
  display: block;
  height: 100%;
  border-bottom: solid 2px #42b983;
  transition: all .1s cubic-bezier(0.075, 0.82, 0.165, 1);
  background-color: hsla(153, 47%, 49%, .15);
  border-radius: 4px 4px 0 0;
}

.tab:nth-of-type(1).active~.active-tab-border {
  transform: translate(0, 0);
}

.tab:nth-of-type(2).active~.active-tab-border {
  transform: translate(100%, 0);
}

.tab:nth-of-type(3).active~.active-tab-border {
  transform: translate(200%, 0);
}

.tab {
  flex: 1;
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-bottom: solid 2px #ccc;
  background-color: transparent;
  color: #ccc;
}

.tab.active {
  color: #42b983;
}

.spacer {
  height: 32px;
}
</style>