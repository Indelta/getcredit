const mail = require('./mailer');

const createMailMessage = (req) => {
    // get form data
    const name = req.body.name ? req.body.name : null;
    const lastname = req.body.lastname ? req.body.lastname : null;
    const phone = req.body.phone ? req.body.phone : null;
    const summa = req.body.summa ? req.body.summa : null;
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
    const question = req.body.question ? req.body.question : null;
    const formType = req.body.type ? req.body.type : null;

    // myfin

    const city = req.body.city ? req.body.city : null;
    const work_experience = req.body.work_experience ? req.body.work_experience : null;
    
    let msg = "";
    name && (msg += `<p>Имя: ${name}</p>`);
    lastname && (msg += `<p>Фамилия: ${lastname}</p>`);
    phone && (msg += `<p>Телефон: ${phone}</p>`);
    summa && (msg += `<p>Сумма: ${summa}</p>`);
    age && (msg += `<p>Возраст: ${age}</p>`);
    dohod && (msg += `<p>Уровень дохода в месяц: ${dohod}</p>`);
    maternityLeave && (msg += `<p>Находитесь ли вы в декретном отпуске: ${maternityLeave}</p>`);
    experience && (msg += `<p>Стаж на последнем месте работы: ${experience}</p>`);
    latePayments && (msg += `<p>Просроченные платежи: ${latePayments}</p>`);
    avtoType && (msg += `<p>Хотите приобрести авто: ${avtoType}</p>`);
    srok && (msg += `<p>Срок кредитования: ${srok}</p>`);
    vznos && (msg += `<p>Первоначальный взнос: ${vznos}</p>`);
    nedvizhimostType && (msg += `<p>Хотите приобрести недвижимость: ${nedvizhimostType}</p>`);
    intent && (msg += `<p>Цель кредитования: ${intent}</p>`);
    validity && (msg += `<p>Срок действия ИП: ${validity}</p>`);
    avto && (msg += `<p>Есть ли на балансе или в собственности автомобиль: ${avto}</p>`);
    question && (msg += `<p>Вопрос от клиента: ${question}</p>`);
    formType && (msg += `<p>Отправлено из формы: ${formType}</p>`);
    city && (msg += `<p>Город: ${city}</p>`);
    work_experience && (msg += `<p>Стаж: ${work_experience}</p>`);
    return msg;
}
const mailOptions = {
    from: '"GetCredit" <getcredit@getcredit.by>',
    to: "deltastream.dev@gmail.com, deltaplanirovanie@gmail.com, manager.deltaplan@gmail.com, ok.getcredit@gmail.com",
    subject: "Новая заявка с сайта Getcredit.by/",
    html: ""
}
const sendMail = (req, type) => {
    mailOptions.html = createMailMessage(req);
    mailOptions.subject = type ? `Новая заявка с сайта Getcredit.by/${type.type}` : "Новая заявка с сайта Getcredit.by";
    mail.sendMail(mailOptions, (err, info) => {
        if (err) return {error: true, message: 'Message not sending'};
        else return {error: false, message: 'success!!'}
    });
}

module.exports = { sendMail };