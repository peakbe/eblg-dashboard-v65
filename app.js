// ======================================================
// CONFIGURATION
// ======================================================

const PROXY = "https://eblg-proxy.onrender.com";

const ENDPOINTS = {
    metar: `${PROXY}/metar`,
    taf: `${PROXY}/taf`,
    fids: `${PROXY}/fids`,
    notam: `${PROXY}/notam`
};

// ======================================================
// FETCH HELPER (centralisé, robuste, réutilisable)
// ======================================================

async function fetchJSON(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Erreur fetch :", err);
        return { fallback: true, error: err.message };
    }
}

// ======================================================
// METAR
// ======================================================

async function loadMetar() {
    const data = await fetchJSON(ENDPOINTS.metar);
    updateMetarUI(data);
}

function updateMetarUI(data) {
    const el = document.getElementById("metar");
    if (!el) return;

    if (data.fallback) {
        el.innerText = "METAR indisponible (fallback activé)";
        return;
    }

    el.innerText = data.raw;
}

// ======================================================
// TAF (prêt pour intégration future)
// ======================================================

async function loadTaf() {
    const data = await fetchJSON(ENDPOINTS.taf);
    updateTafUI(data);
}

function updateTafUI(data) {
    const el = document.getElementById("taf");
    if (!el) return;

    if (data.fallback) {
        el.innerText = "TAF indisponible (fallback activé)";
        return;
    }

    el.innerText = data.raw || "TAF disponible";
}

// ======================================================
// FIDS (structure prête, UI à adapter selon ton design)
// ======================================================

async function loadFids() {
    const data = await fetchJSON(ENDPOINTS.fids);
    updateFidsUI(data);
}

function updateFidsUI(data) {
    const el = document.getElementById("fids");
    if (!el) return;

    if (data.fallback) {
        el.innerText = "FIDS indisponible (fallback activé)";
        return;
    }

    // À remplacer par ton UI FIDS finale
    el.innerText = JSON.stringify(data, null, 2);
}

// ======================================================
// INITIALISATION
// ======================================================

window.onload = () => {
    loadMetar();
    loadTaf();
    loadFids();
    // Tu pourras ajouter ici : loadNotam(), loadCorridors(), loadPistes(), etc.
};
