import React from 'react';
import CountSlider from './CountSlider';

const CalcStep = (props) => {
    return (
        <div className="calc-step">
            <div className="left">
                <h2>{props.data.title}</h2>
                {
                    props.data.isSliderInput ?
                        <CountSlider 
                            max={props.data.slider.max}
                            min={props.data.slider.min}
                            step={props.data.slider.step}
                            initCount={props.data.initValue}
                            inputName={props.data.inputName}
                            inputChange={props.inputChange}
                            calcStore={props.calcStore}
                        /> :
                    props.data.isRadio ?
                        <div className="radio-group">
                            {
                                props.data.radios.map((item, index) => {
                                    return (
                                        <label key={index}>
                                            <input 
                                                type="radio" 
                                                name={props.data.inputName} 
                                                value={item} 
                                                key={item + index} 
                                                onChange={props.inputChange}
                                                checked={props.calcStore[props.data.inputName] === item}
                                            />
                                            <span>{item}</span>
                                        </label>
                                    );
                                })
                            }
                        </div> : ""
                }
                <div className="step-nav">
                    <button className="btn prev" onClick={props.prev} aria-label="Назад">Назад</button>
                    <button className="btn next" onClick={props.next} aria-label="Далее">Далее</button>
                </div>
            </div>
            <div className="right">
                <img src={props.data.img} alt="step" />
                <span className="num">{props.stepNum < 10 ? '0' + props.stepNum : props.stepNum}</span>
            </div>
        </div>
    );
}

export default CalcStep;