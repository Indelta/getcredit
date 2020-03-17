import React from 'react';
import Plus from './plus';
import icon1 from '../../../images/pluses/1icon.png';
import icon2 from '../../../images/pluses/2icon.png';
import icon3 from '../../../images/pluses/3icon.png';
import icon4 from '../../../images/pluses/4icon.png';
import './pluses.scss';

const pluses = [
    {
        icon: icon1,
        title: "Используйте свою кредитную историю",
        subtitle: "Проанализируем вашу кредитную историю, при составлении заявки сделаем акцент на преимуществах"
    },
    {
        icon: icon2,
        title: "Экономьте время на одобрении",
        subtitle: "Согласуем вашу заявку только с теми банками, которые готовы выделить вам денежные средства"
    },
    {
        icon: icon3,
        title: "Получайте кредит по выгодным ставкам",
        subtitle: "Поможем получить одобрение в нескольких банках, подберем лучшие условия кредитования"
    },
    {
        icon: icon4,
        title: "Оплачивайте по факту получения денег",
        subtitle: "Получаем вознаграждение после выполненной работы - когда вы получите желаемую сумму"
    }
];

const Pluses = () => {
    return (
        <section id="pluses">
            <div className="container">
                {pluses.map((item, index) => <Plus key={index} {...item} />)}
            </div>
        </section>
    );
}

export default Pluses;