import React from 'react';
import Descriptions from './Descriptions';
import MainNumbers from './MainNumbers';
import MainForm from './MainForm';

const MainScreen = props => {
    return (
        <div className="main-screen">
            <div className="container">
                <div className="left">
                    <h2 className="main-title">
                        {
                            props.pageType === "razvitie" ?
                            "Кредит на развитие бизнеса" :
                            "Кредит для собственников и руководителей бизнеса"
                        }
                    </h2>
                    <MainNumbers {...props} />
                </div>
                <div className="right"><MainForm {...props} /></div>
            </div>
            <Descriptions {...props} />
        </div>
    );
}

export default MainScreen;