var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var db = require("../db/solveDB");
// var storage = require("../services/diskStorage");
var ensureAuth   = require("../services/ensureAuth")
var storage_problem = require("../services/problemStorage");
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();

router.get("/", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("solve/index.html",{"auth":auth, "user_id":user_id})
})
// 교수 일때
router.get("/pro", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("solve/pro_index.html",{"auth":auth, "user_id":user_id})
})

router.get("/tableInfo", function(req, res){

	db.tableInfo(function(result){
		res.send(result)
	})
})

router.get("/activeOff", function(req, res){
		
	var title = req.query.title

	db.activeOff(title, function(result){
		res.send(result)
	})
})

router.get("/activeOn", function(req, res){
		
	var title = req.query.title

	db.activeOn(title, function(result){
		res.send(result)
	})
})

router.get("/checkInfo", function(req, res){

	var chart_title = req.query.chart_title

	db.checkInfo(chart_title, function(result){
		res.send(result)
	})
})
// pro_solve 페이지로 value 값을 포함 하여 전달
router.get("/pro_solve", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	var value = req.query.value;
	var chart_title = req.query.chart_title
	// console.log(value);
	if(value == undefined){
		res.render("solve/pro_index.html",{"auth":auth, "user_id":user_id})
	}else{
		res.render("solve/pro_solve.html", {"auth":auth, "user_id":user_id, "name":value, "title":chart_title})
	}
})

router.get("/chartNameInfo", [ensureAuth],  function(req, res){
	var name = req.query.name;

	db.chartNameInfo(name, function(result){
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

router.post("/auth_answer", [jsonParser], function(req, res){

	var answer_fourth = req.body.answer_fourth
	var pdf_name = req.body.pdf_name
	var id = req.body.id
	var title = req.body.title

	db.auth_answer(answer_fourth, title, pdf_name, function(result){
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

router.post("/question",[jsonParser], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var question_name = req.body.pdf_question_name;
	var value_name = req.body.value_name		
	var question = req.body.question;		
	var title = req.body.title;		

	// console.log(req.body)
	db.question(title, question_name, question, function(result){
		res.send(result)
	})
})

router.get("/pdf_info", function(req, res){

	var reference_pdf = req.query.reference_pdf
	var title = req.query.title

	db.pdf_info(reference_pdf, title, function(result){
		res.send(result)
	})
})

router.post("/que_update",[jsonParser], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var question_name = req.body.pdf_question_name;
	var value_name = req.body.value_name		
	var question = req.body.question;		
	var title = req.body.title;		

	// console.log(req.body)
	db.que_update(question, title, question_name, function(result){
		res.send(result)
	})
})

router.post("/upload",[storage_problem.single('file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var chart_title = req.body.title_name;
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	// console.log(chart_title)
	// console.log(filename)
	// console.log(originalname)
	db.upload(filename, originalname, chart_title, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/solve/pro")
	})
})

/******************************************************************************************************************************/
// 학생 일때

router.get("/std", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("solve/std_index.html",{"auth":auth, "user_id":user_id})
})

router.get("/std_tableInfo", function(req, res){

	db.std_tableInfo(function(result){
		res.send(result)
	})
})

router.get("/std_solve", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	var value = req.query.value;
	var chart_title = req.query.chart_title
	// console.log(value);
	if(value == undefined){
		res.render("solve/std_index.html",{"auth":auth, "user_id":user_id})
	}else{
		res.render("solve/std_solve.html", {"auth":auth, "user_id":user_id, "name":value, "title":chart_title})
	}
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
	var title = req.body.title

	db.sub_answer(id, title, pdf_name, fourth, function(result){
		res.send(result)
	})
})

router.post("/first_confirm", [jsonParser], function(req, res){

	var fourth = req.body.fourth
	var pdf_name = req.body.pdf_name
	var id = req.body.id
	var title = req.body.title

	db.first_confirm(fourth, id, pdf_name, title, function(result){
		res.send(result)
	})
})

router.post("/point", [jsonParser], function(req, res){

	var sum = req.body.sum
	var pdf_name = req.body.pdf_name
	var id = req.body.id
	
	db.point(sum, id, pdf_name, function(result){
		res.send(result)
	})
})

module.exports = router;