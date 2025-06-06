# converter Backend

NestJS backend приложение с TypeORM и PostgreSQL.

## 🚀 Быстрый старт

### Предварительные требования

- Node.js (версия 18+)
- PostgreSQL
- Docker (опционально)

### Установка

1. Установите зависимости:

```bash
npm install
```

2. Настройте переменные окружения:

   - Скопируйте `development.env` и настройте под свою среду
   - Или установите переменные окружения в системе

3. Запустите базу данных:

```bash
npm run db:up
```

4. Запустите приложение:

```bash
npm run start:be
```

## 📚 API Документация

После запуска приложения, Swagger документация доступна по адресу:

- http://localhost:3000/api/docs

## 🗄️ Миграции базы данных

### Текущий подход

Сейчас используется `synchronize: true` для автоматического создания схемы БД в development режиме.

### Команды для миграций

```bash
# Создание новой миграции (пустой шаблон)
npm run migration:create ./src/migrations/MigrationName

# Запуск миграций
npm run migration:run

# Откат последней миграции
npm run migration:revert

# Полный сброс базы данных
npm run db:reset
```

### Переход на продакшн

Для продакшна нужно:

1. Отключить `synchronize: false`
2. Включить `migrationsRun: true`
3. Создать миграции для всех изменений схемы

## 🔧 Переменные окружения

| Переменная          | Описание        | По умолчанию            |
| ------------------- | --------------- | ----------------------- |
| `NODE_ENV`          | Окружение       | `development`           |
| `PORT`              | Порт приложения | `3000`                  |
| `DATABASE_HOST`     | Хост БД         | `localhost`             |
| `DATABASE_PORT`     | Порт БД         | `5432`                  |
| `DATABASE_USERNAME` | Пользователь БД | `postgres`              |
| `DATABASE_PASSWORD` | Пароль БД       | `password`              |
| `DATABASE_NAME`     | Имя БД          | `converter_db`              |
| `CORS_ORIGIN`       | CORS origin     | `http://localhost:4200` |

## 🏗️ Архитектура

```
src/
├── config/           # Конфигурация приложения
├── middleware/       # Middleware компоненты
├── migrations/       # Миграции базы данных
├── modules/          # Бизнес модули
│   ├── app/         # Главный модуль
│   ├── users/       # Модуль пользователей
│   ├── wallets/     # Модуль кошельков
│   └── ...
└── shared/          # Общие компоненты
    └── entity/      # Entity модели
```

## 🛠️ Команды разработки

```bash
# Запуск в режиме разработки
npm run start:be

# Линтинг
npm run lint
npm run lint:fix

# Форматирование кода
npm run format
npm run format:check

# База данных
npm run db:up      # Запуск PostgreSQL
npm run db:down    # Остановка PostgreSQL
npm run db:logs    # Логи PostgreSQL
npm run db:reset   # Перезапуск PostgreSQL
```

## 🔒 Безопасность

- ✅ Переменные окружения для конфиденциальных данных
- ✅ Валидация входящих данных
- ✅ CORS настройки
- ✅ Валидация схемы конфигурации

## 📝 Логирование

Приложение логирует все HTTP запросы с информацией:

- Метод и URL
- Статус код ответа
- User-Agent
- IP адрес

## 🎯 Pre-commit hooks

Настроены автоматические проверки перед коммитом:

- ESLint проверка и автофикс
- Prettier форматирование
