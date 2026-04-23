# ПРИЛОЖЕНИЕ Д — ER-ДИАГРАММА (МОДЕЛЬ ДАННЫХ)

Автоматизированная Информационная Система Контрольно-Ревизионного Управления
Министерства Обороны Республики Узбекистан (АИС КРУ МО РУЗ)

---

## Д.1. ОБЩИЕ ПОЛОЖЕНИЯ

### Д.1.1. Назначение

Настоящее приложение описывает полную модель данных АИС КРУ МО РУЗ в нотации «сущность-связь» (ER-модель). Документ включает перечень всех таблиц базы данных, их атрибутов, типов данных, ограничений целостности и связей между таблицами.

### Д.1.2. Нотация и соглашения

|Обозначение|Значение|
|------------|---------|
|**PK**|Primary Key (первичный ключ)|
|**FK**|Foreign Key (внешний ключ)|
|**NN**|Not Null (обязательное поле)|
|**UQ**|Unique (уникальное значение)|
|**CK**|Check (проверочное ограничение)|
|**1:N**|Один ко многим|
|**N:M**|Многие ко многим|
|**1:1**|Один к одному|

### Д.1.3. Классификация таблиц

|Класс|Описание|Префикс|
|-------|---------|---------|
|**Транзакционные**|Хранятбизнес-данные|-|
|**Справочники**|Нормативно-справочнаяинформация|ref_|
|**Системные**|Технические и служебные данные|sys_|
|**Аудит**|Журналирование изменений|audit_|

---

## Д.2. ТРАНЗАКЦИОННЫЕ ТАБЛИЦЫ

### Д.2.0. Таблица: roles (Роли RBAC)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор роли|
|role_name|VARCHAR(50)|||✓|✓|Наименование роли (ADMIN, CHIEF_INSPECTOR, INSPECTOR, VIEWER)|
|description|TEXT|||||Описание роли|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (role_name)

**Примечание:** Нормализация RBAC согласно ISO/IEC 27001 A.9.2.3. Роли: ADMIN (Администратор), CHIEF_INSPECTOR (Главный инспектор), INSPECTOR (Инспектор-ревизор), VIEWER (Наблюдатель), AUDITOR (Аудитор), HR_SPECIALIST (Специалист по кадрам), FINANCE_VIEWER (Финансовый аналитик), SYSTEM_ADMIN (Системный администратор).

### Д.2.0а. Таблица: user_roles (Связь пользователей и ролей — многие-ко-многим)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|user_id|INTEGER|✓|FK|✓||FK → users.id|
|role_id|INTEGER|✓|FK|✓||FK → roles.id|
|assigned_at|TIMESTAMP|||✓||Дата назначения|
|assigned_by|INTEGER||FK|||FK → users (кто назначил)|

### Индексы

* PRIMARY KEY (user_id, role_id)

* INDEX (user_id)

* INDEX (role_id)

* FOREIGN KEY (user_id) → users(id) ON DELETE CASCADE

* FOREIGN KEY (role_id) → roles(id) ON DELETE RESTRICT

**Примечание:** Позволяет назначать пользователю несколько ролей (принцип наименьших привилегий).

### Д.2.1. Таблица: users (Пользователи)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|login|VARCHAR(100)|||✓|✓|Логин|
|email|VARCHAR(255)|||✓|✓|Email|
|password_hash|VARCHAR(255)|||✓||Хеш пароля|
|**role_id**|INTEGER||**FK**|**✓**||**FK → roles (нормализация RBAC)**|
|rank_id|INTEGER||FK|||FK → ref_ranks|
|position_id|INTEGER||FK|||FK → ref_positions|
|unit_id|INTEGER||FK|||FK → units|
|status|VARCHAR(20)|||✓||Статус (active, blocked)|
|last_login|TIMESTAMP|||||Последний вход|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (login)

* UNIQUE (email)

* INDEX (role_id)

* INDEX (unit_id)

* **FOREIGN KEY (role_id) → roles(id) ON DELETE RESTRICT**

> [!NOTE]
> Ролевая модель нормализована: роль пользователя хранится как FK на таблицу `roles` (принцип ISO/IEC 27001 A.9.2.3 — минимальные привилегии). Для связи «многие-ко-многим» используется таблица `user_roles`.

