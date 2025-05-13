<template>
  <div class="page-container">
    <div class="login-form">
      <h2>Вход</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Войти</button>
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

const username = ref('');
const password = ref('');

const login = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (username.value === user.username && password.value === user.password) {
      alert('Вход выполнен успешно!');
      isLoggedIn.value = true;
      router.push({ name: 'home' });
    } else {
      alert('Неверные учетные данные.');
    }
  } else {
    alert('Пользователь не найден. Зарегистрируйтесь!');
    router.push({ name: 'register' });
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.login-form {
  flex-grow: 1;
  max-width: 400px;
  margin: 200px auto;
  padding: 30px 200px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(103, 58, 183, 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
}

.login-form h2 {
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

.form-group input {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
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
