<template>
  <div id="app">
    <header>
      <img :src="logoUrl" alt="Логотип LevelUP" class="logo-image">
      <h1 class="logo"></h1>
      <nav>
        <router-link to="/">Товары</router-link> |
        <router-link to="/cart">Корзина ({{ cartItems.length }})</router-link> |
        <router-link to="/about">О нас</router-link> |
        <div class="auth-links">
          <router-link v-if="!isLoggedIn" to="/login">Вход</router-link>
          <router-link v-if="!isLoggedIn" to="/register">Регистрация</router-link>
          <template v-else>
            <router-link :to="{ name: 'user-profile', params: { username: user?.username } }">Профиль</router-link> |
            <button @click="logout">Выйти</button>
          </template>
        </div>
      </nav>
    </header>
    <main>
      <router-view v-bind="$attrs" @add-to-cart="addToCart" />
    </main>
    <footer class="site-footer">
      <div class="footer-columns">
        <div class="footer-col">
          <h3>Магазин LevelUP</h3>
          <p>Лучшие игровые товары и комплектующие</p>
        </div>
        
        <div class="footer-col">
          <h3>Покупателям</h3>
          <ul>
            <li><router-link to="/about">О нас</router-link></li>
            <li><router-link to="/">Каталог товаров</router-link></li>
            <li><router-link to="/cart">Корзина</router-link></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h3>Контакты</h3>
          <p>Email: info@levelup.com</p>
          <p>Телефон: +7 (995) 598-24-49</p>
          <div class="footer-socials">
            <a href="#" title="ВКонтакте"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vk.svg" alt="VK" width="24" /></a>
            <a href="#" title="Telegram"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram" width="24" /></a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-copyright">
          &copy; 2025 Магазин LevelUP. Все права защищены.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue';
import { useRouter } from 'vue-router';
import logo from './assets/logo.png'; 
const cartItems = ref([]);
const isLoggedIn = ref(localStorage.getItem('user') !== null);
const router = useRouter();

provide('isLoggedIn', isLoggedIn);
provide('cartItems', cartItems);

const user = computed(() => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
});

const addToCart = (product) => {
  console.log("App.vue - addToCart called with product:", product);
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
  console.log("App.vue - cartItems after adding:", cartItems.value);
};

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
};

const increaseQuantity = (index) => {
  if (cartItems.value[index].quantity) {
    cartItems.value[index].quantity++;
  }
};

const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
  }
};

const clearCart = () => {
  cartItems.value = [];
};

const logout = () => {
  console.log("App.vue - logout called");
  localStorage.removeItem('user');
  console.log("App.vue - user removed from localStorage");
  isLoggedIn.value = false;
  console.log("App.vue - isLoggedIn set to false");
  router.push('/login');
  console.log("App.vue - redirected to /login");
};

const onLoginSuccess = () => {
  isLoggedIn.value = true
}

const logoUrl = logo; // Use the imported logo
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  background-color: #673ab7; /* Фиолетовый */
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Стилизация навигации и выравнивание */
header nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Ссылки-меню как кнопки */
header nav a,
header .auth-links a {
  display: inline-block;
  padding: 15px 39px;
  margin: 0 4px;
  background-color: #ff9800;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s;
  user-select: none;
  border: none;
}

header nav a:hover,
header .auth-links a:hover {
  background-color: #e68900;
  box-shadow: 0 6px 12px rgba(230, 137, 0, 0.4);
  transform: translateY(-2px) scale(1.05);
}

header nav a.router-link-exact-active {
  background-color: #cc7a00;
  box-shadow: 0 6px 12px rgba(204, 122, 0, 0.7);
}

/* Кнопка "Выйти" как ссылка-меню */
header .auth-links button {
  background-color: #ff9800;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s;
  user-select: none;
  margin-left: 4px;
}

header .auth-links button:hover {
  background-color: #e68900;
  box-shadow: 0 6px 12px rgba(230, 137, 0, 0.4);
  transform: translateY(-2px) scale(1.05);
}

main {
  padding: 1rem;
}

.site-footer {
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
  color: white;
  padding: 2rem 1.5rem;
  margin-top: auto;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-col {
  padding: 0 1rem;
}

.footer-col h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #fff;
}

.footer-col p {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 0.5rem;
}

.footer-col a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-col a:hover {
  color: #ff8c00;
}

.footer-socials {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.footer-socials a {
  display: inline-block;
  transition: transform 0.3s;
}

.footer-socials a:hover {
  transform: translateY(-2px);
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-copyright {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }
  
  .footer-col {
    text-align: center;
  }
  
  .footer-socials {
    justify-content: center;
  }
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 10px;
}

.logo-image {
  width: 1000px;
  height: auto;
  margin-right: 10px;
}
.pattern-background {
  background-image: url('./assets/pattern.png');
  background-repeat: repeat;
  background-size: auto;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
}
</style>