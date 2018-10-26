const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router
    .route('/')
    .get(controllers.getHomepage);


module.exports = router;