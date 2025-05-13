import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import About from '../components/About.vue';
import ProductView from '../components/ProductView.vue';
import UserProfile from '../components/UserProfile.vue';
import UserList from '../components/UserList.vue';
import AddProduct from '../components/AddProduct.vue';
import Cart from '../components/Cart.vue';

const routes = [
    {
        path: '/',
        component: ProductList,
        name: 'home'
    },
    {
        path: '/about',
        component: About,
        name: 'about',
        meta: { title: 'О компании LevelUP' }
    },
    {
        path: '/product/:id',
        component: ProductView,
        name: 'product',
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/profile/:username',
        component: UserProfile,
        name: 'user-profile',
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/users',
        component: UserList,
        name: 'users',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/add',
        component: AddProduct,
        name: 'add-product',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/cart',
        component: Cart,
        name: 'cart',
        props: (route) => ({ cartItems: route.meta.cartItems || [] }),
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    }
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('user');
    console.log(`Navigating to: ${to.name}, authenticated: ${isAuthenticated}`);

    if (to.name === 'login' || to.name === 'register') {
        if (isAuthenticated) {
            console.log('Already authenticated, redirecting to home');
            next({ name: 'home' });
        } else {
            console.log('Not authenticated, proceeding to login/register');
            next();
        }
    } else if (to.meta.requiresAuth && !isAuthenticated) {
        console.log('requiresAuth and not authenticated, redirecting to login');
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;