# Stage 4 Map

| Task / subtask | Code references |
|---|---|
| `npm init`, metadata, `express`, `ejs` | [package.json](package.json#L1-L38) |
| Project name / description / author / keywords | [package.json](package.json#L2-L22) |
| `npm start` script | [package.json](package.json#L25-L28) |
| Dependencies: `ejs`, `express` | [package.json](package.json#L29-L34) |
| Express import / app creation | [index.js](index.js#L1-L23) |
| EJS view engine and views folder | [index.js](index.js#L39-L40) |
| Server port `8080` | [index.js](index.js#L1253-L1271) |
| `__dirname`, `__filename`, `process.cwd()` logging | [index.js](index.js#L48-L51) |
| `views/pagini` pages | [views/pagini/index.ejs](views/pagini/index.ejs#L1-L10), [views/pagini/despre.ejs](views/pagini/despre.ejs#L1), [views/pagini/eroare.ejs](views/pagini/eroare.ejs#L1-L23) |
| `views/fragmente` fragments | [views/fragmente/head.ejs](views/fragmente/head.ejs#L1-L52), [views/fragmente/header.ejs](views/fragmente/header.ejs#L1-L126), [views/fragmente/footer.ejs](views/fragmente/footer.ejs#L1-L40) |
| Shared `head`, `header`, `footer` includes | [views/pagini/index.ejs](views/pagini/index.ejs#L5-L10), [views/pagini/index.ejs](views/pagini/index.ejs#L423-L423) |
| Global `resurse` path | [index.js](index.js#L24-L32) |
| Static `/resurse` serving | [index.js](index.js#L1136-L1147) |
| Absolute CSS/resource paths | [views/fragmente/head.ejs](views/fragmente/head.ejs#L26-L52), [views/pagini/index.ejs](views/pagini/index.ejs#L57-L59), [views/pagini/index.ejs](views/pagini/index.ejs#L140-L141) |
| `/`, `/index`, `/home` routes | [index.js](index.js#L1149-L1151) |
| Dynamic page route | [index.js](index.js#L1230-L1245) |
| Render callback with `404` / default error handling | [index.js](index.js#L896-L935) |
| `erori.json` structure | [erori.json](erori.json#L1-L31) |
| `eroare.ejs` template | [views/pagini/eroare.ejs](views/pagini/eroare.ejs#L1-L23) |
| `obGlobal.obErori` | [index.js](index.js#L24-L32) |
| `initErori()` | [index.js](index.js#L676-L711) |
| `afisareEroare(...)` | [index.js](index.js#L863-L886) |
| Extra page accessible from menu | [views/pagini/despre.ejs](views/pagini/despre.ejs#L1), [views/fragmente/header.ejs](views/fragmente/header.ejs#L29-L31), [views/fragmente/header.ejs](views/fragmente/header.ejs#L81-L83) |
| User IP in locals and header | [index.js](index.js#L43-L46), [views/fragmente/header.ejs](views/fragmente/header.ejs#L122-L124) |
| `/resurse/...` directory request returns `403` | [index.js](index.js#L1136-L1145) |
| Direct `.ejs` URL request returns `400` | [index.js](index.js#L1226-L1228) |
| `/favicon.ico` with `sendFile()` | [index.js](index.js#L1132-L1134) |
| `vect_foldere` | [index.js](index.js#L8-L8), [index.js](index.js#L24-L32) |
| Generated-folder creation | [index.js](index.js#L718-L726), [index.js](index.js#L1126-L1130) |
| `.gitignore` generated folders | [.gitignore](.gitignore#L1-L5) |
| Individual task `video-vtt` markup | [views/pagini/index.ejs](views/pagini/index.ejs#L144-L154) |
| Individual task `video-vtt` CSS | [resurse/css/general.css](resurse/css/general.css#L1274-L1290) |
| Individual task `video-vtt` tracks | [resurse/vtt/prezentare-ro.vtt](resurse/vtt/prezentare-ro.vtt#L1), [resurse/vtt/prezentare-en.vtt](resurse/vtt/prezentare-en.vtt#L1) |
| Individual task linkuri markup | [views/pagini/index.ejs](views/pagini/index.ejs#L70-L82), [views/pagini/index.ejs](views/pagini/index.ejs#L112-L121), [views/pagini/index.ejs](views/pagini/index.ejs#L235-L238), [views/pagini/index.ejs](views/pagini/index.ejs#L394-L399) |
| Individual task linkuri CSS | [resurse/css/general.css](resurse/css/general.css#L242-L285) |
| Bonus: missing `erori.json` validation | [index.js](index.js#L676-L681) |
| Bonus: duplicate JSON property validation | [index.js](index.js#L123-L208), [index.js](index.js#L683-L688) |
| Bonus: required `erori.json` root properties | [index.js](index.js#L251-L266) |
| Bonus: required `eroare_default` properties | [index.js](index.js#L278-L286) |
| Bonus: `cale_baza` folder validation | [index.js](index.js#L268-L275) |
| Bonus: error image existence validation | [index.js](index.js#L296-L324) |
| Bonus: different image per error validation | [index.js](index.js#L296-L331) |
| Bonus: duplicate `identificator` validation | [index.js](index.js#L335-L363) |

