// ======================================================
// UI MODULE
// ======================================================

// Imports nécessaires
import { heatLayer, clusterLayer, playHeatmapHistory } from "./sonometers.js";


// ------------------------------------------------------
// 1) UI de base (sidebar + panneau sono)
// ------------------------------------------------------
export function initUI() {
    const sonoHeader = document.getElementById("sono-header");
    const sonoPanel = document.getElementById("sono-panel");
    const sonoToggle = document.getElementById("sono-toggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");

    if (sonoHeader && sonoPanel && sonoToggle) {
        sonoHeader.onclick = () => {
            sonoPanel.classList.toggle("collapsed");
            const collapsed = sonoPanel.classList.contains("collapsed");
            sonoToggle.textContent = collapsed ? "⯈" : "⯆";
        };
    }

    if (sidebar && sidebarToggle) {
        sidebarToggle.onclick = () => {
            sidebar.classList.toggle("sidebar-collapsed");
        };
    }
}



// ------------------------------------------------------
// 2) Bouton ON/OFF Heatmap
// ------------------------------------------------------
export function initHeatmapToggle(map) {
    const btn = document.getElementById("toggle-heatmap");
    if (!btn) return;

    btn.onclick = () => {
        if (map.hasLayer(heatLayer)) {
            map.removeLayer(heatLayer);
            btn.classList.add("off");
        } else {
            map.addLayer(heatLayer);
            btn.classList.remove("off");
        }
    };
}



// ------------------------------------------------------
// 3) Bouton ON/OFF Clusters
// ------------------------------------------------------
export function initClusterToggle(map) {
    const btn = document.getElementById("toggle-clusters");
    if (!btn) return;

    btn.onclick = () => {
        if (map.hasLayer(clusterLayer)) {
            map.removeLayer(clusterLayer);
        } else {
            map.addLayer(clusterLayer);
        }
    };
}



// ------------------------------------------------------
// 4) Mode Heatmap Historique
// ------------------------------------------------------
export function initHeatmapHistory(map) {
    const btn = document.getElementById("play-history");
    if (!btn) return;

    btn.onclick = () => playHeatmapHistory(map);
}



// ------------------------------------------------------
// 5) Panneau Debug (FPS + CPU + Render Time)
// ------------------------------------------------------
export function initDebugPanel(map) {
    const fpsEl = document.getElementById("fps");
    const cpuEl = document.getElementById("cpu");
    const renderEl = document.getElementById("render");

    let last = performance.now();
    let frames = 0;

    function loop() {
        const now = performance.now();
        frames++;

        if (now - last >= 1000) {
            fpsEl.textContent = frames;
            frames = 0;
            last = now;
        }

        const cpu = (performance.now() - now).toFixed(2);
        cpuEl.textContent = cpu;

        requestAnimationFrame(loop);
    }

    loop();

    map.on("layeradd layerremove moveend zoomend", () => {
        const t0 = performance.now();
        requestAnimationFrame(() => {
            const t1 = performance.now();
            renderEl.textContent = (t1 - t0).toFixed(2);
        });
    });
}
