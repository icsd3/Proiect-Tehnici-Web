const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const vect_foldere = ["temp", "logs", "backup", "fisiere_uploadate"];
const varianteGalerie = [
    {
        nume: "mic",
        latime: 250
    },
    {
        nume: "mediu",
        latime: 400
    }
];
const paginiCuGalerieStatica = new Set(["index", "galerie"]);
const app = express();
const obGlobal = {
    obErori: null,
    obGalerie: null,
    folderProiect: __dirname,
    folderResurse: path.join(__dirname, "resurse"),
    vect_foldere
};

global.obGlobal = obGlobal;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", true);

app.use(function (req, res, next) {
    res.locals.ipUtilizator = req.ip;
    next();
});

console.log("__dirname:", __dirname);
console.log("__filename:", __filename);
console.log("process.cwd():", process.cwd());
console.log("__dirname si process.cwd() sunt egale doar daca serverul este pornit din folderul in care se afla index.js.");

function opresteAplicatiaPentruErori(mesaje) {
    console.error("Configurare invalida pentru erori.json:");

    for (const mesaj of mesaje) {
        console.error(`- ${mesaj}`);
    }

    process.exit(1);
}

function citesteStringJson(text, pozitieStart) {
    let rezultat = "";
    let pozitie = pozitieStart + 1;

    while (pozitie < text.length) {
        const caracter = text[pozitie];

        if (caracter === "\\") {
            rezultat += caracter + (text[pozitie + 1] || "");
            pozitie += 2;
            continue;
        }

        if (caracter === "\"") {
            return {
                valoare: rezultat,
                pozitieFinal: pozitie
            };
        }

        rezultat += caracter;
        pozitie++;
    }

    return {
        valoare: rezultat,
        pozitieFinal: pozitie
    };
}

function calculeazaLinie(text, pozitie) {
    return text.substring(0, pozitie).split(/\r?\n/).length;
}

function gasesteProprietatiDuplicateJson(text) {
    const duplicate = [];
    const stiva = [];

    function marcheazaValoareInParinte() {
        const parinte = stiva[stiva.length - 1];

        if (!parinte) {
            return;
        }

        if (parinte.tip === "obiect" && parinte.asteapta === "valoare") {
            parinte.asteapta = "dupa_valoare";
        }
    }

    for (let i = 0; i < text.length; i++) {
        const caracter = text[i];
        const context = stiva[stiva.length - 1];

        if (/\s/.test(caracter)) {
            continue;
        }

        if (caracter === "\"") {
            const sir = citesteStringJson(text, i);

            if (context && context.tip === "obiect" && context.asteapta === "cheie") {
                if (context.chei.has(sir.valoare)) {
                    duplicate.push(`Proprietatea "${sir.valoare}" este duplicata in obiect JSON la linia ${calculeazaLinie(text, i)}.`);
                } else {
                    context.chei.add(sir.valoare);
                }

                context.asteapta = "doua_puncte";
            } else {
                marcheazaValoareInParinte();
            }

            i = sir.pozitieFinal;
            continue;
        }

        if (caracter === "{") {
            marcheazaValoareInParinte();
            stiva.push({
                tip: "obiect",
                chei: new Set(),
                asteapta: "cheie"
            });
            continue;
        }

        if (caracter === "[") {
            marcheazaValoareInParinte();
            stiva.push({ tip: "vector" });
            continue;
        }

        if (caracter === "}" || caracter === "]") {
            stiva.pop();
            continue;
        }

        if (caracter === ":" && context && context.tip === "obiect" && context.asteapta === "doua_puncte") {
            context.asteapta = "valoare";
            continue;
        }

        if (caracter === "," && context && context.tip === "obiect") {
            context.asteapta = "cheie";
            continue;
        }

        if (context && context.tip === "obiect" && context.asteapta === "valoare") {
            context.asteapta = "dupa_valoare";
        }
    }

    return duplicate;
}

function areProprietate(obiect, proprietate) {
    return Object.prototype.hasOwnProperty.call(obiect, proprietate);
}

function caleServerCatreDisc(caleServer) {
    const segmente = caleServer.split(/[\\/]+/).filter(Boolean);
    return path.join(__dirname, ...segmente);
}

function descrieEroareFaraIdentificator(eroare) {
    return Object.entries(eroare)
        .filter(([cheie]) => cheie !== "identificator")
        .map(([cheie, valoare]) => `${cheie}: ${JSON.stringify(valoare)}`)
        .join(", ");
}

