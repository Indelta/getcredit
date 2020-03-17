const request = require('request');


const GOOGLE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfSBSTOXkbRvkGTr_BvXboc50hU5LN-tqlSXNZRDXptuteyJg/formResponse";

const createGoogleData = (body, specialData) => {
    let days = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
    let month = (new Date().getMonth() + 1) < 10 ? ('0' + new Date().getMonth() + 1) : (new Date().getMonth() + 1);
    let year = new Date().getFullYear();

    const date = `${days}.${month}.${year}`;

    let hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
    let minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let seconds = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();

    const time = `${hours}:${minutes}:${seconds}`;
    const data = {
        "entry.503551225": date,
        "entry.2119780689": time,
        "entry.1656484302": body.name ? body.name : "",
        "entry.1875506387": body.lastname ? body.lastname : "",
        "entry.909123564": body.phone ? body.phone : "",
        "entry.52137544": body.summa ? body.summa : "",
        "entry.1588301407": body.age ? body.age : "",
        "entry.484223816": body.dohod ? body.dohod : "",
        "entry.1299964647": body.maternityLeave ? body.maternityLeave : "",
        "entry.1944405537": body.experience ? body.experience : "",
        "entry.816597291": body.latePayments ? body.latePayments : "",
        "entry.2047663689": body['avto-type'] ? body['avto-type'] : "",
        "entry.1597041815": body.srok ? body.srok : "",
        "entry.15431396": body.vznos ? body.vznos : "",
        "entry.955046219": body['nedvizhimost-type'] ? body['nedvizhimost-type'] : "",
        "entry.560047041": body.intent ? body.intent : "",
        "entry.200516145": body.validity ? body.validity : "",
        "entry.251493426": body.avto ? body.avto : "",
        "entry.70221256": body.question ? body.question : "",
        "entry.164786772": body.type ? body.type : "",
        "entry.936438179": body.utm_term ? body.utm_term : "",
        "entry.1529340713": body.utm_source ? body.utm_source : "",
        "entry.1877282560": body.utm_medium ? body.utm_medium : "",
        "entry.1116399086": body.utm_campaign ? body.utm_campaign : "",
        "entry.1407803212": body.utm_content ? body.utm_content : ""
    };
    return data;
}


const sendGoogleSheets = (req, specialData) => {
    const googleData = createGoogleData(req.body, specialData);
    request.post(GOOGLE_URL, {form: googleData}, 
        (error, response, body) => {error, response, body}
    );
}

module.exports = { sendGoogleSheets }