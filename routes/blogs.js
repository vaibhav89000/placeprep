const express = require('express');

const Blog = require('../models/blog');
const blogController = require('../controllers/blog');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// fetch all blogs
router.get('/get', isAuth, blogController.getblogs);

// fetch single blog
router.get('/getsingle', isAuth, blogController.getsingleblogs);

// post new blog
router.post('/post', isAuth, blogController.postblog);

// fetch blog by its id
router.get('/getblogdetail/:id', isAuth, blogController.getsingleblog);

// update the existing blog
router.post('/updateblog', isAuth, blogController.updateblog);

// starring of the blog 
router.get('/starredblog/:id', isAuth, blogController.postStarredblog);

// fetch starred blogs of the particular user
router.get('/starredblogs', isAuth, blogController.starredblogs);

// remove the starred blog
router.post('/removedstarredblog/:id', isAuth, blogController.removeStarredblog);

module.exports = router;    