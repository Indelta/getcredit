import React, {useEffect} from 'react';
import './progress.scss';
const ProgressStep = (props) => {
    useEffect(() => {
        let progress = setTimeout(() => {
            props.next();
        }, 3000);
        return () => {clearTimeout(progress)}
    }, [props]);
    return (
        <div className="calc-step progress-step">
            <h2 className="progress-title">Подбираем кредит для Вас...</h2>
            <div className="__progress">
                <div className="__item"></div>
                <div className="__item"></div>
                <div className="__item"></div>
                <div className="__item"></div>
                <div className="__item"></div>
            </div>
        </div>
    );
}

export default ProgressStep;