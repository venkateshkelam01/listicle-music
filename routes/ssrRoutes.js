const express = require('express');
const router = express.Router();
const { renderHomePage, renderEventDetail } = require('../controllers/ssr/homeController');

router.get(['/', '/events'], renderHomePage);
router.get('/events/:slug', renderEventDetail);

module.exports = router;