function valideazaObiectErori(erori) {
    const mesaje = [];

    if (!erori || typeof erori !== "object" || Array.isArray(erori)) {
        return ["Fisierul erori.json trebuie sa contina un obiect JSON la radacina."];
    }

    for (const proprietate of ["cale_baza", "eroare_default", "info_erori"]) {
        if (!areProprietate(erori, proprietate)) {
            mesaje.push(`Lipseste proprietatea obligatorie "${proprietate}".`);
        }
    }

    if (mesaje.length) {
        return mesaje;
    }

    if (typeof erori.cale_baza !== "string" || !erori.cale_baza.trim()) {
        mesaje.push("Proprietatea \"cale_baza\" trebuie sa fie un string nevid.");
    } else {
        const caleFolderErori = caleServerCatreDisc(erori.cale_baza);

        if (!fs.existsSync(caleFolderErori) || !fs.statSync(caleFolderErori).isDirectory()) {
            mesaje.push(`Folderul indicat de "cale_baza" nu exista pe disc: ${caleFolderErori}`);
        }
    }

    if (!erori.eroare_default || typeof erori.eroare_default !== "object" || Array.isArray(erori.eroare_default)) {
        mesaje.push("Proprietatea \"eroare_default\" trebuie sa fie obiect JSON.");
    } else {
        for (const proprietate of ["titlu", "text", "imagine"]) {
            if (!areProprietate(erori.eroare_default, proprietate)) {
                mesaje.push(`"eroare_default" nu are proprietatea obligatorie "${proprietate}".`);
            }
        }
    }

    if (!Array.isArray(erori.info_erori)) {
        mesaje.push("Proprietatea \"info_erori\" trebuie sa fie vector.");
    }

    if (mesaje.length) {
        return mesaje;
    }

    const imaginiFolosite = new Set();
    const eroriCuImagini = [
        {
            eticheta: "eroare_default",
            eroare: erori.eroare_default
        },
        ...erori.info_erori.map((eroare, index) => ({
            eticheta: `info_erori[${index}]`,
            eroare
        }))
    ];

    for (const { eticheta, eroare } of eroriCuImagini) {
        if (!eroare || typeof eroare !== "object" || Array.isArray(eroare)) {
            mesaje.push(`${eticheta} trebuie sa fie obiect JSON.`);
            continue;
        }

        for (const proprietate of ["titlu", "text", "imagine"]) {
            if (!areProprietate(eroare, proprietate)) {
                mesaje.push(`${eticheta} nu are proprietatea obligatorie "${proprietate}".`);
            }
        }

        if (areProprietate(eroare, "imagine")) {
            const caleImagine = path.join(caleServerCatreDisc(erori.cale_baza), eroare.imagine);

            if (!fs.existsSync(caleImagine) || !fs.statSync(caleImagine).isFile()) {
                mesaje.push(`Imaginea pentru ${eticheta} nu exista pe disc: ${caleImagine}`);
            }

            if (imaginiFolosite.has(eroare.imagine)) {
                mesaje.push(`Imaginea "${eroare.imagine}" este folosita de mai multe erori; fiecare eroare trebuie sa aiba imagine diferita.`);
            }

            imaginiFolosite.add(eroare.imagine);
        }
    }

    const eroriDupaIdentificator = new Map();

    for (const [index, eroare] of erori.info_erori.entries()) {
        if (!eroare || typeof eroare !== "object" || Array.isArray(eroare)) {
            continue;
        }

        for (const proprietate of ["identificator", "status", "titlu", "text", "imagine"]) {
            if (!areProprietate(eroare, proprietate)) {
                mesaje.push(`info_erori[${index}] nu are proprietatea obligatorie "${proprietate}".`);
            }
        }

        if (areProprietate(eroare, "identificator")) {
            if (!eroriDupaIdentificator.has(eroare.identificator)) {
                eroriDupaIdentificator.set(eroare.identificator, []);
            }

            eroriDupaIdentificator.get(eroare.identificator).push(eroare);
        }
    }

    for (const [identificator, eroriDuplicate] of eroriDupaIdentificator.entries()) {
        if (eroriDuplicate.length > 1) {
            const detalii = eroriDuplicate
                .map((eroare) => `{ ${descrieEroareFaraIdentificator(eroare)} }`)
                .join(" | ");
            mesaje.push(`Identificator duplicat "${identificator}" in info_erori. Obiecte duplicate fara identificator: ${detalii}`);
        }
    }

    return mesaje;
}

function opresteAplicatiaPentruGalerieInvalida(mesaje) {
    console.error("Configurare invalida pentru galerie.json:");

    for (const mesaj of mesaje) {
        console.error(`- ${mesaj}`);
    }

    process.exit(1);
}

