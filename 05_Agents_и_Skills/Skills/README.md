# 📦 Репозиторий Навыков (Skills Registry)

Каждый навык — атомарная, тестируемая функция, которую агент вызывает как инструмент.

## Индекс навыков

| SkillID | Файл | Агент-владелец | Стандарт |
|:---|:---|:---|:---|
| `kru-inspection-expert` | [kru-inspection-expert.md](./kru-inspection-expert.md) | ProcessAgent | O'zDSt1987§6.5.1 |
| `automated-reporting` | [automated-reporting.md](./automated-reporting.md) | ProcessAgent | O'zDSt1987§6.5.2 |
| `security-guardian` | [security-guardian.md](./security-guardian.md) | SecurityAgent | O'zDSt2814 |
| `access-control` | [access-control.md](./access-control.md) | SecurityAgent | O'zDSt2814§4 |
| `deadline-watchdog` | [deadline-watchdog.md](./deadline-watchdog.md) | ProcessAgent | O'zDSt1987§6.5.3 |
| `i18n-localization` | [i18n-localization.md](./i18n-localization.md) | UserAgent | — |
| `local-excel-import` | [local-excel-import.md](./local-excel-import.md) | IntegrationAgent | O'zDSt1987§6.5.4 |
| `logging-diagnostics` | [logging-diagnostics.md](./logging-diagnostics.md) | MonitoringAgent | O'zDSt2814§7 |
| `step-validator` | [step-validator.md](./step-validator.md) | ProcessAgent | O'zDSt1987§6.5.1 |
| `data-validation` | [data-validation.md](./data-validation.md) | IntegrationAgent | O'zDSt1987§6.5.2 |

## Шаблон навыка

Каждый файл навыка содержит:

1. **Описание** — что делает, зачем

1. **Входные параметры** — схема данных на входе

1. **Выходные параметры** — схема данных на выходе

1. **SLA** — время выполнения, допустимый % ошибок

1. **Preconditions / Postconditions**

1. **Error Flows** — что происходит при сбое

1. **Тест-кейсы** — Happy Path + Error Path

---

### Сведения о документе

##### Версия: 1.0 | Дата: 2026-04-18
