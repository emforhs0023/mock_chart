var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../db/loginDB");

passport.use(new LocalStrategy({
	usernameField : "userId",
	paswordField : "password",
	passReqToCallback: true
	}
	, function(req, userId, password, done){
		if(userId == undefined || userId == "" || password == undefined || password == ""){
			return done(null, false, {message : '아이디 혹은 비밀번호를 입렵하지 않았습니다.'});
		}
		var value = req.body.hidden
		//관리자 일때
		if(value == "manager"){
			db.managerAdminInfo(userId, password, function(result, auth, manager){
				if(result){
					if(result == ""){
						return done(null, false, {message:"잘못된 아이디 또는 패스워드 입니다."})	
					} else {
						user = {"user_id": userId, "auth": auth, "manager":manager}
						return done(null, user);
					}
				}else{
					return done(null, false, {message:"잘못된 아이디 또는 패스워드 입니다."})
				}	
			})
		}
		//학생 일때
		if(value == "stu"){
			db.studentAdmin(userId, password, function(result){
				// console.log(result)
				if(result){
					if(result == ""){
						return done(null, false, {message:"잘못된 아이디 또는 패스워드 입니다."})	
						// console.log("1")
					} else {
						user = {"user_id": userId};
						return done(null, user);
					}
				}else{
					return done(null, false, {message:"잘못된 아이디 또는 패스워드 입니다."})
				}
			})
		}
		//교수 일때 
		if(value == "pro"){
			db.professorAdmin(userId, password, function(result, auth){
				console.log(result)
				if(result){
					if(result == ""){
						return done(null, false, {message:"잘못된 아이디 또는 패스워드 입니다."})	
					} else {
						user = {"user_id": userId, "auth": auth}
						return done(null, user);
					}
				}else{
					return done(null, false, {message:"잘못된 아이디 또는 패스워드 입니다."})
				}
			})
		}
	}
))

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user_id, done) {
	done(null, user);
})

module.exports = passport
