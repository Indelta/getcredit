const sql = require('./db');

const counter = () => {
    sql.query("SELECT * FROM `gc-appcount` WHERE id = 1", (err, result) => {
        if (err) return ({error: true, message: err});
        else {
            const oldDate = new Date(result[0].updateDate);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
            let oldCount = result[0].count;
            newCount = oldDate.valueOf() < today ? 150 : oldCount + 9;
            let newDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
            
            sql.query("UPDATE `gc-appcount` SET count = ?, updateDate = ? WHERE id = ?", [newCount, newDate, 1], (err, result) => {
                if (err) return ({error: true, message: err});
                else return ({error: false, message: "date and count was updated"});
            });
        }
    });
}

module.exports = counter;