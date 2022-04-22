//const { render } = require("ejs")

module.exports.home=function(req,res){
       // return res.end('<h1>Express is up for Codeial</h1>');
       console.log(req.cookies);
       res.cookie('user_id',77);
       return res.render('home',{
               title:"Home"
       });
}

//module.exports.actionName=function(req,res){}

module.exports.practice2=function(req,res){
        return res.end('<h1>from homecontroller practice2</h1>');
}