function valideazaObiectGalerie(galerie) {
    const mesaje = [];

    if (!galerie || typeof galerie !== "object" || Array.isArray(galerie)) {
        return ["Fisierul galerie.json trebuie sa contina un obiect JSON la radacina."];
    }

    for (const proprietate of ["cale_galerie", "imagini"]) {
        if (!areProprietate(galerie, proprietate)) {
            mesaje.push(`Lipseste proprietatea obligatorie "${proprietate}".`);
        }
    }

    if (mesaje.length) {
        return mesaje;
    }

    if (typeof galerie.cale_galerie !== "string" || !galerie.cale_galerie.trim()) {
        mesaje.push("Proprietatea \"cale_galerie\" trebuie sa fie un string nevid.");
    } else {
        const caleFolderGalerie = caleServerCatreDisc(galerie.cale_galerie);

        if (!fs.existsSync(caleFolderGalerie) || !fs.statSync(caleFolderGalerie).isDirectory()) {
            mesaje.push(`Folderul indicat de "cale_galerie" nu exista pe disc: ${caleFolderGalerie}`);
        }
    }

    if (!Array.isArray(galerie.imagini)) {
        mesaje.push("Proprietatea \"imagini\" trebuie sa fie vector.");
    }

    if (mesaje.length) {
        return mesaje;
    }

    const caleFolderGalerie = caleServerCatreDisc(galerie.cale_galerie);

    for (const [index, imagine] of galerie.imagini.entries()) {
        if (!imagine || typeof imagine !== "object" || Array.isArray(imagine)) {
            mesaje.push(`imagini[${index}] trebuie sa fie obiect JSON.`);
            continue;
        }

        for (const proprietate of ["cale_imagine", "descriere", "sfert_ora"]) {
            if (!areProprietate(imagine, proprietate)) {
                mesaje.push(`imagini[${index}] nu are proprietatea obligatorie "${proprietate}".`);
            }
        }

        if (areProprietate(imagine, "titlu") && typeof imagine.titlu !== "string") {
            mesaje.push(`imagini[${index}].titlu trebuie sa fie string daca exista.`);
        }

        if (areProprietate(imagine, "alt") && typeof imagine.alt !== "string") {
            mesaje.push(`imagini[${index}].alt trebuie sa fie string daca exista.`);
        }

        if (areProprietate(imagine, "cale_imagine")) {
            if (typeof imagine.cale_imagine !== "string" || !imagine.cale_imagine.trim()) {
                mesaje.push(`imagini[${index}].cale_imagine trebuie sa fie string nevid.`);
            } else if (path.isAbsolute(imagine.cale_imagine) || imagine.cale_imagine.split(/[\\/]+/).includes("..")) {
                mesaje.push(`imagini[${index}].cale_imagine trebuie sa fie o cale relativa simpla.`);
            } else {
                const caleImagine = path.join(caleFolderGalerie, ...imagine.cale_imagine.split(/[\\/]+/).filter(Boolean));

                if (!fs.existsSync(caleImagine) || !fs.statSync(caleImagine).isFile()) {
                    mesaje.push(`Imaginea pentru imagini[${index}] nu exista pe disc: ${caleImagine}`);
                }
            }
        }

        if (areProprietate(imagine, "descriere") && (typeof imagine.descriere !== "string" || !imagine.descriere.trim())) {
            mesaje.push(`imagini[${index}].descriere trebuie sa fie string nevid.`);
        }

        if (areProprietate(imagine, "sfert_ora")) {
            const valoriSfert = String(imagine.sfert_ora).split(/[,\s]+/).filter(Boolean);

            if (!valoriSfert.length || valoriSfert.some((valoare) => !["1", "2", "3", "4"].includes(valoare))) {
                mesaje.push(`imagini[${index}].sfert_ora trebuie sa contina valori intre 1 si 4.`);
            }
        }
    }

    return mesaje;
}

