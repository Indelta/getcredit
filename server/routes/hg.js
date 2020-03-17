const convert = require('xml-js');
const request = require('request');
const promise = require('../modules/promise');

const BITRIX_REST_URL = `https://getcredit.bitrix24.by/rest/14/${process.env.B24_TOKEN}/`;
const ERIPID = process.env.ERIP_ID || 11132001;
const HG_URL = process.env.HG_URL || "https://trial.hgrosh.by/API/v1/";
const loginData = {
    'user': process.env.HG_USER || 'deltastream.dev@gmail.com',
    'pwd': process.env.HG_PASSWORD || 'Deltastream-test2019'
}

function MyDate() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    this.hour = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
    this.today = () => {
        let date = new Date(Date.UTC(this.year, this.month, this.day, this.hour, this.minutes, this.seconds));
        return date.toISOString();
    };
    this.getCurDate = (curDay) => {
        let date = new Date(Date.UTC(this.year, this.month, this.day + curDay, this.hour, this.minutes, this.seconds));
        return date.toISOString();
    }
}

const createLoginXml = (username, pwd) => {
    let data = {
        elements: [
            {
                type: "element",
                name: "Credentials",
                attributes: {
                    xmlns: 'http://www.hutkigrosh.by/api'
                },
                elements: [
                    {
                        type: "element",
                        name: "user",
                        elements: [
                            {
                                type: "text",
                                text: username
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "pwd",
                        elements: [
                            {
                                type: "text",
                                text: pwd
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return convert.js2xml(data);
}
const createDealXml = (eripId, dealNumber, contactName, contactPhone, dealSum) => {
    let date = new MyDate();
    let now = date.today();
    let curDate = date.getCurDate(15);
    const data = {
        "elements": [
            {
                type: "element",
                name: "Bill",
                attributes: {
                    "xmlns": "http://www.hutkigrosh.by/api/invoicing"
                },
                elements: [
                    {
                        type: "element",
                        name: "eripId",
                        elements: [
                            {
                                type: "text",
                                text: eripId
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "invId",
                        elements: [
                            {
                                type: "text",
                                text: dealNumber
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "dueDt",
                        elements: [
                            {
                                type: "text",
                                text: curDate
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "addedDt",
                        elements: [
                            {
                                type: "text",
                                text: now
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "fullName",
                        elements: [
                            {
                                type: "text",
                                text: contactName
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "mobilePhone",
                        elements: [
                            {
                                type: "text",
                                text: contactPhone.toString()
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "notifyByMobilePhone",
                        elements: [
                            {
                                type: "text",
                                text: "false"
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "amt",
                        elements: [
                            {
                                type: "text",
                                text: dealSum
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "curr",
                        elements: [
                            {
                                type: "text",
                                text: "BYN"
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "statusEnum",
                        elements: [
                            {
                                type: "text",
                                text: "NotSet"
                            }
                        ]
                    },
                    {
                        type: "element",
                        name: "products",
                        elements: [
                            {
                                type: "element",
                                name: "ProductInfo",
                                elements: [
                                    {
                                        type: "element",
                                        name: "invItemId",
                                        elements: [
                                            {
                                                type: "text",
                                                text: dealNumber
                                            }
                                        ]
                                    },
                                    {
                                        type: "element",
                                        name: "desc",
                                        elements: [
                                            {
                                                type: "text",
                                                text: "Оплата услуг"
                                            }
                                        ]
                                    },
                                    {
                                        type: "element",
                                        name: "count",
                                        elements: [
                                            {
                                                type: "text",
                                                text: 1
                                            }
                                        ]
                                    },
                                    {
                                        type: "element",
                                        name: "amt",
                                        elements: [
                                            {
                                                type: "text",
                                                text: `${dealSum}`
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return convert.js2xml(data);
}

const hg_route = app => {
    app.post('/api/hg/new-bill', async (req, res) => {
        try {
            // id сделки
            let deal_id = req.body.data.FIELDS.ID || null;
            let deal = null;
            let contact = null;
            let contactPhone = null;
            let contactName = null;
            let dealSum = null;
            let dealNumber = null;

            // получаем сделку по id
            let getDealUrl = `${BITRIX_REST_URL}crm.deal.get/?id=${deal_id}`;
            
            await promise(request, request.get, getDealUrl).then(data => {
                if (data.err !== null) res.send({error: true, message: "Error get deal by id"});
                else {
                    deal = JSON.parse(data.body).result; // - undefined ????
                    // получаем сумму платежа
                    dealSum = deal['OPPORTUNITY'];
                    // получаем номер счета
                    dealNumber = deal['UF_CRM_1563871333'];
                    // формируем полное имя из полей сделки
                    contactName = deal['UF_CRM_5CF4D6EDEA26A'] + ' ' + deal['UF_CRM_5CF4D6EDB8CE8'] + ' ' + deal['UF_CRM_5CF4D6EE06B44'];
                }
            });
            // получаем контакт по id
            let getContactUrl = `${BITRIX_REST_URL}crm.contact.get/?id=${deal.CONTACT_ID}`;
            await promise(request, request.get, getContactUrl).then(data => {
                data.err && res.send({error: true, message: "Error getting contact by id"});
                contact = JSON.parse(data.body).result;
                contactPhone = contact['PHONE'][0]['VALUE'];
            });

            // логинимся в системе
            const loginXml = createLoginXml(loginData.user, loginData.pwd);
            const loginOpts = {
                url: HG_URL + 'Security/LogIn',
                headers: {
                    'content-type': 'application/xml',
                    'content-length': loginXml.length,
                },
                body: loginXml
            }

            //если статус сделки равен Одобрено Банком (FINAL_INVOICE)
            if (deal.STAGE_ID === "FINAL_INVOICE") {
                request.post(loginOpts, (error, response, body) => {
                    if (error) res.send({error: true, message: "not loggined"});
                    else {
                        let cookies = response.headers['set-cookie'];
                        const dealXml = createDealXml(ERIPID, dealNumber, contactName, contactPhone, dealSum);
                        const billOpts = {
                            url: HG_URL + 'Invoicing/Bill',
                            headers: {
                                'content-type': 'application/xml',
                                'content-length': unescape(encodeURIComponent(dealXml)).length,
                                'cookie': cookies
                            },
                            body: dealXml
                        }
                        request.post(billOpts, (err, response, body) => {
                            if (err) res.send({error: true, message: 'error adding bill'});
                            else {
                                let billID = convert.xml2js(body).elements[0].elements[1].elements[0].text;
                                //записываем billID в дополнительное поле сделки в bitrix24
                                
                                request.post({
                                    url: BITRIX_REST_URL + 'crm.contact.update',
                                    json: {
                                        "id": contact.ID,
                                        "fields": {
                                            "UF_CRM_1563886599": billID  
                                        }
                                    }
                                }, error => {
                                    if (error) res.send({error: true, message: "Error updating contact with new bill"});
                                    else res.send({error: false, message: "Success adding new Bill to Hutki Grosh and Bitrix24"});
                                });
                            }
                        });
                    }
                });
            }
            else {
                res.send({error: false, message: "Stage ID not final"});
            }
            
        }
        catch {
            console.log("Error adding new Bill to hutki grosh!");
        }
    });

    app.get('/api/hg/success', async (req, res) => {
        let billSuccess = req.query.purchaseid;
        let fullName = null;
        let contactId = null;
        let sellerId = null;
        let dealId = null;
        try {
            if (billSuccess && billSuccess > 0) {
                // находим контакт по номеру счета
                let contactOpts = {
                    url: BITRIX_REST_URL + 'crm.contact.list',
                    headers: {
                        'content-type': 'application/json'
                    },
                    json: {
                        "filter": {
                            "ACTIVE": "Y",
                            "UF_CRM_1563886599": billSuccess
                        }
                    }
                }
                await promise(request, request.post, contactOpts).then(data => {
                    if (data.err !== null) res.send({error: true, message: "Error getting contact filtering"});
                    else {
                        let contact = data.body.result[0];
                        fullName = contact['NAME'] + ' ' + contact['LAST_NAME'];
                        contactId = contact['ID'];
                    }
                });
                // // находим сделку по id контакта
                let dealOpts = {
                    url: BITRIX_REST_URL + 'crm.deal.list',
                    headers: {
                        'content-type': 'application/json'
                    },
                    json: {
                        "filter": {
                            "CONTACT_ID": contactId,
                            "STAGE_ID": "FINAL_INVOICE"
                        }
                    }
                }
                await promise(request, request.post, dealOpts).then(data => {
                    if (data.err !== null) res.send({error: true, message: "Error filtering deal"});
                    else {
                        let deal = data.body.result[0];
                        sellerId = deal['ASSIGNED_BY_ID'];
                        dealId = deal['ID'];
                    }
                });
    
                // // изменяем статус в bitrix24
                let changeDealOpts = {
                    url: BITRIX_REST_URL + 'crm.deal.update',
                    headers: {
                        'content-type': 'application/json'
                    },
                    json: {
                        "id": dealId,
                        "fields": {
                            "STAGE_ID": "WON"
                        },
                        "params": {
                            "REGISTER_SONET_EVENT": "Y"
                        }
                    }
                }
                await promise(request, request.post, changeDealOpts).then(data => {
                    if (data.err !== null) res.send({error: true, message: "Error changing deal status"});
                    else {
                        // отправляем сообщение об успешной оплате
                        let messageOpts = {
                            url: BITRIX_REST_URL + "im.notify.json",
                            headers: {
                                'content-type': 'application/json'
                            },
                            json: {
                                "to": sellerId,
                                "message": `Поздравляю! Клиент ${fullName} успешно оплатил. Сделка завершена!`
                            }
                        }
                        request.post(messageOpts, (error, response, body) => {
                            if (error) res.send({error: true, message: "Error sending message"});
                            else res.send({error: false, message: "Message sending success!"});
                        });
                    }
                });
            }
            else res.send({error: true, message: "Error, bad or no purchaceid"});
        }
        catch (err) {
            console.log("Error ");
            res.send({error: true, message: err})
        }
    });
}

module.exports = hg_route;