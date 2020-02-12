var pool = require("../services/database").pool;

module.exports.managerAdminInfo = function(id, pwd, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT auth, manager FROM tbl_professor WHERE professor_id = ? AND professor_password= ? AND manager = 1"
        // var query1 = "SELECT * FROM tbl_professor WHERE professor_id =? AND professor_password= ?"
        connection.query(query,[id, pwd],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                console.log(result)
                var rows = result.length;
                // console.log(rows)
                if(rows>0){
                    callback(true, result[0]["auth"], result[0]["manager"]);    
                } else {
                   callback(false, null) 
                }
                // callback(true);
                // callback(result);
            })
    })
}




module.exports.studentAdmin = function(id, pwd, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_student WHERE student_id = ? AND student_password= ?"
        // var query1 = "SELECT * FROM tbl_professor WHERE professor_id =? AND professor_password= ?"
        connection.query(query,[id, pwd],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                // callback(true);
                callback(result);
            })
    })
}

module.exports.professorAdmin = function(id, pwd, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT auth FROM tbl_professor WHERE professor_id = ? AND professor_password= ?"
        // var query1 = "SELECT * FROM tbl_professor WHERE professor_id =? AND professor_password= ?"
        connection.query(query,[id, pwd],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                var rows = result.length;
                console.log(rows)
                if(rows>0){
                    callback(true, result[0]["auth"]);    
                } else {
                   callback(false, null) 
                }
                // callback(true);
                // callback(result);
            })
    })
}