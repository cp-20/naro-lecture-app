<script setup lang="ts">
import ItemListInput from '@/components/ItemList/ItemListInput.vue';
import ItemListItem from '@/components/ItemList/ItemListItem.vue';
import { ref } from 'vue';

export type Item = {
  name: string;
  price: number;
}

const items = ref<Item[]>([
  { name: '鉛筆', price: 300 },
  { name: 'ノート', price: 400 },
  { name: '消しゴム', price: 500 },
]);

const addItem = (item: Item) => {
  items.value.push(item);
}

</script>

<template>
  <div>
    <ItemListItem v-for="(item, i) in items" :key="i" :item="item" />
    <ItemListInput :add-item="addItem" />
  </div>
</template>

<style scoped></style>