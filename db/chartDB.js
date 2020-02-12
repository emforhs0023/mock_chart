var pool = require("../services/database").pool;

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

module.exports.chartNameInfo = function(name, callback){
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

module.exports.useridInfo = function(id, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_student WHERE student_id = ?"
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

module.exports.sub_answer = function(fourth, id, pdf_name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "INSERT INTO tbl_score (id, pdf_file_name, answer, checking) VALUES (?, ?, ?, 1)"
        connection.query(query,[id, pdf_name, fourth],
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

module.exports.checkInfo = function(chart_title, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT reference_pdf FROM tbl_summary_chart WHERE chart_title = ?"
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

module.exports.secondary = function(pdf_name, id, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT checking FROM tbl_score WHERE id = ? AND pdf_file_name = ?"
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
// 교수 일때
module.exports.question = function(question_name, question, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        var query = "UPDATE tbl_answer SET question = ? WHERE pdf_file = ?"   
        connection.query(query,[question, question_name],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err)
                    callback(false)
                }

                // callback(result)
                callback(true)
            })
    })
}

module.exports.auth_answer = function(answer_fourth, id, pdf_name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_answer SET answer = ? WHERE pdf_file = ?"
        connection.query(query,[answer_fourth, pdf_name],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                // console.log(result)
                callback(true);
                // callback(result);
            })
    })
}


module.exports.first_confirm = function(answer_fourth, id, pdf_name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT answer FROM tbl_score WHERE id=? AND pdf_file_name = ?"
        var query1 = "SELECT answer FROM tbl_answer WHERE pdf_file = ?"
        connection.query(query+";"+query1, [id, pdf_name,pdf_name],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                // console.log(result)
                // callback(true);
                callback(result);
            })
    })
}

module.exports.two_confirm = function(answer_fourth, id, pdf_name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT answer FROM tbl_answer WHERE pdf_file = ?"
        connection.query(query, [pdf_name],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                // console.log(result)
                // callback(true);
                callback(result);
            })
    })
}

module.exports.point = function(minus, id, pdf_name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_score SET point = ? WHERE pdf_file_name = ? AND id = ?"
        connection.query(query, [minus,pdf_name,id],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }
                // console.log(result)
                callback(true);
                // callback(result);
            })
    })
}