function initGalerie() {
    const caleGalerie = path.join(__dirname, "galerie.json");

    if (!fs.existsSync(caleGalerie)) {
        opresteAplicatiaPentruGalerieInvalida([`Fisierul galerie.json nu exista la calea: ${caleGalerie}`]);
    }

    const continut = fs.readFileSync(caleGalerie, "utf-8").replace(/^\uFEFF/, "");
    const proprietatiDuplicate = gasesteProprietatiDuplicateJson(continut);

    if (proprietatiDuplicate.length) {
        opresteAplicatiaPentruGalerieInvalida(proprietatiDuplicate);
    }

    let galerie;

    try {
        galerie = JSON.parse(continut);
    } catch (eroare) {
        opresteAplicatiaPentruGalerieInvalida([`Fisierul galerie.json nu este JSON valid: ${eroare.message}`]);
    }

    const eroriValidare = valideazaObiectGalerie(galerie);

    if (eroriValidare.length) {
        opresteAplicatiaPentruGalerieInvalida(eroriValidare);
    }

    galerie.cale_galerie = galerie.cale_galerie.replace(/\\/g, "/");
    galerie.imagini = galerie.imagini.map(function (imagine) {
        const caleRelativa = imagine.cale_imagine.split(/[\\/]+/).filter(Boolean).join("/");
        const numeImagine = path.parse(path.basename(caleRelativa)).name;
        const caleDisc = path.join(caleServerCatreDisc(galerie.cale_galerie), ...caleRelativa.split("/"));

        return {
            cale_imagine: caleRelativa,
            cale_server: path.posix.join(galerie.cale_galerie, caleRelativa),
            cale_disc: caleDisc,
            titlu: imagine.titlu && imagine.titlu.trim() ? imagine.titlu.trim() : numeImagine,
            alt: imagine.alt && imagine.alt.trim() ? imagine.alt.trim() : numeImagine,
            descriere: imagine.descriere.trim(),
            sfert_ora: String(imagine.sfert_ora),
            licenta: imagine.licenta ?? "",
            licenta_url: imagine.licenta_url ?? "",
            autor: imagine.autor ?? "",
            sursa: imagine.sursa ?? "",
            modificari: imagine.modificari ?? ""
        };
    });

    obGlobal.obGalerie = galerie;
}

function calculeazaSfertOraCurent(data = new Date()) {
    return Math.floor(data.getMinutes() / 15) + 1;
}

function imagineEsteInSfertOra(imagine, sfertOra) {
    return imagine.sfert_ora
        .split(/[,\s]+/)
        .filter(Boolean)
        .includes(String(sfertOra));
}

async function asiguraVariantaGalerie(imagine, varianta) {
    const numeFisier = path.parse(imagine.cale_imagine).name;
    const extensie = path.extname(imagine.cale_imagine).toLowerCase() || ".jpg";
    const numeVarianta = `${numeFisier}-${varianta.nume}${extensie}`;
    const caleFolderDisc = path.join(caleServerCatreDisc(obGlobal.obGalerie.cale_galerie), "generate");
    const caleDiscVarianta = path.join(caleFolderDisc, numeVarianta);
    const caleServerVarianta = path.posix.join(obGlobal.obGalerie.cale_galerie, "generate", numeVarianta);

    if (!fs.existsSync(caleFolderDisc)) {
        fs.mkdirSync(caleFolderDisc, { recursive: true });
    }

    if (!fs.existsSync(caleDiscVarianta) || fs.statSync(caleDiscVarianta).mtimeMs < fs.statSync(imagine.cale_disc).mtimeMs) {
        await sharp(imagine.cale_disc)
            .resize({
                width: varianta.latime,
                height: varianta.latime,
                fit: "cover"
            })
            .toFile(caleDiscVarianta);
    }

    return caleServerVarianta;
}

async function pregatesteImagineGalerie(imagine) {
    const [caleServerMic, caleServerMediu] = await Promise.all(varianteGalerie.map((varianta) => asiguraVariantaGalerie(imagine, varianta)));

    return {
        ...imagine,
        cale_server_mic: caleServerMic,
        cale_server_mediu: caleServerMediu
    };
}

async function obtineGalerieStatica() {
    const sfertOra = calculeazaSfertOraCurent();

    if (!obGlobal.obGalerie) {
        return {
            sfertOra,
            imagini: []
        };
    }

    const imagini = obGlobal.obGalerie.imagini
        .filter((imagine) => imagineEsteInSfertOra(imagine, sfertOra))
        .slice(0, 10);

    return {
        sfertOra,
        imagini: await Promise.all(imagini.map((imagine) => pregatesteImagineGalerie(imagine)))
    };
}