### Д.2.2. Таблица: units (Подразделения/Воинские части)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|name|JSONB|||✓||Наименование (локализованное)|
|short_name|JSONB|||||Краткое наименование|
|code|VARCHAR(50)|||✓|✓|Код части|
|type|VARCHAR(50)|||✓||Тип (division, brigade, regiment)|
|region_id|INTEGER||FK|||FK → ref_regions|
|area_id|INTEGER||FK|||FK → ref_areas|
|military_district_id|INTEGER||FK|||FK → ref_military_districts|
|address|VARCHAR(500)|||||Адрес|
|status|VARCHAR(20)|||✓||Статус (active, inactive)|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (code)

* INDEX (region_id)

* INDEX (status)

### Д.2.3. Таблица: rev_plan_year (Годовые планы)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|year|INTEGER|||✓||Год плана|
|title|VARCHAR(255)|||✓||Наименование плана|
|description|TEXT|||||Описание|
|status|VARCHAR(50)|||✓||Статус (draft, approved, executed)|
|planned_audits|INTEGER|||✓||Плановое количество ревизий|
|actual_audits|INTEGER|||||Фактическое количество|
|approved_by|INTEGER||FK|||FK → users|
|approved_at|DATE|||||Дата утверждения|
|created_by|INTEGER||FK|✓||FK → users|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (year) - один план на год

* INDEX (status)

### Д.2.4. Таблица: rev_plan_quarter (Квартальные планы)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|annual_plan_id|INTEGER||FK|✓||FK → rev_plan_year|
|quarter|INTEGER|||✓||Квартал(1-4)|
|year|INTEGER|||✓||Год|
|title|VARCHAR(255)|||✓||Наименование|
|status|VARCHAR(50)|||✓||Статус|
|planned_audits|INTEGER|||✓||Плановое количество|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (annual_plan_id, quarter)

* INDEX (status)

### Д.2.5. Таблица: rev_plan_month (Месячные планы)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|quarter_plan_id|INTEGER||FK|✓||FK → rev_plan_quarter|
|month|INTEGER|||✓||Месяц(1-12)|
|year|INTEGER|||✓||Год|
|title|VARCHAR(255)|||✓||Наименование|
|status|VARCHAR(50)|||✓||Статус|
|planned_audits|INTEGER|||✓||Плановое количество|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (quarter_plan_id, month)

* INDEX (status)

### Д.2.6. Таблица: orders (Приказы)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|order_number|VARCHAR(50)|||✓|✓|Номер приказа|
|order_date|DATE|||✓||Дата приказа|
|order_type|VARCHAR(50)|||✓||Тип (briefing, prescription)|
|issuer_id|INTEGER||FK|✓||FK → users (кто издал)|
|plan_id|INTEGER||FK|||FK → rev_plan_year|
|unit_id|INTEGER||FK|||FK → units|
|subject|TEXT|||||Тема приказа|
|status|VARCHAR(50)|||✓||Статус (issued, executed, cancelled)|
|order_text|TEXT|||||Текст приказа|
|template_id|VARCHAR(50)|||||ID шаблона|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (order_number)

* INDEX (order_date)

* INDEX (status)

* INDEX (issuer_id)

### Д.2.7. Таблица: audits (Ревизии)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|audit_number|VARCHAR(50)|||✓|✓|Номер ревизии|
|monthly_plan_id|INTEGER||FK|||FK → rev_plan_month|
|order_id|INTEGER||FK|||FK → orders|
|unit_id|INTEGER||FK|✓||FK → units|
|audit_type|VARCHAR(100)|||✓||Тип ревизии|
|start_date|DATE|||✓||Дата начала|
|end_date|DATE|||||Дата окончания|
|status|VARCHAR(50)|||✓||Статус (planned, in_progress, completed)|
|lead_auditor_id|INTEGER||FK|||FK → users|
|team_size|INTEGER|||||Размер комиссии|
|description|TEXT|||||Описание|
|results_summary|TEXT|||||Сводка результатов|
|total_amount|DECIMAL(18,2)|||||Общая сумма нарушений|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (audit_number)

* INDEX (unit_id)

* INDEX (status)

* INDEX (start_date)

* INDEX (lead_auditor_id)

