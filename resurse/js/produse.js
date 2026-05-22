document.addEventListener("DOMContentLoaded", function () {
    const sectiuneFiltrare = document.getElementById("sectiune-filtrare-produse");

    if (!sectiuneFiltrare) {
        return;
    }

    const listaProduse = document.querySelector(".lista-produse");
    const articole = Array.from(document.querySelectorAll("#produse article[id^='ar_ent_']"));
    const ordineInitiala = new Map(articole.map((articol, index) => [articol.id, index]));
    const filtruText = document.getElementById("filtru-text");
    const filtruNume = document.getElementById("filtru-nume");
    const filtruPret = document.getElementById("filtru-pret");
    const valoareFiltruPret = document.getElementById("valoare-filtru-pret");
    const filtreSubcategorie = Array.from(document.querySelectorAll("input[name='filtru-subcategorie']"));
    const filtruCuloare = document.getElementById("filtru-culoare");
    const filtreCategorie = Array.from(document.querySelectorAll("input[name='filtru-categorie']"));
    const filtruEditieLimitata = document.getElementById("filtru-editie-limitata");
    const filtruDescriere = document.getElementById("filtru-descriere");
    const filtruTaguri = document.getElementById("filtru-taguri");
    const mesajValidare = document.getElementById("mesaj-validare-filtre");
    const butonFiltrare = document.getElementById("btn-filtreaza");
    const butonSortareAsc = document.getElementById("btn-sortare-asc");
    const butonSortareDesc = document.getElementById("btn-sortare-desc");
    const butonCalculeaza = document.getElementById("btn-calculeaza");
    const butonResetare = document.getElementById("btn-reseteaza-filtre");
    let mesajCalculActiv = null;
    let timerMesajCalcul = null;

    function valoareText(element) {
        return element.value.trim().toLowerCase();
    }

    function categorieSelectata() {
        const categorie = filtreCategorie.find((input) => input.checked);
        return categorie ? categorie.value : "";
    }

    function taguriSelectate() {
        return Array.from(filtruTaguri.selectedOptions).map((optiune) => optiune.value.toLowerCase());
    }

    function subcategoriiSelectate() {
        return filtreSubcategorie.filter((input) => input.checked).map((input) => input.value);
    }

    function actualizeazaAfisajPret() {
        valoareFiltruPret.value = `${Number(filtruPret.value).toFixed(2)} lei`;
    }

    function navigheazaLaCategorie(categorie) {
        const destinatie = categorie ? `/produse/${encodeURIComponent(categorie)}` : "/produse";

        if (window.location.pathname !== destinatie) {
            window.location.href = destinatie;
        }
    }

    function produseVizibile() {
        return articole.filter((articol) => !articol.classList.contains("produs-ascuns"));
    }

    function marcheazaInvalid(element, clasa) {
        const container = element.closest(".filtre-produse__camp, .filtre-produse__grup");

        if (container) {
            container.classList.add(clasa);
        }

        if (element.classList) {
            element.classList.add("is-invalid");
        }
    }

    function curataValidarea() {
        mesajValidare.hidden = true;
        mesajValidare.textContent = "";

        for (const elementInvalid of sectiuneFiltrare.querySelectorAll(".filtre-produse__camp--invalid, .filtre-produse__grup--invalid")) {
            elementInvalid.classList.remove("filtre-produse__camp--invalid", "filtre-produse__grup--invalid");
        }

        for (const campInvalid of sectiuneFiltrare.querySelectorAll(".is-invalid")) {
            campInvalid.classList.remove("is-invalid");
        }
    }

    function valideazaFiltre() {
        curataValidarea();

        const mesaje = [];
        const valoareTag = filtruText.value.trim();
        const valoareDescriere = filtruDescriere.value.trim();
        const areSubcategorieSelectata = filtreSubcategorie.some((input) => input.checked);
        const regexText = /^[\p{L}\s-]+$/u;

        if (valoareTag && !regexText.test(valoareTag)) {
            mesaje.push('Campul "Tag cautat" poate contine doar litere, spatii si cratime.');
            marcheazaInvalid(filtruText, "filtre-produse__camp--invalid");
        }

        if (valoareDescriere && !/\p{L}/u.test(valoareDescriere)) {
            mesaje.push('Campul "Cuvinte in descriere" trebuie sa contina cel putin o litera.');
            marcheazaInvalid(filtruDescriere, "filtre-produse__camp--invalid");
        }

        if (!areSubcategorieSelectata) {
            mesaje.push("Selectati cel putin o subcategorie inainte de filtrare, sortare sau calcul.");
            const grupSubcategorii = sectiuneFiltrare.querySelector(".filtre-produse__grup--subcategorii");

            if (grupSubcategorii) {
                grupSubcategorii.classList.add("filtre-produse__grup--invalid");
            }
        }

        if (!mesaje.length) {
            return true;
        }

        mesajValidare.innerHTML = mesaje.join("<br>");
        mesajValidare.hidden = false;
        return false;
    }

    function articolTreceFiltrele(articol) {
        const tagCautat = valoareText(filtruText);
        const numeCautat = valoareText(filtruNume);
        const pretMax = Number(filtruPret.value);
        const subcategorii = subcategoriiSelectate();
        const culoare = filtruCuloare.value;
        const descriere = valoareText(filtruDescriere);
        const taguriInterzise = taguriSelectate();
        const pretProdus = Number(articol.dataset.pret);
        const numeProdus = articol.dataset.nume.toLowerCase();
        const taguriProdus = articol.dataset.taguri.toLowerCase().split(",").map((tag) => tag.trim());

        return (!tagCautat || taguriProdus.some((tag) => tag.includes(tagCautat)))
            && (!numeCautat || numeProdus.includes(numeCautat))
            && (pretProdus <= pretMax)
            && (!subcategorii.length || subcategorii.includes(articol.dataset.subcategorie))
            && (!culoare || articol.dataset.culoare === culoare)
            && (!filtruEditieLimitata.checked || articol.dataset.editieLimitata === "da")
            && (!descriere || articol.dataset.descriere.toLowerCase().includes(descriere))
            && (!taguriInterzise.length || taguriInterzise.every((tag) => !taguriProdus.includes(tag)));
    }

    function aplicaFiltrele() {
        actualizeazaAfisajPret();

        for (const articol of articole) {
            articol.classList.toggle("produs-ascuns", !articolTreceFiltrele(articol));
        }
    }

    function comparaProduse(articolA, articolB) {
        const comparatieSubcategorie = articolA.dataset.subcategorie.localeCompare(articolB.dataset.subcategorie, "ro", { sensitivity: "base" });

        if (comparatieSubcategorie !== 0) {
            return comparatieSubcategorie;
        }

        return Number(articolA.dataset.pret) - Number(articolB.dataset.pret);
    }

    function sorteazaProduse(directie) {
        aplicaFiltrele();

        articole.sort(function (articolA, articolB) {
            const comparatie = comparaProduse(articolA, articolB);
            return directie === "desc" ? -comparatie : comparatie;
        });

        for (const articol of articole) {
            listaProduse.appendChild(articol);
        }
    }

    function refaceOrdineaInitiala() {
        articole.sort(function (articolA, articolB) {
            return ordineInitiala.get(articolA.id) - ordineInitiala.get(articolB.id);
        });

        for (const articol of articole) {
            listaProduse.appendChild(articol);
        }
    }

    function afiseazaMesajCalcul(text) {
        if (timerMesajCalcul) {
            clearTimeout(timerMesajCalcul);
        }

        if (mesajCalculActiv) {
            mesajCalculActiv.remove();
        }

        mesajCalculActiv = document.createElement("div");
        mesajCalculActiv.className = "rezultat-calcul-produse";
        mesajCalculActiv.textContent = text;
        document.body.appendChild(mesajCalculActiv);

        timerMesajCalcul = window.setTimeout(function () {
            if (mesajCalculActiv) {
                mesajCalculActiv.remove();
                mesajCalculActiv = null;
            }
            timerMesajCalcul = null;
        }, 2000);
    }

    function calculeazaSumaProduseVizibile() {
        aplicaFiltrele();

        const suma = produseVizibile().reduce(function (total, articol) {
            return total + Number(articol.dataset.pret);
        }, 0);

        afiseazaMesajCalcul(`Suma preturilor afisate este ${suma.toFixed(2)} lei.`);
    }

    function reseteazaFiltrele() {
        const confirmareResetare = window.confirm("Doriti cu adevarat sa resetati filtrele?");

        if (!confirmareResetare) {
            return;
        }

        curataValidarea();
        filtruText.value = "";
        filtruNume.value = "";
        filtruPret.value = filtruPret.max;
        filtruCuloare.value = "";
        filtreCategorie[0].checked = true;
        filtruEditieLimitata.checked = false;
        filtruDescriere.value = "";

        for (const filtruSubcategorie of filtreSubcategorie) {
            filtruSubcategorie.checked = true;
        }

        for (const optiune of filtruTaguri.options) {
            optiune.selected = false;
        }

        if (window.location.pathname !== "/produse") {
            navigheazaLaCategorie("");
            return;
        }

        refaceOrdineaInitiala();
        aplicaFiltrele();
    }

    sectiuneFiltrare.addEventListener("input", function (eveniment) {
        if (eveniment.target === filtruPret) {
            actualizeazaAfisajPret();
        }

        if (eveniment.target === filtruText || eveniment.target === filtruDescriere) {
            curataValidarea();
        }
    });

    sectiuneFiltrare.addEventListener("change", function (eveniment) {
        if (eveniment.target && eveniment.target.name === "filtru-categorie") {
            navigheazaLaCategorie(categorieSelectata());
        }

        if (eveniment.target && eveniment.target.name === "filtru-subcategorie") {
            curataValidarea();
        }
    });

    butonFiltrare.addEventListener("click", function () {
        if (!valideazaFiltre()) {
            return;
        }

        aplicaFiltrele();
    });

    butonSortareAsc.addEventListener("click", function () {
        if (!valideazaFiltre()) {
            return;
        }

        sorteazaProduse("asc");
    });

    butonSortareDesc.addEventListener("click", function () {
        if (!valideazaFiltre()) {
            return;
        }

        sorteazaProduse("desc");
    });

    butonCalculeaza.addEventListener("click", function () {
        if (!valideazaFiltre()) {
            return;
        }

        calculeazaSumaProduseVizibile();
    });

    butonResetare.addEventListener("click", reseteazaFiltrele);

    aplicaFiltrele();
});
