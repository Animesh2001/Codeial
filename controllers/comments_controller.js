const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create=async function(req,res){
    try{
        let post= await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
                //it will automatically add the id of the comment to the array of comments of the post
                post.comments.push(comment);
                post.save();
                req.flash('success','Comment added successfully');
                res.redirect('/');
            }
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
}

module.exports.destroy= async function(req,res){
    try{

        let comment = await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId = comment.post;
            comment.remove();

           let post = Post.findByIdAndUpdate(postId, { $pull: {comments:req.params.id}});
           req.flash('success','Comment deleted successfully');
                return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this Comment!');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
   
    
}