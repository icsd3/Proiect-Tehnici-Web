# Planificarea Proiectului — CTI / Mate-Info 2025–2026 Sem. 2

## Regulament de Notare

**Deadline final** (trimitere proiect + referate): duminica din săptămâna 13

---

## Bonusuri și Penalizări

- **Bonus de timp**: 10–15%
- **Penalizare de timp**: 10% per săptămână de întârziere

### Situații în care bonusul se aplică chiar și în săptămâna cu punctaj normal:
1. Studentul a prezentat cu bonus, dar a avut greșeli și a corectat ulterior
2. Reprogramare justificată (probleme tehnice, administrative, de sănătate, aglomerare academică)
3. Amânare oficială de comun acord

> **Atenție!** Bonusul NU se aplică dacă studentul se prezintă pentru prima oară fără o amânare justificată.

### Alte precizări:
- Contează **ora trimiterii**, nu momentul prezentării. Se poate trimite și la ~90% sau cu mici buguri.
- O etapă poate fi prezentată oricând în semestru, dar e recomandat cât mai repede.
- Depunctările pot fi recuperate în etapele următoare dacă problemele sunt remediate.
- Trimiterea se face pe **Teams** (fișier HTML sau link GitHub), **nu pe mail**.
- Etapele de la 1 încolo trebuie **prezentate** pentru a fi punctate.
- Bonusurile din cadrul unei etape pot fi rezolvate și mai târziu, dar li se aplică bonusul/penalizarea de timp al etapei originale.

### Linkuri utile:
- Imagini gratuite: https://pixabay.com/
- Videoclipuri gratuite: https://www.videvo.net/ (cele marcate cu "free")

---

## Etapele Proiectului

| Etapă | Perioadă Bonus | Perioadă Punctaj Normal | Penalizări din |
|-------|---------------|------------------------|----------------|
| Etapa 0 (0.3p) | — | 02.03.2026 | — |
| Etapa 1 (1.1p) | 09.03.2026 | 16.03.2026 | — |
| Etapa 2 (0.7p) | 18.03.2026 | 23.03.2026 | — |
| Etapa 3 (0.4p) | 30.03.2026 | 02.04.2026 | — |
| Etapa 4 (~1.15p) | 06.04.2026 | 20.04.2026 | — |
| Etapa 5 (1.1p) | în completare | — | — |

---

## Etapa 0 (0.35p) — Deadline: 02.03.2026

1. **(0.025)** Alegerea temei (titlul site-ului)
2. **(0.025)** Descriere succintă — împărțirea informațiilor pe categorii și subcategorii
3. **(0.025)** Identificarea paginilor (4–5) și a legăturilor dintre ele
4. **(0.025)** Stabilirea cuvintelor/sintagmelor cheie (per site și per pagină)
5. **(0.2–0.25)** Analiza a 4–5 site-uri similare ca temă:
   - Cum au împărțit informațiile și designul
   - Minim 2 pro și 2 contra pentru fiecare site
   - Linkuri către site-uri incluse în fișier

---

## Etapa 1 (1.1p) — Bonus: 09.03 | Normal: 16.03

Crearea primei pagini HTML (fără stilizare, fără pagini multiple — acestea se generează prin Node).

> La prezentare: notați linia din cod pentru fiecare task, ca prezentarea să dureze max 3–4 minute.

### Taskuri:

1. **(0.025)** Folder proiect + `index.html` + doctype + atribut `lang` pe `<html>`
2. **(0.05)** `<title>` relevant + 4 taguri `<meta>`: charset, autor, keywords, description
3. **(0.025)** Cuvintele cheie din meta să apară de mai multe ori în pagină, în taguri relevante
   - Resurse: https://www.wordtracker.com/ sau https://app.neilpatel.com/en/ubersuggest/keyword_ideas
