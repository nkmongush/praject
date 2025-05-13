<template>
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
      <p>Итого: ${{ totalPrice }}</p>
      <button @click="showPaymentForm">Оформить заказ</button>
    </div>
    <div v-else>
      <p>Ваша корзина пуста.</p>
    </div>
    <PaymentForm v-if="showPayment" :totalPrice="totalPrice" @close="closePaymentForm" @payment-success="completeOrder" />
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import PaymentForm from './PaymentForm.vue';

const cartItems = inject('cartItems');
const showPayment = ref(false);

const emit = defineEmits(['remove-from-cart', 'increase-quantity', 'decrease-quantity', 'checkout']);

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

const removeFromCart = (itemId) => {
  emit('remove-from-cart', itemId);
};

const increaseQuantity = (index) => {
  emit('increase-quantity', index);
};

const decreaseQuantity = (index) => {
  emit('decrease-quantity', index);
};

const showPaymentForm = () => {
  showPayment.value = true;
};

const closePaymentForm = () => {
  showPayment.value = false;
};

const completeOrder = () => {
  alert('Заказ оформлен! Спасибо за покупку.');
  showPayment.value = false;
  emit('checkout');
};

console.log("Cart.vue - cartItems:", cartItems);
</script>