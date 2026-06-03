# Stage 6 Map

| Task / subtask | Code references |
|---|---|
| PostgreSQL access for products | [index.js](index.js#L6-L37), [module_proprii/accesbd.js](module_proprii/accesbd.js#L13-L288) |
| Product enum schema | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql#L6-L18) |
| Product table schema | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql#L20-L34) |
| Seeded products | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql#L50-L356) |
| Base products route family | [index.js](index.js#L1153-L1183) |
| Task 2: individual product query | [index.js](index.js#L995-L1023) |
| Task 2: individual product route | [index.js](index.js#L1185-L1224) |
| Task 2: individual product template | [views/pagini/produs.ejs](views/pagini/produs.ejs#L1-L105) |
| Task 2: list links to individual product pages | [views/pagini/produse.ejs](views/pagini/produse.ejs#L250-L252), [views/pagini/produse.ejs](views/pagini/produse.ejs#L285-L288) |
| Task 4: database enum as category source | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql#L6-L18), [index.js](index.js#L942-L955) |
| Task 4: categories passed through locals | [index.js](index.js#L896-L906), [index.js](index.js#L1155-L1173), [views/fragmente/header.ejs](views/fragmente/header.ejs#L2-L2) |
| Task 4: desktop `Produse` menu | [views/fragmente/header.ejs](views/fragmente/header.ejs#L49-L59) |
| Task 4: mobile `Produse` menu | [views/fragmente/header.ejs](views/fragmente/header.ejs#L101-L111) |
| Task 4: `toate` submenu option | [views/fragmente/header.ejs](views/fragmente/header.ejs#L54-L55), [views/fragmente/header.ejs](views/fragmente/header.ejs#L106-L107) |
| Task 4: category submenu options | [views/fragmente/header.ejs](views/fragmente/header.ejs#L56-L58), [views/fragmente/header.ejs](views/fragmente/header.ejs#L108-L110) |
| Task 4: same products EJS for all categories | [index.js](index.js#L1153-L1173), [views/pagini/produse.ejs](views/pagini/produse.ejs#L1-L394) |
| Task 4: server-side category filtering | [index.js](index.js#L963-L987), [index.js](index.js#L1153-L1173) |
| Task 4: invalid category rejection | [index.js](index.js#L1158-L1166) |
| Task 7: products grid / flex display | [views/pagini/produse.ejs](views/pagini/produse.ejs#L216-L293), [resurse/css/general.css](resurse/css/general.css#L590-L729) |
| Task 7: text filter on multi-value tags | [views/pagini/produse.ejs](views/pagini/produse.ejs#L55-L61), [views/pagini/produse.ejs](views/pagini/produse.ejs#L225-L232), [resurse/js/produse.js](resurse/js/produse.js#L168-L187) |
| Task 7: subcategory checkbox group | [views/pagini/produse.ejs](views/pagini/produse.ejs#L160-L174), [resurse/js/produse.js](resurse/js/produse.js#L49-L51), [resurse/js/produse.js](resurse/js/produse.js#L172-L183) |
| Task 7: subcategory checked by default | [views/pagini/produse.ejs](views/pagini/produse.ejs#L167-L170), [resurse/js/produse.js](resurse/js/produse.js#L380-L382) |
| Task 7: exclusion multiselect | [views/pagini/produse.ejs](views/pagini/produse.ejs#L117-L127), [resurse/js/produse.js](resurse/js/produse.js#L45-L47), [resurse/js/produse.js](resurse/js/produse.js#L175-L187) |
| Category radio server navigation | [views/pagini/produse.ejs](views/pagini/produse.ejs#L98-L114), [resurse/js/produse.js](resurse/js/produse.js#L40-L63), [resurse/js/produse.js](resurse/js/produse.js#L408-L412) |
| Bonus 4: automatic filtering on input / change | [resurse/js/produse.js](resurse/js/produse.js#L203-L211), [resurse/js/produse.js](resurse/js/produse.js#L398-L417) |
| Task 8: sort buttons markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L188-L197) |
| Task 8: sort by subcategory, then price | [resurse/js/produse.js](resurse/js/produse.js#L224-L245) |
| Task 8: sort button handlers | [resurse/js/produse.js](resurse/js/produse.js#L419-L435) |
| Task 8: calculation button markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L198-L201) |
| Task 8: calculation popup JS | [resurse/js/produse.js](resurse/js/produse.js#L331-L362), [resurse/js/produse.js](resurse/js/produse.js#L437-L443) |
| Task 8: calculation popup CSS | [resurse/css/general.css](resurse/css/general.css#L565-L578) |
| Task 8 / 9: reset button markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L202-L205) |
| Task 9: reset confirmation and default restoration | [resurse/js/produse.js](resurse/js/produse.js#L364-L396), [resurse/js/produse.js](resurse/js/produse.js#L445-L445) |
| Task 10: validation warning markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L49-L49) |
| Task 10: validation JS | [resurse/js/produse.js](resurse/js/produse.js#L106-L166), [resurse/js/produse.js](resurse/js/produse.js#L203-L211), [resurse/js/produse.js](resurse/js/produse.js#L419-L443) |
| Task 10: validation CSS | [resurse/css/general.css](resurse/css/general.css#L429-L433), [resurse/css/general.css](resurse/css/general.css#L549-L562) |
| Bonus 3: no-products message markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L216-L219) |
| Bonus 3: no-products message JS | [resurse/js/produse.js](resurse/js/produse.js#L69-L79), [resurse/js/produse.js](resurse/js/produse.js#L190-L201) |
| Bonus 3: no-products message CSS | [resurse/css/general.css](resurse/css/general.css#L609-L618) |
| Bonus 15: displayed-products counter markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L212-L214) |
| Bonus 15: displayed-products counter JS | [resurse/js/produse.js](resurse/js/produse.js#L69-L79) |
| Bonus 15: displayed-products counter CSS | [resurse/css/general.css](resurse/css/general.css#L594-L607) |
| Single-product page shell | [views/pagini/produs.ejs](views/pagini/produs.ejs#L1-L13), [views/pagini/produs.ejs](views/pagini/produs.ejs#L97-L105) |
| Single-product 3-column detail layout | [views/pagini/produs.ejs](views/pagini/produs.ejs#L31-L96), [resurse/css/general.css](resurse/css/general.css#L809-L950) |
| Single-product 2-column responsive layout | [resurse/css/general.css](resurse/css/general.css#L1610-L1618) |
| Single-product 1-column responsive layout | [resurse/css/general.css](resurse/css/general.css#L1684-L1696) |
| Bonus 9: `folder_imagini` database field | [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql#L20-L34), [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql#L36-L48), [sql/02_create_products_schema_and_seed.sql](sql/02_create_products_schema_and_seed.sql#L358-L359) |
| Bonus 9: product images derived from folder | [index.js](index.js#L1025-L1108) |
| Bonus 9: individual product gallery markup | [views/pagini/produs.ejs](views/pagini/produs.ejs#L23-L25), [views/pagini/produs.ejs](views/pagini/produs.ejs#L31-L67) |
| Bonus 9: individual product gallery JS | [resurse/js/produs.js](resurse/js/produs.js#L1-L55) |
| Bonus 9: individual product gallery CSS | [resurse/css/general.css](resurse/css/general.css#L825-L909) |
| Bonus 11: product image opens details modal | [views/pagini/produse.ejs](views/pagini/produse.ejs#L244-L246) |
| Bonus 11: product details modal markup | [views/pagini/produse.ejs](views/pagini/produse.ejs#L295-L380) |
| Bonus 11: modal and modal-gallery JS | [resurse/js/produse.js](resurse/js/produse.js#L257-L329), [resurse/js/produse.js](resurse/js/produse.js#L447-L466) |
| Bonus 11: modal CSS | [resurse/css/general.css](resurse/css/general.css#L731-L798) |
| Bootstrap-styled product controls | [views/pagini/produse.ejs](views/pagini/produse.ejs#L41-L210), [resurse/scss/custom.scss](resurse/scss/custom.scss#L60-L72), [resurse/css/general.css](resurse/css/general.css#L396-L562) |
| Bootstrap product cards | [views/pagini/produse.ejs](views/pagini/produse.ejs#L222-L290), [resurse/css/general.css](resurse/css/general.css#L620-L729) |
| Site-wide theme toggle markup | [views/fragmente/header.ejs](views/fragmente/header.ejs#L7-L9) |
| Site-wide theme initialization / script loading | [views/fragmente/head.ejs](views/fragmente/head.ejs#L10-L23), [views/fragmente/head.ejs](views/fragmente/head.ejs#L52-L52) |
| Site-wide theme JS | [resurse/js/tema.js](resurse/js/tema.js#L1-L75) |
| Site-wide theme color variables | [resurse/css/reset.css](resurse/css/reset.css#L10-L47) |
| Site-wide theme button CSS | [resurse/css/general.css](resurse/css/general.css#L158-L189) |
| Products theme-derived variables | [resurse/css/general.css](resurse/css/general.css#L372-L390) |

