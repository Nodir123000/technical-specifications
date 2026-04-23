# 🔎 Skill: data-validation

**ID:** `data-validation`
**Версия:** 1.0
**Владелец:** Integration Agent, Process Agent
**Стандарт:** O'z DSt 1987:2018 §6.5.2 — Контроль корректности данных

---

## Описание

Проверка корректности данных на всех граничных точках системы: при получении от пользователя, при импорте из внешних систем, при сохранении в БД. Является обязательным шлюзом перед любой записью данных.

---

## Входные параметры

```json
{
  "data": "object (проверяемые данные)",
  "schema": "string (ID схемы валидации)",
  "context": "enum: [USER_INPUT, EXTERNAL_API, INTERNAL_TRANSFER, EXPORT]",
  "strict_mode": "boolean (true — отклонить при любой ошибке, false — предупреждения)"
}
```

## Поддерживаемые схемы валидации

| Schema ID | Описание |
|:---|:---|
| `audit.create` | Создание ревизии |
| `violation.create` | Регистрация нарушения |
| `report.generate` | Запрос генерации отчёта |
| `treasury.import` | Импорт данных из казначейства |
| `user.profile` | Данные профиля пользователя |

---

## Выходные параметры

```json
{
  "valid": "boolean",
  "errors": [
    {
      "field": "string",
      "code": "string",
      "message": "string",
      "value": "string (маскированное)"
    }
  ],
  "warnings": ["array of string"],
  "sanitized_data": "object (очищенные данные, если valid=true)"
}
```

---

## SLA

| Метрика | Значение |
|:---|:---|
| Время валидации | ≤ 50 мс |
| Допустимый % ошибок | 0% (блокирующая функция) |

---

## Правила валидации ПИНФЛ

* Длина ровно 14 цифр

* Первая цифра: 1–9

* Контрольная сумма соответствует алгоритму РУз

* Не может быть `00000000000000`

---

## Тест-кейсы

### TC-01: Корректные данные

**Вход:** Валидный объект ревизии, schema=audit.create
**Ожидание:** `valid: true`, `errors: []`, `sanitized_data` заполнен

### TC-02: Некорректный ПИНФЛ

**Вход:** ПИНФЛ из 13 цифр
**Ожидание:** `valid: false`, `errors[0].code: "INVALID_PINFL_LENGTH"`

### TC-03: XSS в строковом поле

**Вход:** `description: "<script>alert(1)</script>"`
**Ожидание:** `valid: false` (strict) или `sanitized_data.description: "alert(1)"` (non-strict)

---

*Версия: 1.0 | Дата: 2026-04-18*
