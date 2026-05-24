/**
 * Obiectul exportat contine drepturile posibile din aplicatie.
 * Numele proprietatilor sunt identificatori de drepturi,
 * iar valorile sunt simboluri unice, dupa modelul din curs13.
 *
 * @type {{
 *  vizualizareUtilizatori: symbol,
 *  adaugareUtilizatori: symbol,
 *  modificareUtilizatori: symbol,
 *  stergereUtilizatori: symbol,
 *  vizualizareProduse: symbol,
 *  adaugareProduse: symbol,
 *  modificareProduse: symbol,
 *  stergereProduse: symbol,
 *  cumparareProduse: symbol,
 *  vizualizareGrafice: symbol
 * }}
 */
const Drepturi = {
    vizualizareUtilizatori: Symbol("vizualizareUtilizatori"),
    adaugareUtilizatori: Symbol("adaugareUtilizatori"),
    modificareUtilizatori: Symbol("modificareUtilizatori"),
    stergereUtilizatori: Symbol("stergereUtilizatori"),
    vizualizareProduse: Symbol("vizualizareProduse"),
    adaugareProduse: Symbol("adaugareProduse"),
    modificareProduse: Symbol("modificareProduse"),
    stergereProduse: Symbol("stergereProduse"),
    cumparareProduse: Symbol("cumparareProduse"),
    vizualizareGrafice: Symbol("vizualizareGrafice")
};

module.exports = Drepturi;
