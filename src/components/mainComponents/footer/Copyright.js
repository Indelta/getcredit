import React from 'react';
import PolicyLink from '../../PolicyLink';

const Copyright = () => {
    return (
        <div className="copyright">
            <div className="container">
                <p>
                    ©2015—{`${new Date().getFullYear()}`} GETCREDIT.BY (ООО «ИнДельта», УНП 192993788 г.Минск, ул.П.Глебки, д.17А, помещение №411) не является финансовой или микрофинансовой организацией, не оказывает услуг по оформлению и предоставлению населению микрозаймов, кредитов и других финансовых услуг, регулируемых Указом Президента №325 "О привлечении и предоставлении займов, деятельности микрофинансовых организаций" от 30.06.2014г. ООО «ИнДельта» (УНП 192993788 оставляет за собой право отправлять заявки в зависимости от территориальности и иных критериев в компании-партнеры, работающие под товарным знаком GetCredit.by, в том числе ЗАО "МТБанк" (Лицензия на осуществление банковской деятельности №13 от 06.05.2013г).
                    Условия кредитования: cумма кредита — от 1000 до 150 000 бел. рублей; Кредиты от 3 до 240 месяцев по ставке от 11% до 50% годовых со всеми комиссиями. Максимальная процентная ставка с учетом комиссии за снятие наличных, страхование жизни составит 50% годовых
                    К примеру, если Вы возьмете кредит в размере 1 500 р. под 15% на 12 месяцев, то каждый месяц Вы будете выплачивать в среднем по 135 р. 39 коп. и Ваша итоговая сумма с учетом комиссии составит 1624 р. 65 коп.
                </p>
                <PolicyLink>Политика конфиденциальности</PolicyLink>
            </div>
        </div>
    );
}

export default Copyright;