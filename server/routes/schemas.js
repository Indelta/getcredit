const sql = require('../modules/db');

const schemas_route = (app, passport) => {
    app.route('/api/schemas/')
        // get all schemas if no id if schema by id
        .get(passport.authenticate('jwt', {session: false}), (req, res) => {
            let query = req.body.id ? 
                "SELECT * FROM `gc-queue-schemas` WHERE id = " + req.body.id : 
                "SELECT * FROM `gc-queue-schemas`";
            sql.query(query, (error, result) => {
                if (error) res.send({error: true, message: "Error getting schemas list"});
                else res.send({error: false, message: result});
            });     
        })
        // add schema
        .post(passport.authenticate('jwt', {session: false}), (req, res) => {
            let event = req.body.event;
            let newStart = new Date(event.start);
            let newEnd = new Date(event.end);
            sql.query("INSERT INTO `gc-queue-schemas` (name, periodStart, periodEnd, queueSchema) VALUES (?, ?, ?, ?)", [event.title, newStart, newEnd, JSON.stringify({schema: event.schema})], (error, result) => {
                if (error) res.send({error: true, message: error});
                else {
                    sql.query("SELECT * FROM `gc-queue-schemas`", (error, result) => {
                        if (error) res.send({error: true, message: error});
                        else res.send({error: false, message: result});
                    })
                }
            });
        })
        .put(passport.authenticate('jwt', {session: false}), (req, res) => {
            let event = req.body.event;
            let newStart = new Date(event.start);
            let newEnd = new Date(event.end);
            sql.query("UPDATE `gc-queue-schemas` SET name = ?, periodStart = ?, periodEnd = ?, queueSchema = ? WHERE id = ?", [event.title, newStart, newEnd, JSON.stringify({schema: event.schema}), event.id], (error, result) => {
                if (error) res.send({error: true, message: error});
                else {
                    sql.query("SELECT * FROM `gc-queue-schemas`", (error, result) => {
                        if (error) res.send({error: true, message: error});
                        else res.send({error: false, message: result});
                    });
                }
            });
        })
        .delete(passport.authenticate('jwt', {session: false}), (req, res) => {
            sql.query("DELETE FROM `gc-queue-schemas` WHERE id = ?", [req.body.event.id], (error, result) => {
                if (error) res.send({error: true, message: error});
                else {
                    sql.query("SELECT * FROM `gc-queue-schemas`", (error, result) => {
                        if (error) res.send({error: true, message: error});
                        else res.send({error: false, message: result});
                    });
                }
            });
        });

}

module.exports = schemas_route;