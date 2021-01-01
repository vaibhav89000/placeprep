const Blog = require('../models/blog');
const User = require('../models/user');

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
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   const error = new Error('Validation failed, entered data is incorrect.');
        //   error.statusCode = 422;
        //   throw error;
        // }

        const  company = req.body.company;
        const  package = req.body.package;
        const  typeOffer = req.body.typeOffer;
        const  role = req.body.role;
        const  rounds = req.body.rounds;
        const  description = req.body.description;

        const blog = new Blog({
          company: company,
          package: package,
          typeOffer: typeOffer,
          role: role,
          rounds: rounds,
          description: description,
          creator: req.userId
        });

          blog
          .save()
          .then(result => {
            return User.findById(req.userId);
          })
          .then(user => {
            creator = user;
            user.posts.push(blog);
            return user.save();
          })
          .then(result => {
            res.status(201).json({
                message: 'Blog created successfully!',
                blog: blog,
                creator: { _id: creator._id, name: creator.name }
              });
          })
          .catch(err => {
            // if (!err.statusCode) {
            //   err.statusCode = 500;
            // }
            // next(err);
            res.status(500).json({
              message: 'Something went wrong!' + err
            });
          })
};