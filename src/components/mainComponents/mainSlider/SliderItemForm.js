import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import axios from 'axios';
import { validatePhone } from '../../validatePhone';
import { change_visible_default_thankyou_page } from '../../../actions/thankyouPagesAction';


const SliderItemForm = (props) => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const [btnName, setBtnName] = useState(props.btnName);
    const formType = props.formType;
    
    const sendForm = e => {
        e.preventDefault();
        setBtnName('Отправка...');
        const formData = {
            phone,
            type: `слайд - ${formType}`,
            ...props.store.utms
        }
        if(!validatePhone(phone)) {
            setBtnName(props.btnName);
            setError(true);
            setTimeout(() => setError(false), 500);
        }
        else {
            setBtnName(props.btnName);
            axios.post('/api/send-form-main', formData)
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        setBtnName(props.btnName);
                        setPhone("");
                        props.changeThankyou(true);
                        window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Consultation');
                        window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Consultation' });
                        window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Consultation' });
                    }
                    else console.error(data.message);
                })
                .catch(err => console.error(err));
        }
    }
    const onPhoneChange = e => setPhone(e.target.value.replace(/[^0-9]/gim, ""));
    return (
        <div className="slider-item-form">
            <label><InputMask
                type="tel" 
                mask="+375 (99) 999-99-99" 
                name="phone" 
                placeholder="+375 (__) ___-__-__*"
                onChange={onPhoneChange}
                value={phone}
                className={error ? "error" : ""}
             /></label>
            <button className="btn btn-blue" onClick={sendForm} aria-label="Получить консультацию">{btnName}</button>
        </div>
    );
}

export default connect(
    state => ({store: {utms: state.utmsReducer, thankyou: state.thankyouPagesReducer}}),
    dispatch => ({
        changeThankyou: bool => dispatch(change_visible_default_thankyou_page(bool))
    })
)(SliderItemForm);