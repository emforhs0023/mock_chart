var pool = require("../services/database").pool;

module.exports.add_patient_info = function(name, date, medicine, medical_name, operation_name, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "INSERT INTO tbl_summary_chart (chart_name, chart_date, chart_dep, chart_title, chart_operation) VALUES (?, ?, ?, ?, ?)"
        connection.query(query,[name, date, medicine, medical_name, operation_name],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                callback(true);
                // callback(result);
            })
    })
}

module.exports.tableInfo = function(callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_summary_chart"
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

module.exports.base_info = function(chart_title, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_summary_chart WHERE chart_title = ?"
        connection.query(query,[chart_title],
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

module.exports.md_save = function(name, filename, code, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "INSERT INTO tbl_detailed_chart (chart_name, chart_pdf, chaet_code) VALUES (?, ?, ?)"

        connection.query(query,[name, filename, code],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                
                callback(true);
                // callback(result);
            })
    })
}

module.exports.saved_file = function(chart_name, code, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        var query = "SELECT * FROM tbl_detailed_chart WHERE chart_name = ? AND chaet_code = ?"
        connection.query(query,[chart_name, code],
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

module.exports.test = function(file_name, code, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "Delete from tbl_detailed_chart where chart_pdf = ? and chaet_code = ?"
        connection.query(query,[file_name, code],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                // callback(true);
                callback(result);
                // console.log(result)
            })
    })
}

module.exports.ad_save = function(name, filename, originalname, code, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "INSERT INTO tbl_detailed_chart (chart_name, chart_pdf, originalname, chaet_code) VALUES (?, ?, ?, ?)"

        connection.query(query,[name, filename, originalname, code],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                
                callback(true);
                // callback(result);
            })
    })
}

module.exports.ad_saved_file = function(chart_name, code, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        var query = "SELECT * FROM tbl_detailed_chart WHERE chart_name = ? AND chaet_code = ?"
        connection.query(query,[chart_name, code],
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

module.exports.check = function(filename, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        var query = "SELECT count(*) as count FROM tbl_detailed_chart WHERE chart_pdf = ?"
        connection.query(query,[filename],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                
                // callback(true);
                if(result.length > 0)
                    callback(result[0])
                else
                    callback({'count': -1})
                
            })
    })
}

module.exports.ad_saved = function(name, filename, originalname, code, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "INSERT INTO tbl_detailed_chart (chart_name, chart_pdf, originalname, chaet_code) VALUES (?, ?, ?, ?)"

        connection.query(query,[name, filename, originalname, code],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                
                callback(true);
                // callback(result);
            })
    })
}
