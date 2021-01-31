const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const user = require('../models/user');
const { use } = require('../routes/blogs');

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

exports.getsingleblogs = (req,res,next) => {
  const userId = req.userId;

  User.findById(req.userId)
  .then(result => {    
    const final = [];
    result.posts.forEach(element => {
      final.push(mongoose.Types.ObjectId(element));
    });
    return Blog.find({
      '_id': { $in: final}
  })
  .then(result => {
    res.status(200).json({
        message: `Blogs for ${userId}`,
        blogs: result
      });
  })
  })
  .catch(err => {
    res.status(500).json({
      message: 'Something went wrong!' + err
    });
  })
};

exports.getsingleblog = (req,res,next) => {
  // const userId = req.userId;
  const blogId = req.params.id;
  // console.log("blogId",blogId);
  
  blog = {};
  Blog.findById(blogId)
  .then(result => {
    if(result){
      // res.status(200).json({
      //   message: `Blogs for ${blogId}`,
      //   blogs: result
      // });
      // console.log('result',result);
      blog = JSON.parse(JSON.stringify(result));
      return User.findById(result.creator)
    }
    res.status(500).json({
      message: `Blogs for ${blogId}`,
        blogs: null
    });
    
  })
  .then((result)=>{
    // console.log(result);
    blog["email"] = result.email;
    blog["name"] = result.name;
    res.status(200).json({
        message: `Blogs for ${blogId}`,
        blogs: blog
      });
  })
  .catch(err => {
    res.status(500).json({
      message: 'Something went wrong!' + err
    });
  })
};

exports.updateblog = (req,res,next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }

  const blogId = req.body.blogid;

  const  company = req.body.company;
  const  package = req.body.package;
  const  typeOffer = req.body.typeOffer;
  const  role = req.body.role;
  const  rounds = req.body.rounds;
  const  description = req.body.description;

  // const blog = new Blog({
  //   company: company,
  //   package: package,
  //   typeOffer: typeOffer,
  //   role: role,
  //   rounds: rounds,
  //   description: description,
  //   creator: req.userId
  // });

    Blog.findById(blogId)
    .then((blog)=>{
      if(blog){
        blog.company = company;
      blog.package = package;
      blog.typeOffer = typeOffer;
      blog.role = role;
      blog.rounds = rounds;
      blog.description = description;

      return blog.save()
      }

      res.status(500).json({
        message: 'Something went wrong!'
      });
      
    })
    .then(result => {
      res.status(201).json({
          message: 'Blog updated successfully!',
          blog: result
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

exports.postStarredblog = (req,res,next) => {
  
  const blogid = req.params.id;
  const userid = req.userId;

  let already = false;
  User.findById(userid)
  .then((user)=>{
    // console.log('res',user);
    const starredArray = user.starred;
    // let flag=0;
    // starredArray.forEach((res)=>{
    //   if(mongoose.Types.ObjectId(res) === mongoose.Types.ObjectId(blogid)){
    //     flag = 1;
    //   }
    // })
    // console.log("flag",flag);
    if(user){
      if(starredArray.includes(mongoose.Types.ObjectId(blogid))){
        already = true;
        return user.save();
      }
      else{
        user.starred.push(mongoose.Types.ObjectId(blogid));   
        return user.save();   
      }
    }
    res.status(500).json({
      message: 'Something went wrong!' + err
    });
  })
  .then((user)=>{
    let message = "Add to starred";
    if(already){
      message = "Already in starred"
    }
    res.status(200).json({
      user: user,
      message: message
    });
  })
  .catch(err=>{
    res.status(500).json({
      message: 'Something went wrong!' + err
    });
  })
    
};

exports.starredblogs = (req,res,next) => {
  
  
  const userid = req.userId;

  User.findById(userid)
  .then((result)=>{
    const final = [];
    result.starred.forEach(element =>{
      final.push(mongoose.Types.ObjectId(element));
    });
    return Blog.find({
      '_id': {$in: final}
    })
  })
  .then((blog)=>{
    res.status(200).json({
      message: "Starred posts",
      blogs: blog
    })
  })
  .catch(err=>{
    res.status(500).json({
      message: 'Something went wrong!' + err
    });
  })
    
};