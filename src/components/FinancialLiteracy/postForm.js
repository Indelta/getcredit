import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import { change_visible_default_thankyou_page } from '../../actions/thankyouPagesAction';
import WarninText from '../WarningText';
import axios from 'axios';

const PostForm = props => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const type = "Получить консультацию - финансовая грамотность";
    const submitHandler = () => {
        if (phone.length < 12) {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
        else {
            const formData = {name, phone, type, ...props.utms};
            axios.post('/api/send-form-main', formData)
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        setName("");
                        setPhone("");
                        setError(false);
                        props.changeThankyouVisible(true);
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
        <div id="post-form">
            <div className="container">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <div className="inputs">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ваше имя" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <InputMask 
                        mask="+375 (99) 999-99-99"
                        type="tel"
                        name="phone"
                        placeholder="Ваш телефон"
                        className={error ? 'error' : ''}
                        onChange={e => setPhone(e.target.value.replace(/\D+/gim, ""))}
                        value={phone}
                    />
                </div>
                <button className="btn btn-block btn-danger" onClick={submitHandler} aria-label="submit">{props.btnName}</button>
                <WarninText btnName={props.btnName} />
            </div>
        </div>
    );
}

export default connect(
    state => ({
        store: state.thankyouPageReducer,
        utms: state.utmsReducer
    }),
    dispatch => ({
        changeThankyouVisible: bul => dispatch(change_visible_default_thankyou_page(bul))
    })
)(PostForm);