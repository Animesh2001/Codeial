const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    //adding this help us to add req to the function and from there we can call req.flash and pass success or error and messages respectively
    passReqToCallback:true
}, function (req,email, password, done) {
    //find a user and establish a identity
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            req.flash('error',err);
            //console.log('Error in finding user --> Passport');
            // this will report an error to the passport
            return done(err);
        }
        if (!user || user.password != password) {
            req.flash('error','Invalid Username/Password');
           // console.log('Invalid Username/Password');
            return done(null, false);
        }
        return done(null, user);
    });


}
));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


//deserializing the user from the key in the cookies(browser send the req we need to deserialize it)
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);

    });
});


//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in, then pass on the request to the next function(controller's action   )
    if (req.isAuthenticated()) {
        return next();
    }

    //if the user is not signed in
    return res.redirect('users/sign-in');
}

//set the user for views
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;


