const sql = require('./db');

// в конструктор нужно обязательно передавать сумму и код геолокации;
// Код геолокации: по определению города, например: Минск: 0, Могилев: 1 и т.д.
// Если добавляется новый филиал, требуется в базе данных, в таблице gc-ready-seller добавить два поля
// одно с именем города на латинице, например vitebsk, другое с именем с префиксом j_ (j_vitebsk) для новичков
// Так же, в конструкторе данного класа в переменной this._assoc добавить это же имя (vitebsk) в конец массива.
class Spreader {
    constructor(insetData) {
        if (!insetData) throw Error("inset data is required!");
        const {summa = 0, location = 0} = insetData;
        this._summa = parseInt(summa, 10);
        this._location = location;
        this._assoc = ["minsk", "mogilev"];
    }

    getLocationByCode () {
        return this._assoc[this._location] ? this._assoc[this._location] : this._assoc[0];
    }
    static getActiveSchema() {
        return new Promise((resolve, reject) => {
            let now = new Date().getTime();
            sql.query("SELECT * FROM `gc-queue-schemas`", (error, result) => {
                if (error) reject(error);
                else {
                    if (result.length) {
                        result.map(event => {
                            let newStart = new Date(event.periodStart).getTime();
                            let newEnd = new Date(event.periodEnd).getTime();
                            if (now > newStart && now < newEnd) {
                                resolve(JSON.parse(event.queueSchema).schema);
                            }
                            else resolve([]);
                        });
                    }
                    else resolve([]);
                }
            });
        });
    }
    static getAllSellers () {
        return new Promise((resolve, reject) => {
            Spreader.getActiveSchema().then(schemas => {
                if (schemas.length) resolve(schemas);
                else {
                    sql.query("SELECT * FROM `gc-sellers`", (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    });
                }
            }).catch(error => reject(error));
        });
    }

    getSalesByLocation () {
        return new Promise((resolve, reject) => {
            Spreader.getAllSellers()
                .then(data => {
                    if (data.length) {
                        let inLocation = data.filter(item => item.filial === this._location);
                        resolve(inLocation);
                    } 
                    else reject({error: true});
                })
                .catch(er => reject(er));
        });
    }

    getJuniorSales () {
        return new Promise ((resolve, reject) => {
            this.getSalesByLocation()
                .then(sellers => {
                    let juniorInQueue = sellers.filter(sale => !!sale.isJunior === true && !!sale.inQueue === true);
                    let inQueue = sellers.filter(sale => !!sale.inQueue === true);
                    !juniorInQueue.length ? resolve(inQueue) : resolve(juniorInQueue);
                })
                .catch(er => reject(er));
        });
    }

    getSeniorSales () {
        return new Promise((resolve, reject) => {
            this.getSalesByLocation()
                .then(data => {
                    let seniorsInQueue = data.filter(item => !!item.isJunior === false && !!item.inQueue === true);
                    let inQueue = data.filter(item => !!item.inQueue === true);
                    !seniorsInQueue.length ? resolve(inQueue) : resolve(seniorsInQueue);
                })
                .catch(er => reject(er));
        });
    }

    getJuniorReadySale () {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM `gc-ready-seller`", (error, result) => {
                if (error) reject(error);
                else {
                    let assoc = this.getLocationByCode();
                    let name = `j_${assoc}`;
                    let sellerData = result.filter(item => item.name === name)[0];
                    if (sellerData && Object.keys(sellerData).length) resolve(sellerData);
                    else reject({error: true});
                }
            });
        });
    }

    getReadySale () {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM `gc-ready-seller`", (error, result) => {
                if (error) reject(error);
                else {
                    let assoc = this.getLocationByCode();
                    let sellerData = result.filter(item => item.name === assoc)[0];
                    if (sellerData && Object.keys(sellerData).length) resolve(sellerData);
                    else reject({error: true});
                }
            });
        });
    }

    setNextJuniorReadySale () {
        this.getJuniorSales()
            .then(juniors => {
                if (juniors.length) {
                    let bIds = juniors.map(jun => jun.bitrix_id);
                    this.getJuniorReadySale()
                        .then(readyJunior => {
                            let readyBId = readyJunior.bitrix_id;
                            let name = readyJunior.name;
                            let prevIndex = bIds.indexOf(readyBId);
                            let nextIndex = 0;
                            if ((prevIndex !== -1) && (prevIndex < (bIds.length - 1))) {
                                nextIndex = prevIndex + 1;
                            }
                            sql.query("UPDATE `gc-ready-seller` SET bitrix_id = ? WHERE name = ?", [bIds[nextIndex], name], (error, result) => {
                                if (error) return false;
                                else return true;
                            });
                        });
                }
            });
    }

    setNextReadySale () {
        this.getSeniorSales()
            .then(sales => {
                if (sales.length) {
                    let bIds = sales.map(sale => sale.bitrix_id);
                    this.getReadySale()
                        .then(sale => {
                            let readyBId = sale.bitrix_id;
                            let name = sale.name;
                            let prevIndex = bIds.indexOf(readyBId);
                            let nextIndex = 0;
                            if ((prevIndex !== -1) && (prevIndex < (bIds.length - 1))) {
                                nextIndex = prevIndex + 1;
                            }
                            sql.query("UPDATE `gc-ready-seller` SET bitrix_id = ? WHERE name = ?", [bIds[nextIndex], name], (error, result) => {
                                if (error) return false;
                                else return true;
                            });
                        });
                }
            });
    }

    process (callback) {
        if (!this._summa || this._summa <= 1500) {
            // отправляем новичкам
            this.getJuniorReadySale()
                .then(sale => {
                    let bId = sale.bitrix_id;
                    callback(bId);
                    this.setNextJuniorReadySale();
                });
        }
        else {
            // отправляем НЕ новичкам
            this.getReadySale()
                .then(sale => {
                    let bId = sale.bitrix_id;
                    callback(bId);
                    this.setNextReadySale();
                });
        }
    }
}

module.exports = Spreader;