### Д.2.8. Таблица: commission_members (Члены комиссий)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|audit_id|INTEGER||FK|✓||FK → audits|
|order_id|INTEGER||FK|✓||FK → orders|
|user_id|INTEGER||FK|✓||FK → users|
|role|VARCHAR(50)|||✓||Роль в комиссии|
|is_responsible|BOOLEAN|||||Ответственный|
|assigned_from|DATE|||||Назначен с|
|assigned_to|DATE|||||Назначен по|
|created_at|TIMESTAMP|||✓||Дата создания|

### Индексы

* UNIQUE (audit_id, user_id)

* INDEX (user_id)

### Д.2.9. Таблица: audit_reports (Акты проверок)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|audit_id|INTEGER||FK|✓||FK → audits|
|report_number|VARCHAR(50)|||✓|✓|Номер акта|
|report_date|DATE|||✓||Дата акта|
|summary|TEXT|||||Сводка|
|status|VARCHAR(50)|||✓||Статус|
|findings_count|INTEGER|||||Количество замечаний|
|violations_count|INTEGER|||||Количество нарушений|
|total_amount|DECIMAL(18,2)|||||Общая сумма|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (report_number)

* INDEX (audit_id)

* INDEX (status)

### Д.2.10. Таблица: findings (Замечания/Находки)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|report_id|INTEGER||FK|✓||FK → audit_reports|
|description|TEXT|||✓||Описание замечания|
|severity|VARCHAR(50)|||✓||Серьёзность (critical, major, minor)|
|responsible_unit_id|INTEGER||FK|||FK → units|
|due_date|DATE|||||Срок устранения|
|status|VARCHAR(50)|||✓||Статус (open, closed)|
|closure_date|DATE|||||Дата закрытия|
|created_at|TIMESTAMP|||✓||Дата создания|

### Индексы

* INDEX (report_id)

* INDEX (severity)

* INDEX (status)

### Д.2.11. Таблица: violations (Нарушения)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|audit_id|INTEGER||FK|✓||FK → audits|
|violation_type|VARCHAR(100)|||✓||Тип нарушения|
|category|VARCHAR(100)|||✓||Категория|
|description|TEXT|||✓||Описание|
|amount|DECIMAL(18,2)|||||Сумма ущерба|
|responsible_person|VARCHAR(255)|||||Ответственное лицо|
|status|VARCHAR(50)|||✓||Статус|
|discovered_date|DATE|||✓||Дата обнаружения|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* INDEX (audit_id)

* INDEX (violation_type)

* INDEX (status)

### Д.2.12. Таблица: decisions (Решения по нарушениям)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|violation_id|INTEGER||FK|✓||FK → violations|
|decision_number|VARCHAR(50)|||✓|✓|Номер решения|
|decision_type|VARCHAR(100)|||✓||Тип решения|
|description|TEXT|||✓||Описание|
|responsible_executor|VARCHAR(255)|||||Ответственный исполнитель|
|deadline|DATE|||||Срок исполнения|
|status|VARCHAR(50)|||✓||Статус|
|issued_date|DATE|||||Дата вынесения|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* UNIQUE (decision_number)

* INDEX (violation_id)

* INDEX (status)

### Д.2.13. Таблица: personnel (Личный состав)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|physical_person_id|INTEGER||FK|✓||FK → ref_physical_persons|
|service_number|VARCHAR(50)|||||Табельный номер|
|pnfl|VARCHAR(14)|||||ПИНФЛ|
|rank_id|INTEGER||FK|||FK → ref_ranks|
|unit_id|INTEGER||FK|||FK → units|
|position_id|INTEGER||FK|||FK → ref_positions|
|vus_id|INTEGER||FK|||FK → ref_vus_list|
|category_id|INTEGER||FK|||FK → ref_categories|
|status|VARCHAR(50)|||✓||Статус (active, reserve)|
|service_start_date|DATE|||||Дата поступления|
|service_end_date|DATE|||||Дата увольнения|
|clearance_level|VARCHAR(50)|||||Уровень допуска|
|emergency_contact|VARCHAR(255)|||||Экстренный контакт|
|emergency_phone|VARCHAR(50)|||||Телефон|
|full_name|TEXT|||||ФИО|
|created_at|TIMESTAMP|||✓||Дата создания|
|updated_at|TIMESTAMP|||||Дата изменения|

