import React, {useState} from 'react';
import man from '../../../images/consultationPageMan.png';
import InputMask from 'react-input-mask';
import WarningText from '../../WarningText';
import { connect } from 'react-redux';
import axios from 'axios';
import { change_visible_default_thankyou_page } from '../../../actions/thankyouPagesAction';

const ConsultationForm = props => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const formType = 'Получить консультацию - страница "Проверка кредитной истории"';
    const btnName = "Получить консультацию";
    const submitHandler = () => {
        if (phone.length < 12) {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
        else {
            const formData = {name, phone, type: formType, ...props.utms};
            axios.post('/api/send-form', formData)
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        setName("");
                        setPhone("");
                        setError(false);
                        props.thankyouVisible(true);
                        window.ym(window.yandexCounterId, 'reachGoal', 'History_Consultation');
                        window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'History_Consultation' });
                        window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'History_Consultation' });
                    }
                    else console.error(data.message);
                })
                .catch(err => console.error(err));
        }
    }
    return (
        <div className="consultation-form">
            <div className="inner">
                <div className="left">
                    <img src={man} alt="man" />
                </div>
                <div className="right">
                    <input 
                        type="text" 
                        placeholder="Ваше имя" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <InputMask 
                        mask="+375 (99) 999-99-99"
                        type="tel"
                        name="phone"
                        placeholder="Ваш телефон"
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/\D+/gim, ""))}
                        className={error ? 'error' : ''}
                    />
                    <button className="btn btn-block btn-blue" onClick={submitHandler} aria-label={btnName}>
                        {btnName}
                    </button>
                    <WarningText btnName={btnName} />
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({utms: state.utmsReducer}),
    dispatch => ({
        thankyouVisible: bul => dispatch(change_visible_default_thankyou_page(bul))
    })
)(ConsultationForm);