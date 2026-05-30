(function () {
    const galerie = document.querySelector("[data-galerie-produs]");

    if (!galerie) {
        return;
    }

    const imagineCurenta = galerie.querySelector("[data-galerie-imagine]");
    const butonAnterior = galerie.querySelector("[data-galerie-prev]");
    const butonUrmator = galerie.querySelector("[data-galerie-next]");
    const contor = galerie.querySelector("[data-galerie-contor]");
    const butoaneMiniaturi = Array.from(galerie.querySelectorAll("[data-galerie-index]"));

    if (!imagineCurenta || butoaneMiniaturi.length < 2) {
        return;
    }

    const imagini = butoaneMiniaturi.map(function (buton) {
        return {
            src: buton.dataset.galerieSrc,
            alt: buton.dataset.galerieAlt
        };
    });
    let indexCurent = 0;

    function seteazaImagine(indexNou) {
        indexCurent = (indexNou + imagini.length) % imagini.length;
        imagineCurenta.src = imagini[indexCurent].src;
        imagineCurenta.alt = imagini[indexCurent].alt;

        if (contor) {
            contor.textContent = `${indexCurent + 1} / ${imagini.length}`;
        }

        butoaneMiniaturi.forEach(function (buton, index) {
            const esteActiv = index === indexCurent;
            buton.classList.toggle("produs-unic__miniatura--activa", esteActiv);
            buton.setAttribute("aria-pressed", esteActiv ? "true" : "false");
        });
    }

    butonAnterior?.addEventListener("click", function () {
        seteazaImagine(indexCurent - 1);
    });

    butonUrmator?.addEventListener("click", function () {
        seteazaImagine(indexCurent + 1);
    });

    butoaneMiniaturi.forEach(function (buton, index) {
        buton.addEventListener("click", function () {
            seteazaImagine(index);
        });
    });
})();
