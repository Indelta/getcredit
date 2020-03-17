import React from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { GiPositionMarker } from 'react-icons/gi';
import SliderItemForm from './SliderItemForm';
import house from '../../../images/slide5/house.png';

const SliderItem = React.memo(props => {
        return !props.isMogilevBanner ? (
            <div className="sliderItem" style={{backgroundImage: `url(${props.image})`}}>
                <h2>{props.title}</h2>
                <p>{props.subtitle}</p>
                <div className="yellow">
                    <div className="icon"><IoMdCheckmarkCircleOutline /></div>
                    {
                        props.yellowSpan ?
                            <div className="text">
                                <h3>{props.yellowText} <span>{props.yellowSpan}</span> *</h3>
                                <p>{props.desc}</p>
                            </div> :
                            <div className="text">
                                <h3>{props.yellowText}</h3>
                            </div>
                    }
                </div>
                <SliderItemForm btnName={props.btnName} formType={props.title} />
            </div>
        ) :
        (
            <div className="sliderItem sliderBanner" style={{backgroundImage: `url(${props.image})`}}>
                <div className="left">
                    <h2>{props.title}</h2>
                    <p>{props.subtitle}</p>
                    <div className="yellow">
                        <div className="icon"><GiPositionMarker /></div>
                        <span>{props.yellowText}</span>
                    </div>
                    <SliderItemForm btnName={props.btnName} formType={props.title} />
                </div>
                <div className="right">
                    <img src={house} alt="" />
                </div>
            </div>
        )
    }
);

export default SliderItem;