import React from 'react';

const MainNumbers = props => {
    return (
        <div className="numbers">
            <div className="item">
                <p className="big">
                    {props.pageType === 'razvitie' ? '450 000' : '200 000'} <span>руб.</span>
                </p>
                <p className="small">Сумма кредитования</p>
            </div>
            <div className="item">
                <p className="big">
                    {props.pageType === 'razvitie' ? 'От 9%' : 'От 9,5%'}
                </p>
                <p className="small">Годовая процентная ставка</p>
            </div>
            <div className="item">
                <p className="big">
                    {props.pageType === 'razvitie' ? '7 лет' : '5 лет'}
                </p>
                <p className="small">Максимальный срок кредитования</p>
            </div>
        </div>
    );
}

export default MainNumbers;