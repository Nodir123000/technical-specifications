# 📦 Репозиторий Навыков (Skills Registry)

Каждый навык — атомарная, тестируемая функция, которую агент вызывает как инструмент.

## Индекс навыков

| Skill ID | Файл | Агент-владелец | Стандарт |
|:---|:---|:---|:---|
| `kru-inspection-expert` | [kru-inspection-expert.md](./kru-inspection-expert.md) | Process Agent | O'z DSt 1987 §6.5.1 |
| `automated-reporting` | [automated-reporting.md](./automated-reporting.md) | Process Agent | O'z DSt 1987 §6.5.2 |
| `security-guardian` | [security-guardian.md](./security-guardian.md) | Security Agent | O'z DSt 2814 |
| `access-control` | [access-control.md](./access-control.md) | Security Agent | O'z DSt 2814 §4 |
| `deadline-watchdog` | [deadline-watchdog.md](./deadline-watchdog.md) | Process Agent | O'z DSt 1987 §6.5.3 |
| `i18n-localization` | [i18n-localization.md](./i18n-localization.md) | User Agent | — |
| `external-integration` | [external-integration.md](./external-integration.md) | Integration Agent | O'z DSt 1987 §6.5.4 |
| `logging-diagnostics` | [logging-diagnostics.md](./logging-diagnostics.md) | Monitoring Agent | O'z DSt 2814 §7 |
| `step-validator` | [step-validator.md](./step-validator.md) | Process Agent | O'z DSt 1987 §6.5.1 |
| `data-validation` | [data-validation.md](./data-validation.md) | Integration Agent | O'z DSt 1987 §6.5.2 |

## Шаблон навыка

Каждый файл навыка содержит:
1. **Описание** — что делает, зачем
2. **Входные параметры** — схема данных на входе
3. **Выходные параметры** — схема данных на выходе
4. **SLA** — время выполнения, допустимый % ошибок
5. **Preconditions / Postconditions**
6. **Error Flows** — что происходит при сбое
7. **Тест-кейсы** — Happy Path + Error Path

---
*Версия: 1.0 | Дата: 2026-04-18*
