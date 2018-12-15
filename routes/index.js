// Router file for server
const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Page requests
router.get('/', catchErrors(siteController.homePage));
router.get('/about', catchErrors(siteController.aboutPage));
router.get('/works', catchErrors(siteController.worksPage));
router.get('/resume', catchErrors(siteController.resumePage));
router.get('/contact', catchErrors(siteController.contactPage));

// Location data API
router.get('/api/location', catchErrors(siteController.viewLocationData));
router.post('/api/location',
  authController.authenticateKey,
  authController.processLocationData,
  siteController.addLocationData
);

module.exports = router;
