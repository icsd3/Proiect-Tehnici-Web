const DURATA_COOKIE_TEST_MS = 5000;

function setCookie(nume, val, timpExpirare) {
    const dataExpirare = new Date();
    dataExpirare.setTime(dataExpirare.getTime() + timpExpirare);
    document.cookie = `${nume}=${encodeURIComponent(val)}; expires=${dataExpirare.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(nume) {
    const prefix = `${nume}=`;
    const vectorParametri = document.cookie ? document.cookie.split(";") : [];

    for (const parametru of vectorParametri) {
        const parametruCuratat = parametru.trim();

        if (parametruCuratat.startsWith(prefix)) {
            return decodeURIComponent(parametruCuratat.substring(prefix.length));
        }
    }

    return null;
}

function deleteCookie(nume) {
    document.cookie = `${nume}=; expires=${new Date(0).toUTCString()}; path=/; SameSite=Lax`;
}

function deleteAllCookies() {
    const vectorParametri = document.cookie ? document.cookie.split(";") : [];

    for (const parametru of vectorParametri) {
        const numeCookie = parametru.split("=")[0].trim();

        if (numeCookie) {
            deleteCookie(numeCookie);
        }
    }
}

function actualizeazaInfoUltimaPagina() {
    const paragrafInfo = document.getElementById("info-cookie-ultima-pagina");

    if (!paragrafInfo) {
        return;
    }

    const ultimaPaginaMemorata = getCookie("ultima_pagina_accesata");
    const paginaCurenta = window.location.pathname || "/";

    setCookie("ultima_pagina_accesata", paginaCurenta, DURATA_COOKIE_TEST_MS);

    paragrafInfo.textContent = ultimaPaginaMemorata
        ? `Ultima pagina memorata in cookie: ${ultimaPaginaMemorata}`
        : `Pagina memorata acum in cookie: ${paginaCurenta}`;
    paragrafInfo.hidden = false;
}

function initBannerCookie() {
    const banner = document.getElementById("banner");
    const butonCookies = document.getElementById("ok_cookies");

    if (!banner || !butonCookies) {
        return;
    }

    if (getCookie("acceptat_banner")) {
        banner.hidden = true;
        return;
    }

    banner.hidden = false;
    window.requestAnimationFrame(function () {
        banner.classList.add("banner--activ");
    });

    butonCookies.onclick = function () {
        setCookie("acceptat_banner", "true", DURATA_COOKIE_TEST_MS);
        banner.classList.remove("banner--activ");
        banner.hidden = true;
    };
}

window.setCookie = setCookie;
window.getCookie = getCookie;
window.deleteCookie = deleteCookie;
window.deleteAllCookies = deleteAllCookies;

window.addEventListener("load", function () {
    actualizeazaInfoUltimaPagina();
    initBannerCookie();
});
