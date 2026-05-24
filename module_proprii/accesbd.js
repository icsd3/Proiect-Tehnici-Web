/*
ATENTIE!
Clasa urmeaza foarte indeaproape structura din curs13.
Pentru compatibilitate cu cerinta, query-urile de tip insert/update/delete
pot construi comenzi SQL direct din valorile primite.
*/

const { Pool } = require("pg");

/**
 * Clasa singleton responsabila de accesul generic la baza de date.
 */
class AccesBD {
    static instanta = null;
    static initializat = false;

    /**
     * Creeaza instanta singleton. Constructorul este apelabil doar din `getInstanta()`.
     */
    constructor() {
        if (AccesBD.instanta) {
            throw new Error("Deja a fost instantiata clasa");
        }

        if (!AccesBD.initializat) {
            throw new Error("Clasa AccesBD trebuie instantiata doar din getInstanta()");
        }

        this.client = null;
    }

    /**
     * Initializeaza conexiunea locala la baza de date folosind valorile din mediu sau fallback-urile proiectului.
     *
     * @param {object} [config={}] - Configuratia conexiunii.
     * @param {string} [config.host] - Gazda PostgreSQL.
     * @param {number} [config.port] - Portul PostgreSQL.
     * @param {string} [config.database] - Numele bazei de date.
     * @param {string} [config.user] - Utilizatorul bazei de date.
     * @param {string} [config.password] - Parola utilizatorului bazei de date.
     * @returns {Pool} Pool-ul creat pentru interogari.
     */
    initLocal({
        host = process.env.PGHOST || "localhost",
        port = Number(process.env.PGPORT) || 5432,
        database = process.env.PGDATABASE || "themetalvault",
        user = process.env.PGUSER || "themetalvault_user",
        password = process.env.PGPASSWORD || "themetalvault_dev_password"
    } = {}) {
        this.client = new Pool({
            host,
            port,
            database,
            user,
            password
        });

        return this.client;
    }

    /**
     * Initializeaza conexiunea la baza de date folosind un obiect explicit de configurare.
     *
     * @param {{host:string, port:number, database:string, user:string, password:string}} [dateConexiune={}] - Datele conexiunii.
     * @returns {Pool} Pool-ul creat pentru interogari.
     */
    initCustom(dateConexiune = {}) {
        const { host, port, database, user, password } = dateConexiune;

        if (!host || !port || !database || !user || password === undefined) {
            throw new Error("Date de conexiune incomplete pentru initCustom()");
        }

        this.client = new Pool({
            host,
            port,
            database,
            user,
            password
        });

        return this.client;
    }

    /**
     * Returneaza clientul bazei de date asociat instantei curente.
     *
     * @returns {Pool} Pool-ul curent folosit pentru query-uri.
     */
    getClient() {
        if (!AccesBD.instanta || !this.client) {
            throw new Error("Nu a fost initializata conexiunea la baza de date");
        }

        return this.client;
    }

    /**
     * Returneaza instanta singleton si initializeaza conexiunea la prima apelare.
     *
     * @param {object} [config={}] - Configuratia de initializare.
     * @param {string} [config.init="local"] - Tipul initializarii.
     * @returns {AccesBD} Instanta unica a clasei.
     */
    static getInstanta({ init = "local", ...dateConexiune } = {}) {
        if (!this.instanta) {
            this.initializat = true;

            try {
                this.instanta = new AccesBD();

                switch (init) {
                case "local":
                    this.instanta.initLocal(dateConexiune);
                    break;
                case "custom":
                    this.instanta.initCustom(dateConexiune);
                    break;
                default:
                    throw new Error(`Tip de initializare necunoscut: ${init}`);
                }
            } catch (eroare) {
                this.instanta = null;
                throw eroare;
            } finally {
                this.initializat = false;
            }
        }

        return this.instanta;
    }

    /**
     * Construieste clauza `where` pentru o lista de conditii legate prin `and`.
     *
     * @param {string[]} [conditiiAnd=[]] - Conditiile de filtrare.
     * @returns {string} Clauza `where` sau string vid.
     */
    construiesteWhere(conditiiAnd = []) {
        if (!Array.isArray(conditiiAnd) || !conditiiAnd.length) {
            return "";
        }

        return ` where ${conditiiAnd.join(" and ")}`;
    }

    /**
     * Transforma o valoare JavaScript intr-un literal SQL simplu.
     *
     * @param {*} valoare - Valoarea de convertit.
     * @returns {string} Literalul SQL rezultat.
     */
    escapeLiteral(valoare) {
        if (valoare === null || valoare === undefined) {
            return "NULL";
        }

        if (typeof valoare === "number" || typeof valoare === "bigint") {
            return String(valoare);
        }

        if (typeof valoare === "boolean") {
            return valoare ? "true" : "false";
        }

        return `'${String(valoare).replace(/'/g, "''")}'`;
    }

