var path = require("path")
var multer = require("multer");
var config = require("../config");

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.join(config.root_dir, "problems"))
	},
	filename: function(req, file, cb) {
		// cb(null, "profile_" + Date.now() + ".pdf")
		var extention = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extention);//확장자 .jpg 만 빠진 파일명을 얻어온다
        var fname = basename + Date.now() + extention;
        // var fname = basename + extention;
        cb(null, fname);
	}
})

module.exports = multer({storage: storage})