import React from 'react';

function Tabs (props) {
    return(
        <div className="tabs">
            <button 
                className={`tab ${props.active === 0 ? 'active' : ''}`} 
                location={0}
                onClick={props.clickTabHandler}
            >
                Минск
            </button>
            <button 
                className={`tab ${props.active === 1 ? 'active' : ''}`} 
                location={1}
                onClick={props.clickTabHandler}
            >
                Могилев
            </button>
        </div>
    );
}

export default Tabs;