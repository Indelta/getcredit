import React from 'react';
import './CalculatorComponents/progress.scss';

const Loading = () => {
    return (
        <div id="loading">
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

export default Loading;