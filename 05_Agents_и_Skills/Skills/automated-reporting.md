# 📊 Skill: automated-reporting

**ID:** `automated-reporting`
**Версия:** 1.0
**Владелец:** Process Agent
**Стандарт:** O'z DSt 1987:2018 §6.5.2 — Выходные формы и отчётность

---

## Описание

Автоматическая генерация итоговых документов ревизии: Акт ревизии, Справка о нарушениях, KPI-отчёты. Поддерживает форматы XLSX и PDF. Применяет официально утверждённые шаблоны Министерства.

---

## Входные параметры

```json
{
  "report_type": "enum: [ACT_REVISION, VIOLATIONS_SUMMARY, KPI_DASHBOARD, ANNUAL_REPORT]",
  "audit_id": "string (UUID)",
  "findings": "array (результат kru-inspection-expert)",
  "period": {
    "from": "date",
    "to": "date"
  },
  "output_format": "enum: [XLSX, PDF, BOTH]",
  "locale": "enum: [ru, uz-Lat, uz-Cyr]",
  "signed_by": {
    "name": "string",
    "position": "string",
    "digital_signature": "string (base64, опционально)"
  }
}
```

---

## Выходные параметры

```json
{
  "report_id": "string (UUID)",
  "files": [
    {
      "format": "enum: [XLSX, PDF]",
      "url": "string (внутренний путь к файлу)",
      "size_bytes": "number",
      "checksum_sha256": "string"
    }
  ],
  "page_count": "number",
  "generated_at": "datetime",
  "template_version": "string"
}
```

---

## SLA

| Метрика | Значение |
|:---|:---|
| Время генерации XLSX (p95) | ≤ 5000 мс |
| Время генерации PDF (p95) | ≤ 10000 мс |
| Максимальный размер файла | 50 МБ |
| Допустимый % ошибок | < 0.1% |

---

## Preconditions

* `audit_id` существует и имеет статус `APPROVED` или `COMPLETED`

* `findings` не пустой массив (кроме типа `KPI_DASHBOARD`)

* Пользователь имеет право генерации отчётов (роль `INSPECTOR+`)

* Шаблон документа для указанного `report_type` существует в системе

## Postconditions

* Файл сохранён в защищённом хранилище

* Запись о генерации создана в `report_registry`

* Событие `REPORT_GENERATED` отправлено в Monitoring Agent

* Ссылка на файл доступна через API `/api/reports/:report_id`

---

## Error Flows

| Ошибка | Действие |
|:---|:---|
| Шаблон не найден | Вернуть ошибку `TEMPLATE_NOT_FOUND`, уведомить администратора |
| Ошибка рендеринга PDF | Повтор с резервным рендерером; если снова ошибка — вернуть только XLSX |
| Хранилище недоступно | Записать в очередь повторной отправки, уведомить дежурного |
| Слишком большой отчёт (>50 МБ) | Разбить на части, вернуть архив ZIP |

---

## Тест-кейсы

### TC-01: Акт ревизии PDF + XLSX

**Вход:** 5 нарушений, locale=ru, format=BOTH
**Ожидание:** 2 файла, PDF ≤ 10с, XLSX ≤ 5с, checksum заполнен

### TC-02: Локализация UZ-Lat

**Вход:** locale=uz-Lat
**Ожидание:** Все заголовки и даты на узбекском (латиница), формат даты ДД.ОО.ЙЙЙЙ

### TC-03: Пустые нарушения для KPI

**Вход:** report_type=KPI_DASHBOARD, findings=[]
**Ожидание:** Успешная генерация, нулевые значения в таблицах

---

*Версия: 1.0 | Дата: 2026-04-18*
