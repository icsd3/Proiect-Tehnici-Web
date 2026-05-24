const Drepturi = require("./drepturi.js");

/**
 * Clasa de baza pentru toate rolurile aplicatiei.
 */
class Rol {
    /**
     * Returneaza codul static al tipului de rol.
     *
     * @returns {string} Codul rolului generic.
     */
    static get tip() {
        return "generic";
    }

    /**
     * Returneaza lista implicita de drepturi pentru rolul generic.
     *
     * @returns {symbol[]} Lista de drepturi.
     */
    static get drepturi() {
        return [];
    }

    /**
     * Creeaza o instanta de rol si seteaza codul public pe baza clasei curente.
     */
    constructor() {
        this.cod = this.constructor.tip;
    }

    /**
     * Expune lista de drepturi a rolului curent.
     *
     * @returns {symbol[]} Lista de drepturi disponibile pentru rol.
     */
    get drepturi() {
        return this.constructor.drepturi;
    }

    /**
     * Verifica daca rolul curent are un anumit drept.
     *
     * @param {symbol} drept - Dreptul verificat.
     * @returns {boolean} `true` daca dreptul exista in lista rolului.
     */
    areDreptul(drept) {
        return this.drepturi.includes(drept);
    }
}

/**
 * Rolul de administrator, cu acces total.
 */
class RolAdmin extends Rol {
    /**
     * Returneaza codul folosit pentru administrator.
     *
     * @returns {string} Codul rolului admin.
     */
    static get tip() {
        return "admin";
    }

    /**
     * Administratorul are intotdeauna toate drepturile.
     *
     * @returns {boolean} Mereu `true`.
     */
    areDreptul() {
        return true;
    }
}

/**
 * Rolul moderatorului, limitat la administrarea utilizatorilor.
 */
class RolModerator extends Rol {
    /**
     * Returneaza codul folosit pentru moderator.
     *
     * @returns {string} Codul rolului moderator.
     */
    static get tip() {
        return "moderator";
    }

    /**
     * Returneaza drepturile moderatorului.
     *
     * @returns {symbol[]} Lista drepturilor de administrare a utilizatorilor.
     */
    static get drepturi() {
        return [
            Drepturi.vizualizareUtilizatori,
            Drepturi.adaugareUtilizatori,
            Drepturi.modificareUtilizatori,
            Drepturi.stergereUtilizatori
        ];
    }
}

/**
 * Rolul utilizatorului obisnuit din aplicatie.
 */
class RolClient extends Rol {
    /**
     * Returneaza codul folosit pentru clientul comun.
     *
     * @returns {string} Codul rolului comun.
     */
    static get tip() {
        return "comun";
    }

    /**
     * Returneaza drepturile clientului.
     *
     * @returns {symbol[]} Lista drepturilor clientului.
     */
    static get drepturi() {
        return [
            Drepturi.vizualizareProduse,
            Drepturi.cumparareProduse
        ];
    }
}

/**
 * Factory pentru construirea rolurilor pe baza codului lor textual.
 */
class RolFactory {
    /**
     * Creeaza rolul corespunzator codului primit.
     *
     * @param {string} tip - Codul textual al rolului.
     * @returns {Rol} Instanta rolului potrivit sau rol generic.
     */
    static creeazaRol(tip) {
        switch (tip) {
        case RolAdmin.tip:
            return new RolAdmin();
        case RolModerator.tip:
            return new RolModerator();
        case RolClient.tip:
            return new RolClient();
        default:
            return new Rol();
        }
    }
}

module.exports = {
    Rol,
    RolFactory,
    RolAdmin,
    RolModerator,
    RolClient
};
