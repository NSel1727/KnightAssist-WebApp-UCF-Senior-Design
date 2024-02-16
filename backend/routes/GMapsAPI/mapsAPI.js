const express = require('express');
const fetch = (await import('node-fetch')).default;
require('dotenv').config();
const router = express.Router();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

router.get('/', async (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.status(400).send({ error: 'Address for using the google maps API is required' });
    }

    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await fetch(geocodeURL);
        const data = await response.json();
        if (data.status !== 'OK') {
            return res.status(404).send({ error: 'Location not found through the google map api nor the key' });
        }

        const { location } = data.results[0].geometry;
        res.send(location); // we send back the latitude and longitude as a result to the front end
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch location' });
    }
});

module.exports = router;
