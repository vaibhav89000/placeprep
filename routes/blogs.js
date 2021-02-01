const express = require('express');

const Blog = require('../models/blog');
const blogController = require('../controllers/blog');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/get', isAuth, blogController.getblogs);

router.get('/getsingle', isAuth, blogController.getsingleblogs);

router.post('/post', isAuth, blogController.postblog);

router.get('/getblogdetail/:id', isAuth, blogController.getsingleblog);


router.post('/updateblog', isAuth, blogController.updateblog);
router.get('/starredblog/:id', isAuth, blogController.postStarredblog);
router.get('/starredblogs', isAuth, blogController.starredblogs);
router.post('/removedstarredblog/:id', isAuth, blogController.removeStarredblog);

module.exports = router;    