# UI Components

Библиотека переиспользуемых UI компонентов для converter приложения.

## Структура

Каждый компонент находится в отдельной папке со следующей структурой:

```
ComponentName/
├── ComponentName.tsx      # Основной компонент
├── ComponentName.module.css # Стили компонента
└── index.ts              # Экспорт компонента
```

## Доступные компоненты

### Button

Универсальная кнопка с поддержкой различных вариантов и состояний.

**Пропсы:**

- `variant`: 'primary' | 'secondary' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `children`: React.ReactNode

**Пример использования:**

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg" loading={isLoading}>
  Сохранить
</Button>;
```

### Input

Поле ввода с поддержкой лейблов, ошибок и вспомогательного текста.

**Пропсы:**

- `label`: string
- `error`: string
- `helperText`: string
- Все стандартные пропсы HTMLInputElement

**Пример использования:**

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  type="email"
  error={errors.email}
  helperText="Введите действующий email адрес"
/>;
```

### Alert

Компонент для отображения уведомлений различных типов.

**Пропсы:**

- `type`: 'success' | 'error' | 'warning' | 'info'
- `title`: string (опционально)
- `message`: string
- `onClose`: () => void (опционально)

**Пример использования:**

```tsx
import { Alert } from '@/components/ui';

<Alert
  type="success"
  title="Успешно!"
  message="Данные сохранены"
  onClose={() => setShowAlert(false)}
/>;
```

### Loader

Индикатор загрузки с поддержкой полноэкранного режима.

**Пропсы:**

- `size`: 'sm' | 'md' | 'lg'
- `text`: string (опционально)
- `fullScreen`: boolean

**Пример использования:**

```tsx
import { Loader } from '@/components/ui';

<Loader size="lg" text="Загрузка..." fullScreen />;
```

## Импорт

Все компоненты можно импортировать из основного индекса:

```tsx
import { Button, Input, Alert, Loader } from '@/components/ui';
```

Или импортировать отдельные компоненты:

```tsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
```

## Стилизация

Все компоненты используют CSS Modules для изоляции стилей. Каждый компонент имеет свой собственный CSS файл с соответствующими стилями.

## Расширение

Для добавления нового компонента:

1. Создайте папку с именем компонента
2. Добавьте файлы ComponentName.tsx, ComponentName.module.css, index.ts
3. Экспортируйте компонент в главном index.ts файле

Пример структуры нового компонента:

```
NewComponent/
├── NewComponent.tsx
├── NewComponent.module.css
└── index.ts
```
