import React from 'react';
import { Link } from 'react-router-dom';

const SelectionItem = React.memo(props => {
    return (
        <div className="selection-item" style={props.styles}>
            <Link to={{pathname: `/calculator/${props.urlName}`, state: {prevPath: window.location.pathname}}} >
                <img src={props.preview} alt="credit-preview" />
                <p>{props.name}</p>
            </Link>
        </div>
    );
});

export default SelectionItem;