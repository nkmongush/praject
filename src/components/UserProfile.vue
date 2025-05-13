<template>
  <div class="page-container">
    <div class="user-profile">
      <h2>Профиль пользователя</h2>
      <div v-if="user">
        <p><strong>Имя:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Имя пользователя:</strong> {{ user.username }}</p>

        <h3>Ваши заказы</h3>
        <div v-if="orders.length > 0" class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <p><strong>Дата:</strong> {{ order.date }}</p>
            <p><strong>Итого:</strong> ${{ order.total.toFixed(2) }}</p>
            <ul>
              <li v-for="(item, idx) in order.items" :key="idx">
                {{ item.name }} - {{ item.quantity }} × ${{ item.price }}
              </li>
            </ul>
          </div>
        </div>
        <p v-else>Заказы отсутствуют.</p>
      </div>
      <div v-else>
        <p>Пользователь не найден.</p>
      </div>
    </div>
    <footer class="site-footer">
      © 2025 Магазин LevelUP. Все права защищены.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const username = ref(route.params.username);

const user = ref(null);
const orders = ref([]);

onMounted(() => {
  // Получаем пользователя
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData.username === username.value) {
        user.value = userData;
      }
    } catch (error) {
      console.error("Ошибка при парсинге данных пользователя:", error);
    }
  }

  // Получаем заказы из localStorage
  const storedOrders = localStorage.getItem('orders');
  if (storedOrders) {
    try {
      const allOrders = JSON.parse(storedOrders);
      // Фильтруем заказы текущего пользователя
      orders.value = allOrders.filter(order => order.username === username.value);
    } catch (error) {
      console.error("Ошибка при парсинге заказов:", error);
    }
  }
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.user-profile {
  flex-grow: 1;
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  padding: 30px 28px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(103, 58, 183, 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.user-profile h2,
.user-profile h3 {
  text-align: center;
  color: #673ab7;
  margin-bottom: 20px;
  font-weight: 700;
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

.orders-list {
  margin-top: 20px;
}

.order-card {
  background: #f6f6f6;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(103, 58, 183, 0.1);
}

.order-card p {
  margin: 6px 0;
  font-weight: 600;
  color: #555;
}

.order-card ul {
  list-style: disc inside;
  margin-top: 10px;
  color: #444;
}

.order-card ul li {
  margin-bottom: 4px;
}

.site-footer {
  background-color: #673ab7;
  color: white;
  text-align: center;
  padding: 15px 10px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: auto;
  user-select: none;
}
</style>
