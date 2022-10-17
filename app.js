//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Good Day Everyone! This is my first blog and it may kinda be like somewhat experimental as  it will be capricious as I update it more often as I learn new things at the go!";
const aboutContent = "I have created this website as a part of my Backend developing basics and I hosted this via Heroku.As till now, it is still under development and the stuff what we can do with it is : 1.Compose posts using Compose tab which will redirect u to homepage that it shows ur post and if its long it gets shortened out. 2.Then you can also use the name of the keyword of ur post in the url by adding '  /posts/'postname'    ' and if it has spaces use '-' inbetween the words. 3.You can view all ur posts during the session in the homepage, but unfortunately it doesnt gets saved in a db. I will try to implement those stuff to in later updates! Till then!";
const contactContent = "You can contact me at nrh27magnum@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
    posts:posts
  });
  
})

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent})
})
app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent})
})

app.get("/compose",function(req,res){
  res.render("compose")
})

app.post("/compose",function(req,res){
    const post={
      title:req.body.postTitle,
      content:req.body.postBody
    };

    posts.push(post);
    
    res.redirect("/");

})

app.get("/posts/:postName",function(req,res){
  const reqTitle=_.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);
    if(storedTitle===reqTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      })
      
    }
  })

})






app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
