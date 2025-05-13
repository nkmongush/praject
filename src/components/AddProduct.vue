<template>
  <h2>Добавить новый товар</h2>
  <form @submit.prevent="addProduct">
    <div>
      <label for="name">Название товара:</label>
      <input type="text" id="name" v-model="name" required>
    </div>
    <div>
      <label for="price">Цена:</label>
      <input type="number" id="price" v-model="price" required>
    </div>
    <div>
      <label for="description">Описание:</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <button type="submit">Добавить товар</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const price = ref(0);
const description = ref('');

const emit = defineEmits(['product-added']);

const addProduct = () => {
  const newProduct = {
    name: name.value,
    price: price.value,
    description: description.value
  };
  emit('product-added', newProduct);
  name.value = '';
  price.value = 0;
  description.value = '';
};
</script>