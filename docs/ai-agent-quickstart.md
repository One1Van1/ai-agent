# 🤖 AI Agent CLI - Быстрый старт

## 📋 Что создано

✅ **Базовый AI агент с интеграцией Ollama**
✅ **CLI интерфейс для управления**
✅ **REST API эндпоинты**
✅ **Полная архитектура по блокам**

## 🚀 Структура созданного AI агента

```
src/ai-agent/
├── ollama-integration/
│   ├── connect-ollama/          # Подключение к Ollama
│   │   ├── connect-ollama.controller.ts
│   │   ├── connect-ollama.service.ts
│   │   ├── connect-ollama.dto.ts
│   │   ├── connect-ollama.interface.ts
│   │   ├── connect-ollama.module.ts
│   │   └── connect-ollama.spec.ts
│   └── chat-with-ollama/        # Общение с AI
│       ├── chat-with-ollama.controller.ts
│       ├── chat-with-ollama.service.ts
│       ├── chat-with-ollama.dto.ts
│       ├── chat-with-ollama.interface.ts
│       └── chat-with-ollama.module.ts
└── cli.ts                       # CLI интерфейс
```

## 🛠️ Установка и настройка

### 1. Установить Ollama

```bash
# macOS
curl -fsSL https://ollama.ai/install.sh | sh

# Запустить Ollama
ollama serve
```

### 2. Загрузить модель CodeLlama

```bash
ollama pull codellama
```

### 3. Запустить AI Agent сервер

```bash
# В первом терминале
yarn start:dev
```

### 4. Тестировать CLI

```bash
# В втором терминале
yarn ai-agent setup
```

## 📚 Доступные CLI команды

### Настройка и статус

```bash
# Полная настройка и проверка
yarn ai-agent setup

# Проверка статуса системы
yarn ai-agent status

# Тест подключения
yarn ai-agent test
```

## 🌐 REST API эндпоинты

### Подключение к Ollama

```bash
POST /ai-agent/ollama/connect
{
  "baseUrl": "http://localhost:11434",
  "model": "codellama:latest",
  "timeout": 30000
}
```

### Общение с AI

```bash
POST /ai-agent/ollama/chat
{
  "prompt": "Создай NestJS контроллер для пользователей",
  "temperature": 0.1,
  "maxTokens": 4096
}
```

### Анализ задач

```bash
POST /ai-agent/ollama/analyze
{
  "task": "Создать систему аутентификации"
}
```

### Генерация кода

```bash
POST /ai-agent/ollama/generate
{
  "type": "controller",
  "name": "users",
  "specifications": "CRUD операции с валидацией"
}
```

## 🧪 Тестирование

### 1. Проверить статус

```bash
yarn ai-agent status
```

**Ожидаемый результат:**

```
📊 System Status

Ollama Server: ✅ Running
AI Agent Server: ✅ Running
```

### 2. Настроить подключение

```bash
yarn ai-agent setup
```

**Ожидаемый результат:**

```
🚀 Setting up AI Agent...

1. Checking Ollama connection...
   ✅ Ollama is running
2. Checking AI Agent server...
   ✅ AI Agent server is running
3. Connecting AI Agent to Ollama...
🔌 Connecting to Ollama...
✅ Successfully connected to Ollama!

🎉 Setup complete!
```

### 3. Тест AI общения

```bash
yarn ai-agent test
```

### 4. Swagger документация

Откройте в браузере: `http://localhost:3001/api`

## 🎯 Примеры использования

### Через CLI (будущие команды)

```bash
# Анализ задачи
yarn ai-agent analyze "Создать модуль для продуктов"

# Генерация кода
yarn ai-agent generate controller products

# Полная реализация
yarn ai-agent implement "Создать CRUD API для продуктов с валидацией"
```

### Через REST API

```bash
# Анализ задачи
curl -X POST http://localhost:3001/ai-agent/ollama/analyze \
  -H "Content-Type: application/json" \
  -d '{"task": "Создать модуль аутентификации"}'

# Общение с AI
curl -X POST http://localhost:3001/ai-agent/ollama/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Создай NestJS сервис для работы с пользователями"}'
```

## 🔧 Расширение функционала

### Следующие шаги для развития:

1. **Добавить автоматическое создание файлов**
   - Сервис для записи сгенерированного кода в файлы
   - Автоматическое обновление импортов

2. **Улучшить CLI команды**
   - Интерактивные промпты
   - Прогресс бары
   - Предварительный просмотр изменений

3. **Добавить больше AI провайдеров**
   - OpenAI GPT-4 для сложных задач
   - Fallback на простые алгоритмы

4. **Интеграция с инструментами**
   - Git автокоммиты
   - Автоматический запуск тестов
   - Интеграция с Jira

## ⚠️ Требования к системе

- **RAM**: 8GB+ (для CodeLlama 7B)
- **Disk**: 4GB+ свободного места
- **Node.js**: 18+
- **Ollama**: последняя версия

## 🐛 Решение проблем

### Ollama не запускается

```bash
# Проверить процессы
ps aux | grep ollama

# Перезапустить
ollama serve
```

### AI Agent сервер не отвечает

```bash
# Проверить порт
lsof -i :3001

# Перезапустить
yarn start:dev
```

### Модель не найдена

```bash
# Список доступных моделей
ollama list

# Загрузить CodeLlama
ollama pull codellama
```

## 🎉 Поздравляем!

AI Agent с Ollama успешно создан и готов к работе! Теперь у вас есть:

- ✅ Локальный AI помощник для разработки
- ✅ CLI интерфейс для быстрых команд
- ✅ REST API для интеграций
- ✅ Масштабируемая архитектура
- ✅ Полностью бесплатное решение

**Начните с команды: `yarn ai-agent setup`** 🚀
