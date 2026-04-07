import { ENDPOINTS } from "./config.js";
import { fetchJSON } from "./helpers.js";

/**
 * Charge le TAF.
 */
export async function loadTaf() {
    const data = await fetchJSON(ENDPOINTS.taf);
    updateTafUI(data);
}

/**
 * Met à jour l’UI TAF.
 */
export function updateTafUI(data) {
    const el = document.getElementById("taf");
    if (!el) return;

    if (data.fallback) {
        el.innerText = "TAF indisponible (fallback)";
        return;
    }

    el.innerText = data.raw || "TAF disponible";
}