### Индексы

* INDEX (physical_person_id)

* INDEX (unit_id)

* INDEX (pnfl) UNIQUE

### Д.2.14. Таблица: audit_log (Журнал аудита)

|Атрибут|Тип|PK|FK|NN|UQ|Описание|
|---------|-----|----|----|----|----|---------|
|id|SERIAL|✓||✓||Идентификатор|
|user_id|INTEGER||FK|||FK → users|
|action|VARCHAR(255)|||✓||Действие (CREATE, UPDATE, DELETE)|
|table_name|VARCHAR(100)|||||Имя таблицы|
|record_id|INTEGER|||||ID записи|
|old_value|TEXT|||||Старое значение (JSON)|
|new_value|TEXT|||||Новое значение (JSON)|
|ip_address|VARCHAR(50)|||||IP адрес|
|user_agent|VARCHAR(500)|||||User Agent|
|created_at|TIMESTAMP|||✓||Дата/время|

### Индексы

* INDEX (user_id)

* INDEX (table_name)

* INDEX (record_id)

* INDEX (created_at)

---

## Д.3. СПРАВОЧНИКИ (REF_*)

### Д.3.1. Перечень справочников

|№|Таблица|Наименование|Кол-возаписей(ожидаемое)|
|---|---------|------------|---------------------------|
|1|ref_regions|Регионы|14|
|2|ref_areas|Районы/города|200+|
|3|ref_military_districts|Военные округа|5|
|4|ref_ranks|Воинские звания|50|
|5|ref_positions|Должности|200+|
|6|ref_vus_list|ВУС (вид учёта специальности)|100+|
|7|ref_categories|Категории персонала|20|
|8|ref_control_authorities|Органы контроля|20|
|9|ref_control_directions|Направления контроля|30|
|10|ref_control_types|Типы контроля|15|
|11|ref_violations|Виды нарушений|50+|
|12|ref_violation_severities|Степени серьёзности|5|
|13|ref_violation_statuses|Статусы нарушений|10|
|14|ref_violation_reasons|Причины нарушений|30|
|15|ref_inspection_types|Типы проверок|10|
|16|ref_inspection_kinds|Виды проверок|20|
|17|ref_inspection_statuses|Статусы проверок|10|
|18|ref_document_types|Типы документов|30|
|19|ref_decision_statuses|Статусы решений|10|
|20|ref_financing_sources|Источники финансирования|20|
|21|ref_budget_articles|Статьи бюджета|100+|
|22|ref_compositions|Составы (сухопутные и т.д.)|10|
|23|ref_award_penalties|Награды/взыскания|30|
|24|ref_physical_persons|Физические лица|50000+|
|25|ref_genders|Пол|2|
|26|ref_nationalities|Национальности|100+|
|27|ref_education_levels|Уровни образования|10|
|28|ref_fitness_categories|Категории годности|5|
|29|ref_security_clearances|Уровни допуска|5|

### Д.3.2. Типовая структура справочника

|Атрибут|Тип|Описание|
|---------|-----|---------|
|id|SERIAL|Идентификатор|
|code|VARCHAR(50)|Код|
|name|JSONB|Наименование (ru, uz, kaa)|
|status|VARCHAR(20)|Статус (active, inactive)|
|sort_order|INTEGER|Порядок сортировки|
|parent_id|INTEGER|Родитель (для иерархических)|
|metadata|TEXT|Дополнительные данные|
|created_at|TIMESTAMP|Дата создания|

**Примечание:** Все справочники имеют локализованные названия (JSONB с ключами 'ru', 'uz', 'kaa').

---

## Д.4. СИСТЕМНЫЕ ТАБЛИЦЫ

### Д.4.1. Таблица: sys_sessions (Сессии)

|Атрибут|Тип|Описание|
|---------|-----|---------|
|id|UUID|Идентификатор сессии|
|user_id|INTEGER|FK → users|
|refresh_token|VARCHAR(500)|Refresh токен|
|ip_address|VARCHAR(50)|IP|
|user_agent|VARCHAR(500)|Браузер|
|expires_at|TIMESTAMP|Срок действия|
|created_at|TIMESTAMP|Дата создания|

