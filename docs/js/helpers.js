// ======================================================
// HELPERS
// ======================================================

export async function fetchJSON(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Erreur fetch :", err);
        return { fallback: true, error: err.message };
    }
}

export function deg2rad(d) {
    return d * Math.PI / 180;
}

export function haversineDistance(a, b) {
    const R = 6371;
    const dLat = deg2rad(b[0] - a[0]);
    const dLon = deg2rad(b[1] - a[1]);
    const lat1 = deg2rad(a[0]);
    const lat2 = deg2rad(b[0]);

    const h = Math.sin(dLat/2)**2 +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon/2)**2;

    return 2 * R * Math.asin(Math.sqrt(h));
}

export function updateStatusPanel(service, data) {
    const panel = document.getElementById("status-panel");
    if (!panel) return;

    if (data.fallback) {
        panel.className = "status-fallback";
        panel.innerText = `${service} : fallback (source offline)`;
        return;
    }

    if (data.error) {
        panel.className = "status-offline";
        panel.innerText = `${service} : offline`;
        return;
    }

    panel.className = "status-ok";
    panel.innerText = `${service} : OK`;
}