    /**
     * Executa un query de tip `select` si livreaza rezultatul prin callback.
     *
     * @param {{tabel?: string, campuri?: string[], conditiiAnd?: string[]}} [optiuni={}] - Componentele query-ului.
     * @param {(err: Error|null, rez: import("pg").QueryResult) => void} callback - Functia apelata la final.
     * @param {Array<*>} [parametriQuery=[]] - Parametrii pozitionali pentru query.
     * @returns {void}
     */
    select({ tabel = "", campuri = [], conditiiAnd = [] } = {}, callback, parametriQuery = []) {
        const listaCampuri = Array.isArray(campuri) && campuri.length ? campuri : ["*"];
        const comanda = `select ${listaCampuri.join(",")} from ${tabel}${this.construiesteWhere(conditiiAnd)}`;

        this.getClient().query(comanda, parametriQuery, callback);
    }

    /**
     * Executa asincron un query de tip `select`.
     *
     * @param {{tabel?: string, campuri?: string[], conditiiAnd?: string[]}} [optiuni={}] - Componentele query-ului.
     * @param {Array<*>} [parametriQuery=[]] - Parametrii pozitionali pentru query.
     * @returns {Promise<import("pg").QueryResult>} Rezultatul interogarii.
     */
    async selectAsync({ tabel = "", campuri = [], conditiiAnd = [] } = {}, parametriQuery = []) {
        const listaCampuri = Array.isArray(campuri) && campuri.length ? campuri : ["*"];
        const comanda = `select ${listaCampuri.join(",")} from ${tabel}${this.construiesteWhere(conditiiAnd)}`;
        return this.getClient().query(comanda, parametriQuery);
    }

    /**
     * Executa un query de tip `update` pentru campuri date ca vectori sau obiect.
     *
     * @param {{tabel?: string, campuri?: string[]|Object<string,*>, valori?: Array<*>, conditiiAnd?: string[]}} [optiuni={}] - Componentele query-ului.
     * @param {(err: Error|null, rez: import("pg").QueryResult) => void} callback - Functia apelata la final.
     * @returns {void}
     */
    update({ tabel = "", campuri = [], valori = [], conditiiAnd = [] } = {}, callback) {
        let campuriActualizate = [];

        if (Array.isArray(campuri)) {
            if (campuri.length !== valori.length) {
                throw new Error("Numarul de campuri difera de numarul de valori");
            }

            campuriActualizate = campuri.map((camp, index) => `${camp}=${this.escapeLiteral(valori[index])}`);
        } else if (campuri && typeof campuri === "object") {
            campuriActualizate = Object.entries(campuri).map(([camp, valoare]) => `${camp}=${this.escapeLiteral(valoare)}`);
        } else {
            throw new Error("Parametrul campuri trebuie sa fie vector sau obiect");
        }

        const comanda = `update ${tabel} set ${campuriActualizate.join(", ")}${this.construiesteWhere(conditiiAnd)}`;
        this.getClient().query(comanda, callback);
    }

    /**
     * Executa un query de tip `insert` pentru campuri date ca vectori sau obiect.
     *
     * @param {{tabel?: string, campuri?: string[]|Object<string,*>, valori?: Array<*>}} [optiuni={}] - Componentele query-ului.
     * @param {(err: Error|null, rez: import("pg").QueryResult) => void} callback - Functia apelata la final.
     * @returns {void}
     */
    insert({ tabel = "", campuri = [], valori = [] } = {}, callback) {
        let listaCampuri = [];
        let listaValori = [];

        if (Array.isArray(campuri)) {
            if (campuri.length !== valori.length) {
                throw new Error("Numarul de campuri difera de numarul de valori");
            }

            listaCampuri = campuri;
            listaValori = valori;
        } else if (campuri && typeof campuri === "object") {
            listaCampuri = Object.keys(campuri);
            listaValori = Object.values(campuri);
        } else {
            throw new Error("Parametrul campuri trebuie sa fie vector sau obiect");
        }

        const comanda = `insert into ${tabel}(${listaCampuri.join(",")}) values (${listaValori.map((valoare) => this.escapeLiteral(valoare)).join(",")})`;
        this.getClient().query(comanda, callback);
    }

    /**
     * Executa un query de tip `delete`.
     *
     * @param {{tabel?: string, conditiiAnd?: string[]}} [optiuni={}] - Componentele query-ului.
     * @param {(err: Error|null, rez: import("pg").QueryResult) => void} callback - Functia apelata la final.
     * @returns {void}
     */
    delete({ tabel = "", conditiiAnd = [] } = {}, callback) {
        const comanda = `delete from ${tabel}${this.construiesteWhere(conditiiAnd)}`;
        this.getClient().query(comanda, callback);
    }

    /**
     * Executa un query arbitrar pe clientul curent folosind callback.
     *
     * @param {string} comanda - Comanda SQL.
     * @param {(err: Error|null, rez: import("pg").QueryResult) => void} callback - Functia apelata la final.
     * @param {Array<*>} [parametriQuery=[]] - Parametrii pozitionali pentru query.
     * @returns {void}
     */
    query(comanda, callback, parametriQuery = []) {
        this.getClient().query(comanda, parametriQuery, callback);
    }

    /**
     * Executa asincron un query arbitrar pe clientul curent.
     *
     * @param {string} comanda - Comanda SQL.
     * @param {Array<*>} [parametriQuery=[]] - Parametrii pozitionali pentru query.
     * @returns {Promise<import("pg").QueryResult>} Rezultatul interogarii.
     */
    async queryAsync(comanda, parametriQuery = []) {
        return this.getClient().query(comanda, parametriQuery);
    }
}

module.exports = AccesBD;
