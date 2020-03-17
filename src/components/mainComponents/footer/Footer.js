import React, { useState, useEffect } from 'react';
import Copyright from './Copyright';
import Logo from '../Logo';
import Phone from '../Phone';
import Links from '../topMenu/LinksList';
import './footer.scss';

const Footer = props => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const updateWindowWidth = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', updateWindowWidth, false);
        return () => window.removeEventListener('resize', updateWindowWidth, false);
    }, []);
    return (
        <footer id="footer" style={props.styles}>
            <div className="container">
                <div className="whiteBlock">
                    <Logo />
                    { windowWidth >= 768 && <Links /> }
                    <Phone />
                </div>
            </div>
            <Copyright />
        </footer>
    );
}

export default Footer;