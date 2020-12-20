const express = require('express');

const Blog = require('../models/blog');
const blogController = require('../controllers/blog');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/get', isAuth, blogController.getblogs);

router.post('/post', isAuth, blogController.postblog);

module.exports = router;    