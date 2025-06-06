# Фронтенд CASIC - Инструкция по запуску

## 🚀 Быстрый старт

### 1. Установка зависимостей

Зависимости должны быть уже установлены в корневом `package.json`, но если что-то не работает:

```bash
# Из корня проекта
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` в папке `apps/converter-fe/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 3. Запуск приложения

```bash
# Из корня проекта
npm run start:fe

# Или напрямую через nx
nx serve converter-fe
```

Приложение будет доступно по адресу: `http://localhost:4200`

## 📁 Структура проекта

```
apps/converter-fe/src/
├── app/                    # Next.js App Router
│   └── page.tsx           # Главная страница
├── components/ui/         # UI компоненты
│   ├── Button.tsx         # Кнопка
│   ├── Input.tsx          # Поле ввода
└── lib/                   # Утилиты
    └── api.ts             # API клиент
```

## 🔑 Основные функции

### API клиент

```typescript
import { apiClient } from '../lib/api';

## 🎨 UI компоненты

### Button

```tsx
<Button variant="primary" size="lg" loading={isLoading}>
  Нажми меня
</Button>
```

### Input

```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errorMessage}
  helperText="Введите действующий email"
/>
```

## 🚦 Маршрутизация

- `/` - Главная страница (перенаправляет на `/dashboard` если авторизован)

## 🛠 Разработка

### Добавление новой страницы

1. Создайте папку в `apps/converter-fe/src/app/`
2. Добавьте файл `page.tsx`
3. Экспортируйте default компонент

### Добавление нового компонента

1. Создайте файл в `apps/converter-fe/src/components/`
2. Следуйте паттерну существующих компонентов
3. Экспортируйте компонент

### Стилизация

Используется **Tailwind CSS**. Все классы должны быть utility-first:

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <h1 className="text-2xl font-bold text-gray-900">Заголовок</h1>
</div>
```

## 🔧 Настройки

### Изменение API URL

Отредактируйте файл `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-api-url/api
```

### Настройка Tailwind

Конфигурация в файле `tailwind.config.js` (если есть)

## 🐛 Отладка

### Проблемы с подключением к API

1. Проверьте, что бэкенд запущен на порту 3000
2. Убедитесь, что CORS настроен правильно
3. Проверьте переменную `NEXT_PUBLIC_API_URL`

### Проблемы с авторизацией

1. Проверьте токен в localStorage: `localStorage.getItem('token')`
2. Убедитесь, что JWT секрет одинаковый на фронте и бэке
3. Проверьте Network tab в DevTools

## 📦 Сборка

```bash
# Сборка для production
nx build converter-fe

# Файлы сборки будут в dist/apps/converter-fe/
```

## 🚀 Деплой

1. Создайте `.env.production` с production настройками
2. Соберите проект: `nx build converter-fe`
3. Деплойте папку `dist/apps/converter-fe/` на ваш сервер

---

✨ **Готово!** Теперь у вас есть полноценный фронтенд для системы аутентификации.
