<script setup lang="ts">
import type { Item } from '@/components/ItemList/ItemList.vue';

defineProps<{ item: Item }>();
</script>

<template>
  <li>
    <p>{{ item.name }}</p>
    <p>{{ item.price }}</p>
  </li>
</template>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}
</style>