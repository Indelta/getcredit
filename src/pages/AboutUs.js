import React from 'react';
import AboutUsComponents from '../components/aboutUs';
import AskQuestion from '../components/AskQuestion';
import Pluses from '../components/mainComponents/pluses';

const AboutUs = () => {
    return (
        <section id="about-us">
            <AboutUsComponents />
            <AskQuestion />
            <Pluses />
        </section>
    );
}

export default AboutUs;