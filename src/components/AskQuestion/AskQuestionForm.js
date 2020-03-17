import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { validatePhone } from '../validatePhone';
import WarningText from '../WarningText';
import { connect } from 'react-redux';
import { change_visible_default_thankyou_page } from '../../actions/thankyouPagesAction';
import axios from 'axios';

const AskQuestionForm = props => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const [quest, setQuest] = useState("");
    const btnName = "Отправить";
    const submitHandler = () => {
        if (!validatePhone(phone)) {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
        else {
            const postData = {
                name, 
                phone, 
                question: quest, 
                type: `"Задайте свой вопрос" - ${window.location.pathname}`
            };
            axios.post('/api/send-form-main', postData)
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        setError(false);
                        setName('');
                        setPhone('');
                        setQuest('');
                        props.changeVisibleThankyouPage(true);
                        window.ym(window.yandexCounterId, 'reachGoal', 'Question');
                        window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Question' });
                        window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Question' });
                    }
                    else console.error(data.message);
                    
                })
                .catch(err => console.error(err));
            
        }
    }
    return (
        <div className="ask-question-form">
            <div className="inputs">
                <div className="left">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ваше имя:" 
                        onChange={(e) => {setName(e.target.value)}}
                        value={name}
                    />
                    <InputMask
                        type="tel" 
                        mask="+375 (99) 999-99-99" 
                        name="phone" 
                        placeholder="Ваш телефон:*"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D+/gim, ""))}
                        className={error ? 'error' : ''}
                    />
                </div>
                <div className="right">
                    <textarea 
                        name="question" 
                        placeholder="Ваш вопрос:" 
                        onChange={(e) => setQuest(e.target.value)} 
                        value={quest}
                    ></textarea>
                </div>
            </div>
            <div className="buttons">
                <div className="left"><WarningText btnName={btnName} /></div>
                <div className="right">
                    <button className="btn btn-block btn-danger" onClick={submitHandler} aria-label={btnName}>{btnName}</button>
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({store: state.thankyouPagesReducer}),
    dispatch => ({
        changeVisibleThankyouPage: bul => dispatch(change_visible_default_thankyou_page(bul))
    })
)(AskQuestionForm);