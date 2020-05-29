const B24 = require('../modules/b24-sender');
const MailSender = require('../modules/mail-sender');
const GoogleSender = require('../modules/googleSheets-sender');
const Spreader = require('../modules/spreader');
const counter = require('../modules/counter');

const forms_route = app => {
    app.post('/api/send-form-main', async (req, res) => {
        let spreaderData = {
            summa: req.body.summa,
            location: req.body.location || 0,
        }
        // если есть superseller - отправляем заявку ему
        if (req.body.superseller) {
            B24.createNewLead(req, req.body.superseller);
            res.send({error: false, message: `send to bitrix24 for id ${req.body.superseller}`});
        }
        // иначе отправляем на обработку spreader-у
        else {
            let spreader = new Spreader(spreaderData);
            let spreaderCallback = (bitrixId) => {
                B24.createNewLead(req, bitrixId);
                MailSender.sendMail(req);
                GoogleSender.sendGoogleSheets(req);
                // request count++
                counter();
            }
            spreader.process(spreaderCallback);
        }
        res.send(req.body);
    });

    // MyFin 
    app.post('/api/send-form', async (req, res) => {
        let regMinsk = /Минск/gim;
        let spreaderData = {
            summa: req.body.summa,
            location: regMinsk.test(req.body.city) ? 0 : 1
        }
        let spreaderCallback = (bitrixId) => {
            B24.createMyFinLead({...req, utm_source: "myfin_form", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : 'noCityData'}, bitrixId);
            MailSender.sendMail(req, {type: 'MyFin'});
            GoogleSender.sendGoogleSheets({...req, utm_source: "myfin_form", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : 'noCityData'});
        }

        let spreader = new Spreader(spreaderData);
        spreader.process(spreaderCallback);
        res.send({error: false, message: "success"});
    });

    // infoBank 
    app.post('/api/send-form-infobank', async (req, res) => {
        let regMinsk = /Минск/gim;
        let spreaderData = {
            summa: req.body.summa,
            location: regMinsk.test(req.body.city) ? 0 : 1
        }
        let spreaderCallback = (bitrixId) => {
            B24.createInfoBankLead({...req, utm_source: "infobank_fl", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : 'noCityData'}, bitrixId);
            MailSender.sendMail(req, {type: 'infoBank'});
            GoogleSender.sendGoogleSheets({...req, utm_source: "infobank_fl", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : 'noCityData'});
        }

        let spreader = new Spreader(spreaderData);
        spreader.process(spreaderCallback);
        res.send({error: false, message: "success"});
    });
}



module.exports = forms_route;

