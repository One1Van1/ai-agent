# AI Agent CLI с Ollama - Инструкция по реализации

## 🎯 Цель проекта

Создать AI агента, который может выполнять задачи через CLI команды:

- Анализировать входящие задачи
- Понимать требования
- Выполнять код-генерацию
- Создавать файлы и структуры проекта
- Интегрироваться с различными инструментами

## 🏗️ Архитектура решения

### Структура блока ai-agent:

```
src/ai-agent/
├── ollama-integration/       # Интеграция с Ollama
│   ├── connect-ollama/       # POST /ai-agent/ollama/connect
│   ├── chat-with-ollama/     # POST /ai-agent/ollama/chat
│   └── health-check/         # GET /ai-agent/ollama/health
├── task-processor/           # Обработка задач
│   ├── analyze-task/         # POST /ai-agent/analyze-task
│   ├── execute-task/         # POST /ai-agent/execute-task
│   └── generate-code/        # POST /ai-agent/generate-code
├── cli-interface/            # CLI команды
│   ├── cli-handler/          # POST /ai-agent/cli/execute
│   ├── command-parser/       # Парсинг команд
│   └── output-formatter/     # Форматирование вывода
└── file-operations/          # Операции с файлами
    ├── create-files/         # POST /ai-agent/files/create
    ├── modify-files/         # PUT /ai-agent/files/modify
    └── analyze-project/      # GET /ai-agent/files/analyze
```

## 🚀 Этапы реализации

### Этап 1: Базовая интеграция с Ollama

1. **Установка Ollama** на локальную машину
2. **Создание сервиса** для подключения к Ollama API
3. **Базовое общение** с моделью через HTTP запросы

### Этап 2: CLI интерфейс

1. **Создание CLI команд** через NestJS
2. **Парсинг входящих команд** и параметров
3. **Маршрутизация задач** к соответствующим обработчикам

### Этап 3: Обработка задач

1. **Анализ задач** через Ollama
2. **Генерация планов выполнения**
3. **Автоматическое выполнение** простых задач

### Этап 4: Операции с файлами

1. **Создание файлов** и папок
2. **Модификация существующих файлов**
3. **Анализ структуры проекта**

## 🛠️ Технические требования

### Зависимости для установки:

```bash
# Основные зависимости
yarn add axios commander chalk inquirer fs-extra

# Dev зависимости
yarn add -D @types/fs-extra @types/inquirer
```

### Системные требования:

- **Ollama установлен локально**
- **CodeLlama модель загружена**
- **Node.js 18+**
- **8GB+ RAM для CodeLlama**

## 📋 Примеры использования CLI

### Базовые команды:

```bash
# Анализ задачи
yarn ai-agent analyze "Создать модуль для пользователей"

# Генерация кода
yarn ai-agent generate --type=controller --name=users

# Создание структуры проекта
yarn ai-agent create-module --name=auth --endpoints=login,register,logout

# Анализ существующего проекта
yarn ai-agent analyze-project --path=./src

# Рефакторинг кода
yarn ai-agent refactor --file=./src/users/users.controller.ts --task="добавить валидацию"
```

### Сложные сценарии:

```bash
# Полная реализация функции
yarn ai-agent implement "Создать систему аутентификации с JWT токенами, включая регистрацию, логин и middleware для защиты роутов"

# Создание API с документацией
yarn ai-agent create-api --resource=products --operations=CRUD --with-swagger

# Оптимизация производительности
yarn ai-agent optimize --target=database --analyze-queries
```

## 🎯 Workflow выполнения задачи

### 1. Пользователь вводит команду:

```bash
yarn ai-agent implement "Создать модуль для работы с продуктами"
```

### 2. CLI парсер обрабатывает:

```typescript
{
  command: "implement",
  task: "Создать модуль для работы с продуктами",
  options: {}
}
```

### 3. AI агент анализирует через Ollama:

