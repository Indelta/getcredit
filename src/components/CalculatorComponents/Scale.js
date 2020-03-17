import React, {useState, useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';

const Scale = (props) => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        setReady(true);
    }, []);
    return (
        <div className="scale">
            <div className="scale-name">
                <p className={props.rating === 'low' ? 'active' : ''}>Низкая</p>
                <p className={props.rating === 'mid' ? 'active' : ''}>Средняя</p>
                <p className={props.rating === 'high' ? 'active' : ''}>Высокая</p>
            </div>
            <div className="dots">
            <CSSTransition
                in={ready}
                timeout={2500}
                classNames="animated"
            >
                <div className={`treangle ${props.rating}`}></div>
            </CSSTransition>
            
            </div>
            <div className="scale-area"></div>
        </div>
    );
}

export default Scale;