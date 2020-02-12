var pool = require("../services/database").pool;

module.exports.test = function(callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_professor where manager = 1"
        // var query1 = "SELECT * FROM tbl_professor WHERE professor_id =? AND professor_password= ?"
        connection.query(query,[],
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