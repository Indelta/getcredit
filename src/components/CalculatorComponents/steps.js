import step1Img from '../../images/calc/steps/1img.jpg';
import step2Img from '../../images/calc/steps/2img.jpg';
import step3Img from '../../images/calc/steps/3img.jpg';
import step4Img from '../../images/calc/steps/4img.jpg';
import step5Img from '../../images/calc/steps/5img.jpg';
import avtoLizingImg1 from '../../images/calc/steps/avto-lizing/1img.jpg';
import avtoLizingImg2 from '../../images/calc/steps/avto-lizing/2img.jpg';
import avtoLizingImg3 from '../../images/calc/steps/avto-lizing/3img.jpg';
import nedvizhimostLizingImg1 from '../../images/calc/steps/nedvizhimost-lizing/1img.jpg';
import nedvizhimostLizingImg2 from '../../images/calc/steps/nedvizhimost-lizing/2img.jpg';
import nedvizhimostLizingImg3 from '../../images/calc/steps/nedvizhimost-lizing/3img.jpg';
import ipImg1 from '../../images/calc/steps/ip/1img.jpg';
import ipImg2 from '../../images/calc/steps/ip/2img.jpg';
import ipImg3 from '../../images/calc/steps/ip/3img.jpg';
import ipImg4 from '../../images/calc/steps/ip/4img.jpg';

const defaultCalcSteps = [
    {
        "title": "Укажите Ваш возраст:",
        "isSliderInput": true,
        "inputName": "age",
        "slider": {
            "min": 18,
            "max": 65,
            "step": 1
        },
        "img": step1Img,
        "initValue": 25
    },
    {
        "title": "Текущий уровень дохода в месяц",
        "isSliderInput": true,
        "inputName": "dohod",
        "slider": {
            "min": 100,
            "max": 6000,
            "step": 100
        },
        "img": step2Img,
        "initValue": 1600
    },
    {
        "title": "Находитесь ли Вы в декретном отпуске?",
        "isRadio": true,
        "inputName": "maternityLeave",
        "radios": ["Нет", "Да"],
        "img": step3Img,
        "initValue": "Нет"
    },
    {
        "title": "Стаж на последнем месте работы:",
        "isRadio": true,
        "inputName": "experience",
        "radios": ["0-3 месяца", "3-12 месяцев", "12 месяцев и более", "Являюсь ИП"],
        "img": step4Img,
        "initValue": "3-12 месяцев"
    },
    {
        "title": "Просроченные платежи по кредитам в данный момент",
        "isRadio": true,
        "inputName": "latePayments",
        "radios": ["Нет", "Да"],
        "img": step5Img,
        "initValue": "Нет"
    },
];

const lizingAvtoSteps = [
    {
        "title": "Хотите приобрести авто:",
        "isRadio": true,
        "inputName": "avto-type",
        "radios": ["Новый", "С пробегом"],
        "img": avtoLizingImg1,
        "initValue": "Новый"
    },
    {
        "title": "Срок кредитования:",
        "isRadio": true,
        inputName: "srok",
        "radios": ["1-2 года", "3-5 лет", "6 лет и более"],
        "img": avtoLizingImg2,
        "initValue": "3-5 лет"
    },
    {
        "title": "Первоначальный взнос:",
        "isRadio": true,
        "inputName": "vznos",
        "radios": ["0%", "20%", "30% и более"],
        "img": avtoLizingImg3,
        "initValue": "0%"
    }
];

const lizingNedvizhimostSteps = [
    {
        "title": "Хотите приобрести недвижимость:",
        "isRadio": true,
        "inputName": "nedvizhimost-type",
        "radios": ["Новую", "Вторичную"],
        "img": nedvizhimostLizingImg1,
        "initValue": "Новую"
    },
    {
        "title": "Срок кредитования:",
        "isRadio": true,
        "inputName": "srok",
        "radios": ["1-5 года", "6-10 лет", "11-20 лет"],
        "img": nedvizhimostLizingImg2,
        "initValue": "11-20 лет"
    },
    {
        "title": "Первоначальный взнос:",
        "isRadio": true,
        "inputName": "vznos",
        "radios": ["до 20%", "20-30%", "более 30%"],
        "img": nedvizhimostLizingImg3,
        "initValue": "более 30%"
    }
];

const ipSteps = [
    {
        "title": "Цель кредитования:",
        "isRadio": true,
        "inputName": "intent",
        "radios": ["На потребительские нужды", "На развитие"],
        "img": ipImg1,
        "initValue": "На развитие"
    },
    {
        "title": "Срок действия ИП:",
        "isRadio": true,
        "inputName": "validity",
        "radios": ["до 3 месяцев", "3 месяца и более"],
        "img": ipImg2,
        "initValue": "3 месяца и более"
    },
    {
        "title": "Есть ли текущие просрочки по кредитам?",
        "isRadio": true,
        "inputName": "latePayments",
        "radios": ["Нет", "Есть"],
        "img": ipImg3,
        "initValue": "Нет"
    },
    {
        "title": "Есть ли на балансе или в собственности автомобиль?",
        "isRadio": true,
        "inputName": "avto",
        "radios": ["Нет", "Есть"],
        "img": ipImg4,
        "initValue": "Есть"
    }
];

export {
    defaultCalcSteps,
    lizingAvtoSteps,
    lizingNedvizhimostSteps,
    ipSteps
}