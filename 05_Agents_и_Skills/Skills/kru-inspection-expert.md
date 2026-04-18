# 🔍 Skill: kru-inspection-expert

**ID:** `kru-inspection-expert`
**Версия:** 1.0
**Владелец:** Process Agent
**Стандарт:** O'z DSt 1987:2018 §6.5.1 — Функции проведения ревизий

---

## Описание

Экспертная оценка финансовых и хозяйственных операций на предмет нарушений бюджетного законодательства РУз. Навык применяет логику классификации нарушений, рассчитывает сумму ущерба и формирует структурированное заключение.

---

## Входные параметры

```json
{
  "audit_id": "string (UUID)",
  "organization_id": "string (UUID)",
  "period": {
    "from": "date (YYYY-MM-DD)",
    "to": "date (YYYY-MM-DD)"
  },
  "transactions": [
    {
      "id": "string",
      "amount": "number (UZS)",
      "category": "string",
      "document_ref": "string",
      "date": "date"
    }
  ],
  "inspector_id": "string (UUID)",
  "inspection_type": "enum: [FULL, PARTIAL, THEMATIC]"
}
```

---

## Выходные параметры

```json
{
  "verdict": "enum: [COMPLIANT, VIOLATIONS_FOUND, REQUIRES_CLARIFICATION]",
  "violations": [
    {
      "violation_id": "string (UUID)",
      "type": "enum: [ФИНАНСОВОЕ, ПРОЦЕДУРНОЕ, ДОКУМЕНТАРНОЕ]",
      "severity": "enum: [КРИТИЧЕСКОЕ, СУЩЕСТВЕННОЕ, НЕЗНАЧИТЕЛЬНОЕ]",
      "amount_uzs": "number",
      "legal_basis": "string (ссылка на статью)",
      "description": "string",
      "transaction_ref": "string"
    }
  ],
  "total_damage_uzs": "number",
  "confidence_score": "number (0.0–1.0)",
  "requires_human_review": "boolean",
  "generated_at": "datetime (ISO 8601)"
}
```

---

## SLA

| Метрика | Значение |
|:---|:---|
| Время выполнения (p95) | ≤ 3000 мс |
| Время выполнения (p99) | ≤ 8000 мс |
| Допустимый % ошибок | < 0.5% |
| Минимальный confidence_score | ≥ 0.75 (иначе `requires_human_review = true`) |

---

## Preconditions

- Пользователь аутентифицирован и имеет роль `INSPECTOR` или выше
- `audit_id` существует в системе со статусом `IN_PROGRESS`
- `organization_id` существует и доступен текущему инспектору
- Транзакции за указанный период получены от Integration Agent

## Postconditions

- Результат записан в таблицу `audit_findings` с привязкой к `audit_id`
- Если `requires_human_review = true` — создана задача для руководителя
- Событие `INSPECTION_COMPLETED` передано в Monitoring Agent
- Все действия записаны в audit-лог через Security Agent

---

## Error Flows

| Ошибка | Действие агента |
|:---|:---|
| Транзакции не получены (Integration недоступна) | Вернуть `REQUIRES_CLARIFICATION`, создать алерт |
| `confidence_score < 0.75` | Установить `requires_human_review = true`, уведомить CHIEF_INSPECTOR |
| Таймаут > 8000 мс | Записать в лог, вернуть частичный результат с флагом `partial: true` |
| Ошибка записи в БД | Повтор 3 раза с backoff 1s, затем алерт дежурному |

---

## Тест-кейсы

### TC-01: Happy Path — Нарушения найдены

**Входные данные:** 150 транзакций, период 01.01.2025–31.12.2025, тип FULL
**Ожидаемый результат:** `verdict: VIOLATIONS_FOUND`, минимум 1 нарушение в массиве, `confidence_score ≥ 0.85`
**Время:** ≤ 3000 мс

### TC-02: Happy Path — Нарушений нет

**Входные данные:** 50 транзакций, все документы в порядке
**Ожидаемый результат:** `verdict: COMPLIANT`, `violations: []`, `total_damage_uzs: 0`

### TC-03: Error Path — Низкий confidence

**Входные данные:** 5 транзакций (недостаточно данных)
**Ожидаемый результат:** `requires_human_review: true`, `confidence_score < 0.75`

### TC-04: Error Path — Integration недоступна

**Имитация:** Integration Agent возвращает 503
**Ожидаемый результат:** `verdict: REQUIRES_CLARIFICATION`, алерт в системе мониторинга

---

*Версия: 1.0 | Дата: 2026-04-18 | Следующий ревью: 2026-07-18*
