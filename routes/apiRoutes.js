const express = require('express');
const router = express.Router();

const {
    getAllEvents, getEventBySlug,
    getStates, getStateDetails,
    getCountries, getCountryDetails,
    getLocations, getLocationDetails
} = require('../controllers/api');

router.get('/events', getAllEvents);
router.get('/events/:slug', getEventBySlug);

router.get('/states', getStates);
router.get('/states/:code', getStateDetails);

router.get('/countries', getCountries);
router.get('/countries/:code', getCountryDetails);

router.get('/locations', getLocations);
router.get('/locations/:slug', getLocationDetails);

module.exports = router;
