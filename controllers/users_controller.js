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

//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}


//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

