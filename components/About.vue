<template>
  <section class="about-levelup">
    <h2><strong>LevelUP</strong> - современный магазин цифровой техники</h2>
    <p>
      Наша цель - сделать качественную электронику и гаджеты доступными для каждого, обеспечивая лучший сервис и индивидуальный подход к каждому клиенту.
    </p>

    <h3>Наша история</h3>
    <div class="about-history">
      <div class="history-item">
        <div class="history-year">2018 г.</div>
        <div class="history-desc">Открытие первого магазина LevelUP в Москве</div>
      </div>
      <div class="history-item">
        <div class="history-year">2019 г.</div>
        <div class="history-desc">Запуск интернет-магазина и расширение ассортимента</div>
      </div>
      <div class="history-item">
        <div class="history-year">2021 г.</div>
        <div class="history-desc">Открытие 10-го магазина и запуск программы лояльности</div>
      </div>
      <div class="history-item">
        <div class="history-year">2023 г.</div>
        <div class="history-desc">Внедрение бесплатной доставки и расширение в регионы</div>
      </div>
      <div class="history-item">
        <div class="history-year">2024 г.</div>
        <div class="history-desc">LevelUP - более 30 магазинов по всей России</div>
      </div>
    </div>

    <h3>LevelUP сегодня</h3>
    <div class="about-today">
      <div class="today-fact">
        <span class="fact-number">30+</span>
        <span class="fact-label">магазинов по России</span>
      </div>
      <div class="today-fact">
        <span class="fact-number">150+</span>
        <span class="fact-label">сотрудников</span>
      </div>
      <div class="today-fact">
        <span class="fact-number">10000+</span>
        <span class="fact-label">товаров в каталоге</span>
      </div>
    </div>

    <div class="about-benefits">
      <div class="benefit-block">
        <h4>Для клиентов</h4>
        <ul>
          <li>Качественная техника и новинки рынка</li>
          <li>Гарантия и сервисное обслуживание</li>
          <li>Программа лояльности и бонусы</li>
          <li>Быстрая доставка и удобные способы оплаты</li>
          <li>Профессиональные консультации</li>
        </ul>
      </div>
      <div class="benefit-block">
        <h4>Для партнёров</h4>
        <ul>
          <li>Прозрачные условия сотрудничества</li>
          <li>Взаимовыгодные долгосрочные отношения</li>
          <li>Поддержка и развитие совместных проектов</li>
          <li>Открытость и честность</li>
        </ul>
      </div>
      <div class="benefit-block">
        <h4>Для сотрудников</h4>
        <ul>
          <li>Дружная команда профессионалов</li>
          <li>Карьерный рост и обучение</li>
          <li>Современные офисы и магазины</li>
          <li>Забота о каждом сотруднике</li>
        </ul>
      </div>
    </div>

    <div class="about-join">
      <strong>Стань частью команды LevelUP</strong>
      <p>
        Мы ищем людей, которые хотят расти и развиваться вместе с нами. Откликайтесь на вакансии и присоединяйтесь к LevelUP!
      </p>
      <router-link to="/careers" class="about-join-btn">Смотреть вакансии</router-link>
    </div>
  </section>
</template>

<script setup>
// Логика компонента, если требуется
</script>

<style scoped>
.about-levelup {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(103,58,183,0.07);
  padding: 32px 24px;
  margin: 40px auto;
  max-width: 950px;
}

.about-levelup h2 {
  font-size: 1.4em;
  margin-bottom: 10px;
}

.about-levelup p {
  margin-bottom: 24px;
  color: #444;
}

.about-history {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}

.history-item {
  flex: 1 1 150px;
  min-width: 140px;
  background: #f6f6f6;
  border-radius: 7px;
  padding: 10px 14px;
  text-align: center;
}

.history-year {
  font-weight: bold;
  color: #673ab7;
  font-size: 1.1em;
  margin-bottom: 4px;
}

.history-desc {
  font-size: 0.97em;
  color: #555;
}

.about-today {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(90deg, #ff9800, #ffb74d);
  border-radius: 8px;
  padding: 18px 0;
  margin-bottom: 32px;
  color: #fff;
  font-weight: 600;
}

.today-fact {
  text-align: center;
  min-width: 120px;
}

.fact-number {
  display: block;
  font-size: 2em;
}

.fact-label {
  font-size: 1em;
}

.about-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 32px;
}

.benefit-block {
  flex: 1 1 220px;
  min-width: 200px;
  background: #f6f6f6;
  border-radius: 7px;
  padding: 18px 16px;
}

.benefit-block h4 {
  margin-bottom: 10px;
  color: #ff9800;
}

.benefit-block ul {
  margin: 0;
  padding-left: 18px;
  color: #444;
}

.about-join {
  background: #f6f6f6;
  border-radius: 7px;
  padding: 20px 16px;
  text-align: center;
  margin-top: 16px;
}

.about-join-btn {
  display: inline-block;
  margin-top: 10px;
  background: #ff9800;
  color: #fff;
  padding: 10px 26px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
}

.about-join-btn:hover {
  background: #e68900;
}

/* Адаптивность */
@media (max-width: 768px) {
  .about-history {
    flex-direction: column;
    gap: 12px;
  }
  
  .about-today {
    flex-direction: column;
    gap: 20px;
  }
  
  .about-benefits {
    flex-direction: column;
    gap: 16px;
  }
  
  .history-item,
  .benefit-block {
    min-width: 100%;
  }
}
</style>