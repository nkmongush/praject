<template>
  <div class="page-container">
    <div class="cart">
      <h2>Корзина</h2>
      <div v-if="cartItems.length > 0">
        <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <p>{{ item.name }} - ${{ item.price }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(index)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
            </div>
          </div>
          <button @click="removeFromCart(item.id)">Удалить</button>
        </div>
        <p>Итого: ${{ totalPrice.toFixed(2) }}</p>
        <button @click="showPaymentForm">Оформить заказ</button>
      </div>
      <div v-else>
        <p>Ваша корзина пуста.</p>
      </div>
      <PaymentForm
        v-if="showPayment"
        :totalPrice="totalPrice"
        @close="closePaymentForm"
        @payment-success="completeOrder"
      />
    </div>
    <footer class="site-footer">
      © 2025 Магазин LevelUP. Все права защищены.
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import PaymentForm from './PaymentForm.vue';

const cartItems = inject('cartItems');
const showPayment = ref(false);

const user = computed(() => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
});

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

const removeFromCart = (itemId) => {
  const index = cartItems.value.findIndex(item => item.id === itemId);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
};

const increaseQuantity = (index) => {
  if (cartItems.value[index]) {
    cartItems.value[index].quantity++;
  }
};

const decreaseQuantity = (index) => {
  if (cartItems.value[index] && cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
  }
};

const showPaymentForm = () => {
  showPayment.value = true;
};

const closePaymentForm = () => {
  showPayment.value = false;
};

const completeOrder = () => {
  alert('Заказ оформлен! Спасибо за покупку.');

  const storedOrders = localStorage.getItem('orders');
  let allOrders = [];
  if (storedOrders) {
    try {
      allOrders = JSON.parse(storedOrders);
    } catch {
      allOrders = [];
    }
  }

  const newOrder = {
    id: Date.now(),
    username: user.value?.username || 'guest',
    items: cartItems.value.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    total: totalPrice.value,
    date: new Date().toLocaleDateString()
  };

  allOrders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(allOrders));
  cartItems.value = [];
  showPayment.value = false;
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.cart {
  flex-grow: 1;
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  padding: 30px 500px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(103, 58, 183, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.cart h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #673ab7;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9fb;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 6px rgba(103, 58, 183, 0.08);
  transition: background-color 0.3s ease;
}

.cart-item:hover {
  background-color: #e6e0f8;
  box-shadow: 0 4px 12px rgba(103, 58, 183, 0.15);
}

.item-details {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 600;
  font-size: 1rem;
  color: #444;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  border: none;
  background-color: #673ab7;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}

.quantity-controls button:hover {
  background-color: #532ea1;
}

.quantity-controls span {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.cart-item > button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
  user-select: none;
}

.cart-item > button:hover {
  background-color: #d9363e;
}

.cart p {
  font-weight: 700;
  font-size: 1.2rem;
  text-align: right;
  margin-top: 20px;
  color: #222;
}

.cart > button:last-of-type {
  display: block;
  width: 100%;
  margin-top: 25px;
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

.cart > button:last-of-type:hover {
  background-color: #532ea1;
  box-shadow: 0 8px 20px rgba(81, 45, 168, 0.6);
  transform: translateY(-2px);
}

.cart > button:last-of-type:active {
  background-color: #311b92;
  box-shadow: 0 4px 10px rgba(49, 27, 146, 0.7);
  transform: translateY(0);
}

.cart p:last-of-type {
  margin-bottom: 0;
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
