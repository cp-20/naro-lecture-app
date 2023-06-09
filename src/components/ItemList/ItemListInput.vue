<script setup lang="ts">
import type { Item } from '@/components/ItemList/ItemList.vue';
import { ref } from 'vue';

const props = defineProps<{
  addItem: (item: Item) => void;
}>();

const name = ref('');
const price = ref(0);
const error = ref({ status: false, message: '' });

const submitHandler = () => {
  if (name.value === '') {
    error.value = { status: true, message: '商品名を入力してください' };
    return
  };

  if (price.value <= 0) {
    error.value = { status: true, message: '価格は正の値である必要があります' };
    return
  };

  error.value = { status: false, message: '' };

  props.addItem({ name: name.value, price: price.value });
  name.value = '';
  price.value = 0;
}
</script>

<template>
  <div class="item">
    <form @submit.prevent="submitHandler">
      <div class="container">

        <input type="text" placeholder="商品名" v-model="name" />
        <input type="number" placeholder="価格" v-model="price" />
        <button type="submit">追加</button>
      </div>
      <div v-if="error.status" class="error">
        <p>{{ error.message }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

input {
  background: transparent;
  border: solid 1px transparent;
  border-bottom: solid 1px #eee;
  color: black;
  padding: 8px 16px;
  outline: none;
  transition: all .1s;
}

input:focus {
  border-bottom-color: #42b983;
}

@media (prefers-color-scheme: dark) {
  input {
    color: #eee;
  }
}

.error {
  color: red;
}
</style>
