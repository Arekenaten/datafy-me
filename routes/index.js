// Router file for server
const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Request for homepage
router.get('/', catchErrors(siteController.homePage));

// Location data API 
router.get('/api/location', catchErrors(siteController.viewLocationData));
router.post('/api/location',
  authController.authenticateKey,
  authController.processLocationData,
  siteController.addLocationData
);

module.exports = router;