4. **(0.025)** Folder `resurse/ico/` + favicon generat cu https://realfavicongenerator.net (toate dimensiunile + `<meta name="msapplication-TileColor">`)
5. **(0.025)** `<body>` împărțit în `<header>`, `<main>`, `<footer>`
6. **(0.05)** Minim un tag `section`, `article` sau `aside`. Taguri de secționare imbricate. Headinguri cu nivel corespunzător imbricării (h2 direct în body, h3 în secțiune imbricată etc.)
7. **(0.025)** Minim un heading acompaniat de subtitlu cu `<hgroup>`
8. **(0.05)** Sistem de navigare în header: `<nav>` cu `<ul>` (opțiuni principale = pagini, subopțiuni pentru "Acasă" = secțiuni cu id). `<h1>` pentru titlul site-ului.
9. **(0.025)** Minim 2 taguri de grupare în secțiuni: `<p>`, `<blockquote>`, `<dl>`
10. **(0.05)** Secțiune de evenimente cu `<time datetime="...">` (dată + oră), enumerate în `<ol>` sau `<ul>`. Numele evenimentului în `<b>`, urmat de descriere.
11. **(0.05)** Imagine cu `<figure>` și `<figcaption>`. Atribut `title` pe imagine. Tagul `<picture>` cu 3 variante (mobil/tabletă/desktop, dimensiuni diferite în bytes).
12. **(0.075)** 3 din următoarele cerințe de text (la alegere):
    - a. `<b>` pe minim 3 cuvinte/sintagme cheie
    - b. `<i>` pe minim 2 termeni idiomatici (altă limbă, termeni tehnici, jargon)
    - c. `<strong>` pe un text urgent/important
    - d. `<em>` pe un cuvânt accentuat sau ironic
    - e. `<s>` pe text șters + `<ins>` pe textul înlocuit
    - f. `<abbr title="...">` pe o abreviere relevantă
    - g. `<dfn>` pe un termen mai puțin cunoscut + definiția lui
    - h. `<q>` pe un citat relevant
    - i. `<cite>` pe titlul unei lucrări citate
13. **(0.1 = 5×0.02)** Linkuri `<a>` relevante:
    - a. Link extern (altă temă relevantă), deschis în tab nou
    - b. Link cu ancoră externă (`http://ceva.com#referinta`), textul = adresa. Folosiți `<wbr>` dacă e prea lung.
    - c. Link în footer către începutul paginii
    - d. Link care conține o imagine (click = deschide imaginea mărită în tab curent)
    - e. Link de tip `download` cu atribut `download="alt_nume.png"` (necesită Live Server pentru funcționare)
14. **(0.05)** `<iframe>` cu YouTube embedded + minim 2 linkuri deasupra (în `<div>`) către alte videoclipuri + 1 link către cel din iframe. Toate se deschid în iframe (`target` pe iframe).
    - Documentație: https://developers.google.com/youtube/player_parameters
15. **(0.1)** Tabel cu sens: `<thead>`, `<tbody>`, `<tfoot>`, `<th>` în antet, minim 5 rânduri × 4 coloane, cel puțin un `rowspan` sau `colspan` ≠ 1, și `<caption>`.
16. **(0.025)** Zone `<details>` și `<summary>` (FAQ, oferte, secțiuni explicative etc.)
17. **(0.05)** Tagul `<meter>` de cel puțin 2 ori cu: `value`, `min`, `max`, `low`, `high`, `optimum`. Un `<meter>` cu valoare mică (sub `low`), unul cu valoare mare (peste `high`).
18. **(0.1 = 4×0.025)** `<address>` în footer cu:
    - a. Telefon fictiv cu `<a href="tel:...">` 
    - b. Adresă fictivă la click → Google Maps (locație: Facultatea de Matematică și Informatică). Adresa separată cu `<br>` pe mai multe rânduri.
    - c. Email fictiv cu `<a href="mailto:...">`
    - d. Link WhatsApp pentru chat
19. **(0.05)** Copyright în footer cu `<small>`, simbol `&copy;`, data creării în `<time datetime="...">` (doar dată, în română)
20. **(0.15) OBLIGATORIU** Pagina validă sintactic — se verifică cu validatorul HTML **live la prezentare**, înainte de orice altceva.

### Bonusuri Etapa 1:
- **(0.05–0.2)** Formulă în MathML (relevantă pentru site)
- **(0.05)** PDF afișat cu `<embed>` sau `<object>`
- **(0.2–0.3)** Hartă de imagini cu `<map>` și `<area>`
- **(0.05)** `<iframe>` cu locația facultății pe Google Maps
- **(0.05)** `<iframe>` cu playlist YouTube (minim 2 videoclipuri, redare automată, reluare de la început) — rezolvat doar din parametri URL

---

## Etapa 2 (0.7p) — Bonus: 18.03 | Normal: 23.03

> Unele cerințe sunt **individuale** (marcate cu link) — trebuie cont pe site pentru a le vedea.  
> Culorile din exemple nu trebuie respectate; folosiți schema cromatică proprie.

