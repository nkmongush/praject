<template>
  <div class="page-container">
    <div class="register-form">
      <h2>Регистрация</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Имя:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
    <footer class="site-footer">
      © 2025 Магазин LevelUP. Все права защищены.
    </footer>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = inject('isLoggedIn');

const name = ref('');
const email = ref('');
const username = ref('');
const password = ref('');

const register = () => {
  const userData = {
    name: name.value,
    email: email.value,
    username: username.value,
    password: password.value
  };

  localStorage.setItem('user', JSON.stringify(userData));

  // Автоматический вход после регистрации
  isLoggedIn.value = true;
  router.push({ name: 'home' });
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.register-form {
  flex-grow: 1;
  max-width: 400px;
  margin: 40px auto;
  background: #fff;
  padding: 30px 35px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(103, 58, 183, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.register-form:hover {
  box-shadow: 0 18px 40px rgba(103, 58, 183, 0.25);
}

.register-form h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  color: #673ab7;
  letter-spacing: 1.2px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
  user-select: none;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

.form-group input:focus {
  border-color: #673ab7;
  box-shadow: 0 0 8px rgba(103, 58, 183, 0.4);
}

button[type="submit"] {
  width: 100%;
  padding: 14px 0;
  background-color: #673ab7;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(103, 58, 183, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  user-select: none;
}

button[type="submit"]:hover {
  background-color: #512da8;
  box-shadow: 0 8px 20px rgba(81, 45, 168, 0.6);
  transform: translateY(-2px);
}

button[type="submit"]:active {
  background-color: #311b92;
  box-shadow: 0 4px 10px rgba(49, 27, 146, 0.7);
  transform: translateY(0);
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
