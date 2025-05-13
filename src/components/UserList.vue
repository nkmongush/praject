<template>
  <div class="user-list">
    <h2>Список пользователей</h2>
    <div v-if="users.length > 0">
      <div v-for="user in users" :key="user.username" class="user-item">
        <router-link :to="{ name: 'user-profile', params: { username: user.username } }">
          {{ user.name }} ({{ user.username }})
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>Пользователи не найдены.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);

onMounted(() => {
  const allUsers = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === 'user') { 
      try {
        const user = JSON.parse(localStorage.getItem(key));
        allUsers.push(user);
      } catch (error) {
        console.error("Ошибка при парсинге данных пользователя:", error);
      }
    }
  }
  users.value = allUsers;
});
</script>

<style scoped>
.user-list {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(103, 58, 183, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.user-list h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #673ab7;
  font-weight: 700;
  letter-spacing: 1.1px;
}

.user-item {
  background: #f9f9fb;
  margin-bottom: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 6px rgba(103, 58, 183, 0.08);
}

.user-item:last-child {
  margin-bottom: 0;
}

.user-item:hover {
  background-color: #e6e0f8;
  box-shadow: 0 4px 12px rgba(103, 58, 183, 0.15);
}

.user-item a {
  color: #673ab7;
  font-weight: 600;
  text-decoration: none;
  display: block;
}

.user-item a:hover {
  text-decoration: underline;
}

.user-list p {
  text-align: center;
  color: #777;
  font-style: italic;
  margin-top: 20px;
}

</style>