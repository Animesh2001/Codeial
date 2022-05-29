const Post=require('../models/post');
const Comment = require('../models/comment');

module.exports.create= async function(req,res){
    try{
        Post.create({
            content:req.body.content,
            //doubt
            user:req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}

module.exports.destroy= async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user==req.user.id){
            post.remove();
        //we just done here err check as we don't want further the deleted comments in DB
          await  Comment.deleteMany({post:req.params.id});
          return res.redirect('back');
        }else {
            return res.redirect('back');
        }
    }catch(err){
        console.log('Eror',err);
        return;
    }
    
}