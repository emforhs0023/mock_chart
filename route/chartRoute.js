var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var db = require("../db/chartDB");
// var storage = require("../services/diskStorage");
var ensureAuth   = require("../services/ensureAuth")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();


router.get("/", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("chart/index.html",{"auth":auth, "user_id":user_id})
})

router.get("/summary", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	var value = req.query.value;
	// console.log(value);
	if(value == undefined){
		res.render("chart/index.html",{"auth":auth, "user_id":user_id})
	}else{
		res.render("chart/summary.html", {"auth":auth, "user_id":user_id, "name":value})
	}
})

router.get("/chartNameInfo", [ensureAuth],  function(req, res){
	
	var name = req.query.name;

	db.chartNameInfo(name, function(result){
		res.send(result)
	})
})

router.get("/tableInfo", function(req, res){

	db.tableInfo(function(result){
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

router.get("/answerInfo", function(req, res){

	var reference_pdf = req.query.reference_pdf;
	
	db.answerInfo(reference_pdf, function(result){
		res.send(result)
	})
})

router.get("/useridInfo", function(req, res){

	var id = req.query.id;
	
	db.useridInfo(id, function(result){
		res.send(result)
	})
})

router.post("/sub_answer", [jsonParser], function(req, res){

	var fourth = req.body.fourth
	var pdf_name = req.body.pdf_name
	var id = req.body.id

	db.sub_answer(fourth, id, pdf_name, function(result){
		res.send(result)
	})
})

router.get("/checkInfo", function(req, res){

	var chart_title = req.query.chart_title

	db.checkInfo(chart_title, function(result){
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

// 교수
router.post("/question",[urlencodedParser], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var question_name = req.body.pdf_question_name;
	var value_name = req.body.value_name		
	var question = req.body.question;		
	// var questionPlus = question - 1;
	
	console.log(req.body)
	db.question(question_name, question, function(result){
		if(result){
			// summary?value=배홍준
			return res.redirect("/chart/summary?value="+value_name+"")
		}
	})
})

router.post("/auth_answer", [jsonParser], function(req, res){

	var answer_fourth = req.body.answer_fourth
	var pdf_name = req.body.pdf_name
	var id = req.body.id
	
	db.auth_answer(answer_fourth, id, pdf_name, function(result){
		res.send(result)
	})
})

router.post("/first_confirm", [jsonParser], function(req, res){

	var answer_fourth = req.body.answer_fourth
	var pdf_name = req.body.pdf_name
	var id = req.body.id
	
	db.first_confirm(answer_fourth, id, pdf_name, function(result){
		console.log(result)
		res.send(result)
	})
})

router.post("/two_confirm", [jsonParser], function(req, res){

	var answer_fourth = req.body.answer_fourth
	var pdf_name = req.body.pdf_name
	var id = req.body.id
	
	db.two_confirm(answer_fourth, id, pdf_name, function(result){
		res.send(result)
	})
})

router.post("/point", [jsonParser], function(req, res){

	var minus = req.body.minus
	var pdf_name = req.body.pdf_name
	var id = req.body.id
	
	db.point(minus, id, pdf_name, function(result){
		res.send(result)
	})
})
module.exports = router;