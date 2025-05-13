<template>
    <div class="login-form">
        <h2>Вход</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Имя пользователя:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Войти</button>
        </form>
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