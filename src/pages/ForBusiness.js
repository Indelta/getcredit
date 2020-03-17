import React from 'react';
import ForBusinessComponents from '../components/forBusiness';
const ForBusiness = props => {
    const pageType = props.match.params.pageType;
    return (
        <section id="business-page">
            <ForBusinessComponents pageType={ pageType } />
        </section>
    );
}

export default ForBusiness;