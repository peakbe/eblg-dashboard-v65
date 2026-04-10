import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

async function safeFetch(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return await res.json();
    } catch (err) {
        console.error("[PROXY ERROR]", err);
        return { fallback: true };
    }
}

app.get("/metar", async (req, res) => {
    res.json(await safeFetch("https://api.checkwx.com/metar/EBLG/decoded?x-api-key=YOUR_KEY"));
});

app.get("/taf", async (req, res) => {
    res.json(await safeFetch("https://api.checkwx.com/taf/EBLG/decoded?x-api-key=YOUR_KEY"));
});

app.get("/fids", async (req, res) => {
    res.json(await safeFetch("https://opensky-network.org/api/flights/departure?airport=EBLG&begin=NOW-3600&end=NOW"));
});

app.get("/sonos", (req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log("[PROXY] Running on port", PORT);
});
