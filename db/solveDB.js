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

module.exports.activeOff = function(title, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_summary_chart SET chart_open = 1 WHERE chart_title = ?"
        connection.query(query,[title],
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

module.exports.activeOn = function(title, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_summary_chart SET chart_open = 0 WHERE chart_title = ?"
        connection.query(query,[title],
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

module.exports.auth_answer = function(answer_fourth, title, pdf_name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_answer SET answer = ? WHERE title = ? AND pdf_file = ?"
        connection.query(query,[answer_fourth, title, pdf_name],
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

module.exports.pdf_info = function(reference_pdf, title, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT count(question) AS count FROM tbl_answer WHERE title= ? AND pdf_file = ?"
        connection.query(query,[title, reference_pdf],
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

module.exports.question = function(title, question_name, question, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        var query = "INSERT INTO tbl_answer (title, pdf_file, question) VALUES (?, ?, ?)"   
        connection.query(query,[title, question_name, question],
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

module.exports.que_update = function(question, title, question_name, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        var query = "UPDATE tbl_answer SET question = ? WHERE title = ? AND pdf_file = ?"   
        connection.query(query,[question, title, question_name],
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

module.exports.upload = function(filename, originalname, chart_title, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_summary_chart SET reference_pdf = ?, originalname = ? WHERE chart_title = ?"

        connection.query(query,[filename, originalname, chart_title],
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



/******************************************************************************************************************************/
// 학생 일때

module.exports.std_tableInfo = function(callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_summary_chart WHERE chart_open = 1"
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

module.exports.sub_answer = function(id, title, pdf_name, fourth, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "INSERT INTO tbl_score (id, title, pdf_file_name, answer, checking) VALUES (?, ?, ?, ?, 1)"
        connection.query(query,[id, title, pdf_name, fourth],
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

module.exports.first_confirm = function(fourth, id, pdf_name, title, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT answer FROM tbl_score WHERE id=? AND pdf_file_name = ? AND title = ?"
        var query1 = "SELECT answer FROM tbl_answer WHERE pdf_file = ?"
        connection.query(query+";"+query1, [id, pdf_name, title, pdf_name],
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

module.exports.point = function(sum, id, pdf_name, callback){
    
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "UPDATE tbl_score SET point = ? WHERE pdf_file_name = ? AND id = ?"
        connection.query(query, [sum,pdf_name,id],
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