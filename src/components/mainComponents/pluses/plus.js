import React from 'react';

const Plus = props => {
    return (
        <div className="plus">
            <div className="icon">
                <img src={props.icon} alt="" />
            </div>
            <div className="text">
                <h3>{props.title}</h3>
                <p>{props.subtitle}</p>
            </div>
        </div>
    );
}

export default Plus;