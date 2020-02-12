var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var fs = require("fs");
var db = require("../db/managerDB");
var storage = require("../services/diskStorage");
var ensureAuth   = require("../services/ensureAuth")
// var looger = require("../services/logger");
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();

router.use(function(req, res, next) {
	res.locals.error = req.flash('error');
    next();
})

router.get("/", [ensureAuth],  function(req, res){
	var user_id = req.session.passport.user.user_id
	var auth    = req.session.passport.user.auth
	res.render("manager/index.html",{"auth":auth,"user_id":user_id})
})

router.post("/add_patient_info", [jsonParser], function(req, res){
	
	var name = req.body.name
	var date = req.body.date
	var medicine = req.body.medicine
	var medical_name = req.body.medical_name
	var operation_name = req.body.operation_name
	
	db.add_patient_info(name, date, medicine, medical_name, operation_name, function(result){
		res.send(result)
	})
})

router.get("/tableInfo", function(req, res){

	db.tableInfo(function(result){
		res.send(result)
	})
})

router.get("/manager_upload", [ensureAuth], function(req, res){

	var chart_title = req.query.chart_title

	res.render("manager/upload_page.html",{"chart_title":chart_title})
})

router.get("/base_info", function(req, res){

	var chart_title = req.query.chart_title

	db.base_info(chart_title, function(result){
		res.send(result)
	})
})

router.post("/md",[storage.single('md_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.md
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/saved_file", function(req, res){

	var code = req.query.code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		res.send(result)
	})
})

router.delete("/del", function(req, res){

	var file_name = req.query.file_name
	var code = req.query.code
	fs.unlink("uploads/"+file_name+"", (err) => {
	  if (err) throw err;
	  db.test(file_name, code, function(result){
			res.send(result)
		})
	});
	
})


router.post("/ad",[storage.single('ad_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.ad
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/ad_saved_file", function(req, res){

	var code = req.query.ad_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

router.post("/tr",[storage.single('tr_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.tr
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/tr_saved_file", function(req, res){

	var code = req.query.tr_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

router.post("/dt",[storage.single('dt_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.dt
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/dt_saved_file", function(req, res){

	var code = req.query.dt_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

router.post("/pb",[storage.single('pb_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.pb
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/pb_saved_file", function(req, res){

	var code = req.query.pb_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

router.post("/rr",[storage.single('rr_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.rr
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/rr_saved_file", function(req, res){

	var code = req.query.rr_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

router.post("/di",[storage.single('di_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.di
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/di_saved_file", function(req, res){

	var code = req.query.di_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

router.post("/nl",[storage.single('nl_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.nl
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})

router.get("/nl_saved_file", function(req, res){

	var code = req.query.nl_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

router.post("/he",[storage.single('he_file')], function(req, res){ // question_file인 태그를 받겠다라는 뜻이다
	
	var code = req.body.he
	var name = req.body.name
	var chart_title = req.body.chart_title
	var filename = null;
	var savename = null;
	// console.log(req.file)
	if(req.file != undefined){
		filename = req.file.filename;
		originalname = req.file.originalname;
	}
	db.ad_save(name, filename, originalname, code, function(result){
		if(!result){
			req.flash("error","등록이 실패되었습니다.")
		}
		return res.redirect("/manager/manager_upload?chart_title="+chart_title)
	})
})


router.get("/he_saved_file", function(req, res){

	var code = req.query.he_code
	var chart_name = req.query.chart_name
	
	db.saved_file(chart_name, code, function(result){
		// console.log(result)
		res.send(result)
	})
})

module.exports = router;