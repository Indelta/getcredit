const request = require('request');

const getBitrixData = (req, sellerId) => {
    const name = req.body.name ? req.body.name : "Новый лид";
    const lastname = req.body.lastname ? req.body.lastname : null;
    const phone = req.body.phone ? req.body.phone : null;
    const summa = req.body.summa ? req.body.summa : "Сумма не указана";
    const age = req.body.age ? req.body.age : null;
    const dohod = req.body.dohod ? req.body.dohod : null;
    const maternityLeave = req.body.maternityLeave ? req.body.maternityLeave : null;
    const experience = req.body.experience ? req.body.experience : null;
    const latePayments = req.body.latePayments ? req.body.latePayments : null;
    const avtoType = req.body['avto-type'] ? req.body['avto-type'] : null;
    const srok = req.body.srok ? req.body.srok : null;
    const vznos = req.body.vznos ? req.body.vznos : null;
    const nedvizhimostType = req.body['nedvizhimost-type'] ? req.body['nedvizhimost-type'] : null;
    const intent = req.body.intent ? req.body.intent : null;
    const validity = req.body.validity ? req.body.validity : null;
    const avto = req.body.avto ? req.body.avto : null;
    const formType = req.body.type ? req.body.type : null;
    const question = req.body.question ? req.body.question : null;
    const utm_term = req.body.utm_term ? req.body.utm_term : null;
    const utm_source = req.body.utm_source ? req.body.utm_source : null;
    const utm_medium = req.body.utm_medium ? req.body.utm_medium : null;
    const utm_campaign = req.body.utm_campaign ? req.body.utm_campaign : null;
    const utm_content = req.body.utm_content ? req.body.utm_content : null;

    let comments = "";
    name && (comments += `Имя: ${name} `);
    lastname && (comments += `Фамилия: ${lastname} `);
    phone && (comments += `Телефон: ${phone} `);
    summa && (comments += `Сумма: ${summa} `);
    age && (comments += `Возраст: ${age} `);
    dohod && (comments += `Уровень дохода в месяц: ${dohod} `);
    maternityLeave && (comments += `Находитесь ли вы в декретном отпуске: ${maternityLeave} `);
    experience && (comments += `Стаж на последнем месте работы: ${experience} `);
    latePayments && (comments += `Просроченные платежи: ${latePayments} `);
    avtoType && (comments += `Хотите приобрести авто: ${avtoType} `);
    srok && (comments += `Срок кредитования: ${srok} `);
    vznos && (comments += `Первоначальный взнос: ${vznos} `);
    nedvizhimostType && (comments += `Хотите приобрести недвижимость: ${nedvizhimostType} `);
    intent && (comments += `Цель кредитования: ${intent} `);
    validity && (comments += `Срок действия ИП: ${validity} `);
    avto && (comments += `Есть ли на балансе или в собственности автомобиль: ${avto} `);
    question && (comments += `Вопрос от клиента: ${question} `);
    formType && (comments += `Отправлено из формы: ${formType} `);

    const bitrix_data = {
        "fields": {
            'TITLE': `${name} ${lastname} ${summa ? ', Сумма ' + summa : ''}`,
            'NAME': name,
            'LAST_NAME': lastname,
            'PHONE': [
                {
                    'VALUE': phone,
                    'VALUE_TYPE': 'MOBILE'
                }
            ],
            "ASSIGNED_BY_ID": sellerId,
            'SOURCE_DESCRIPTION': `Форма ${formType}`,
            'SOURCE_ID': 'WEB',
            'COMMENTS': comments,
            'UTM_TERM': utm_term,
            'UTM_CAMPAIGN': utm_campaign,
            'UTM_CONTENT': utm_content,
            'UTM_MEDIUM': utm_medium,
            'UTM_SOURCE': utm_source,
        },
    };
    return bitrix_data;
}

const getMyFinData = (req, sellerId) => {
    const summa = req.body.summa ? req.body.summa : null;
    const city = req.body.city ? req.body.city : null;
    const dohod = req.body.dohod ? req.body.dohod : null;
    const work_experience = req.body.work_experience ? req.body.work_experience : null;
    const name = req.body.name ? req.body.name : null;
    const phone = req.body.phone ? req.body.phone.replace(/\D+/gim, "") : null;
    const utm_source = "myfin_form";
    const utm_campaign = req.utm_campaign;
    const title = (summa && name) ? `${name}, сумма - ${summa}` : "Новый лид с сайта Myfin.by";

    let comments = "";
    summa && (comments += `Сумма: ${summa} `);
    city && (comments += `Город: ${city} `);
    dohod && (comments += `Доход: ${dohod} `);
    work_experience && (comments += `Стаж: ${work_experience} `);
    name && (comments += `Имя: ${name}`);
    phone && (comments += `Телефон: ${phone}`);

    const bitrix_data = {
        "fields": {
            'TITLE': title,
            'NAME': name,
            'PHONE': [
                {
                    'VALUE': phone,
                    'VALUE_TYPE': 'MOBILE'
                }
            ],
            "ASSIGNED_BY_ID": sellerId,
            'SOURCE_DESCRIPTION': `Форма из Myfin.by`,
            'SOURCE_ID': 'WEB',
            'COMMENTS': comments,
            'UTM_SOURCE': utm_source,
            'UTM_CAMPAIGN': utm_campaign
        },
    };
    return bitrix_data;
}

const createNewLead = (req, sellerId) => {
    request.post(
        `https://getcredit.bitrix24.by/rest/14/${process.env.B24_TOKEN}/crm.lead.add`,
        {
            json: getBitrixData(req, sellerId), // Поменять 14 на sellerId на продакшне
        },
        (err, response, body) => {err, response, body}
    );
}

const createMyFinLead = (req, sellerId) => {
    request.post(
        `https://getcredit.bitrix24.by/rest/14/${process.env.B24_TOKEN}/crm.lead.add`,
        {
            json: getMyFinData(req, sellerId), // Поменять 14 на sellerId на продакшне
        },
        (err, response, body) => {err, response, body}
    );
}

module.exports = { createNewLead, createMyFinLead };
