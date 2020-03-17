const sql = require('../modules/db');
const Spreader = require('../modules/spreader');


const sellers_route = (app, passport) => {
    app.route('/api/sellers/ready-seller')
        .get((req, res) => {
            let location = req.query.location || 0;
            let spreader = new Spreader({location});
            let name = spreader.getLocationByCode(location);
            sql.query("SELECT * FROM `gc-ready-seller` WHERE name = ?", [name], (error, result) => {
                if (error) res.send({error: true, message: error});
                else {
                    let bitrixId = result[0].bitrix_id;
                    sql.query("SELECT * FROM `gc-sellers` WHERE bitrix_id = ?", [bitrixId], (error, result) => {
                        if (error) res.send({error: true, message: error});
                        else res.send(result[0]);
                    });
                }
            });
        });
    app.route('/api/sellers')
        // return all sellers
        .get(passport.authenticate('jwt', {session: false}), (req, res) => {
            let queryStr = "SELECT * FROM `gc-sellers`";
            sql.query(queryStr, (error, result) => {
                if (error) res.send({error: true, message: 'error getting sellers list'});
                else res.send({error: false, sellers: result, message: "success"});
            });
        })
        // add new seller
        .post(passport.authenticate('jwt', {session: false}), (req, res) => {
            let {name, bitrix_id, phone, inQueue, filial} = req.body;
            phone = phone.replace(/[^0-9]/g, "");
            const query = "INSERT INTO `gc-sellers` (name, bitrix_id, inQueue, phone, isJunior, filial) VALUES " + `('${name}', ${bitrix_id}, ${inQueue}, '${phone}', 1, ${filial})`;
            sql.query(query, (error, result) => {
                if (error) res.send({error: true, message: error});
                else res.send({error: false, message: 'success'});
            });
        })
        // change seller by id
        .put(passport.authenticate('jwt', {session: false}), (req, res) => {
            let {id, name, bitrix_id, inQueue, isJunior, phone} = req.body;
            let query = "UPDATE `gc-sellers` SET name = ?, bitrix_id = ?, inQueue = ?, isJunior = ?, phone = ? WHERE id = ?";
            let queryData = [name, bitrix_id, inQueue, isJunior, phone, id];

            sql.query(query, queryData, (error, result) => {
                if (error) res.send({error: true, message: error});
                else res.send({error: false, message: "success"});
            }); 
        })
        // delete seller by id
        .delete(passport.authenticate('jwt', {session: false}), (req, res) => {
            sql.query("DELETE FROM `gc-sellers` WHERE id = ?", [req.body.id], (error, result) => {
                if (error) res.send({error: true, message: error});
                else res.send({error: false, message: "success"});
            });
        });
}

module.exports = sellers_route;