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
router.get('/myLifeInData', catchErrors(siteController.myLifeInDataPage));

// Location data API
router.get('/api/location', catchErrors(siteController.viewLocationData));
router.post('/api/location',
  authController.authenticateKey,
  authController.processLocationData,
  siteController.addLocationData
);

// Fitbit data API
router.get('/api/fitbit/authorize', catchErrors(authController.authenticateFitbit));
router.get('/api/fitbit/callback', catchErrors(authController.storeFitbitKey));
router.get('/api/fitbit/getSleepData', 
  authController.refreshFitbitKey,
  siteController.getSleepData
); 

module.exports = router;
