
var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://127.0.0.1:27017/blogapp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var blog = mongoose.model("blogapp", blogSchema);
blog.create({ "title" : "test", "image" : "https://cdn.pixabay.com/photo/2018/01/05/02/40/background-3062011_960_720.jpg", "body" : "Something special about healing power of beach. I love beaches most" });

app.get("/", function(req, res) {
    res.redirect("/blogs");
});


app.get("/blogs", function(req, res) {
    blog.find({}, function(err, blogs) {
        if (err) {
            console.log("Something went wrong");
        }
        else {
            res.render("index", { blogs: blogs })
        }
    });
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.post("/blogs", function(req, res) {
    blog.create();
});


app.listen(8080, 'localhost',function(){
    console.log('Server running at http://localhost:8080/');
  });