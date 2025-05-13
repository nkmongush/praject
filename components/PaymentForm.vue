<template>
  <div class="payment-form">
    <h2>Оплата</h2>
    <p>Итого к оплате: ${{ totalPrice }}</p>
    <form @submit.prevent="submitPayment">
      <div class="form-group">
        <label for="cardNumber">Номер карты:</label>
        <input type="text" id="cardNumber" v-model="cardNumber" required>
      </div>
      <div class="form-group">
        <label for="expiry">Срок действия:</label>
        <input type="text" id="expiry" v-model="expiry" required placeholder="MM/YY">
      </div>
      <div class="form-group">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" required>
      </div>
      <button type="submit">Оплатить</button>
      <button type="button" @click="close">Отмена</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['close', 'payment-success']);

const cardNumber = ref('');
const expiry = ref('');
const cvv = ref('');

const submitPayment = () => {
  alert('Оплата прошла успешно!');
  emit('payment-success');
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.payment-form {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #2563EB;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>