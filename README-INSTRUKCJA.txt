H0C — KALENDARZ WYDARZEŃ · PAKIET DO WGRANIA
================================================

W pakiecie:
- index.html, en.html, de.html, ru.html — obecne strony główne H0C z odnośnikiem „Wydarzenia” prowadzącym do właściwej wersji kalendarza.
- wydarzenia.html — polski
- events.html — English
- ereignisse.html — Deutsch
- sobytiya.html — Русский
- calendar.css — wspólny wygląd
- calendar.js — wspólna obsługa
- events.json — JEDYNY plik do późniejszej aktualizacji terminów

WAŻNE:
1. Zachowaj nazwy plików.
2. events.json musi leżeć obok stron kalendarza.
3. Przy zmianie terminów edytuj tylko events.json.
4. Nie trzeba ręcznie poprawiać czterech wersji językowych.
5. Istniejące styles.css i extra.css muszą pozostać w repozytorium, bo strony H0C z nich korzystają.

FORMAT events.json:
id = unikalny identyfikator
category = game / hoc / alliance
start = YYYY-MM-DD
end = YYYY-MM-DD
time = np. 20:00 (może być pusty)
title = tłumaczenia pl/en/de/ru
url = opcjonalny link do osobnej instrukcji wydarzenia

Kalendarz ma:
- poprzedni/następny tydzień
- przycisk Dzisiaj / Today / Heute / Сегодня
- wyróżnienie bieżącego dnia
- wspólne dane dla wszystkich 4 języków
- widok responsywny
- automatyczne przejście na bieżący tydzień po otwarciu

6. Pakiet zawiera też działające menu mobilne na stronie kalendarza.
7. Po wgraniu do GitHub Pages nie trzeba ustawiać żadnego serwera ani bazy danych.
