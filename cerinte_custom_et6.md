1. **Descriere cerință. Pagină produse.**

   Va exista o pagina de produse in care trebuie listate datele pentru anumite produse/entitati specifice site-ului (le vom numi de acum inainte "entitatile aplicatiei"). Entitatile aplicatiei vor fi, de exemplu,carti pentru o librarie sau un site de lectii online, tipuri de prajituri si fursecuri pentru o cofetarie, flori si buchete pentru o florarie etc. - dacă nu aveți idei de produse, îmi dați mesaj și ne gândim împreună. Tipul de entitate trebuie sa fie strict legat de tema site-ului. În pagina de produse **nu** se vor afișa toate detaliile produselor ci doar cele relevante pentru filtrare/sortare (ideal cele mai importante detalii, precum specificații des căutate de către utilizatori).

2. **Descriere cerință. Pagină produs unic.** Se va genera automat prin program câte o pagina pentru fiecare produs (conform exemplului dat la curs si/sau laborator). Pagina respectivă va afisa toate detaliile produsului (inclusiv cele care nu apar in pagina de produse). Pentru asta, se trimite prin intermediul obiectului locals(ejs) datele produsului.

3. **Baza de date. Tabelul de produse**

   Se va crea o baza de date pentru proiect. Se va crea un tabel de produse. Se va crea un utilizator (al bazei de date), folosit în program, pentru care se aloca drepturi pe baza de date și tabel. Datele cuprinzand proprietățile produselor (pentru afișarea în pagina) se vor prelua din tabel. Produsele trebuie sa contina minim urmatoarele proprietati (pentru a avea cu ce să lucrăm în aplicația de sortare/filtrare):

   a. id (identificatorul unic, din json; id-ul trebuie sa fie numeric)

   b. nume

   c. descriere

   d. o imagine (in tabel se va salva doar calea catre imagine)

   e. categorie mare (o clasificare a entitatilor din date, de exemplu, daca e vorba de pisici, sa fie clasificate dupa rasa sau talie, daca e vorba de carti, dupa tematica, daca e vorba de calculatoare: de birou, de gaming etc). Categoria se va face cu ajutorul unei enumeratii, nu va fi de tip string. Enumeratia ar trebui să aibă maxim 5 valori.

   f. Un mod de categorizare mai puțin important (de exemplu, pentru pisici: după culoare sau după lungimea blanei, pentru cărți: o subtematică sau tipul de hârtie folosit (carte cartonată, hârtie simplă, hârtie lucioasă, carte cu învelitoare), sau tipul de expediere posibilă (curier, de la centrul de distribuție, poștă), vârsta pentru care e indicat produsul respectiv (copii, adolescenți, adulți), pentru flori, de exemplu, pot fi modurile de prezentare( floare singură, buchet, ghiveci, floare presată etc).

   g. pret (sau alta caracteristica cu valoare numerica)

   h. o a doua caracteristică numerică (de exemplu - pentru diverse produse- poate fi: dimensiune, volum, o specificatie tehnică precum putere sau tensiune, numărul de pagini pentru o carte, numărul de caractere/randuri/imagini/alte elemente care apar pe o felicitare, numărul de culori, timpul de garanție, gramaj, număr de calorii pentru un produs alimentar etc)

   i. caracteristica cu valoare de tip Date (data calendaristica) - de exemplu poate fi data de când există produsul în oferta magazinului.

   j. caracteristica care poate sa aiba doar o singura valoare pentru o entitate (dint-un set de valori - de exemplu, culoarea)

   k. caracteristica care poate sa aiba mai multe valori pentru o entitate (poate fi folosit intr-un select de tip multiplu; in tabel valorile vor fi puse intr-un singur camp si vor fi separate cu virgula, de exemplu pentru un produs alimentar, campul ar putea fi ingrediente cu valoarea "sare, faina, lapte, branza").

   l. caracteristica booleana (de exemplu, are sau nu are o anumită caracteristică, poate sau nu să fie expediat prin poștă, admite sau nu voucher; exemple pentru diverse proprietăți: pentru cărți: include sau nu semn de carte; pentru prăjituri: bun sau nu pentru bolnavii de diabet, pentru fast-food, include sau nu un anumit alergen, pentru imagini/felicitări ei color sau nu, etc.)

   **Dacă nu aveți idei pentru o anumită caracteristică potrivită pentru produsele site-ului vostru, îmi dați mesaj și discutăm ce s-ar potrivi mai bine.**

   Se vor introduce in tabel 15-20 entitati cu caracteristici suficiente de diversificate (pentru a putea verifica toate tipurile de filtre si sortari)

4. **Meniu. Împărțirea pe categorii mari**

   În meniu se va adăuga o opțiune nouă numita "Produse". Opțiunea va avea următoare subopțiuni: toate (în sensul că se afișează toate produsele), categ_1, categ_2, ....categ_n (acestea sunt numele valorilor categoriei mari). **Valorile categoriei mari, care apar in meniu trebuie generate pe baza enumeratiei din baza de date (**nu se scriu manual ci se generează prin program **și se transmit în meniu prin locals)**. La click pe o astfel de subopțiune, se vor afișa în pagina doar produsele corespunzătoare acelei categorii. Atenție, filtrarea se va face aici la nivel de server, în sensul că request-ul de server trimis spre afișare conține doar produsele din categoria cerută din meniu. Toate subopțiunile vor face același ape get, dar cu parametri diferiți (cu alte cuvinte folosiți același ejs pentru afișarea tuturor produselor cât și afișarea pe categorii).

5. **Format afișare produse (pentru pagina de produse).**

   Produsele se vor afisa prin ejs, cu ajutorul unui for care populeaza un template cu informatiile fiecarui element din fisierul de date. La inceput se vor afisa toate produsele, dar prin completarea unor inputuri de filtrare se vor pastra doar o parte din produse in pagina (cele care nu corespund filtrului setat doar vor fi ascunse, nu sterse din DOM, pentru a le putea folosi si in filtrari ulterioare).

   **Formatul template-ului e cel precizat mai jos:**

   Va exista un element de tip article care va avea un heading de nivel corespunzator, cu numele entitatii.

   Restul afisarii se va împărți pe doua coloane

   Prima coloana va contine categoria entitatii. De asemenea articolul cuprinzand entitatea va trebui sa aiba printre eventuale alte clase (atributul class) si numele categoriei (deci categoria trebuie sa nu cuprinda spatii)

   Sub categorie va fi afisata imaginea, si mai jos un paragraf cu descrierea. Pentru estetica, imaginile ar trebui sa fie de aceeasi dimensiune si relativ mici ca sa incapa langa descriere

   In a doua coloana, vor fi afisate una sub alta in interiorul articolului (deci fiecare caracteristica pe un rand separat):

   1. caracteristica numerica
   2. caracteristica cu o singura valoare string
   3. caracteristica cu mai multe valori string
   4. caracteristica data
   5. caracteristica booleana

   Data calendaristica se va scrie cu ajutorul tagului \<time>. Continutul tagului va fi data in limba romana in formatul: 'zi-nume_luna-an [zi_saptamana]', de exemplu, 15-Septembrie-2018 [Sambata]

   Fiecare caracteristica va fi precizata printr-o pereche de forma nume_caracteristica: valoare_caracteristica. Numele caracteristicii va fi bold si cu o culoare de background sau de text diferita de cea a valorii

   Id-ul fiecarui articol este de forma "ar_ent_"+id, unde id e id-ul efectiv din fisierul de date (deci id-uri posibile ar fi: ar_ent_2, ar_ent_7, ...)

   Puteți adăuga alte elemente de stilizare dar fără a modifica cerinta. Dacă aveți nevoie de date în plus pentru filtrare/sortare le puteți include în format, însă e important să nu apară toate detaliile produsului, acestea fiind rezervate pentru pagina proprie produsului.

6. **Filtre. Inputuri**

   Va exista si o sectiune (care sa nu fie form chiar daca contine inputuri) deasupra zonei de afisare a produselor, care va contine urmatoarele tipuri de input, fiecare corespunzând unui camp dintre caracteristicile entitatilor/produselor. Toate inputurile vor avea si o etichetă asociată (label). **Pentru anumite inputuri din lista de mai jos veți primi cerințe specifice la subpunctul următor (deci le veți integra in acele cerințe, nu folosiți același tip de input de 2 ori); restul de inputuri vor avea rol decis de voi în filtrare.**

   a. input de tip text

   b. input de tip range. Pentru inputul de tip range trebuie sa apara valoarea minima in stanga lui si valoarea maxima in dreapta lui, și de asemenea să se afișeze valoarea selectată (de exemplu în parantează, după valoarea maximă).

   c. datalist

   d. grup de inputuri de tip radio (va avea si o optiune generala care sa nu aplice niciun filtru)

   e. input de tip checkbox sau grup de inputuri de tip checkbox (în funcție de tipul de filtru)

   f. textarea

   g. select simplu (prima optiune va fi si cea default (initial selectata), cu textul "nimic" sau "oricare" sau ceva asemănător care să se refere la situația în care acel filtru nu ne interesează.

   h. select multiplu

   Valorile inițiale ale inputurilor vor fi de așa natură încât să se potrivească cu toate produsele. De exemplu dacă sunt mai multe tipuri de culoare pentru produs și folosim un grup de radiobuttons pentru ele, să existe și un radiobutton pentru opțiunea "orice culoare" care va fi implicit selectat.

7. **Cerințe specifice filtre.**

   Produsele se vor afișa fie cu ajutorul unui grid, fie folosind flexbox.

   a. Inputul de tip text va fi pentru caracteristica care poate sa aiba mai multe valori pentru o entitate. Inputul de tip text poate conține doar un subșir din valoare. Se vor selecta toate produsele care au macar o valoare (pentru acea caracteristică) care să conțină subșirul din input.

   b.

   Se va face un grup de checkbox pentru subcategorie (categoria de mai mică importanță). Se vor afișa produsele care au drept subcategorie valoarea selectată din minim unul dintre checkboxuri. Implicit vor fi bifate toate checkboxurile, ca să se afișeze toate produsele.

   c. selectul multiplu va avea eticheta "Selectați valorile pe care NU le doriți" și va fi dedicat caracteristicii care poate sa aiba mai multe valori. Se vor afișa dor produsele pentru care niciuna dintre valori nu corespunde vreuneia selectate în obiectul select.

   Pentru filtrele/inputurile pentru care nu s-a precizat cum anume să fie implementate în pagina, alegeți voi pentru ce caracteristici să se aplice și în ce manieră. Nu e voie să aveți două filtre pentru aceeași proprietate a produsului.

8. **Butoane. Operațiile efective de filtrare/sortare/calculare**

   Alături de filtre vor exista și următoarele butoane:

   1. Un buton cu textul "filtreaza" care va filtra entitatile dupa **toate** inputurile activate.
   2. Doua butoane de sortare (unul pentru ascendent si unul pentru descendent). Sortarea se va face dupa doua chei, de exemplu daca se sorteaza după cheile c1 și c2, intai se va sorta după c1, si pentru valori egale pentru c1, se va sorta după c2. **Cele două chei după care trebuie să sortați** sunt, în ordine: subcategoria(categoria de mai mică importanță) și prețul
   3. Un buton de calculare (de exemplu, calculeaza suma/media/minimul/maximul tuturor prețurilor sau doar al prețurilor elementelor selectate). Calculul va aparea într-un div cu poziție fixă, care va fi creat dinamic (createElement), va sta pe ecran 2 secunde si apoi va dispărea (va fi șters).
   4. Un buton de resetare a filtrelor.

9. (Specificatii pentru anul 2 CTI) La click pe butonul de resetare, printr-un mesaj de tip "confirm" utilizatorul va fi intrebat daca vrea cu adevarat sa reseteze filtrele. Daca raspunde "ok", toate filtrele vor reveni la valorile implicite care corespund afișării tuturor produselor. Se reafișează toate produsele (fără niciun filtru aplicat) și în ordinea inițială (resetarea anulează și sortarea).

10. [Edit: era inainte paragraf, l-am facut item de lista pentru claritate; enunturi 1 si acelasi pentru anii 2,3,4] La click pe oricare dintre butoanele de filtrare/sortare/calculare se va verifica intai ca inputurile afectate de ele au valori valide (în special inputul de tip text și textarea-ul), si numai daca sunt valide se va realiza operatia. Daca valorile nu sunt valide, se afiseaza un mesaj de atentionare relevant. In cazul în care nu e specificat clar in cerintele de mai jos cum sa fie acest mesaj, studentul poate alege sa il afiseze cum doreste, astfel incat sa fie bine integrat in aplicatie (de exemplu un alert sau marcarea cu rosu a inputului cu probleme). Studentul va alege care sunt cazurile de input invalid (de exemplu in inputul de tip text a fost introdusa o cifra, si nu are sens pentru aplicatie, sau nu a fost selectat niciun radiobutton, sau inputul de tip textarea este vid etc).
