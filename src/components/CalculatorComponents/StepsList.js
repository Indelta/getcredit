import React from 'react';

const StepsList = (props) => {
    let items = [];
    for(let i = 0; i < props.itemsLength; i++) {
        items.push(<li key={i} className={i === props.activeItem - 1 ? "active" : ""}>{i + 1}</li>);
    }
    return <ul className="steps-list">{ items.map((item, index) => item) }</ul>;
}

export default StepsList;