function initErori() {
    const caleErori = path.join(__dirname, "erori.json");

    if (!fs.existsSync(caleErori)) {
        opresteAplicatiaPentruErori([`Fisierul erori.json nu exista la calea: ${caleErori}`]);
    }

    const continut = fs.readFileSync(caleErori, "utf-8").replace(/^\uFEFF/, "");
    const proprietatiDuplicate = gasesteProprietatiDuplicateJson(continut);

    if (proprietatiDuplicate.length) {
        opresteAplicatiaPentruErori(proprietatiDuplicate);
    }

    let erori;

    try {
        erori = JSON.parse(continut);
    } catch (eroare) {
        opresteAplicatiaPentruErori([`Fisierul erori.json nu este JSON valid: ${eroare.message}`]);
    }

    const eroriValidare = valideazaObiectErori(erori);

    if (eroriValidare.length) {
        opresteAplicatiaPentruErori(eroriValidare);
    }

    erori.eroare_default.imagine = path.posix.join(erori.cale_baza, erori.eroare_default.imagine);

    for (const eroare of erori.info_erori) {
        eroare.imagine = path.posix.join(erori.cale_baza, eroare.imagine);
    }

    obGlobal.obErori = erori;
}

function creareFoldereGenerate() {
    for (const folder of obGlobal.vect_foldere) {
        const caleFolder = path.join(__dirname, folder);

        if (!fs.existsSync(caleFolder)) {
            fs.mkdirSync(caleFolder, { recursive: true });
        }
    }
}

function afisareEroare(res, identificator, titlu, text, imagine) {
    let eroare = null;

    if (identificator !== undefined && identificator !== null) {
        eroare = obGlobal.obErori.info_erori.find((infoEroare) => infoEroare.identificator === identificator);
    }

    const eroareDefault = obGlobal.obErori.eroare_default;
    const dateEroare = eroare || eroareDefault;
    const statusEroare = eroare && eroare.status ? eroare.identificator : 200;

    res.status(statusEroare).render(path.join("pagini", "eroare"), {
        titlu: titlu ?? dateEroare.titlu,
        text: text ?? dateEroare.text,
        imagine: imagine ?? dateEroare.imagine
    }, function (eroareRandare, rezultatRandare) {
        if (eroareRandare) {
            res.status(500).send("A aparut o eroare la randarea paginii de eroare.");
            return;
        }

        res.send(rezultatRandare);
    });
}

async function randarePagina(res, pagina, locals = {}) {
    const localsRandare = { ...locals };

    try {
        if (localsRandare.galerieStatica === undefined && paginiCuGalerieStatica.has(pagina)) {
            localsRandare.galerieStatica = await obtineGalerieStatica();
        }
    } catch (eroare) {
        console.error(eroare);
        afisareEroare(res);
        return;
    }

    res.render(path.join("pagini", pagina), localsRandare, function (eroare, rezultatRandare) {
        if (eroare) {
            if (eroare.message.startsWith("Failed to lookup view")) {
                afisareEroare(res, 404);
            } else {
                console.error(eroare);
                afisareEroare(res);
            }
            return;
        }

        res.send(rezultatRandare);
    });
}

initErori();
initGalerie();
creareFoldereGenerate();

app.get("/favicon.ico", function (req, res) {
    res.sendFile(path.join(__dirname, "resurse", "ico", "favicon.ico"));
});

app.use("/resurse", function (req, res, next) {
    const caleResursa = path.join(obGlobal.folderResurse, req.path);

    if (req.path === "/" || req.path.endsWith("/") || (fs.existsSync(caleResursa) && fs.statSync(caleResursa).isDirectory())) {
        afisareEroare(res, 403);
        return;
    }

    next();
});

app.use("/resurse", express.static(obGlobal.folderResurse));

app.get(["/", "/index", "/home"], function (req, res) {
    randarePagina(res, "index");
});

app.get(/.*\.ejs$/, function (req, res) {
    afisareEroare(res, 400);
});

// Express 5 cere nume pentru wildcard; ruta pastreaza comportamentul cerut pentru "/*".
app.get("/*pagina", function (req, res) {
    const pagina = req.params.pagina.join("/");

    if (!pagina || pagina.includes("..") || path.isAbsolute(pagina)) {
        afisareEroare(res, 403);
        return;
    }

    if (path.extname(pagina)) {
        afisareEroare(res, 404);
        return;
    }

    randarePagina(res, pagina);
});

function pornesteServer(port) {
    const server = app.listen(port, function () {
        console.log(`Serverul a pornit pe http://localhost:${port}`);
    });

    server.on("error", function (eroare) {
        if (eroare.code === "EADDRINUSE" && !process.env.PORT && Number(port) === 8080) {
            const portAlternativ = 8081;
            console.warn(`Portul ${port} este ocupat. Incerc portul ${portAlternativ}.`);
            pornesteServer(portAlternativ);
            return;
        }

        throw eroare;
    });
}

const port = Number(process.env.PORT) || 8080;
pornesteServer(port);
