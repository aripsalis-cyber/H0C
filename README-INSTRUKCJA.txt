H0C — PAKIET WYDARZENIA + POPRAWKA MENU — WERSJA DO WGRANIA

Ten pakiet jest przygotowany jako komplet zmian do istniejącego repozytorium H0C.
Nie usuwaj innych plików repozytorium.

PLIKI DO NADPISANIA:
- index.html
- en.html
- de.html
- ru.html
- events.html
- events-en.html
- events-de.html
- events-ru.html
- events.css
- events.js
- events.json
- events-hero.png

PLIK DO DODANIA:
- h0c-header.css

CO ZOSTAŁO POPRAWIONE:
1. Menu strony głównej jest ustawione w tej samej osi co menu strony WYDARZENIA: marka po lewej, menu wyśrodkowane, flagi po prawej.
2. Flagi nie nachodzą już na „Materiały”. Są osobnym blokiem po prawej.
3. Ten sam układ nagłówka działa na PL / EN / DE / RU.
4. Odnośnik „Wydarzenia” na każdej stronie głównej prowadzi do właściwej wersji językowej kalendarza.
5. Strona WYDARZENIA została przebudowana zgodnie z zaakceptowaną wizualizacją: duży hero, pergaminowy kalendarz, 7 dni, sześć kolorowych wydarzeń, ikony, godziny, dzisiejsza linia, sekcja najbliższych wydarzeń oraz prawa kolumna z czterema wersjami językowymi.
6. Wszystkie cztery wersje kalendarza korzystają z jednego events.json.
7. Ikony wydarzeń są częścią wspólnego events.js i są takie same we wszystkich językach.
8. Grafika events-hero.png jest używana wspólnie przez hero i podglądy językowe.
9. Niemiecka nazwa turnieju została poprawiona na „Jagdturnier”.
10. Linki Regulamin / Materiały w menu są kierowane do odpowiednich wersji językowych.

WAŻNE:
- Nie usuwaj istniejących: styles.css, extra.css, background.css, hero-dragon.css.
- h0c-header.css ma być załadowany po tych arkuszach.
- events.css działa tylko dla stron wydarzeń.
- events.json jest jedynym źródłem danych kalendarza.
- Nie wgrywaj poprzednich paczek H0C_EVENTS_FIXED / H0C_EVENTS_READY równocześnie z tym pakietem.

WERYFIKACJA:
- składnia JavaScript: node --check events.js
- kompletność danych: 6 wydarzeń × 4 języki
- struktura HTML: 8 stron
- wspólny nagłówek PL / EN / DE / RU
- 4 flagi na każdej stronie
- 4 podglądy językowe na każdej stronie wydarzeń
- kolejność wydarzeń zgodna z zaakceptowaną wizualizacją
- lokalne odnośniki do stron wydarzeń
- obecność wszystkich wymaganych zasobów

Pakiet zawiera również test_hoc.sh. Nie musisz go wgrywać do repozytorium; służy wyłącznie do kontroli przed publikacją.
