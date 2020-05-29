const topMenu = [
    {
        name: "О компании",
        to: "/about"
    },
    {
        name: "Отзывы",
        to: "reviews",
        isScrolling: true
    },
    {
        name: "Вопрос-ответ",
        to: "/faq"
    },
    {
        name: "Контакты",
        to: "/contacts"
    }
];

const mainMenu = [
    {
        name: "Кредиты",
        insetLinks: [
            {
                "name": "Потребительский кредит",
                "link": "/calculator/potrebitelskiy"
            },
            {
                "name": "На недвижимость",
                "link": "/calculator/nedvizhimost"
            },
            {
                "name": "На автомобиль",
                "link": "/calculator/avto"
            },
            {
                "name": "Кредит наличными",
                "link": "/calculator/nalichnie"
            },
            {
                "name": "Экспресс-кредит",
                "link": "/calculator/express"
            },
            {
                "name": "Рефинансирование",
                "link": "/calculator/ref"
            }
        ]
    },
    {
        "name": "Лизинг",
        "insetLinks": [
            // {
            //     "name": "Лизинг",
            //     "link": "/calculator/lizing"
            // },
            {
                "name": "Лизинг авто",
                "link": "/calculator/lizing-avto"
            },
            {
                "name": "Лизинг недвижимости",
                "link": "/calculator/lizing-nedvizhimost"
            }
        ]
    },
    {
        "name": "Для бизнеса",
        "insetLinks": [
            {
                "name": "Кредит для ИП",
                "link": "/calculator/ip"
            },
            {
                "name": "Для собственников и руководителей",
                "link": "/for-business/sobstvennik"
            },
            {
                "name": "Кредит на развитие бизнеса",
                "link": "/for-business/razvitie"
            }
        ]
    },
    {
        "name": "Калькулятор",
        "link": "/calculator",
    },
    // {
    //     "name": "Расчет",
    //     "link": "/main-calculator",
    // }
];

const yellowLink = [
    {
        "name": "Финансовая грамотность",
        "to": "posts",
        "isScrolling": true
    }
];

module.exports = {topMenu, mainMenu, yellowLink};