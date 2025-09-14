require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS to allow our frontend to make requests to this server
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

// --- ENDPOINT 1: For Price Alerts (Sheet1) ---
app.get('/api/crypto-alerts', async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const sheetName = 'Sheet1'; // Your alerts sheet

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const rows = response.data.values;

    if (!rows || rows.length <= 1) {
        return res.json([]); // Return empty if no data or only headers
    }

    rows.shift(); // Remove the header row

    const formattedData = rows.map((row) => ({
      timestamp: row[0] || null,
      coinName: row[1] || 'N/A',
      symbol: row[2] || 'N/A',
      price: parseFloat(row[3]) || 0,
      change24h: parseFloat(row[4]) || 0,
      marketCap: parseInt(row[5], 10) || 0,
    })).reverse(); // Reverse to show newest alerts first

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching data from Google Sheets (Alerts):', error.message);
    res.status(500).json({ error: 'Failed to fetch alert data' });
  }
});


// --- ENDPOINT 2: For Trending Coins (Sheet2) ---
app.get('/api/trending-coins', async (req, res) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const sheetName = 'Sheet2'; // Your trending coins sheet

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const rows = response.data.values;

        if (!rows || rows.length <= 1) {
            return res.json([]); // Return empty if no data or only headers
        }

        rows.shift(); // Remove the header row

        const formattedData = rows.map(row => ({
            timestamp: row[0] || null,
            coinName: row[1] || 'N/A',
            symbol: row[2] || 'N/A',
            marketCapRank: parseInt(row[3], 10) || 0,
            thumbnail: row[4] || 'https://placehold.co/100x100/png?text=?',
            priceBtc: parseFloat(row[7]) || 0,
            score: parseInt(row[8], 10) || 0,
        })).reverse(); // Reverse to show newest first

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching data from Google Sheets (Trending):', error.message);
        res.status(500).json({ error: 'Failed to fetch trending data' });
    }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
