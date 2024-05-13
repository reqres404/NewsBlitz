const express = require('express');
const router = express.Router();
const { getAllNews } = require('../controllers/newsController');

router.get("/news", getAllNews);

module.exports = router; // Export the router object instead of an object containing the getAllNews function
