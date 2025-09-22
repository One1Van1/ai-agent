# NestJS TypeScript Project

Полностью настроенный проект NestJS с TypeScript для быстрого старта разработки.

## 🚀 Технологии

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Строго типизированный JavaScript
- **Yarn** - Менеджер пакетов
- **Jest** - Тестирование
- **ESLint + Prettier** - Линтинг и форматирование
- **Swagger** - API документация
- **Class Validator** - Валидация данных

## 📁 Структура проекта

```
├── src/
│   ├── modules/          # Модули приложения
│   ├── common/           # Общие компоненты (guards, interceptors, etc.)
│   ├── config/           # Конфигурация
│   ├── main.ts           # Точка входа
│   ├── app.module.ts     # Главный модуль
│   ├── app.controller.ts # Главный контроллер
│   └── app.service.ts    # Главный сервис
├── test/                 # E2E тесты
├── dist/                 # Скомпилированные файлы
└── node_modules/         # Зависимости
```

## 🛠️ Установка и запуск

### Требования
- Node.js (версия 18+)
- Yarn

### Установка зависимостей
```bash
yarn install
```

### Переменные окружения
Скопируйте `.env.example` в `.env` и настройте под ваши нужды:
```bash
cp .env.example .env
```

### Команды разработки

```bash
# Запуск в режиме разработки с hot reload
yarn start:dev

# Запуск в обычном режиме
yarn start

# Запуск в debug режиме
yarn start:debug

# Сборка проекта
yarn build

# Запуск production версии
yarn start:prod
```

### Тестирование

```bash
# Unit тесты
yarn test

# E2E тесты
yarn test:e2e

# Тесты с покрытием
yarn test:cov

# Тесты в watch режиме
yarn test:watch
```

### Линтинг и форматирование

```bash
# Линтинг
yarn lint

# Форматирование кода
yarn format
```

## 📚 API документация

После запуска приложения, Swagger документация доступна по адресу:
```
http://localhost:3000/api
```

## 🌐 Эндпоинты

- `GET /` - Hello World сообщение
- `GET /health` - Проверка состояния сервиса

## 🔧 Конфигурация

### TypeScript
Конфигурация находится в файлах:
- `tsconfig.json` - Основная конфигурация TypeScript
- `tsconfig.build.json` - Конфигурация для сборки

### NestJS CLI
Конфигурация в `nest-cli.json`

### ESLint & Prettier
- `.eslintrc.js` - Правила линтинга
- `.prettierrc` - Правила форматирования

## 📦 Основные зависимости

### Production
- `@nestjs/common` - Основные NestJS компоненты
- `@nestjs/core` - Ядро NestJS
- `@nestjs/platform-express` - Express платформа
- `@nestjs/config` - Конфигурация
- `@nestjs/swagger` - API документация
- `class-validator` - Валидация
- `class-transformer` - Трансформация данных

### Development
- `@nestjs/cli` - NestJS CLI
- `@nestjs/testing` - Утилиты для тестирования
- `jest` - Тестовый фреймворк
- `eslint` - Линтер
- `prettier` - Форматтер кода
- `typescript` - TypeScript компилятор

## 🎯 Следующие шаги

1. **Добавить базу данных:**
   ```bash
   yarn add @nestjs/typeorm typeorm pg
   ```

2. **Добавить аутентификацию:**
   ```bash
   yarn add @nestjs/jwt @nestjs/passport passport passport-jwt
   ```

3. **Создать новый модуль:**
   ```bash
   yarn nest generate module users
   yarn nest generate controller users
   yarn nest generate service users
   ```

4. **Добавить валидацию:**
   ```bash
   yarn add class-validator class-transformer
   ```

## 🤝 Лучшие практики

- Используйте декораторы NestJS для структурирования кода
- Создавайте отдельные модули для каждой функциональности
- Пишите тесты для всех новых функций
- Используйте DTOs для валидации входящих данных
- Следуйте принципам SOLID
- Документируйте API с помощью Swagger декораторов

## 📖 Полезные ссылки

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Swagger Documentation](https://swagger.io/docs/)

## 🚀 Готово к разработке!

Проект полностью настроен и готов к разработке. Запустите `yarn start:dev` и начинайте кодить!
