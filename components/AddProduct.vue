<template>
  <div class="page-container">
    <div class="add-product-form">
      <h2>Добавить новый товар</h2>
      <form @submit.prevent="addProduct">
        <div class="form-group">
          <label for="name">Название товара:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="price">Цена:</label>
          <input type="number" id="price" v-model="price" required />
        </div>
        <div class="form-group">
          <label for="description">Описание:</label>
          <textarea id="description" v-model="description"></textarea>
        </div>
        <button type="submit">Добавить товар</button>
      </form>
    </div>
    <footer class="site-footer">
      © 2025 Магазин LevelUP. Все права защищены.
    </footer>
  </div>
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

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.add-product-form {
  flex-grow: 1;
  max-width: 600px;
  margin: 40px auto;
  padding: 30px 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(103, 58, 183, 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
}

.add-product-form h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #673ab7;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #444;
}

.form-group input,
.form-group textarea {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #673ab7;
  outline: none;
}

button[type="submit"] {
  background-color: #673ab7;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 12px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(103, 58, 183, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
  align-self: center;
  width: 180px;
}

button[type="submit"]:hover {
  background-color: #532ea1;
  box-shadow: 0 8px 20px rgba(81, 45, 168, 0.6);
}

.site-footer {
  background-color: #673ab7;
  color: white;
  text-align: center;
  padding: 15px 10px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: auto; /* прижимает футер к низу */
  user-select: none;
}
</style>
