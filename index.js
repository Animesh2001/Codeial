const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore =  require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    //inside assets there is css for prefix to tell browser to look for css here
    prefix:'/css'
}))



const { urlencoded } = require('express');

//to parse post request
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets/'));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);





//set up the view engine
app.set('view engine','ejs');
app.set('views','./views'); 


//mongo store is used to store the session cookie in the db 
app.use(session({
    //name of cookie
    name: 'codeial',
    //Todo change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());  

// doubt why we did this 
app.use(passport.setAuthenticatedUser);



//use express router
//import from routes/index
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
