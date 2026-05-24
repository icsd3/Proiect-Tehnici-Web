/*
ATENTIE!
Clasa urmeaza foarte indeaproape structura din curs13.
Pentru compatibilitate cu cerinta, query-urile de tip insert/update/delete
pot construi comenzi SQL direct din valorile primite.
*/

const { Pool } = require("pg");

class AccesBD {
    static instanta = null;
    static initializat = false;

    constructor() {
        if (AccesBD.instanta) {
            throw new Error("Deja a fost instantiata clasa");
        }

        if (!AccesBD.initializat) {
            throw new Error("Clasa AccesBD trebuie instantiata doar din getInstanta()");
        }

        this.client = null;
    }

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

    getClient() {
        if (!AccesBD.instanta || !this.client) {
            throw new Error("Nu a fost initializata conexiunea la baza de date");
        }

        return this.client;
    }

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

    construiesteWhere(conditiiAnd = []) {
        if (!Array.isArray(conditiiAnd) || !conditiiAnd.length) {
            return "";
        }

        return ` where ${conditiiAnd.join(" and ")}`;
    }

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

    select({ tabel = "", campuri = [], conditiiAnd = [] } = {}, callback, parametriQuery = []) {
        const listaCampuri = Array.isArray(campuri) && campuri.length ? campuri : ["*"];
        const comanda = `select ${listaCampuri.join(",")} from ${tabel}${this.construiesteWhere(conditiiAnd)}`;

        this.getClient().query(comanda, parametriQuery, callback);
    }

    async selectAsync({ tabel = "", campuri = [], conditiiAnd = [] } = {}, parametriQuery = []) {
        const listaCampuri = Array.isArray(campuri) && campuri.length ? campuri : ["*"];
        const comanda = `select ${listaCampuri.join(",")} from ${tabel}${this.construiesteWhere(conditiiAnd)}`;
        return this.getClient().query(comanda, parametriQuery);
    }

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

    delete({ tabel = "", conditiiAnd = [] } = {}, callback) {
        const comanda = `delete from ${tabel}${this.construiesteWhere(conditiiAnd)}`;
        this.getClient().query(comanda, callback);
    }

    query(comanda, callback, parametriQuery = []) {
        this.getClient().query(comanda, parametriQuery, callback);
    }

    async queryAsync(comanda, parametriQuery = []) {
        return this.getClient().query(comanda, parametriQuery);
    }
}

module.exports = AccesBD;
