module.exports.profile=function(req,res){
    // return res.end('<h1>User Profile</h1>');
    res.render('user_profile',{
        title:"User"
    });
}

module.exports.post=function(req,res){
    return res.end('<h1>User posted something</h1>');
}

module.exports.practice1=function(req,res){
    return res.end('<h1>User practice1 controller from user controller</h1>');
}