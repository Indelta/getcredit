import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { change_visible_default_thankyou_page } from '../actions/thankyouPagesAction';
import { CSSTransition } from 'react-transition-group';

const DefaultThankyouPage = (props) => {
    const visible = props.store.isVisibleDefaultThankyouPage;
    const clickClose = e => e.target.id === 'thankyou-wrap' && props.changeVisible(false);

    useEffect(() => {
        const noScroll = e => {
            e = e || window.event;
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        };
        if (visible) {
            window.addEventListener('DOMMOuseScroll', noScroll, false);
            document.addEventListener('wheel', noScroll, { passive: false });
        }
        return () => {
            window.removeEventListener('DOMMouseScroll', noScroll, false);
            document.removeEventListener('wheel', noScroll, {passive: false});
        }
    }, [visible]);
    return (
        <CSSTransition
            in={visible}
            timeout={300}
            unmountOnExit
            classNames="popup-wrap"
        >
            <div id="thankyou-wrap" onClick={clickClose}>
                <CSSTransition
                    in={visible}
                    timeout={500}
                    unmountOnExit
                    classNames="dialog"
                >
                    <div className="thankyou-dialog">
                        <h2>Спасибо за заявку!</h2>
                        <p>В ближайшее время наш менеджер свяжется с Вами для уточнения деталей</p>
                        <button className="btn btn-blue" onClick={() => props.changeVisible(false)} aria-label="Вернуться на сайт">Вернуться на сайт</button>
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
        
    );
}

export default connect(
    state => ({store: state.thankyouPagesReducer}),
    dispatch => ({
        changeVisible: bool => dispatch(change_visible_default_thankyou_page(bool))
    })
)(DefaultThankyouPage);