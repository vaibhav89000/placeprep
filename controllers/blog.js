const Blog = require('../models/blog');

exports.getblogs = (req,res,next) => {
    Blog.find()
    .then(result => {
        res
        .status(200)
        .json({
          message: 'Fetched blogs successfully.',
          blogs: result
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong'            
          });
    })
};

exports.postblog = (req,res,next) => {
        const blog = new Blog({
            company: 'amazon',
            rounds: 2,
            description: 'All over good experience'
          });
          blog
          .save()
          .then(result => {
            res.status(201).json({
                message: 'Blog created successfully!',
                blog: result
              });
          })
          .catch(err => {
            res.status(500).json({
                message: 'Something went wrong'            
              });
          })
};