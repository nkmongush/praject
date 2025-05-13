<template>
  <div class="user-profile">
    <h2>Профиль пользователя</h2>
    <div v-if="user">
      <p><strong>Имя:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Имя пользователя:</strong> {{ user.username }}</p>
    </div>
    <div v-else>
      <p>Пользователь не найден.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const username = ref(route.params.username);

const user = ref(null);

onMounted(() => {
  // Получаем данные пользователя из localStorage
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
        console.log("userData.username:",userData.username, "username:",username)
      if (userData.username === username.value) {
        // Если имя пользователя совпадает, показываем данные
        user.value = userData;
      }
    } catch (error) {
      console.error("Ошибка при парсинге данных пользователя:", error);
    }
  }
});
</script>

<style scoped>
.user-profile {
  max-width: 480px;
  margin: 40px auto;
  background: #fff;
  padding: 30px 28px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(103, 58, 183, 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.user-profile h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  color: #673ab7;
  letter-spacing: 1.2px;
}

.user-profile p {
  font-size: 1rem;
  margin-bottom: 16px;
  color: #444;
}

.user-profile p strong {
  color: #673ab7;
  font-weight: 600;
  width: 140px;
  display: inline-block;
}

.user-profile div[ v-cloak ] {
  display: none;
}

.user-profile > div:last-child p {
  text-align: center;
  font-style: italic;
  color: #777;
  margin-top: 20px;
}

</style>