```typescript
// Анализ задачи
const analysis = await ollama.analyze({
  task: "Создать модуль для работы с продуктами",
  context: "NestJS TypeScript проект",
  architecture: "блочная структура"
});

// Результат анализа:
{
  type: "module_creation",
  complexity: "medium",
  estimatedTime: "15-20 minutes",
  requiredFiles: [
    "src/products/products.module.ts",
    "src/products/create-product/create-product.controller.ts",
    "src/products/create-product/create-product.service.ts",
    // ... и т.д.
  ],
  dependencies: ["@nestjs/common", "class-validator"]
}
```

### 4. Выполнение плана:

```typescript
// Создание файлов
await fileService.createModule('products');
await fileService.createEndpoint('products', 'create-product');
await fileService.createEndpoint('products', 'get-products');
await fileService.createEndpoint('products', 'update-product');
await fileService.createEndpoint('products', 'delete-product');

// Генерация кода для каждого файла
await codeGenerator.generateController('create-product');
await codeGenerator.generateService('create-product');
await codeGenerator.generateDTO('create-product');
```

### 5. Результат для пользователя:

```bash
✅ Модуль 'products' успешно создан!

📁 Созданные файлы:
  ├── src/products/products.module.ts
  ├── src/products/create-product/
  │   ├── create-product.controller.ts
  │   ├── create-product.service.ts
  │   ├── create-product.dto.ts
  │   └── create-product.module.ts
  ├── src/products/get-products/
  │   └── ... (аналогично)
  └── ... (остальные эндпоинты)

🚀 Следующие шаги:
  1. Проверить сгенерированный код
  2. Добавить в главный app.module.ts
  3. Запустить тесты: yarn test
  4. Запустить сервер: yarn start:dev
```

## 🔧 Настройка и конфигурация

### Конфигурация Ollama:

```typescript
// src/ai-agent/config/ollama.config.ts
export const ollamaConfig = {
  baseUrl: 'http://localhost:11434',
  model: 'codellama:latest',
  timeout: 30000,
  maxTokens: 4096,
  temperature: 0.1, // Для более детерминированного кода
};
```

### Шаблоны для генерации:

```typescript
// src/ai-agent/templates/
├── controller.template.ts
├── service.template.ts
├── dto.template.ts
├── module.template.ts
└── test.template.ts
```

## 📊 Мониторинг и логирование

### Логирование выполнения:

```bash
[AI-Agent] 🤖 Анализирую задачу: "Создать модуль для продуктов"
[AI-Agent] 📝 План создан: 12 файлов, ~15 минут
[AI-Agent] 📁 Создаю структуру папок...
[AI-Agent] ⚡ Генерирую код для create-product.controller.ts...
[AI-Agent] ✅ Задача выполнена успешно!
```

### Метрики:

- Время выполнения задач
- Успешность генерации кода
- Использование токенов Ollama
- Частота использования команд

## 🧪 Тестирование

### Unit тесты для каждого компонента:

```bash
yarn test src/ai-agent/ollama-integration/
yarn test src/ai-agent/task-processor/
yarn test src/ai-agent/cli-interface/
```

### E2E тесты CLI команд:

```bash
yarn test:e2e ai-agent-cli
```

## 🚀 Запуск и использование

### Установка и настройка:

```bash
# 1. Установить Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Загрузить модель
ollama pull codellama

# 3. Установить зависимости проекта
yarn install

# 4. Запустить сервер
yarn start:dev

# 5. Использовать CLI
yarn ai-agent --help
```

## 🎯 Ожидаемые результаты

После реализации вы сможете:

- ✅ Создавать модули одной командой
- ✅ Генерировать качественный TypeScript код
- ✅ Автоматизировать рутинные задачи разработки
- ✅ Анализировать и улучшать существующий код
- ✅ Экономить 60-80% времени на создании boilerplate кода

Это будет полноценный AI помощник для разработки, работающий полностью локально и бесплатно!
