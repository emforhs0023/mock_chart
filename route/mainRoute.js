var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var db = require("../db/mainDB");
// var storage = require("../services/diskStorage");
var ensureAuth   = require("../services/ensureAuth")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();


router.get("/", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	var manager    = req.session.passport.user.manager
	res.render("main/index.html",{"auth":auth, "manager":manager, "user_id":user_id})
})

router.get("/test", function(req, res){
	
	db.test(function(result){
		res.send(result)
	})
})


module.exports = router;