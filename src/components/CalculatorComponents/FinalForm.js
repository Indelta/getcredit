import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { validatePhone } from '../validatePhone';
import { change_visible_default_thankyou_page } from '../../actions/thankyouPagesAction';
import { connect } from 'react-redux';
import WarningText from '../WarningText';
import axios from 'axios';

const FinalForm = (props) => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const type = `${props.calcName ? props.calcName : "Кредиты онлайн"}`;
    const btnName = "Получить кредит";
    const submitHandler = () => {
        if (!validatePhone(phone)) {
            setPhoneError(true);
            setTimeout(() => setPhoneError(false), 500);
        }
        else {
            const postData = {name, lastname, phone, type, ...props.calcStore, ...props.utms};
            axios.post('/api/send-form-main', postData)
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        setName("");
                        setLastname("");
                        setPhone("");
                        props.thankyouPage(true);
                        props.resetState();
                        switch(props.calcName) {
                            case 'nedvizhimost':
                                window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Flat');
                                window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Flat' });
                                window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Flat' });
                                break;
                            case 'lizing-avto':
                                window.ym(window.yandexCounterId, 'reachGoal', 'Lizing_Auto');
                                window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send','event_label': 'Lizing_Auto'});
                                window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Lizing_Auto' });
                                break;
                            case 'lizing-nedvizhimost':
                                window.ym(window.yandexCounterId, 'reachGoal', 'Lizing_Flat');
                                window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Lizing_Flat' });
                                window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Lizing_Flat' });
                                break;
                            case 'ref':
                                window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Ref');
                                window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Ref' });
                                window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Ref' });
                                break;
                            case 'ip':
                                window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Ip');
                                window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Ip' });
                                window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Ip' });
                                break;
                            case 'avto':
                                window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Auto');
                                window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Auto' });
                                window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Auto' });
                                break;
                            default: {
                                const summa = props.calcStore.summa;
                                const maternityLeave = props.calcStore.maternityLeave;
                                const experience = props.calcStore.experience;
                                const latePayments = props.calcStore.latePayments;
                                if (summa > 1000 && maternityLeave === "Нет" && experience !== "0-3 месяца" && latePayments === "Нет") {
                                    window.ym(window.yandexCounterId, 'reachGoal', 'Credit_AllOk');
                                    window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_AllOk' });
                                    window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_AllOk' });
                                }
                                else {
                                    window.ym(window.yandexCounterId, 'reachGoal', 'Credit_AllBad');
                                    window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_AllBad' });
                                    window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_AllBad' });
                                }
                            }
                        }
                    }
                    else console.error(data.message);
                })
                .catch(err => console.error(err));
        }
    }
    return (
        <div className="final-form">
            <h3>Оставьте свои контактные данные:</h3>
            <input 
                type="text" 
                name="firstname" 
                placeholder="Ваше имя" 
                onChange={e => setName(e.target.value)} 
                value={name}
            />
            <input 
                type="text" 
                name="lastname" 
                placeholder="Ваша фамилия" 
                onChange={e => setLastname(e.target.value)} 
                value={lastname}
            />
            <InputMask
                type="tel" 
                mask="+375 (99) 999-99-99" 
                name="phone" 
                placeholder="+375 (__) ___-__-__*"
                onChange={e => setPhone(e.target.value.replace(/\D+/gim, ""))}
                value={phone}
                className={phoneError ? 'error' : ''}
            />
            <WarningText btnName={btnName} />
            <button className="btn btn-block" onClick={submitHandler} aria-label={btnName}>{btnName}</button>
        </div>
    );
}

export default connect(
    state => ({
        store: state.thankyouPagesReducer,
        utms: state.utmsReducer
    }),
    dispatch => ({
        thankyouPage: bul => dispatch(change_visible_default_thankyou_page(bul))
    })
)(FinalForm);