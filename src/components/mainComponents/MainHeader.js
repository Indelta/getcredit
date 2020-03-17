import React, { useState, useEffect } from 'react';
import TopMenu from './topMenu';
import Header from './header';
import MainMenu from './mainMenu';

const MainHeader = props => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const updateWidth = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', updateWidth, false);
        return () => window.removeEventListener('resize', updateWidth, false);
    });
    return (
        <section id="main-header" style={props.styles}>
            {windowWidth >= 768 && <TopMenu />}
            <Header />
            {windowWidth >= 768 && <MainMenu />}
        </section>
    );
}

export default MainHeader;