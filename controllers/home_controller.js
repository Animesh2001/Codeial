//const { render } = require("ejs")
const Post = require('../models/post')

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
        Post.find({}).populate('user').exec(function(err,posts){
                return res.render('home',{
                        title:"Codeial | Home",
                        posts:posts
                });
        });
}

//module.exports.actionName=function(req,res){}

module.exports.practice2=function(req,res){
        return res.end('<h1>from homecontroller practice2</h1>');
}