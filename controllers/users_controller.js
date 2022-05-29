const User = require('../models/user');

module.exports.profile=function(req,res){
    // return res.end('<h1>User Profile</h1>');
    User.findById(req.params.id,function(err,user){
        res.render('user_profile',{
            title:"User",
            profile_user:user
        });
    });
    
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorised');
    }
}

module.exports.post=function(req,res){
    return res.end('<h1>User posted something</h1>');
}

module.exports.practice1=function(req,res){
    return res.end('<h1>User practice1 controller from user controller</h1>');
}

//render the sign up page
module.exports.signUp=function(req,res){
    //we checked if already signed in then don't show again the sign-up.. instead redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}


//render the sign in page and create sesion for user
module.exports.signIn=function(req,res){
    //we checked if already signed in then don't show again the sign-in.. instead redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the sign up data
module.exports.create=function(req,res){
    //Todo later
    //first check if the password and confirm password mathces or not
    //if not matches then redirect back to same page
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }


    //check if email is already present
    User.findOne({email: req.body.email},function(err,user){
        if(err){ console.log('error in finding user in signing up'); return;}

            //when user is not found
            if(!user){
                User.create(req.body,function(err,user){
                    if(err){ console.log('error in creating user while signing up'); return;}

                    return res.redirect('/users/sign-in'); 

                })
            }else{
                return res.redirect('back');
            }
    });
    

}

//get the sign in data
module.exports.createSession=function(req,res){
    //anything you can write in place of succcess ==  abcdf :)
    req.flash('success','Loggged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    //inbuilt function provided by passport to req for logout
    req.logout();
    req.flash('success','You have logged out.!');

    return res.redirect('/');
}

