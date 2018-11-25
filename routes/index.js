const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(siteController.homePage));

router.get('/api/location', catchErrors(siteController.viewLocationData));
router.post('/api/location', catchErrors(siteController.addLocationData));

module.exports = router;