### Д.4.2. Таблица: sys_settings (Настройки)

|Атрибут|Тип|Описание|
|---------|-----|---------|
|key|VARCHAR(100)|Ключ (PK)|
|value|TEXT|Значение|
|description|TEXT|Описание|
|updated_at|TIMESTAMP|Дата изменения|

### Д.4.3. Таблица: sys_cache (Кэш)

|Атрибут|Тип|Описание|
|---------|-----|---------|
|key|VARCHAR(255)|Ключ (PK)|
|value|TEXT|Значение (JSON)|
|expires_at|TIMESTAMP|Срок действия|
|created_at|TIMESTAMP|Дата создания|

---

## Д.5. ДИАГРАММА СВЯЗЕЙ (ПОЛНАЯ)

### Д.5.1. Иерархия планирования

```text
rev_plan_year (1)
      │
      │ 1:N
      ▼
rev_plan_quarter (N)
      │
      │ 1:N
      ▼
rev_plan_month (N)
      │
      │ 1:N
      ▼
audits (N)
```text

### Д.5.2. Структура ревизии

```text
┌──────────────────┐       ┌──────────────────┐
│      orders      │       │      audits      │
│ (Приказы)        │       │   (Ревизии)      │
└────────┬─────────┘       └────────┬─────────┘
         │                          │
         │ 1:N                      │ 1:N
         ▼                          ▼
┌──────────────────┐       ┌──────────────────┐
│commission_members│       │  audit_reports   │
│ (Члены комиссий) │       │   (Акты)         │
└────────┬─────────┘       └────────┬─────────┘
         │                          │
         │ N:1                      │ 1:N
         ▼                          ▼
┌──────────────────┐       ┌──────────────────┐
│      users       │       │    findings      │
│  (Пользователи)   │       │  (Замечания)     │
└──────────────────┘       └──────────────────┘

audits (1)─────────────────────(N) violations (Нарушения)
         │
         │ 1:N
         ▼
┌──────────────────┐
│    decisions     │
│   (Решения)      │
└──────────────────┘
```text

### Д.5.3. Связь персонала и подразделений

```text
┌──────────────────┐       ┌──────────────────┐
│      units      │       │    personnel     │
│(Подразделения)   │       │ (Личный состав)   │
└────────┬─────────┘       └────────┬─────────┘
         │                          │
         │ 1:N                      │ N:1
         ▼                          ▼
┌──────────────────┐       ┌──────────────────────────┐
│   users          │       │  ref_physical_persons    │
│(Пользователи)    │       │    (Физические лица)    │
└──────────────────┘       └──────────────────────────┘
```text

---

## Д.6. ОГРАНИЧЕНИЯ ЦЕЛОСТНОСТИ

### Д.6.1. Триггеры

|Триггер|Таблица|Событие|Действие|
|---------|---------|---------|----------|
|tr_audit_log_users|users|INSERT/UPDATE/DELETE|Запись в audit_log|
|tr_audit_log_audits|audits|INSERT/UPDATE/DELETE|Запись в audit_log|
|tr_audit_log_violations|violations|INSERT/UPDATE/DELETE|Запись в audit_log|
|tr_update_updated_at|*|UPDATE|Обновление updated_at|

### Д.6.2. Check-ограничения

|Таблица|Проверка|
|---------|----------|
|rev_plan_year|year >= 2020 AND year <= 2050|
|rev_plan_quarter|quarter BETWEEN 1 AND 4|
|rev_plan_month|month BETWEEN 1 AND 12|
|decisions|deadline > issued_date|
|violations|amount >= 0|

### Д.6.3. Cascade-правила

|FK|При удалении|При обновлении|
|----|-------------|---------------|
|audits.unit_id|RESTRICT|RESTRICT|
|audits.monthly_plan_id|RESTRICT|CASCADE|
|violations.audit_id|CASCADE|RESTRICT|
|decisions.violation_id|RESTRICT|RESTRICT|
|commission_members.audit_id|CASCADE|RESTRICT|
|audit_reports.audit_id|CASCADE|RESTRICT|

---

**Дата утверждения модели данных:** _________ ___________ 2025 г.

### Утверждаю

Архитектор системы _________ /____________/ (печать)
