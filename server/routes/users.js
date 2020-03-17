const sql = require('../modules/db');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const user_routes = (app, passport, jwtOpts) => {
    const getToken = user => {
        let payload = {id: user.id};
        let token = jwt.sign(payload, jwtOpts.secretOrKey);
        return token;
    }
    // sign in 
    app.post('/api/signin', (req, res) =>  {
        const { login, pwd } = req.body;
        if (login && pwd) {
            sql.query("SELECT * FROM `gc-admin-users` WHERE login = ? ", [login], (error, result) => {
                if (error) res.send({error: true, message: error});
                else {
                    if (result.length && passwordHash.verify(pwd, result[0].pwd)) {
                        let user = result[0];
                        let token = getToken(user);
                        sql.query("SELECT * FROM `gc-admin-users`", (error, result) => {
                            if (error) res.send({error:true, message: error});
                            else {
                                res.send({
                                    admins: result,
                                    token: token
                                });
                            }
                        });
                    }
                    else res.send({error: true, message: "Password not verify"});
                } 
            });
        }
        else res.send({error: true, message: "login and password are required"});
    });
    app.route('/api/admins')
    // get all administrators
    .get(passport.authenticate('jwt', {session: false}), (req, res) => {
        const user = req.query.user;
        if (user) {
            sql.query('SELECT * FROM `gc-admin-users` WHERE pwd = ?', user, (error, result) => {
                if (error) res.send({error:true, message: error});
                else res.send(result);
            });
        }
        else {
            sql.query("SELECT * FROM `gc-admin-users`", (error, result) => {
                if (error) res.send({error:true, message: error});
                else res.send(result);
            });
        }
        
    })
    // add new administrator
    .post(passport.authenticate('jwt', {session: false}), (req, res) => {
        const {name, lastname, email, login, pwd} = req.body;
        sql.query("INSERT INTO `gc-admin-users` (name, lastname, email, login, pwd) VALUES (?, ?, ?, ?, ?)", [name, lastname, email, login, pwd], error => {
            if (error) res.send({error: true, message: error});
            else {
                sql.query("SELECT * FROM `gc-admin-users`", (error, result) => {
                    if (error) res.send({error:true, message: error});
                    else res.send(result);
                }); 
            }
        });
    })
    //delete administrator by id
    .delete(passport.authenticate('jwt', {session: false}), (req, res) => {
        const userId = req.body.userId;
        sql.query("DELETE FROM `gc-admin-users` WHERE id = ?", [userId], (error, result) => {
            if (error) res.send({error: true, message: error});
            else {
                sql.query("SELECT * FROM `gc-admin-users`", (error, result) => {
                    if (error) res.send({error:true, message: error});
                    else res.send(result);
                }); 
            }
        });
    });
}

module.exports = user_routes;