# 🇪🇪 Riigid & Rahvused

Интерактивный тренажёр для изучения эстонских названий стран, национальностей и падежных форм.

**[▶ Играть](https://vicso-name.github.io/riigid-rahvused/)**

![screenshot](screenshot.png)

## Что тренируем

| Категория | Пример |
|-----------|--------|
| Riik (страна) | Inglismaa, Saksamaa, Eesti... |
| Rahvus (национальность) | inglane, sakslane, eestlane... |
| Kus? (где?) | Inglismaal, Saksamaal, Eestis... |
| Rahvused (мн.ч.) | inglased, sakslased, eestlased... |

14 стран · 6 типов вопросов · 30 раундов за игру

## Как играет

1. **Раунды 1–15** — выбор правильного ответа из 4 вариантов
2. **Раунды 16–30** — ввод ответа вручную (хардкор-режим)
3. Подсказки: **50/50**, **Пропуск**, **Первые буквы**
4. Прогресс-бар, счётчик серии правильных ответов, итоговый экран

## Технологии

- Чистый HTML + CSS + JavaScript (один файл, ~500 строк)
- Zero dependencies
- Mobile-first, работает оффлайн
- Статический хостинг (GitHub Pages)

## Запуск локально

```bash
git clone https://github.com/vicso-name/riigid-rahvused.git
cd riigid-rahvused
open index.html
```

Или просто открой `index.html` в браузере.

## Деплой на GitHub Pages

1. Зайди в **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Сохрани — через минуту сайт будет на `https://vicso-name.github.io/riigid-rahvused/`

## Лицензия

[MIT](LICENSE)
