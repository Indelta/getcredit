import React from 'react';
import MainScreen from './MainScreen';
import ConsultantBlock from './ConsultantBlock';
import './forBusiness.scss';

const ForBusiness = (props) => {
    return (
        <section id="for-business">
            <MainScreen pageType={props.pageType} />
            <ConsultantBlock pageType={props.pageType} />
        </section>
    );
}

export default ForBusiness;