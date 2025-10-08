const events = require('./eventsController');
const countries = require('./countriesController');

// Export known event handlers
const { getAllEvents, getEventBySlug } = events;
const { getCountries, getCountryDetails } = countries;
async function getStates(req, res, next) {
    try {
        // return empty array for now
        res.json([]);
    } catch (err) {
        next(err);
    }
}

async function getStateDetails(req, res, next) {
    try {
        res.status(404).json({ error: 'Not implemented' });
    } catch (err) {
        next(err);
    }
}

// replaced by countriesController implementations

async function getLocations(req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        next(err);
    }
}

async function getLocationDetails(req, res, next) {
    try {
        res.status(404).json({ error: 'Not implemented' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllEvents,
    getEventBySlug,
    getStates,
    getStateDetails,
    getCountries,
    getCountryDetails,
    getLocations,
    getLocationDetails,
};
