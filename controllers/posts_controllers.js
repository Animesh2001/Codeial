const Post=require('../models/post');
const Comment = require('../models/comment');

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        //doubt
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('back');
    });
}

module.exports.destroy=function(req,res){
    //first we check if the post exist
    Post.findById(req.params.id,function(err,post){
    //.id automatically converts the object id to String
    if(post.user==req.user.id){
        post.remove();
    //we just done here err check as we don't want further the deleted comments in DB
        Comment.deleteMany({post:req.params.id},function(err){
            return res.redirect('back');
        });
    }else{
        return res.redirect('back');
    }
  });
}