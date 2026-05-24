const crypto = require("crypto");
const AccesBD = require("./accesbd.js");
const parole = require("./parole.js");
const { RolFactory } = require("./roluri.js");

class Utilizator {
    static tipConexiune = "local";
    static tabel = "utilizatori";
    static parolaCriptare = "tehniciweb";
    static emailServer = process.env.EMAIL_SERVER || "no-reply@themetalvault.local";
    static parolaEmailServer = process.env.EMAIL_SERVER_PASSWORD || "";
    static lungimeCod = 64;
    static numeDomeniu = process.env.DOMENIU_APLICATIE || "localhost:8080";
    static campuriUtilizator = [
        "id",
        "username",
        "nume",
        "prenume",
        "parola",
        "rol",
        "email",
        "culoare_chat",
        "data_adaugare",
        "cod",
        "confirmat_mail",
        "poza"
    ];

    #eroare = "";

    constructor({
        id = null,
        username = "",
        nume = "",
        prenume = "",
        email = "",
        parola = "",
        rol = "comun",
        culoare_chat = "black",
        data_adaugare = null,
        cod = null,
        confirmat_mail = false,
        poza = null
    } = {}) {
        this.id = id;
        this.username = username;
        this.nume = nume;
        this.prenume = prenume;
        this.email = email;
        this.parola = parola;
        this.culoare_chat = culoare_chat;
        this.data_adaugare = data_adaugare;
        this.cod = cod;
        this.confirmat_mail = confirmat_mail;
        this.poza = poza;
        this.rol = rol && rol.cod ? RolFactory.creeazaRol(rol.cod) : RolFactory.creeazaRol(rol);
    }

    get eroare() {
        return this.#eroare;
    }

    set eroare(mesaj) {
        this.#eroare = mesaj;
    }

    verificaNume(nume = this.nume) {
        return typeof nume === "string" && /^[A-ZĂÂÎȘȚ][a-zăâîșț]+(?:[-\s][A-ZĂÂÎȘȚ][a-zăâîșț]+)*$/u.test(nume);
    }

    verificaPrenume(prenume = this.prenume) {
        return typeof prenume === "string" && /^[A-ZĂÂÎȘȚ][a-zăâîșț]+(?:[-\s][A-ZĂÂÎȘȚ][a-zăâîșț]+)*$/u.test(prenume);
    }

