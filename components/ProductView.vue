<template>
  <div class="product-view">
    <h2>Детали товара</h2>
    <div v-if="!isLoggedIn">
      <p>Зарегистрируйтесь, чтобы добавлять товары в корзину</p>
    </div>
    <div v-else>
      <div v-if="product">
        <h3>{{ product.name }}</h3>
        <img :src="getImageUrl(product.image)" :alt="product.name" />
        <p>Цена: ${{ product.price }}</p>
        <p>{{ product.description || 'Описание товара отсутствует.' }}</p>
        <button @click="addToCart(product)">Добавить в корзину</button>
      </div>
      <div v-else>
        <p>Товар не найден.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const isLoggedIn = inject('isLoggedIn');
const route = useRoute();
const productId = parseInt(route.params.id);

const products = ref([
  { id: 1, name: 'Игровой ноутбук', brand: 'ASUS', price: 1200, image: 'laptop1.jpg' },
{ id: 2, name: 'Беспроводная мышь', brand: 'Logitech', price: 30, image: 'mouse1.jpg' },
{ id: 3, name: 'Механическая клавиатура', brand: 'Corsair', price: 75, image: 'keyboard1.jpg' },
{ id: 4, name: 'Игровые наушники', brand: 'HyperX', price: 150, image: 'headphones1.jpg' },
{ id: 5, name: '27-дюймовый монитор', brand: 'Samsung', price: 300, image: 'monitor1.jpg' },
{ id: 6, name: 'SSD 512GB', brand: 'Western Digital', price: 60, image: 'ssd1.jpg' },
{ id: 7, name: 'Видеокарта RTX 3070', brand: 'Nvidia', price: 500, image: 'gpu1.jpg' },
{ id: 8, name: 'Оперативная память 16GB', brand: 'Crucial', price: 80, image: 'ram1.jpg' },
{ id: 9, name: 'Процессор Intel i7', brand: 'Intel', price: 350, image: 'cpu1.jpg' },
{ id: 10, name: 'Материнская плата', brand: 'MSI', price: 150, image: 'motherboard1.jpg' },
{ id: 11, name: 'Смартфон Galaxy S23', brand: 'Samsung', price: 800, image: 'smartphone1.jpg' },
{ id: 12, name: 'Фитнес-браслет', brand: 'Xiaomi', price: 50, image: 'fitness_tracker1.jpg' },
{ id: 13, name: 'Умные часы', brand: 'Apple', price: 400, image: 'smartwatch1.jpg' },
{ id: 14, name: 'Планшет iPad', brand: 'Apple', price: 350, image: 'tablet1.jpg' },
{ id: 15, name: 'Беспроводные наушники', brand: 'Sony', price: 200, image: 'earphones1.jpg' },
{ id: 16, name: 'Портативная колонка', brand: 'JBL', price: 100, image: 'speaker1.jpg' },
{ id: 17, name: 'Электрическая зубная щетка', brand: 'Philips', price: 70, image: 'toothbrush1.jpg' },
{ id: 18, name: 'Робот-пылесос', brand: 'iRobot', price: 250, image: 'vacuum_cleaner1.jpg' },
{ id: 19, name: 'Кофемашина', brand: 'Delonghi', price: 200, image: 'coffee_machine1.jpg' },
{ id: 20, name: 'Электронная книга', brand: 'Amazon', price: 120, image: 'ereader1.jpg' },
{ id: 21, name: '4K Телевизор', brand: 'LG', price: 600, image: 'tv1.jpg' },
{ id: 22, name: 'Игровая приставка PS5', brand: 'Sony', price: 500, image: 'ps51.jpg' },
{ id: 23, name: 'Геймпад', brand: 'Xbox', price: 60, image: 'gamepad1.jpg' },
{ id: 24, name: 'Веб-камера', brand: 'Logitech', price: 80, image: 'webcam1.jpg' },
{ id: 25, name: 'Микрофон', brand: 'Rode', price: 150, image: 'microphone1.jpg' },
{ id: 26, name: 'Студийные мониторы', brand: 'KRK', price: 300, image: 'studiomonitors1.jpg' },
{ id: 27, name: 'MIDI-клавиатура', brand: 'M-Audio', price: 200, image: 'midikeyboard1.jpg' },
{ id: 28, name: 'DJ-контроллер', brand: 'Pioneer', price: 700, image: 'djcontroller1.jpg' },
{ id: 29, name: 'Синтезатор', brand: 'Yamaha', price: 800, image: 'synthesizer1.jpg' },
{ id: 30, name: 'Гитарный процессор', brand: 'Line 6', price: 400, image: 'guitar_processor1.jpg' },
{ id: 31, name: 'Зеркальный фотоаппарат', brand: 'Canon', price: 700, image: 'dslr1.jpg' },
{ id: 32, name: 'Беззеркальный фотоаппарат', brand: 'Sony', price: 900, image: 'mirrorless1.jpg' },
{ id: 33, name: 'Объектив 50mm', brand: 'Sigma', price: 300, image: 'lens50mm1.jpg' },
{ id: 34, name: 'Внешняя вспышка', brand: 'Godox', price: 150, image: 'flash1.jpg' },
{ id: 35, name: 'Штатив', brand: 'Manfrotto', price: 100, image: 'tripod1.jpg' },
{ id: 36, name: 'Квадрокоптер', brand: 'DJI', price: 1000, image: 'drone1.jpg' },
{ id: 37, name: 'Экшн-камера', brand: 'GoPro', price: 350, image: 'actioncamera1.jpg' },
{ id: 38, name: 'SSD 1TB', brand: 'Samsung', price: 120, image: 'ssd2.jpg' },
{ id: 39, name: 'Внешний жесткий диск 2TB', brand: 'Seagate', price: 80, image: 'external_hdd1.jpg' },
{ id: 40, name: 'USB флешка 128GB', brand: 'SanDisk', price: 25, image: 'usb_drive1.jpg' },
{ id: 41, name: 'Wi-Fi роутер', brand: 'TP-Link', price: 50, image: 'router1.jpg' },
{ id: 42, name: 'Умная колонка', brand: 'Google', price: 70, image: 'smart_speaker1.jpg' },
{ id: 43, name: 'Электрический чайник', brand: 'Tefal', price: 40, image: 'kettle1.jpg' },
{ id: 44, name: 'Тостер', brand: 'KitchenAid', price: 80, image: 'toaster1.jpg' },
{ id: 45, name: 'Блендер', brand: 'Ninja', price: 100, image: 'blender1.jpg' },
{ id: 46, name: 'Фен для волос', brand: 'Dyson', price: 400, image: 'hairdryer1.jpg' },
{ id: 47, name: 'Эпилятор', brand: 'Braun', price: 80, image: 'epilator1.jpg' },
{ id: 48, name: 'Утюг', brand: 'Philips', price: 60, image: 'iron1.jpg' },
{ id: 49, name: 'Весы напольные', brand: 'Xiaomi', price: 30, image: 'scale1.jpg' },
{ id: 50, name: 'Увлажнитель воздуха', brand: 'Boneco', price: 120, image: 'humidifier1.jpg' }
]);

const product = ref(null);

onMounted(() => {
  product.value = products.value.find(p => p.id === productId);
});

// Функция для корректного формирования пути к изображению
const getImageUrl = (imageName) => {
  // Если у вас изображения лежат в public/assets, то путь будет таким:
  return `./assets/product${imageName}`;
};

const emit = defineEmits(['add-to-cart']);
const addToCart = (productItem) => {
  if (isLoggedIn.value) {
    emit('add-to-cart', productItem);
  }
};
</script>

<style scoped>
.product-view {
  padding: 20px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.product-view h3 {
  margin-bottom: 15px;
  font-size: 1.8rem;
  color: #673ab7;
}

.product-view img {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  object-fit: contain;
}

.product-view p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 25px;
  color: #555;
}

.product-view button {
  background-color: #2563EB;
  color: #fff;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.product-view button:hover {
  background-color: #164cd8;
}
</style>
