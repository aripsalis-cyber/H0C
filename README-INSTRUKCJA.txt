H0C — FINALNA WERSJA WYDARZEŃ — PAKIET 5X VERIFIED

PRZYCZYNA POPRZEDNIEGO PROBLEMU
W wersjach EN / DE / RU przeglądarka potrafiła użyć starej wersji wspólnego CSS. Efekt był widoczny na zrzucie: kalendarz główny był ostylowany, a prawa część strony (mały kalendarz i treść panelu) pojawiała się jako surowy tekst.

NAPRAWA
- wszystkie 4 strony mają identyczną strukturę DOM; różnią się tylko tekstami i językiem,
- events.css jest ładowany z wersją cache-busting,
- events-final-lock.css jest ładowany po nim i wymusza prawidłowy układ prawego panelu,
- duży kalendarz pozostaje po lewej,
- mały/dzienny kalendarz pozostaje po prawej,
- wspólna grafika i wszystkie ikony pozostają identyczne,
- wspólne menu i flagi są identyczne, tylko teksty są tłumaczone,
- logo prowadzi do odpowiedniej strony głównej języka,
- menu mobilne jest zamknięte po wejściu na stronę,
- czcionki pozostają Cinzel + Source Serif 4.

DO KATALOGU H0C WGRAJ / ZASTĄP WSZYSTKIE PLIKI Z TEJ LISTY:
- events.html
- events-en.html
- events-de.html
- events-ru.html
- events.css
- events-final-lock.css
- events.js
- events.json
- events-hero.png
- h0c-header.css
- h0c-header.js

Po wgraniu:
1. odczekaj chwilę na GitHub Pages,
2. otwórz events.html,
3. wykonaj Ctrl+F5,
4. przełącz PL → EN → DE → RU i sprawdź każdą wersję.

NIE zmieniaj nazw plików ani rozszerzeń.

WERYFIKACJA PRZED SPakowaniem:
PASS 1/5 — HTML structure
PASS 2/5 — main + daily calendars
PASS 3/5 — shared header, flags, home links
PASS 4/5 — identical four-language structure
PASS 5/5 — CSS integrity and final layout lock
ALL 5/5 VERIFICATIONS PASSED
