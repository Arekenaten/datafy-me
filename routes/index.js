const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(siteController.homePage));

router.get('/api/location', catchErrors(siteController.viewLocationData));
router.post('/api/location',
  authController.authenticateKey,
  siteController.addLocationData
);

module.exports = router;
