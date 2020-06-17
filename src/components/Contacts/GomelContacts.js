import React from 'react';

function GomelContacts () {
    return (
        <div className="items">
            <div className="item">
                <h4 className="item-title">Режим работы:</h4>
                <p>Пн-Чт: с 10:00 до 19:00</p>
                <p>Пт-Сб: с 10:00 до 17:00</p>
                <p>Воскресенье: выходной</p>
            </div>
            <div className="item">
            <h4 className="item-title">Контакты:</h4>
                <p>Прием заявок: круглосуточно</p>
                <p>Единый номер: +375&nbsp;(29)&nbsp;772-8-772</p>
                <p>E-mail: info@getcredit.by</p>
            </div>
            <div className="item">
                <h4 className="item-title">Наш офис находится по адресу:</h4>
                <p>г. Гомель, ул. Ветковская, 1</p>
                <p></p>
                <p></p>
            </div>
        </div>
    );
}

export default GomelContacts;