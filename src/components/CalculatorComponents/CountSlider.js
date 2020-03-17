import React, { useState } from 'react';
import Slider from 'react-input-slider';

const CountSlider = (props) => {
    const sliderStyles = {
        track: {
            backgroundColor: '#fff',
            height: 10,
            width: '100%',
            border: '1px solid #ccc'
        },
        active: {
            backgroundColor: '#ffd12e'
        },
        thumb: {
            width: 40,
            height: 40,
            top: "-20px",
            backgroundColor: '#ffd12e',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(0, 0, 0, .2)'
        }
    }
    
    const changeStore = e => {
        props.inputChangeCallback && props.inputChangeCallback(false);
        if (e.x) {
            setCount(e.x);
            e.target = {};
            e.target.name = props.inputName;
            e.target.value = e.x;
            props.inputChange(e);
        }
        else {
            setCount(e.target.value);
            props.inputChange(e);
        }
    }

    const [count, setCount] = useState(props.calcStore.isMainScreen ? "" : props.initCount);
    return (
        <div className={`input-slider ${props.className}`}>
            <div className="input-group">
                <input type="number" value={count} name={props.inputName} onChange={changeStore} placeholder={props.initCount} />
                {props.span && <span>{props.span}</span>}
            </div>
            <div className="slider-group">
                <Slider
                    axis="x"
                    x={count}
                    xmin={props.min}
                    xmax={props.max}
                    xstep={props.step}
                    onChange={changeStore}
                    styles={sliderStyles}
                />
                <div className="minMax">
                    <span>{props.min}</span>
                    <span>{props.max}</span>
                </div>
            </div>
        </div>
    );
};

export default CountSlider;