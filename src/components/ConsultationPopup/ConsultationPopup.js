import React, {useState, useEffect} from 'react';
import icon from '../../images/consultation-icon.jpg';
import InputMask from 'react-input-mask';
import { validatePhone } from '../validatePhone';
import { IoMdClose } from 'react-icons/io';
import WarningText from '../WarningText';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { changeVisiblePopup } from '../../actions/popupAction';
import { change_visible_default_thankyou_page } from '../../actions/thankyouPagesAction';
import axios from 'axios';
import './consultationPopup.scss';

const ConsultationPopup = props => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
    const type = `Консультация по кредитам - ${window.location.pathname}`;
    const btnName = "Заказать";
    useEffect(() => {
        const noScroll = e => {
            e = e || window.event;
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        };
        
        if (props.store.isVisiblePopup) {
            window.addEventListener('DOMMOuseScroll', noScroll, false);
            document.addEventListener('wheel', noScroll, { passive: false });
        }
        return () => {
            window.removeEventListener('DOMMouseScroll', noScroll, false);
            document.removeEventListener('wheel', noScroll, {passive: false});
        }
    }, [props.store.isVisiblePopup]);
    
    const submitHandler = () => {
        if (!validatePhone(phone)) {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
        else {
            axios.post('/api/send-form-main', {name, phone, type, ...props.utms})
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        setName("");
                        setPhone("");
                        setIsDialog(false);
                        props.visibleThankyouPage(true);
                        window.ym(window.yandexCounterId, 'reachGoal', 'Credit_Consultation');
                        window.gtag('event', 'send', {'event_category': 'Event', 'event_action': 'Send', 'event_label': 'Credit_Consultation' });
                        window._tmr.push({ id: window.mtCounterId, type: 'reachGoal', goal: 'Credit_Consultation' });
                    }
                    else console.error(data.message);
                })
                .catch(err => console.log(err));
            
        }
    }
    const clickClose = e => {
        e.target.id === "consultation-popup" && props.visiblePopup(false);
    }
    return (
        <CSSTransition
            in={props.store.isVisiblePopup}
            timeout={400}
            unmountOnExit
            classNames="popup"
            onEntered={() => setIsDialog(true)}
            onExit={() => setIsDialog(false)}
        >
            <div id="consultation-popup" onClick={clickClose}>
                <CSSTransition
                    in={isDialog}
                    unmountOnExit
                    timeout={400}
                    classNames="dialog"
                    onExited={() => props.visiblePopup(false)}
                >
                    <div className="popup-dialog">
                        <button className="close" onClick={() => props.visiblePopup(false)} aria-label="Закрыть"><IoMdClose /></button>
                        <img src={icon} alt="consultation icon" />
                        <h2>Консультация по кредитам</h2>
                        <p>Оставьте свой номер телефона и наш консультант свяжется с Вами в ближайшее время</p>
                        <input 
                            type="text" 
                            placeholder="Ваше Имя"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <InputMask
                            type="tel"
                            mask="+375 (99) 999-99-99"
                            placeholder="+375 (**) ***-**-**"
                            value={phone}
                            onChange={e => setPhone(e.target.value.replace(/\D+/gim, ""))}
                            className={error ? 'error' : ''}
                        />
                        <button className="btn btn-blue btn-block" onClick={submitHandler} aria-label={btnName}>{btnName}</button>
                        <WarningText btnName={btnName} />
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    );
}

export default connect(
    state => ({
        store: state.popupReducer,
        utms: state.utmsReducer
    }),
    dispatch => ({
        visiblePopup: bul => dispatch(changeVisiblePopup(bul)),
        visibleThankyouPage: bul => dispatch(change_visible_default_thankyou_page(bul))
    })
)(ConsultationPopup);