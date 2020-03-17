import React, { useState, useEffect } from 'react';
import Logo from '../Logo';
import Sitename from './Sitename';
import Phones from './Phones';
import Phone from '../Phone';
import MobileMenu from '../mobileMenu';
import './header.scss';

const Header = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [headerShadow, setHeaderShadow] = useState(false);
    useEffect (() => {
        const updateWindowWidth = () => setWindowWidth(window.innerWidth);
        const listenScroll = () => window.pageYOffset >= 100 ? setHeaderShadow(true) : setHeaderShadow(false);
        window.addEventListener('resize', updateWindowWidth, false);
        window.addEventListener('scroll', listenScroll, false);
        return () => {
            window.removeEventListener('resize', updateWindowWidth, false);
            window.removeEventListener('scroll', listenScroll, false);
        }
    });
    return (
        <header id="header">
            <div className={headerShadow ? 'container with-shadow' : 'container'}>
                <Logo />
                <Sitename />
                {windowWidth < 768 && <MobileMenu />}
                {windowWidth >= 768 && <Phone />}
            </div>
            {windowWidth < 768 && <div className="container"><Phones /></div>}
        </header>
    );
}

export default Header;