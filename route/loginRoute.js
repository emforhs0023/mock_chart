var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var db = require("../db/loginDB");
// var storage = require("../services/diskStorage");
var passport   = require("../services/passport")
var signAuth   = require("../services/signAuth")
// var ensureAuth   = require("../services/ensureAuth")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();

router.get("/", [signAuth], function(req, res){
	res.render("login/login.html")
})

router.get("/login_std", [signAuth], function(req, res){
	res.render("login/login_std.html")
})

router.post("/logout",[urlencodedParser], function(req, res){
	req.session.destroy(function(err){
		res.redirect("/login")
	});
})

router.get("/login_pro", [signAuth], function(req, res){
	res.render("login/login_pro.html")
})

router.get("/login_admin", [signAuth], function(req, res){
	res.render("login/login_admin.html")
})

router.post("/signin", [urlencodedParser,passport.authenticate('local', {failureRedirect: '/login'})], function(req, res){
	res.redirect('/main');
})

module.exports = router;