import React from 'react';
import Text from './text';
import Image from './image';
import './aboutBlock.scss';

const AboutBlock = () => {
    return (
        <section id="about-block">
            <div className="inner">
                <div className="container">
                    <div className="left"><Text /></div>
                    <div className="right"><Image /></div>
                </div>
            </div>
        </section>
    );
}

export default AboutBlock;