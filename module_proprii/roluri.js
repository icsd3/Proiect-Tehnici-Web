const Drepturi = require("./drepturi.js");

class Rol {
    static get tip() {
        return "generic";
    }

    static get drepturi() {
        return [];
    }

    constructor() {
        this.cod = this.constructor.tip;
    }

    get drepturi() {
        return this.constructor.drepturi;
    }

    areDreptul(drept) {
        return this.drepturi.includes(drept);
    }
}

class RolAdmin extends Rol {
    static get tip() {
        return "admin";
    }

    areDreptul() {
        return true;
    }
}

class RolModerator extends Rol {
    static get tip() {
        return "moderator";
    }

    static get drepturi() {
        return [
            Drepturi.vizualizareUtilizatori,
            Drepturi.adaugareUtilizatori,
            Drepturi.modificareUtilizatori,
            Drepturi.stergereUtilizatori
        ];
    }
}

class RolClient extends Rol {
    static get tip() {
        return "comun";
    }

    static get drepturi() {
        return [
            Drepturi.vizualizareProduse,
            Drepturi.cumparareProduse
        ];
    }
}

class RolFactory {
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
