# Stage 7 Map

| Task / subtask | Code references |
|---|---|
| `animatie-banner`: shared script loading | [views/fragmente/head.ejs](views/fragmente/head.ejs#L51-L51) |
| `animatie-banner`: banner markup | [views/fragmente/footer.ejs](views/fragmente/footer.ejs#L30-L33) |
| `animatie-banner`: additional cookie display placeholder | [views/fragmente/footer.ejs](views/fragmente/footer.ejs#L27-L27) |
| `animatie-banner`: fixed bottom full-width banner CSS | [resurse/css/general.css](resurse/css/general.css#L38-L62) |
| `animatie-banner`: `Ok` button CSS | [resurse/css/general.css](resurse/css/general.css#L64-L94) |
| `animatie-banner`: desktop keyframes | [resurse/css/general.css](resurse/css/general.css#L96-L119) |
| `animatie-banner`: desktop animation activation | [resurse/css/general.css](resurse/css/general.css#L121-L129) |
| `animatie-banner`: static medium / small layout | [resurse/css/general.css](resurse/css/general.css#L132-L145) |
| `animatie-banner`: acceptance cookie flow | [resurse/js/cookies.js](resurse/js/cookies.js#L58-L80), [resurse/js/cookies.js](resurse/js/cookies.js#L88-L91) |
| `animatie-banner`: 5-second cookie lifetime | [resurse/js/cookies.js](resurse/js/cookies.js#L1-L1), [resurse/js/cookies.js](resurse/js/cookies.js#L50-L50), [resurse/js/cookies.js](resurse/js/cookies.js#L77-L77) |
| `animatie-banner`: `setCookie` | [resurse/js/cookies.js](resurse/js/cookies.js#L3-L7), [resurse/js/cookies.js](resurse/js/cookies.js#L83-L86) |
| `animatie-banner`: `getCookie` | [resurse/js/cookies.js](resurse/js/cookies.js#L9-L22), [resurse/js/cookies.js](resurse/js/cookies.js#L83-L86) |
| `animatie-banner`: `deleteCookie` | [resurse/js/cookies.js](resurse/js/cookies.js#L24-L26), [resurse/js/cookies.js](resurse/js/cookies.js#L83-L86) |
| `animatie-banner`: `deleteAllCookies` | [resurse/js/cookies.js](resurse/js/cookies.js#L28-L38), [resurse/js/cookies.js](resurse/js/cookies.js#L83-L86) |
| `animatie-banner`: extra `ultima_pagina_accesata` cookie | [resurse/js/cookies.js](resurse/js/cookies.js#L40-L55), [resurse/js/cookies.js](resurse/js/cookies.js#L88-L90) |
| `animatie-banner`: extra cookie CSS | [resurse/css/general.css](resurse/css/general.css#L29-L36) |
| `animatie-banner`: print separation | [views/fragmente/footer.ejs](views/fragmente/footer.ejs#L4-L4), [resurse/css/general.css](resurse/css/general.css#L1353-L1356) |
| `AccesBD`: module import in app | [index.js](index.js#L6-L37) |
| `AccesBD`: class / singleton fields | [module_proprii/accesbd.js](module_proprii/accesbd.js#L10-L30) |
| `AccesBD`: `initLocal()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L32-L59) |
| `AccesBD`: `initCustom()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L61-L83) |
| `AccesBD`: `getClient()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L85-L96) |
| `AccesBD`: `getInstanta()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L98-L131) |
| `AccesBD`: `select()` / `selectAsync()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L169-L195) |
| `AccesBD`: `update()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L197-L221) |
| `AccesBD`: `insert()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L223-L250) |
| `AccesBD`: `delete()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L252-L262) |
| `AccesBD`: `query()` / `queryAsync()` | [module_proprii/accesbd.js](module_proprii/accesbd.js#L264-L284) |
| `AccesBD`: export | [module_proprii/accesbd.js](module_proprii/accesbd.js#L288-L288) |
| `AccesBD`: enum category usage | [index.js](index.js#L942-L955) |
| `AccesBD`: products list usage | [index.js](index.js#L963-L987) |
| `AccesBD`: individual product usage | [index.js](index.js#L995-L1023) |
| `Drepturi`: symbol rights object | [module_proprii/drepturi.js](module_proprii/drepturi.js#L1-L30) |
| `Drepturi`: export | [module_proprii/drepturi.js](module_proprii/drepturi.js#L32-L32) |
| `Roluri`: base `Rol` | [module_proprii/roluri.js](module_proprii/roluri.js#L3-L50) |
| `Roluri`: `RolAdmin` | [module_proprii/roluri.js](module_proprii/roluri.js#L52-L73) |
| `Roluri`: `RolModerator` | [module_proprii/roluri.js](module_proprii/roluri.js#L75-L101) |
| `Roluri`: `RolClient` | [module_proprii/roluri.js](module_proprii/roluri.js#L103-L127) |
| `Roluri`: `RolFactory` | [module_proprii/roluri.js](module_proprii/roluri.js#L129-L150) |
| `Roluri`: exports | [module_proprii/roluri.js](module_proprii/roluri.js#L153-L159) |
| `Utilizator`: users SQL schema | [sql/03_create_users_schema.sql](sql/03_create_users_schema.sql#L1-L24) |
| `Utilizator`: class and static fields | [module_proprii/utilizator.js](module_proprii/utilizator.js#L1-L32) |
| `Utilizator`: constructor / properties | [module_proprii/utilizator.js](module_proprii/utilizator.js#L34-L77) |
| `Utilizator`: validation methods | [module_proprii/utilizator.js](module_proprii/utilizator.js#L98-L169) |
| `Utilizator`: password hashing | [module_proprii/utilizator.js](module_proprii/utilizator.js#L171-L179) |
| `Utilizator`: field mapping / conditions | [module_proprii/utilizator.js](module_proprii/utilizator.js#L181-L221) |
| `Utilizator`: update method | [module_proprii/utilizator.js](module_proprii/utilizator.js#L224-L290) |
| `Utilizator`: save / insert method | [module_proprii/utilizator.js](module_proprii/utilizator.js#L292-L356) |
| `Utilizator`: delete method | [module_proprii/utilizator.js](module_proprii/utilizator.js#L358-L390) |
| `Utilizator`: username lookup methods | [module_proprii/utilizator.js](module_proprii/utilizator.js#L392-L458) |
| `Utilizator`: search methods | [module_proprii/utilizator.js](module_proprii/utilizator.js#L460-L507) |
| `Utilizator`: rights check | [module_proprii/utilizator.js](module_proprii/utilizator.js#L509-L517) |
| `Utilizator`: mail method | [module_proprii/utilizator.js](module_proprii/utilizator.js#L519-L556) |
| `Utilizator`: export | [module_proprii/utilizator.js](module_proprii/utilizator.js#L560-L560) |
| `Utilizator`: token helper | [module_proprii/parole.js](module_proprii/parole.js#L14-L32) |
| `JSDoc`: `AccesBD` module | [module_proprii/accesbd.js](module_proprii/accesbd.js#L10-L19), [module_proprii/accesbd.js](module_proprii/accesbd.js#L32-L41), [module_proprii/accesbd.js](module_proprii/accesbd.js#L169-L189) |
| `JSDoc`: `Drepturi` module | [module_proprii/drepturi.js](module_proprii/drepturi.js#L1-L18) |
| `JSDoc`: `Roluri` module | [module_proprii/roluri.js](module_proprii/roluri.js#L3-L49), [module_proprii/roluri.js](module_proprii/roluri.js#L129-L138) |
| `JSDoc`: `Utilizator` module | [module_proprii/utilizator.js](module_proprii/utilizator.js#L6-L49), [module_proprii/utilizator.js](module_proprii/utilizator.js#L98-L151), [module_proprii/utilizator.js](module_proprii/utilizator.js#L224-L295), [module_proprii/utilizator.js](module_proprii/utilizator.js#L392-L527) |
| `JSDoc`: `parole` module | [module_proprii/parole.js](module_proprii/parole.js#L14-L19) |
| `JSDoc`: main program helpers | [index.js](index.js#L53-L58), [index.js](index.js#L245-L250), [index.js](index.js#L486-L490), [index.js](index.js#L776-L782), [index.js](index.js#L888-L895), [index.js](index.js#L937-L940), [index.js](index.js#L1247-L1252) |
| `bootstrap_js`: Bootstrap product card markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L216-L290) |
| `bootstrap_js`: card link / button to product page | [views/pagini/produse.ejs](views/pagini/produse.ejs#L250-L252), [views/pagini/produse.ejs](views/pagini/produse.ejs#L285-L288) |
| `bootstrap_js`: progressive reveal timers | [resurse/js/produse.js](resurse/js/produse.js#L81-L104), [resurse/js/produse.js](resurse/js/produse.js#L468-L469) |
| `bootstrap_js`: reveal after filtering | [resurse/js/produse.js](resurse/js/produse.js#L203-L211) |
| `bootstrap_js`: reveal after sorting | [resurse/js/produse.js](resurse/js/produse.js#L419-L435) |
| `bootstrap_js`: reveal after reset | [resurse/js/produse.js](resurse/js/produse.js#L393-L396) |
| `bootstrap_js`: reveal CSS | [resurse/css/general.css](resurse/css/general.css#L620-L633) |
| `bootstrap_js`: product card CSS | [resurse/css/general.css](resurse/css/general.css#L635-L729) |

