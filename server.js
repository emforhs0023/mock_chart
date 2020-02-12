var express = require("express");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs");
var cookieParser = require('cookie-parser');
var passport = require("./services/passport");
var session = require("express-session");
var flash = require('connect-flash');
var path = require("path");
var app = express();

var http = require("http").Server(app);

app.use(cookieParser());

nunjucks.configure("views", {
	autoescape : true,
	express : app,
	watch : true
})
//세션 설정
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/static", express.static(__dirname + "/public"));
app.use("/profile", express.static(path.resolve(__dirname, 'uploads')));
app.use("/problem", express.static(path.resolve(__dirname, 'problems')));
app.use("/css", express.static(__dirname + "/node_modules/jquery-ui-dist"));
app.use("/js", express.static(__dirname + "/node_modules/moment"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/jquery-ui-dist"));
app.use("/js", express.static(__dirname + "/node_modules/datatables.net/js"));

var loginRoute = require("./route/loginRoute");
var mainRoute = require("./route/mainRoute");
var chartRoute = require("./route/chartRoute");
var gradesRoute = require("./route/gradesRoute"); // 성적
var solveRoute = require("./route/solveRoute");
var managerRoute = require("./route/managerRoute");



app.use("/login", loginRoute);
app.use("/main", mainRoute);
app.use("/chart", chartRoute);
app.use("/grades", gradesRoute);
app.use("/solve", solveRoute);
app.use("/manager", managerRoute);

http.listen(9001, function(){
	console.log("http server start")
})

