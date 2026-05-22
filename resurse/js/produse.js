document.addEventListener("DOMContentLoaded", function () {
    const sectiuneFiltrare = document.getElementById("sectiune-filtrare-produse");

    if (!sectiuneFiltrare) {
        return;
    }

    const articole = Array.from(document.querySelectorAll("#produse article[id^='ar_ent_']"));
    const filtruText = document.getElementById("filtru-text");
    const filtruPret = document.getElementById("filtru-pret");
    const valoareFiltruPret = document.getElementById("valoare-filtru-pret");
    const filtruSubcategorie = document.getElementById("filtru-subcategorie");
    const filtruCuloare = document.getElementById("filtru-culoare");
    const filtreCategorie = Array.from(document.querySelectorAll("input[name='filtru-categorie']"));
    const filtruEditieLimitata = document.getElementById("filtru-editie-limitata");
    const filtruDescriere = document.getElementById("filtru-descriere");
    const filtruTaguri = document.getElementById("filtru-taguri");
    const butonResetare = document.getElementById("btn-reseteaza-filtre");

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

    function actualizeazaAfisajPret() {
        valoareFiltruPret.value = `${Number(filtruPret.value).toFixed(2)} lei`;
    }

    function articolTreceFiltrele(articol) {
        const text = valoareText(filtruText);
        const pretMax = Number(filtruPret.value);
        const subcategorie = valoareText(filtruSubcategorie);
        const categorie = categorieSelectata();
        const culoare = filtruCuloare.value;
        const descriere = valoareText(filtruDescriere);
        const taguri = taguriSelectate();
        const pretProdus = Number(articol.dataset.pret);
        const textProdus = `${articol.dataset.nume} ${articol.dataset.taguri}`.toLowerCase();
        const taguriProdus = articol.dataset.taguri.toLowerCase().split(",").map((tag) => tag.trim());

        return (!text || textProdus.includes(text))
            && (pretProdus <= pretMax)
            && (!subcategorie || articol.dataset.subcategorie.toLowerCase().includes(subcategorie))
            && (!categorie || articol.dataset.categorie === categorie)
            && (!culoare || articol.dataset.culoare === culoare)
            && (!filtruEditieLimitata.checked || articol.dataset.editieLimitata === "da")
            && (!descriere || articol.dataset.descriere.toLowerCase().includes(descriere))
            && (!taguri.length || taguri.every((tag) => taguriProdus.includes(tag)));
    }

    function aplicaFiltrele() {
        actualizeazaAfisajPret();

        for (const articol of articole) {
            articol.classList.toggle("produs-ascuns", !articolTreceFiltrele(articol));
        }
    }

    function reseteazaFiltrele() {
        filtruText.value = "";
        filtruPret.value = filtruPret.max;
        filtruSubcategorie.value = "";
        filtruCuloare.value = "";
        filtreCategorie[0].checked = true;
        filtruEditieLimitata.checked = false;
        filtruDescriere.value = "";

        for (const optiune of filtruTaguri.options) {
            optiune.selected = false;
        }

        aplicaFiltrele();
    }

    sectiuneFiltrare.addEventListener("input", aplicaFiltrele);
    sectiuneFiltrare.addEventListener("change", aplicaFiltrele);
    butonResetare.addEventListener("click", reseteazaFiltrele);
    aplicaFiltrele();
});
