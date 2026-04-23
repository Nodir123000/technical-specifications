# 🛡️ Skill: security-guardian

**ID:** `security-guardian`
**Версия:** 1.0
**Владелец:** Security Agent
**Стандарт:** O'z DSt 2814:2019 — Информационная безопасность ИС; O'z DSt 3532:2021 — Защита ПДн

---

## Описание

Перехватчик всех запросов к критическим операциям системы. Проверяет контекст безопасности, маскирует ПИНФЛ, фиксирует аномалии и блокирует подозрительную активность. Вызывается **до** выполнения любой операции с персональными данными.

---

## Входные параметры

```json
{
  "request_context": {
    "user_id": "string (UUID)",
    "session_id": "string",
    "ip_address": "string",
    "user_agent": "string",
    "timestamp": "datetime"
  },
  "operation": "string (например: 'create-document', 'fetch-treasury')",
  "resource_type": "string",
  "resource_id": "string (опционально)",
  "payload_preview": "object (первые 100 символов значений для анализа)"
}
```

---

## Выходные параметры

```json
{
  "allowed": "boolean",
  "risk_level": "enum: [LOW, MEDIUM, HIGH, CRITICAL]",
  "block_reason": "string (если allowed=false)",
  "masked_fields": ["array of field names, где применено маскирование"],
  "anomaly_detected": "boolean",
  "anomaly_type": "enum: [BRUTE_FORCE, UNUSUAL_HOUR, MASS_EXPORT, PRIVILEGE_ESCALATION, null]",
  "audit_log_id": "string (UUID — запись в журнале)"
}
```

---

## SLA

| Метрика | Значение |
|:---|:---|
| Время проверки (p99) | ≤ 50 мс (не должен быть узким местом) |
| Доступность | 99.99% (критичнее всех других сервисов) |
| Допустимый % ложных блокировок | < 0.01% |

---

## Preconditions

* Вызывается **синхронно** до передачи управления целевому агенту

* `user_id` и `session_id` валидны (проверяется через `access-control`)

## Postconditions

* Запись в `audit_log` создана всегда (даже при `allowed=false`)

* При `risk_level=CRITICAL` — немедленное уведомление администратора безопасности

* При `anomaly_detected=true` — запись в отдельную таблицу `security_incidents`

---

## Правила маскирования ПИНФЛ

| Сценарий | Правило |
|:---|:---|
| Вывод в UI | `1234567890123` → `123****0123` |
| Логи и журналы | `1234567890123` → `[MASKED]` |
| API-ответ для VIEWER | Поле скрыто полностью |
| API-ответ для INSPECTOR+ | `123****0123` |
| Экспорт Excel/PDF | `123****0123` |

---

## Правила детекции аномалий

| Паттерн | Тип аномалии | Действие |
|:---|:---|:---|
| >10 неудачных входов за 5 мин | `BRUTE_FORCE` | Блокировка IP на 30 мин |
| Запрос в 00:00–05:00 (рабочие дни) | `UNUSUAL_HOUR` | Предупреждение, требуется 2FA |
| Экспорт >500 записей за 10 мин | `MASS_EXPORT` | Блокировка, алерт |
| Попытка вызова привилегированного endpoint | `PRIVILEGE_ESCALATION` | Немедленная блокировка, алерт CRITICAL |

---

## Error Flows

| Ошибка | Действие |
|:---|:---|
| Security Guardian недоступен | **Запросотклоняется**(fail-closed,неfail-open) |
| Audit Log БД недоступна | Записьврезервныйлог-файл,алерт,операцияпродолжается |
| Ошибка маскирования | Операция **отменяется**, возвращается ошибка `MASKING_FAILED` |

---

## Тест-кейсы

### TC-01: Happy Path — Разрешённая операция

**Вход:** INSPECTOR, операция `create-document`, низкий риск
**Ожидание:** `allowed: true`, `risk_level: LOW`, запись в audit_log создана

### TC-02: Блокировка превышения привилегий

**Вход:** VIEWER, операция `authorize` с ролью ADMIN
**Ожидание:** `allowed: false`, `anomaly_type: PRIVILEGE_ESCALATION`, алерт CRITICAL

### TC-03: Маскирование ПИНФЛ в ответе

**Вход:** Ответ содержит ПИНФЛ в полях персональных данных
**Ожидание:** `masked_fields` содержит имя поля, в ответе `123****0123`

### TC-04: Fail-closed при недоступности

**Имитация:** Security Guardian возвращает 503
**Ожидание:** Запрос отклонён, пользователю сообщение об ошибке

---

*Версия: 1.0 | Дата: 2026-04-18*
