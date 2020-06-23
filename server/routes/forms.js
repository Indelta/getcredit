const B24 = require('../modules/b24-sender');
const MailSender = require('../modules/mail-sender');
const GoogleSender = require('../modules/googleSheets-sender');
const Spreader = require('../modules/spreader');
const counter = require('../modules/counter');

const forms_route = app => {
    app.post('/api/send-form-main', async (req, res) => {
        let regMogilev = /mogilev/gim;
        let regGomel = /gomel/gim; 

        let spreaderData = {
            summa: req.body.summa,
            location: regMogilev.test(req.body.utm_campaign) ? 1 : regGomel.test(req.body.utm_campaign) ? 2 : 0
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
        let regGomel = /Гомель/gim;        

        let spreaderData = {
            summa: req.body.summa,
            location: regMinsk.test(req.body.city) ? 0 : regGomel.test(req.body.city) ? 2 : 1 
        }
        let spreaderCallback = (bitrixId) => {
            B24.createMyFinLead({...req, utm_source: "myfin_form", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : spreaderData.location === 2 ? 'Gomel' : 'noCityData'}, bitrixId);
            MailSender.sendMail(req, {type: 'MyFin'});
            GoogleSender.sendGoogleSheets({...req, utm_source: "myfin_form", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : spreaderData.location === 2 ? 'Gomel' : 'noCityData'});
        }

        let spreader = new Spreader(spreaderData);
        spreader.process(spreaderCallback);
        res.send({error: false, message: "success"});
    });

    // infoBank 
    app.post('/api/send-form-infobank', async (req, res) => {
        let regMinsk = /Минск/gim;
        let regGomel = /Гомель/gim;

        let total = req.body.total.replace(/\D+/gim, "");
        let spreaderData = {
            summa: total,
            location: regMinsk.test(req.body.city) ? 0 : regGomel.test(req.body.city) ? 2 : 1 
        }
        let spreaderCallback = (bitrixId) => {
            B24.createInfoBankLead({...req, utm_source: "infobank_fl", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : spreaderData.location === 2 ? 'Gomel' : 'noCityData'}, bitrixId);
            MailSender.sendMail(req, {type: 'infoBank'});
            GoogleSender.sendGoogleSheets({...req, utm_source: "infobank_fl", utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : spreaderData.location === 2 ? 'Gomel' : 'noCityData'});
        }

        let spreader = new Spreader(spreaderData);
        spreader.process(spreaderCallback);
        res.send({error: false, message: "success"});
    });

    // tut.by
    app.post('/api/send-form-tutby', async (req, res) => {
        let regMogilev = /Могилев/gim;
        let regGomel = /Гомель/gim;

        let summa = req.body.summa.replace(/\D+/gim, "");        
        let spreaderData = {
            summa: summa,
            location: regMogilev.test(req.body.utm_campaign) ? 1 : regGomel.test(req.body.utm_campaign) ? 2 : 0              
        }
        
        let spreaderCallback = (bitrixId) => {
            B24.createTutByLead({...req, utm_source: req.body.form === 'авто' ? 'tutby_avto' : 'tutby_fl', utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : spreaderData.location === 2 ? 'Gomel' : 'noCityData'}, bitrixId);
            MailSender.sendMail(req, {type: 'tut.by'});
            GoogleSender.sendGoogleSheets({...req, utm_source: req.body.form === 'авто' ? 'tutby_avto' : 'tutby_fl', utm_campaign: spreaderData.location === 1 ? 'Mogilev' : spreaderData.location === 0 ? 'Minsk' : spreaderData.location === 2 ? 'Gomel' : 'noCityData'});
        }

        let spreader = new Spreader(spreaderData);
        spreader.process(spreaderCallback);
        res.send({error: false, message: "success"});
    });
}



module.exports = forms_route;

