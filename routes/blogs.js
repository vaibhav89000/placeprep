const express = require('express');

const Blog = require('../models/blog');
const blogController = require('../controllers/blog');
const router = express.Router();

router.get('/get', blogController.getblogs);

router.post('/post', blogController.postblog);

module.exports = router;    