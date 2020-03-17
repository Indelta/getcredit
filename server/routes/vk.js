const B24 = require('../modules/b24-sender');
const MailSender = require('../modules/mail-sender');
const GoogleSender = require('../modules/googleSheets-sender');
const Spreader = require('../modules/spreader');
const counter = require('../modules/counter');

const vk_route = app => {
    app.post('/api/vk', async (req, res) => {
        const confirmation_token = process.env.VK_CONFIRMATION_TOKEN;
        const data = req.body;

        switch(data.type) {
            case 'confirmation':
                res.send(confirmation_token);
                break;
            case 'lead_forms_new':
                // отправляем письмо на почту и данные в bitrix24
                {
                    let answers = data.object.answers;
                    let formId = data.object.form_id;

                    let name = answers.filter(answer => answer.key === "first_name")[0].answer;
                    let lastname = answers.filter(answer => answer.key === "last_name")[0].answer;
                    let phone = answers.filter(answer => answer.key === "phone_number")[0].answer.replace(/\D+/gim, "");
                    let summa = answers.filter(answer => answer.key === "custom_0")[0].answer;
                    let age = answers.filter(answer => answer.key === "age")[0].answer;
                    let utm_source = "VK";
                    let type = "Форма из ВК";

                    let body = {name, lastname, phone, summa, age, utm_source, type};

                    let spreaderData = { summa, location: 1 };
                    let spreader = new Spreader(spreaderData);
                    let spreaderCallback = bitrixId => {
                        B24.createNewLead({ body }, bitrixId);
                        MailSender.sendMail({ body }, { type: "VK" });
                        GoogleSender.sendGoogleSheets({ body });
                        counter();
                    }

                    
                    if (parseInt(formId, 10) === 5) {
                        spreader.process(spreaderCallback);
                        res.send("ok");
                    }
                }
                //res.send("ok");
                break;
                
            default: res.send("ok");
        }
    });
}


module.exports = vk_route;