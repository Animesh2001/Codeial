//const { render } = require("ejs")
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home=function(req,res){
        //  return res.end('<h1>Express is up for Codeial</h1>');
        //  console.log(req.cookies);
        //  res.cookie('user_id',170)
      

        //this post.find({}) query will return all the post from the database
        // Post.find({},function(err,posts){
        //         return res.render('home',{
        //                 title:"Codeial | Home",
        //                 posts:posts
        //         });
        // });


        //populate the user of each post
        Post.find({})
        .populate('user')
        .populate({
                path:'comments',
                populate:{
                        path: 'user'
                }
        })
        .exec(function(err,posts){
                User.find({},function(err,users){
                        return res.render('home',{
                                title:"Codeial | Home",
                                posts:posts,
                                all_users:users
                        });
                });
                
        })
}

//module.exports.actionName=function(req,res){}

module.exports.practice2=function(req,res){
        return res.end('<h1>from homecontroller practice2</h1>');
}