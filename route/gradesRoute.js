var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var db = require("../db/gradesDB");
// var storage = require("../services/diskStorage");
var ensureAuth   = require("../services/ensureAuth")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();


router.get("/std", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("grades/std_check.html",{"auth":auth, "user_id":user_id})
})


router.post("/std_gradesId", [jsonParser], function(req, res){
	
	var id = req.body.id;
	var confirm = req.body.confirm;
	
	db.std_gradesId(id, confirm, function(result){
		res.send(result)
	})
})

router.get("/std_main", [ensureAuth], function(req, res){
	
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("grades/std_index.html",{"auth":auth, "user_id":user_id})
})

router.get("/std_total", [ensureAuth], function(req, res){
	
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	var value = req.query.value;
	// console.log(value);
	if(value == undefined){
		res.render("grades/std_index.html",{"auth":auth, "user_id":user_id})
	}else{
		res.render("grades/std_total.html", {"auth":auth, "user_id":user_id, "name":value})
	}
})

router.get("/std_tableInfo", function(req, res){

	var id = req.query.id;

	db.std_tableInfo(id, function(result){
		res.send(result)
	})
})

router.get("/checkInfo", function(req, res){

	var confirm_title = req.query.confirm_title

	db.checkInfo(confirm_title, function(result){
		res.send(result)
	})
})

router.get("/secondary", function(req, res){

	var pdf_name = req.query.pdf_name
	var id = req.query.id

	db.secondary(pdf_name, id, function(result){
		res.send(result)
	})
})

/******************************************************************************************************************************/
// 교수 일때

router.get("/pro", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("grades/pro_check.html",{"auth":auth, "user_id":user_id})
})


router.post("/pro_gradesId", [jsonParser], function(req, res){
	
	var id = req.body.id;
	var confirm = req.body.confirm;
	
	db.pro_gradesId(id, confirm, function(result){
		res.send(result)
	})
})

router.get("/pro_main", [ensureAuth], function(req, res){
	
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("grades/pro_index.html",{"auth":auth, "user_id":user_id})
})

router.get("/pro_tableInfo", function(req, res){

	var id = req.query.id;

	db.pro_tableInfo(id, function(result){
		res.send(result)
	})
})

router.get("/pro_total", [ensureAuth], function(req, res){
	
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	var confirm_title = req.query.confirm_title;
	var value = req.query.value;
	// console.log(value);
	if(confirm_title == undefined){
		res.render("grades/pro_index.html",{"auth":auth, "user_id":user_id})
	}else{
		res.render("grades/pro_total.html", {"auth":auth, "user_id":user_id, "title":confirm_title, "name":value})
	}
})

router.get("/chartNameInfo", [ensureAuth],  function(req, res){

	var title = req.query.title;

	db.chartNameInfo(title, function(result){
		res.send(result)
	})
})

router.get("/activeOff", function(req, res){
		
	var id = req.query.id
	var pdf_file = req.query.pdf_file

	db.activeOff(id, pdf_file, function(result){
		res.send(result)
	})
})

router.get("/activeOn", function(req, res){
		
	var id = req.query.id
	var pdf_file = req.query.pdf_file

	db.activeOn(id, pdf_file, function(result){
		res.send(result)
	})
})

router.get("/answer_view", [ensureAuth], function(req, res){
	
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth	
	var title = req.query.title;
	var id = req.query.id;

	res.render("grades/pro_answer.html", {"auth":auth, "user_id":user_id, "title":title, "id":id})
})

router.get("/nameInfo", [ensureAuth],  function(req, res){
	
	var stu_id = req.query.stu_id;
	var title = req.query.title;

	db.nameInfo(stu_id, title, function(result){
		res.send(result)
	})
})

router.get("/chartInfo", [ensureAuth],  function(req, res){
	var name = req.query.name;

	db.chartInfo(name, function(result){
		res.send(result)
	})
})

router.get("/answerInfo", function(req, res){

	var reference_pdf = req.query.reference_pdf;
	
	db.answerInfo(reference_pdf, function(result){
		res.send(result)
	})
})

router.get("/chartPdf", function(req, res){

	var chart_id = req.query.chart_id;
	var name = req.query.name;

	db.chartPdf(chart_id, name, function(result){
		res.send(result)
	})
})

router.get("/first_answer", function(req, res){

	var reference_pdf = req.query.reference_pdf;
	var stu_id = req.query.stu_id;

	db.first_answer(reference_pdf, stu_id, function(result){
		res.send(result)
	})
})

module.exports = router;