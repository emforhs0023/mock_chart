var pool = require("../services/database").pool;

module.exports.std_gradesId = function(id, confirm, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT  count(*) AS count FROM tbl_student WHERE student_id = ? AND student_password = ?"
        connection.query(query,[id, confirm],
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

module.exports.std_tableInfo = function(id, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_answer t4 JOIN (SELECT * FROM tbl_summary_chart t1 JOIN tbl_score t2 ON t1.reference_pdf = t2.pdf_file_name WHERE t1.chart_open = 0 AND t2.id = ?)t3 ON t3.reference_pdf = t4.pdf_file"
        connection.query(query,[id],
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

module.exports.checkInfo = function(confirm_title, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT reference_pdf FROM tbl_summary_chart WHERE chart_title = ?"
        connection.query(query,[confirm_title],
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

module.exports.secondary = function(pdf_name, id, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT open FROM tbl_score WHERE id = ? AND pdf_file_name = ?"
        connection.query(query,[id, pdf_name],
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

/******************************************************************************************************************************/
// 교수 일때

module.exports.pro_gradesId = function(id, confirm, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT  count(*) AS count FROM tbl_professor WHERE professor_id = ? AND professor_password = ? AND auth = 1"
        connection.query(query,[id, confirm],
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

module.exports.pro_tableInfo = function(id, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_summary_chart t4 JOIN (SELECT t1.title, count(t1.pdf_file) AS count, t2.pdf_file_name FROM tbl_answer t1 JOIN tbl_score t2 ON t1.pdf_file = t2.pdf_file_name GROUP BY t1.pdf_file) t3 ON t3.pdf_file_name = t4.reference_pdf"
        
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

module.exports.chartNameInfo = function(title, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_student t3 JOIN (SELECT t1.title, t1.question, t1.pdf_file, t2.id, t2.point, t2.open FROM tbl_answer t1 JOIN tbl_score t2 ON t1.pdf_file = t2.pdf_file_name WHERE t1.title= ?)t4 ON t3.student_id = t4.id"
        connection.query(query,[title],
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

module.exports.activeOff = function(id, pdf_file, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_score SET open = 1 WHERE id = ? and pdf_file_name= ?"
        connection.query(query,[id, pdf_file],
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

module.exports.activeOn = function(id, pdf_file, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_score SET open = 0 WHERE id = ? and pdf_file_name= ?"
        connection.query(query,[id, pdf_file],
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

module.exports.nameInfo = function(stu_id, title, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT t1.chart_name FROM tbl_summary_chart t1 JOIN tbl_score t2 ON t1.reference_pdf = t2.pdf_file_name WHERE id = ? AND t1.chart_title=?"
        connection.query(query,[stu_id, title],
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

module.exports.chartInfo = function(name, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_summary_chart t4 JOIN (SELECT * FROM tbl_detailed_chart t1 JOIN tbl_record_code t2 ON t1.chaet_code = t2.code WHERE chart_name = ?) t3 ON t4.chart_name = t3.chart_name"
        connection.query(query,[name],
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

module.exports.answerInfo = function(reference_pdf, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_answer WHERE pdf_file = ?"
        connection.query(query,[reference_pdf],
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

module.exports.chartPdf = function(chart_id, name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT chart_pdf FROM tbl_detailed_chart WHERE chart_name = ? AND chaet_code = ?"
        connection.query(query,[name, chart_id],
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

module.exports.first_answer = function(reference_pdf, stu_id, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_score WHERE id = ? AND pdf_file_name = ?"
        var query1 = "SELECT * FROM tbl_answer WHERE pdf_file = ?"
        connection.query(query+";"+query1,[stu_id, reference_pdf, reference_pdf],
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