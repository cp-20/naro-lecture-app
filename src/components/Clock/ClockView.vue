<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const formatTime = (date: Date) => {
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

const intervalRef = ref<number | null>(null);
const timeString = ref(formatTime(new Date()));

onMounted(() => {
  intervalRef.value = window.setInterval(() => {
    timeString.value = formatTime(new Date());
  }, 1000);
});

onUnmounted(() => {
  if (intervalRef.value) {
    window.clearInterval(intervalRef.value);
  }
});
</script>

<template>
  <div>
    <p>{{ timeString }}</p>
  </div>
</template>