    verificaUsername(username = this.username) {
        return typeof username === "string" && /^[A-Za-z0-9#_./-]{3,50}$/.test(username);
    }

    verificaEmail(email = this.email) {
        return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    verificaParola(parola = this.parola) {
        return typeof parola === "string" && parola.length >= 6;
    }

    valideazaDateDeBaza() {
        if (!this.verificaUsername()) {
            throw new Error("Username incorect");
        }

        if (!this.verificaNume()) {
            throw new Error("Nume incorect");
        }

        if (!this.verificaPrenume()) {
            throw new Error("Prenume incorect");
        }

        if (!this.verificaEmail()) {
            throw new Error("Email incorect");
        }
    }

    static criptareParola(parola) {
        return crypto.scryptSync(parola, Utilizator.parolaCriptare, Utilizator.lungimeCod).toString("hex");
    }

    static mapareCampuri(obParam = {}) {
        const campuri = {};

        for (const camp of Utilizator.campuriUtilizator) {
            if (obParam[camp] !== undefined) {
                if (camp === "rol") {
                    campuri[camp] = obParam[camp]?.cod || obParam[camp];
                } else {
                    campuri[camp] = obParam[camp];
                }
            }
        }

        return campuri;
    }

    static construiesteConditiiDinObiect(obParam = {}) {
        const campuri = Utilizator.mapareCampuri(obParam);
        const conditiiAnd = [];
        const valori = [];
        let indexParametru = 1;

        for (const [camp, valoare] of Object.entries(campuri)) {
            conditiiAnd.push(`${camp} = $${indexParametru}`);
            valori.push(valoare);
            indexParametru++;
        }

        return { conditiiAnd, valori };
    }

    async modifica(dateNoi = {}) {
        if (!this.username) {
            throw new Error("Utilizatorul curent nu are username");
        }

        const utilizatorExistent = await Utilizator.getUtilizDupaUsernameAsync(this.username);

        if (!utilizatorExistent) {
            throw new Error("Utilizatorul nu exista");
        }

        const campuriDeActualizat = { ...dateNoi };

        if (campuriDeActualizat.rol && campuriDeActualizat.rol.cod) {
            campuriDeActualizat.rol = campuriDeActualizat.rol.cod;
        }

        if (campuriDeActualizat.parola) {
            campuriDeActualizat.parola = Utilizator.criptareParola(campuriDeActualizat.parola);
        }

        if (campuriDeActualizat.username && !this.verificaUsername(campuriDeActualizat.username)) {
            throw new Error("Username incorect");
        }

        if (campuriDeActualizat.nume !== undefined && !this.verificaNume(campuriDeActualizat.nume)) {
            throw new Error("Nume incorect");
        }

        if (campuriDeActualizat.prenume !== undefined && !this.verificaPrenume(campuriDeActualizat.prenume)) {
            throw new Error("Prenume incorect");
        }

        if (campuriDeActualizat.email !== undefined && !this.verificaEmail(campuriDeActualizat.email)) {
            throw new Error("Email incorect");
        }

        return new Promise((resolve, reject) => {
            AccesBD.getInstanta({ init: Utilizator.tipConexiune }).update(
                {
                    tabel: Utilizator.tabel,
                    campuri: campuriDeActualizat,
                    conditiiAnd: [`username = '${this.username.replace(/'/g, "''")}'`]
                },
                (err, rez) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    Object.assign(this, dateNoi);

                    if (dateNoi.rol !== undefined) {
                        this.rol = dateNoi.rol && dateNoi.rol.cod ? dateNoi.rol : RolFactory.creeazaRol(dateNoi.rol);
                    }

                    resolve(rez);
                }
            );
        });
    }

    async salvareUtilizator() {
        this.valideazaDateDeBaza();

        if (!this.verificaParola()) {
            throw new Error("Parola trebuie sa aiba cel putin 6 caractere");
        }

        const utilizatorExistent = await Utilizator.getUtilizDupaUsernameAsync(this.username);

        if (utilizatorExistent) {
            throw new Error("Username-ul mai exista");
        }

        const token = parole.genereazaToken(100);
        const parolaCriptata = Utilizator.criptareParola(this.parola);
        const rolSalvat = this.rol?.cod || this.rol || "comun";
        const utilizatorCurent = this;

        return new Promise((resolve, reject) => {
            AccesBD.getInstanta({ init: Utilizator.tipConexiune }).insert(
                {
                    tabel: Utilizator.tabel,
                    campuri: {
                        username: this.username,
                        nume: this.nume,
                        prenume: this.prenume,
                        parola: parolaCriptata,
                        rol: rolSalvat,
                        email: this.email,
                        culoare_chat: this.culoare_chat,
                        cod: token,
                        confirmat_mail: this.confirmat_mail,
                        poza: this.poza
                    }
                },
                async (err, rez) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    utilizatorCurent.parola = parolaCriptata;
                    utilizatorCurent.cod = token;
                    utilizatorCurent.rol = RolFactory.creeazaRol(rolSalvat);

                    try {
                        await utilizatorCurent.trimiteMail(
                            "Te-ai inregistrat cu succes",
                            `Username-ul tau este ${utilizatorCurent.username}.`,
                            `<h1>Salut!</h1><p>Username-ul tau este ${utilizatorCurent.username}.</p><p><a href="http://${Utilizator.numeDomeniu}/cod/${utilizatorCurent.username}/${token}">Click aici pentru confirmare</a></p>`
                        );
                    } catch (eroareMail) {
                        utilizatorCurent.eroare = eroareMail.message;
                    }

                    resolve(rez);
                }
            );
        });
    }

