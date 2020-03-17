const sql = require('../modules/db');

const posts_route = (app, passport) => {
    app.route('/api/posts')
    // add new post
    .post(passport.authenticate('jwt', {session: false}), (req, res) => {
        let date = req.body.savedDate;
        let html = req.body.html;
        let jsonString = req.body.jsonString;
        let isPublished = req.body.published;
        let isArchived = req.body.archived;
        let isMain = req.body.main;
        let editorData = req.body.editorData;
        let formTitle = req.body.formTitle;
        let formSubtitle = req.body.formSubtitle;
        let btnName = req.body.btnName;
        
        sql.query("INSERT INTO posts (content, isArchived, isMain, isPublished, jsonString, createDate, editorData, formTitle, formSubtitle, btnName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [html, isArchived, isMain, isPublished, jsonString, date, editorData, formTitle, formSubtitle, btnName], (error, result) => {
            if (error) res.send({error: true, message: error});
            else {
                sql.query("SELECT * FROM posts", (error, result) => {
                    if (error) res.send({error: true, message: error});
                    else res.send(result);
                });
            }
        });
    })
    // get posts
    .get((req, res) => {
        if (req.query.archived == '1') {
            sql.query("SELECT * FROM posts WHERE isArchived = 1", (error, result) => {
                if (error) res.send({error: true, message: error});
                else res.send(result);
            });
        }
        else if (req.query.published == '1') {
            sql.query("SELECT * FROM posts WHERE isPublished = 1", (error, result) => {
                if (error) res.send({error: true, message: error});
                else res.send(result);
            });
        }
        else if(req.query.postId) {
            sql.query("SELECT * FROM posts WHERE id = ?", [req.query.postId], (error, result) => {
                if(error) res.send(error);
                else res.send(result);
            });
        }
        else {
            sql.query("SELECT * FROM posts", (error, result) => {
                if (error) res.send({error: true, message: error});
                else res.send(result);
            });
        }
    })

    // change post by id 
    .put(passport.authenticate('jwt', {session: false}), (req, res) => {
        let isReduct = req.body.isReduct;
        if (isReduct) {
            let postId = req.body.postId;
            let isMain = req.body.main;
            let isPublished = req.body.published;
            let isArchived = req.body.archived;
            let html = req.body.html;
            let savedDate = req.body.savedDate;
            let jsonString = req.body.jsonString;
            let editorData = req.body.editorData;
            let formTitle = req.body.formTitle;
            let formSubtitle = req.body.formSubtitle;
            let btnName = req.body.btnName;
            sql.query("UPDATE posts SET content = ?, isArchived = ?, isMain = ?, isPublished = ?, jsonString = ?, editorData = ?, createDate = ?, formTitle = ?, formSubtitle = ?, btnName = ? WHERE id = ?", [html, isArchived, isMain, isPublished, jsonString, editorData,savedDate, formTitle, formSubtitle, btnName, postId ], (error, result) => {
                if (error) res.send({error: true, message: error});
                else {
                    sql.query("SELECT * FROM posts", (error, result) => {
                        if (error) res.send({error: true, message: error});
                        else res.send(result);
                    });
                }
            });
        }
        else {
            let postId = req.body.postId;
            let isMain = req.body.isMain;
            let isPublished = req.body.isPublished;
            let isArchived = req.body.isArchived;
            
            sql.query("UPDATE posts SET isMain = ?, isPublished = ?, isArchived = ? WHERE id = ?", [isMain, isPublished, isArchived, postId], (error, result) => {
                if(error) res.send({error: true, message: error});
                else {
                    sql.query("SELECT * FROM posts", (error, result) => {
                        if (error) res.send({error: true, message: error});
                        else res.send(result);
                    });
                }
            });
        }
        
    })

    //delete post by id
    .delete(passport.authenticate('jwt', {session: false}), (req, res) => {
        let postId = req.body.postId;
        sql.query("DELETE FROM posts WHERE id = ?", [postId], (error, result) => {
            if (error) res.send({error: true, message: error});
            else {
                sql.query("SELECT * FROM posts", (error, result) => {
                    if (error) res.send({error: true, message: error});
                    else res.send(result);
                });
            }
        });
    });
}

module.exports = posts_route;