import React from 'react';

function Tabs (props) {
    console.log(props)
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
            {/* <button 
                className={`tab ${props.active === 2 ? 'active' : ''}`} 
                location={2}
                onClick={props.clickTabHandler}
            >
                Гомель
            </button> */}
        </div>
    );
}

export default Tabs;