    async sterge() {
        if (!this.username) {
            throw new Error("Utilizatorul curent nu are username");
        }

        const utilizatorExistent = await Utilizator.getUtilizDupaUsernameAsync(this.username);

        if (!utilizatorExistent) {
            throw new Error("Utilizatorul nu exista");
        }

        return new Promise((resolve, reject) => {
            AccesBD.getInstanta({ init: Utilizator.tipConexiune }).delete(
                {
                    tabel: Utilizator.tabel,
                    conditiiAnd: [`username = '${this.username.replace(/'/g, "''")}'`]
                },
                (err, rez) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(rez);
                }
            );
        });
    }

    static getUtilizDupaUsername(username, obparam, proceseazaUtiliz) {
        if (!username) {
            proceseazaUtiliz(null, obparam, -1);
            return;
        }

        AccesBD.getInstanta({ init: Utilizator.tipConexiune }).select(
            {
                tabel: Utilizator.tabel,
                campuri: ["*"],
                conditiiAnd: ["username = $1"]
            },
            (err, rezSelect) => {
                if (err) {
                    proceseazaUtiliz(null, obparam, -2);
                    return;
                }

                if (!rezSelect || rezSelect.rowCount === 0) {
                    proceseazaUtiliz(null, obparam, -1);
                    return;
                }

                proceseazaUtiliz(new Utilizator(rezSelect.rows[0]), obparam, null);
            },
            [username]
        );
    }

    static async getUtilizDupaUsernameAsync(username) {
        if (!username) {
            return null;
        }

        try {
            const rezSelect = await AccesBD.getInstanta({ init: Utilizator.tipConexiune }).selectAsync(
                {
                    tabel: Utilizator.tabel,
                    campuri: ["*"],
                    conditiiAnd: ["username = $1"]
                },
                [username]
            );

            if (rezSelect.rowCount === 0) {
                return null;
            }

            return new Utilizator(rezSelect.rows[0]);
        } catch (eroare) {
            return null;
        }
    }

    static cauta(obParam, callback) {
        const { conditiiAnd, valori } = Utilizator.construiesteConditiiDinObiect(obParam);

        AccesBD.getInstanta({ init: Utilizator.tipConexiune }).select(
            {
                tabel: Utilizator.tabel,
                campuri: ["*"],
                conditiiAnd
            },
            (err, rezSelect) => {
                if (err) {
                    callback(err, []);
                    return;
                }

                const listaUtiliz = rezSelect.rows.map((linie) => new Utilizator(linie));
                callback(null, listaUtiliz);
            },
            valori
        );
    }

    static async cautaAsync(obParam) {
        const { conditiiAnd, valori } = Utilizator.construiesteConditiiDinObiect(obParam);
        const rezSelect = await AccesBD.getInstanta({ init: Utilizator.tipConexiune }).selectAsync(
            {
                tabel: Utilizator.tabel,
                campuri: ["*"],
                conditiiAnd
            },
            valori
        );

        return rezSelect.rows.map((linie) => new Utilizator(linie));
    }

    areDreptul(drept) {
        return this.rol.areDreptul(drept);
    }

    async trimiteMail(subiect, mesajText, mesajHtml, atasamente = []) {
        let nodemailer;

        try {
            nodemailer = require("nodemailer");
        } catch (eroare) {
            throw new Error("Modulul nodemailer nu este instalat; trimiteMail() nu poate fi folosit inca.");
        }

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || "gmail",
            secure: false,
            auth: {
                user: Utilizator.emailServer,
                pass: Utilizator.parolaEmailServer
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        return transporter.sendMail({
            from: Utilizator.emailServer,
            to: this.email,
            subject: subiect,
            text: mesajText,
            html: mesajHtml,
            attachments: atasamente
        });
    }
}

module.exports = Utilizator;
