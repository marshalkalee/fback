const express = require('express');
const router = express.Router();
const axios = require('axios');


const EXCHANGE_API_URL = `https://api.exchangerate-api.com/v4/latest/USD`;

router.get('/currency', async (req, res) => {
    try {
        const response = await axios.get(EXCHANGE_API_URL);
        res.json(response.data); 
    } catch (error) {
        console.error('Error fetching currency data:', error.message);
        res.status(500).json({ message: 'Error fetching currency data' });
    }
});

module.exports = router;