- **(0.05)** Repository local + proiect pe GitHub
- **(0.05)** Task schemă cromatică *(cerință individuală)*
- **(0.15)** Task layout *(cerință individuală)*
- **(0.25)** Task design rudimentar:
  - a. Variabile CSS pentru spațiere stânga/dreapta (egală, mai mică pe mediu, minimă pe mic)
  - b. `gap` pentru grid, descrescător pe ecran mediu și mic
  - c. Izolare vizuală zone (header, footer, grid) cu minim 3 din: background color, border, colțuri rotunjite, box-shadow
  - d. `padding` uniform pentru text în zone (variabile CSS dacă e necesar)
  - e. Elemente media cu lățime în procente + `max-width` și `min-width` (pot varia pe dimensiune ecran)
- **(0.05)** Font extern Google Fonts + icon static + icon animat din Font Awesome (kit sau CDN)
- **(0.05)** Stilizare tabel *(cerință individuală)*
- **(0.05)** Stilizare taburi iframe *(cerință individuală)*
- **(0.05)** Link top *(cerință individuală)*

### Bonusuri Etapa 2:
- **(0.05–0.15)** Reset CSS cu redefinire completă (spațieri, dimensiuni, culori, liste, tabele). Tot în unități relative (excepție: `body` și `html`). Variabile CSS pentru valori repetate. Fișier separat.
- **(0.05–0.1)** Stilizare formulă MathML (culori, dimensiuni font, bold/italic pe diferite componente)

---

## Etapa 3 (0.4p) — Bonus: 30.03 | Normal: 02.04

> Unele cerințe sunt **individuale**.

- **(0.25)** Task meniu *(cerință individuală)*
- **(0.15)** Stil printare *(cerință individuală)*

### Bonusuri Etapa 3:
- **(0.05)** Icon hamburger creat din 3 div-uri/span-uri cu background + width + height, poziționate absolut
- **(0.05)** Animație la apariția meniului hamburger pe ecran mic: schimbare culoare, transformare geometrică, opacitate — minim 3 cadre cheie
- **(0.05)** Fiecare bară din hamburger are animație proprie, cu delay succesiv generat cu `@for` în SASS

---

## Etapa 4 (~1.15p) — Bonus: 06.04 | Normal: 20.04

### Trecerea pe Node.js + EJS (1p):

1. `npm init` (nume, autor, descriere, keywords). Instalare `express` și `ejs`.
2. `index.js` cu server Express pe portul 8080.
3. Afișare `__dirname`, `__filename`, `process.cwd()`. Comentariu: sunt `__dirname` și `process.cwd()` mereu același lucru?
4. Folder `views/pagini/` și `views/fragmente/`. Extensia VS Code: EJS Language Support.
5. Decupare header, footer, `<head>` comun în fișiere EJS separate. Folosire `include()` în pagini.
6. Folder de resurse statice structurat pe subfoldere (stiluri, imagini, etc.). Definit ca `static` în Express.
7. Căile resurselor schimbate din relative în absolute față de server (ex: `/resurse/stiluri/ceva.css`).
8. `index.ejs` accesibil la `localhost:8080`, `/index` și `/home` (vector în `app.get()`).
9. `app.get("/*", ...)` general care randează `pagina.ejs` dinamic. **Trebuie să fie ultimul** `app.get()`.
10. Callback `function(eroare, rezultatRandare)` în `render()`:
    - Eroare cu `"Failed to lookup view"` → pagina 404
    - Altă eroare → pagina de eroare generică
    - Fără erori → trimite rezultatul randării la client
11. Fișier `erori.json` cu:
    - `cale_baza` — calea imaginilor pentru erori
    - `eroare_default` — obiect cu `titlu`, `text`, `imagine`
    - `info_erori` — vector de obiecte cu: `identificator`, `status` (boolean), `titlu`, `text`, `imagine` (relativă la `cale_baza`)
12. Template `eroare.ejs` — afișează `titlu`, `text`, `imagine` din `locals`.
13. Variabilă globală `obGlobal` cu proprietatea `obErori` (inițial `null`). Funcție `initErori()` care citește JSON-ul și salvează obiectul în `obGlobal.obErori`, cu căi absolute pentru imagini.
14. Funcție `afisareEroare(res, identificator, titlu, text, imagine)`:
    - Dacă eroarea există în JSON și titlu/text/imagine nu sunt date ca argumente → se folosesc datele din JSON
    - Argumentele au prioritate față de JSON
    - Fără identificator → se folosește `eroare_default`
