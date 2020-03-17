import React from 'react';

function MogilevContacts () {
    return (
        <div className="items">
            <div className="item">
                <h4 className="item-title">Режим работы:</h4>
                <p>Пн-Чт: с 10:00 до 19:00</p>
                <p>Пт: с 10:00 до 17:00</p>
                <p>Суббота, воскресенье: выходной</p>
            </div>
            <div className="item">
                <p>Прием заявок: круглосуточно</p>
                <p>Единый номер: +375&nbsp;(29)&nbsp;538-77-10</p>
                <p>E-mail: info@getcredit.by</p>
            </div>
            <div className="item">
                <h4 className="item-title">Наш офис находится по адресу:</h4>
                <p>г. Могилев</p>
                <p>ул.Дзержинского, 11а, каб 3</p>
                <p>400 м от ТЦ «Материк»</p>
            </div>
        </div>
    );
}

export default MogilevContacts;