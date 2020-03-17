import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import { validatePhone } from '../validatePhone';
import WarningText from '../WarningText';
import { connect } from 'react-redux';
import {change_visible_default_thankyou_page} from '../../actions/thankyouPagesAction';
import axios from 'axios';

const MainForm = props => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const btnName = "Оформить";
    const formType = `${props.pageType === 'razvitie' ? 'Кредит на развитие бизнеса' : 'Кредит для собственников и руководителей'}`;

    const submitForm = () => {
        if (!validatePhone(phone)) {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
        else {
            axios.post('/api/send-form-main', {name, phone, type: formType, ...props.utms})
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        setName("");
                        setPhone("");
                        setError(false);
                        props.changeVisibleThankyouPage(true);
                        if (props.pageType === 'razvitie') {
                            window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Business');
                            window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Business' });
                            window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Business' });
                        }
                        else {
                            window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Boss');
                            window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Boss' });
                            window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Boss' });
                        }
                    }
                    else console.error(data.message);
                })
                .catch(err => console.error(err));
        }
    }
    return (
        <div className="main-form">
            <h3>Оформить заявку</h3>
            <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
            <InputMask 
                mask="+375 (99) 999-99-99"
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D+/gim, ""))}
                className={error ? 'error' : ''}
            />
            <WarningText btnName={btnName} />
            <button className="btn btn-block btn-blue" onClick={submitForm} aria-label={btnName}>{btnName}</button>
        </div>
    );
}

export default connect(
    state => ({
        store: state.thankyouPagesReducer,
        utms: state.utmsReducer
    }),
    dispatch => ({
        changeVisibleThankyouPage: bul => dispatch(change_visible_default_thankyou_page(bul))
    })
)(MainForm);