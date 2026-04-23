# 🤖 Реестр Агентов (Agents Registry)

## Бизнес-агенты

| Agent ID | Файл | Роль | Owner |
|:---|:---|:---|:---|
| `orchestrator-agent` | [orchestrator-agent.md](./orchestrator-agent.md) | Координатор системы | Архитектор |
| `user-agent` | [user-agent.md](./user-agent.md) | Интерфейс пользователя | UI/UX |
| `process-agent` | [process-agent.md](./process-agent.md) | Бизнес-логика, жизненный цикл | Аналитик |
| `integration-agent` | [integration-agent.md](./integration-agent.md) | Внешние интеграции | Инженер |
| `security-agent` | [security-agent.md](./security-agent.md) | ИБ, контроль доступа | АдминистраторИБ |
| `monitoring-agent` | [monitoring-agent.md](./monitoring-agent.md) | Мониторинг, алерты | DevOps |

## DevOps-агенты

| Agent ID | Файл | Роль | Owner |
|:---|:---|:---|:---|
| `quality-watchdog` | [quality-watchdog.md](./quality-watchdog.md) | Контроль качества кода | Tech Lead |
| `testing-agent` | [testing-agent.md](./testing-agent.md) | Координация тестирования | QA |

## Порядок вызовов (обязательный)

```text
Любой запрос → Orchestrator → Security Agent → [Целевые агенты] → Monitoring Agent
```

* **Security Agent** вызывается ПЕРВЫМ — всегда

* **Monitoring Agent** вызывается ПОСЛЕДНИМ — асинхронно

* Агенты **не вызывают** друг друга напрямую, только через Orchestrator

## Guardrails

Запрещённые паттерны описаны в: [GUARDRAILS.md](../GUARDRAILS.md)
