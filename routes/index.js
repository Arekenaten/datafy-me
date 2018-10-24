const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(siteController.homePage));

module.exports = router;
