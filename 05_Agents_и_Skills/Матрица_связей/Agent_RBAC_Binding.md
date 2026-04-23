# 🔗 Матрица привязки Агентов к RBAC

Связующий документ между спецификациями агентов и [RBAC_Matrix.md](./RBAC_Matrix.md).
Определяет: *какой агент*, *какой tool*, *какую роль* проверяет.

---

## 1. Security Agent → RBAC

Security Agent является главным исполнителем RBAC. Использует `access-control` skill.

| Операция агента | Tool | Проверяемое право | Матрица §З |
|:---|:---|:---|:---|
| Создание ревизии | `authorize` | INSPECTOR: C на `audits` | §З.3.4 |
| Утверждение Акта | `authorize` | CHIEF_INSPECTOR: A на `audit_reports` | §З.3.4 |
| Чтение audit_log | `authorize` | ADMIN/CHIEF_INSPECTOR: R на `audit_log` | §З.3.9 |
| Назначение роли | `authorize` | ADMIN: A на `roles` | §З.3.2 |
| Блокировка пользователя | `authorize` | ADMIN: A на `users` | §З.3.2 |
| Экспорт данных | `authorize` | INSPECTOR+: X на `Отчёты` | §З.3.6 |
| Создание нарушения | `authorize` | INSPECTOR: C на `violations` | §З.3.5 |

---

## 2. Process Agent → Операции по ролям

| Операция Process Agent | Минимальная роль | Проверяет через |
|:---|:---|:---|
| `create-document` | INSPECTOR | SecurityAgent→`authorize` |
| `update-status`(черновик) | INSPECTOR | SecurityAgent→`authorize` |
| `update-status`(утверждение) | CHIEF_INSPECTOR | SecurityAgent→`authorize` |
| `calculate-damages` | INSPECTOR | SecurityAgent→`authorize` |
| `close-finding` | INSPECTOR | SecurityAgent→`authorize` |
| `assign-inspector` | CHIEF_INSPECTOR | SecurityAgent→`authorize` |

---

## 3. Integration Agent → Операции по ролям

| Операция Integration Agent | Инициатор | Авторизация |
|:---|:---|:---|
| `fetch-treasury` | Система(присозданииревизии) | Системныйтокен,INSPECTOR+ |
| `send-to-portal` | CHIEF_INSPECTOR | SecurityAgent→CHIEF_INSPECTOR:X |
| `sync-tax` | Система(порасписанию) | Системныйтокен |

---

## 4. User Agent → Видимость UI по ролям

| UI-элемент | ADMIN | CHIEF | INSPECTOR | VIEWER |
|:---|:---:|:---:|:---:|:---:|
| Кнопка "Создать ревизию" | ✓ | ✓ | ✓ | ✗ |
| Кнопка "Утвердить" | ✓ | ✓ | ✗ | ✗ |
| Раздел "Администрирование" | ✓ | ✗ | ✗ | ✗ |
| Просмотр audit_log | ✓ | ✓ | ✗ | ✗ |
| Экспорт XLSX/PDF | ✓ | ✓ | ✓ | ✗ |
| Назначение ролей | ✓ | ✗ | ✗ | ✗ |
| Блокировка пользователя | ✓ | ✗ | ✗ | ✗ |

---

## 5. SoD — Запреты на уровне агентов

Реализуются через `access-control` skill (§З.7.1):

| Ситуация | Проверка | Результат |
|:---|:---|:---|
| Пользователь A создал ревизию, пытается утвердить | `creator_id == approver_id` | ❌ Отказ |
| У пользователя роли INSPECTOR + AUDITOR | Проверка комбинации ролей | ❌ Отказ |
| Роль истекла (`role_expires_at < NOW()`) | Проверка даты | ❌ Отказ |
| >3 активных сессии | Проверка счётчика сессий | ❌ Отказ |

---

*Версия: 1.0 | Дата: 2026-04-18*
*Зависит от: [RBAC_Matrix.md](./RBAC_Matrix.md)*
