# AI Agent Project Instructions

## 📦 Package Manager

**ВСЕГДА ИСПОЛЬЗУЙ YARN, НЕ NPM!**

- Установка пакетов: `yarn add package-name`
- Установка dev-зависимостей: `yarn add -D package-name`
- Удаление пакетов: `yarn remove package-name`
- Установка всех зависимостей: `yarn install`

❌ **НИКОГДА НЕ ИСПОЛЬЗУЙ:**

- `npm install`
- `npm add`
- `npm run`

✅ **ВСЕГДА ИСПОЛЬЗУЙ:**

- `yarn install`
- `yarn add`
- `yarn start`

## 🏗️ Архитектура проекта - Блочная структура

### Основной принцип: ОДИН БЛОК = ОДНА ЗАДАЧА

Проект должен быть разделен на отдельные блоки (папки), где каждый блок отвечает за конкретную задачу:

```
src/
├── ai-agent/           # Блок для AI агента
├── jira-integration/   # Блок для подключения к Jira
├── task-analytics/     # Блок для аналитики задач
├── user-management/    # Блок для управления пользователями
├── notifications/      # Блок для уведомлений
└── ...                 # Другие блоки по задачам
```

### Каждый блок должен содержать:

- Свой модуль
- Свои контроллеры
- Свои сервисы
- Свои DTOs
- Свои интерфейсы
- Свои тесты

## 🛠️ Структура эндпойнтов - Один эндпойнт = Одна папка

### Критически важно: КАЖДЫЙ ЭНДПОЙНТ В ОТДЕЛЬНОЙ ПАПКЕ!

**Для каждого эндпойнта создавай отдельную папку с полным набором файлов:**

```
src/ai-agent/
├── create-task/          # Эндпойнт POST /ai-agent/create-task
│   ├── create-task.controller.ts
│   ├── create-task.service.ts
│   ├── create-task.dto.ts
│   ├── create-task.module.ts
│   ├── create-task.interface.ts
│   └── create-task.spec.ts
├── get-task-status/      # Эндпойнт GET /ai-agent/task-status/:id
│   ├── get-task-status.controller.ts
│   ├── get-task-status.service.ts
│   ├── get-task-status.dto.ts
│   ├── get-task-status.module.ts
│   └── get-task-status.spec.ts
└── update-task/          # Эндпойнт PUT /ai-agent/update-task/:id
    ├── update-task.controller.ts
    ├── update-task.service.ts
    ├── update-task.dto.ts
    ├── update-task.module.ts
    └── update-task.spec.ts
```

### Пример структуры блока Jira Integration:

```
src/jira-integration/
├── connect-jira/         # POST /jira/connect
│   ├── connect-jira.controller.ts
│   ├── connect-jira.service.ts
│   ├── connect-jira.dto.ts
│   ├── connect-jira.module.ts
│   └── connect-jira.spec.ts
├── get-jira-issues/      # GET /jira/issues
│   ├── get-jira-issues.controller.ts
│   ├── get-jira-issues.service.ts
│   ├── get-jira-issues.dto.ts
│   ├── get-jira-issues.module.ts
│   └── get-jira-issues.spec.ts
└── create-jira-issue/    # POST /jira/issues
    ├── create-jira-issue.controller.ts
    ├── create-jira-issue.service.ts
    ├── create-jira-issue.dto.ts
    ├── create-jira-issue.module.ts
    └── create-jira-issue.spec.ts
```

## 📝 Правила именования

### Папки блоков:

- Используй kebab-case
- Название должно отражать функциональность
- Примеры: `ai-agent`, `jira-integration`, `task-analytics`

### Папки эндпойнтов:

- Используй kebab-case
- Название должно точно отражать действие эндпойнта
- Примеры: `create-task`, `get-task-status`, `update-task`, `delete-task`

### Файлы:

- Используй kebab-case
- Формат: `[endpoint-name].[type].ts`
- Примеры:
  - `create-task.controller.ts`
  - `get-task-status.service.ts`
  - `update-task.dto.ts`

## 🎯 Основные принципы

1. **Модульность**: Каждый блок независим
2. **Изоляция**: Один эндпойнт = одна папка
3. **Yarn only**: Никогда не используй npm
4. **Четкая структура**: Каждый файл на своем месте
5. **Понятные названия**: Название должно говорить за себя

## 🚀 Команды для работы

```bash
# Запуск проекта
yarn start:dev

# Установка зависимостей
yarn install

# Добавление новой зависимости
yarn add @nestjs/some-package

# Тестирование
yarn test

# Сборка
yarn build
```
