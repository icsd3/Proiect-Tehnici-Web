(function () {
    const CHEIE_TEMA_SITE = "themetalvault-tema-site";
    const CHEIE_TEMA_PRODUSE = "themetalvault-tema-produse";

    function normalizeazaTema(tema) {
        return tema === "light" ? "light" : "dark";
    }

    function citesteLocalStorage(cheie) {
        try {
            return window.localStorage.getItem(cheie);
        } catch (eroare) {
            return null;
        }
    }

    function salveazaTema(tema) {
        try {
            window.localStorage.setItem(CHEIE_TEMA_SITE, tema);
            window.localStorage.removeItem(CHEIE_TEMA_PRODUSE);
        } catch (eroare) {
            // Tema ramane aplicata pentru sesiunea curenta chiar daca salvarea nu este permisa.
        }
    }

    function temaPersistata() {
        return normalizeazaTema(
            citesteLocalStorage(CHEIE_TEMA_SITE)
            || citesteLocalStorage(CHEIE_TEMA_PRODUSE)
            || document.documentElement.dataset.bsTheme
            || "dark"
        );
    }

    function aplicaTema(tema) {
        const temaNormalizata = normalizeazaTema(tema);
        const buton = document.getElementById("buton-tema-site");
        const icon = document.getElementById("icon-tema-site");

        document.documentElement.dataset.bsTheme = temaNormalizata;

        if (document.body) {
            document.body.dataset.bsTheme = temaNormalizata;
        }

        if (buton) {
            buton.setAttribute("aria-pressed", String(temaNormalizata === "light"));
            buton.setAttribute(
                "aria-label",
                temaNormalizata === "light" ? "Activeaza tema intunecata" : "Activeaza tema luminoasa"
            );
        }

        if (icon) {
            icon.className = temaNormalizata === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const buton = document.getElementById("buton-tema-site");

        aplicaTema(temaPersistata());

        if (!buton) {
            return;
        }

        buton.addEventListener("click", function () {
            const temaNoua = document.documentElement.dataset.bsTheme === "light" ? "dark" : "light";

            aplicaTema(temaNoua);
            salveazaTema(temaNoua);
        });
    });
})();
