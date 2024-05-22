const express = require('express');
const router = express.Router();
const { getAllNews,testRoute } = require('../controllers/newsController');

router.get("/news", getAllNews);
router.get("/test",testRoute)

module.exports = router; // Export the router object instead of an object containing the getAllNews function