15. Încă o pagină (descriere site, istoric, etc.) accesibilă din meniu.
16. Afișare IP utilizator în zona de date utilizator (va fi `::1` local).
17. Cerere la `/resurse/...` fără fișier specificat → eroare 403 Forbidden (din `erori.json`, template `eroare.ejs`).
18. Cerere la orice fișier `.ejs` → eroare 400 Bad Request (din `erori.json`, template `eroare.ejs`).
19. `app.get("/favicon.ico", ...)` care trimite faviconul cu `sendFile()`.
20. Vector `vect_foldere = ["temp", "logs", "backup", "fisiere_uploadate"]`. La pornire: iterare + creare foldere dacă nu există. Folosire `path.join()` pentru concatenare căi.

### Taskuri individuale:
- **(0.05)** Task video *(cerință individuală)*
- **(0.05)** Task linkuri *(cerință individuală)*
- **(0.05)** Adăugare în `.gitignore`: `node_modules` + folderele create de aplicație (subpunctul 20)

### Bonus Etapa 4 — Validare `erori.json` la pornire:
- **(0.025)** Fișierul `erori.json` nu există → mesaj + `process.exit()`
- **(0.025)** Lipsă proprietate `info_erori`, `cale_baza` sau `eroare_default`
- **(0.025)** `eroare_default` fără `titlu`, `text` sau `imagine`
- **(0.025)** Folderul din `cale_baza` nu există pe disc
- **(0.05)** Vreun fișier imagine din erori nu există pe disc (fiecare eroare cu imagine diferită)
- **(0.2)** Proprietate duplicată într-un obiect din JSON (verificare pe string, nu pe obiect parsat)
- **(0.15)** Erori duplicate cu același `identificator` în `info_erori` (mesajul listează toate proprietățile în afară de identificator)

---

## Etapa 5 (1.1p) — În completare

### Galeria Statică (0.35p) *(cerință individuală)*

### Compilare Automată SCSS (0.25p):

a. Proprietăți globale `folderScss` și `folderCss` (căi din `__dirname`). Adăugare `backup` la lista folderelor auto-create.

b. Funcție `compileazaScss(caleScss, caleCss)`:
   - Compilează SCSS → CSS cu pachetul `sass`
   - Căi absolute = folosite direct; căi relative = relative la `folderScss`/`folderCss`
   - Dacă `caleCss` lipsește → salvare în `folderCss` cu același nume, extensie `.css`

c. Backup înainte de compilare: CSS-ul vechi copiat în `resurse/css` din folderul `backup`. Folderele se creează dacă nu există. Mesaj de eroare la eșec.

d. Compilare inițială: la pornirea serverului, toate SCSS-urile din `folderScss` → CSS, cu backup înainte de suprascrie.

e. Compilare pe parcurs: `fs.watch()` pe folderul SCSS → compilare automată la modificare/creare, cu backup.

### Customizare Bootstrap cu SCSS (0.25p):
Fișier `custom.scss` cu modificări pentru:
- Background-uri pentru minim 2 teme (schema cromatică proprie)
- Culori de font
- Breakpoint-uri diferite pentru mediu și mare
- Raza border-urilor
- Dimensiunea headingurilor (h1–h6)
- Familia de font implicită
- Minim încă o variabilă la alegere

> **Atenție:** Bootstrap poate strica aspectul existent — adăugați reguli CSS corective. CSS-ul Bootstrap trebuie pus **primul**.  
> Compilarea se face **automat** cu `compileazaScss` la repornirea serverului.

### Efecte CSS (0.25p):
Se aleg efecte care însumează 0.25p (nu toate sunt obligatorii):

| Efect | Punctaj |
|-------|---------|
| Duotone | 0.05 *(cerință individuală)* |
| Reflexie | 0.15 *(cerință individuală)* |
| Text pe coloane (`column-count` + `column-rule`, o coloană pe mic/mediu) | 0.025 |
| Stilizare text selectat (`::selection`, minim 2 proprietăți) | 0.025 |
| Text care se plimbă orizontal/vertical (animație `@keyframes` recurentă, responsive) | 0.05 |
| Background fix la scroll (`background-attachment`) + schimbare imagine după t sec (animație) | 0.05 |
| Tabel responsive (minim 4 coloane, fără rowspan/colspan) | 0.05 |
| Tabel transpus pe o dimensiune de ecran (media query) | 0.025 |
| Stilizare `<hr>` | 0.1 *(cerință individuală)* |
| Video ca background (full-page) | 0.05 |

### Bonusuri Etapa 5:
- **(0.5)** Galerie animată *(cerință individuală)*
- Efecte CSS peste 0.25p → bonus adăugat la proiect
- **(0.05)** Fișierele backup să includă timestamp în nume (ex: `a_1681124489791.css`)
