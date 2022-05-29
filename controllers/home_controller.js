//const { render } = require("ejs")
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home= async function(req,res){
        try{
                //populate the user of each post
                let posts =   await Post.find({})
                .populate('user')
                .populate({
                 path:'comments',
                 populate:{
                   path: 'user'
                }
                });
                
                let users = await User.find({});

                return res.render('home',{
                        title:"Codeial | Home",
                        posts:posts,
                        all_users:users
                });
        }catch(err){
                console.log('Error',err);
                return;
        }
      
}

//module.exports.actionName=function(req,res){}

module.exports.practice2=function(req,res){
        return res.end('<h1>from homecontroller practice2</h1>');
}