const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

app.get("/api/lyrics", async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: "❌ Você precisa fornecer um título!" });
    }

    try {
        const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/lyrics`, {
            params: { title: `eq.${title}` },
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
            },
        });

        if (data.length > 0) {
            return res.status(200).json({ title, lyrics: data[0].lyrics });
        } else {
            return res.status(404).json({ error: `❌ Música "${title}" não encontrada.` });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar os dados", message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
