# Converter Project

Full-stack приложение с NestJS backend и Next.js frontend.

## Стек технологий

**Backend:**

- NestJS
- TypeORM
- PostgreSQL
- Class Validator

**Frontend:**

- Next.js
- React
- TypeScript

## Быстрый запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск PostgreSQL

**Вариант A: Docker (рекомендуется)**

```bash
# Запуск PostgreSQL
npm run db:up

# Просмотр логов
npm run db:logs

# Остановка
npm run db:down
```

**Вариант B: Локальная установка PostgreSQL**

1. Установите PostgreSQL
2. Создайте базу данных `converter_db`
3. Настройте пользователя `postgres` с паролем `password`

### 3. Запуск приложения

```bash
# Только backend
npm run start:be

# Только frontend
npm run start:fe

# Все сразу
npm run start:all
```

## Эндпоинты API

## Настройки базы данных

Настройки находятся в `apps/converter-be/src/config/environment.ts`:

```typescript
database: {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'converter_db',
}
```
