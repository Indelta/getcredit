import React from 'react';
import s from './styles.module.scss';

function EventsList (props) {
    const monthes = ["Янв.", "Февр.", "Мар.", "Апр.", "Мая", "Июня", "Июля", "Авг.", "Сент.", "Окт.", "Нояб.", "Дек."];
    let events = props.events;
    const formatDate = date => {
        let days = new Date(date).getDate();
        days = days < 10 ? `0${days}` : days;
        let month = new Date(date).getMonth() + 1;
        let year = new Date(date).getFullYear();
        let hours = new Date(date).getHours();
        hours = hours < 10 ? `0${hours}` : hours;
        let minutes = new Date(date).getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        
        return `${days} ${monthes[month]} ${year}г., ${hours}:${minutes}`;
    }
    return (
        <div className={s.events}>
            <h3 className={s.events__title}>Шаблоны</h3>
            {
                events.map((event, index) => {
                    let now = new Date().getTime();
                    let start = new Date(event.start).getTime();
                    let end = new Date(event.end).getTime();
                    let eClass = start < now && end > now ? `${s.event} ${s.event_active}` : s.event;
                    return (
                        <div className={eClass} key={`event-${index}`} onClick={() => props.selectEvent(event)}>
                            <p className={s.event__name}>{event.title || 'No Name'}</p>
                            <p className={s.event__date}><span>Старт:</span> {formatDate(event.start)}</p>
                            <p className={s.event__date}><span>Окончание:</span> {formatDate(event.end)}</p>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default EventsList;