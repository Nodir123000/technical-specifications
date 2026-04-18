# ✅ Skill: step-validator

**ID:** `step-validator`
**Версия:** 1.0
**Владелец:** Process Agent
**Стандарт:** O'z DSt 1987:2018 §6.5.1 — Управление жизненным циклом документа

---

## Описание

Проверяет корректность перехода документа между статусами жизненного цикла. Гарантирует, что все условия предыдущего этапа выполнены перед переходом на следующий. Блокирует некорректные переходы.

---

## Жизненный цикл документа (Акт ревизии)

```
Черновик → На проверке → Утверждён → Исполнен → Архивный
    ↑            |
    └────────────┘ (возврат на доработку)
```

---

## Входные параметры

```json
{
  "document_id": "string (UUID)",
  "document_type": "enum: [AUDIT, ACT_REVISION, ORDER, FINDING]",
  "current_status": "string",
  "target_status": "string",
  "triggered_by": "string (user_id)",
  "validation_context": {
    "all_fields_filled": "boolean",
    "findings_count": "number",
    "approved_by_id": "string (UUID, опционально)",
    "signatures_count": "number"
  }
}
```

---

## Выходные параметры

```json
{
  "transition_allowed": "boolean",
  "failed_conditions": [
    {
      "condition": "string",
      "expected": "string",
      "actual": "string"
    }
  ],
  "next_allowed_statuses": ["array of string"],
  "requires_approval_from": "string | null (роль)"
}
```

---

## Матрица переходов и условий

| Переход | Обязательные условия | Требует роль |
|:---|:---|:---|
| Черновик → На проверке | Все обязательные поля заполнены | INSPECTOR |
| На проверке → Утверждён | Минимум 1 подпись CHIEF_INSPECTOR, findings_count > 0 | CHIEF_INSPECTOR |
| На проверке → Черновик | Указана причина возврата | CHIEF_INSPECTOR |
| Утверждён → Исполнен | Все decisions по findings закрыты | INSPECTOR |
| Исполнен → Архивный | Прошло ≥ 30 дней с исполнения | ADMIN |

---

## SLA

| Метрика | Значение |
|:---|:---|
| Время валидации | ≤ 100 мс |
| Допустимый % ошибок | 0% (критическая функция) |

---

## Тест-кейсы

### TC-01: Корректный переход

**Вход:** Черновик → На проверке, все поля заполнены
**Ожидание:** `transition_allowed: true`, `failed_conditions: []`

### TC-02: Некорректный переход

**Вход:** Черновик → Архивный (пропуск этапов)
**Ожидание:** `transition_allowed: false`, список `next_allowed_statuses`

### TC-03: Нет подписи для утверждения

**Вход:** На проверке → Утверждён, `signatures_count: 0`
**Ожидание:** `failed_conditions` содержит `{condition: "signatures_count", expected: "≥1", actual: "0"}`

---

*Версия: 1.0 | Дата: 2026-04-18*
