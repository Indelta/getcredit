const sql = require('../modules/db');

const appCount_routes = app => {
    app.get('/api/count', (req, res) => {
            const getCountQuery = "SELECT count FROM `gc-appcount` WHERE id = 1";
            sql.query(getCountQuery, (error, result) => {
                if (error) res.send({error: true, message: error});
                else res.send({error: false, message: "", count: result[0].count});
            });
        })
}

module.exports = appCount_routes;