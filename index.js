const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/api/emerson', async (req, res) => {
    const bomRef = req.query.bom;

    if (!bomRef) {
        return res.status(400).json({ error: 'Missing BOM reference in query parameter ?bom=' });
    }

    try {
        const response = await fetch(`https://aspmsint.emerson.com/aslplm-p-items-v3/api/item?BOM_Reference=${encodeURIComponent(bomRef)}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "BusinessGroup": "Emerson",
                "client_id": "72dca7c76f0347f2b9463f95cd8ccd3a",
                "client_secret": "11c1DAF014104f1eA099B9a52f649517",
                "Content-Type": "application/json",
                "SenderId": "PLM",
                "TargetId": "CMAP"
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
