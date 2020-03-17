import React, {useState} from 'react';
import { FiMenu } from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';
import { Accordion, AccordionItem } from 'react-sanfona';
import { topMenu, mainMenu, yellowLink } from '../menus';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './mobileMenu.scss';

const MobileMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [asideVisible, setAsideVisible] = useState(false);
    const accordionMenu = mainMenu.filter(item => item.insetLinks);
    const mainMenuWithoutInset = mainMenu.filter(item => !item.insetLinks);
    const closeMobileMenu = () => setMenuVisible(false);
    const clickWrapClose = e => {
        if (e.target.classList.contains('mobileMenu-wrap')) {
            setMenuVisible(false);
        }
    }
    
    return (
        <div id="mobileMenu">
            <button className="burger" onClick={() => setMenuVisible(true)} aria-label="Menu"><FiMenu /></button>
            <CSSTransition
                in={menuVisible}
                timeout={300}
                classNames='menu'
                unmountOnExit
                onEntered={() => setAsideVisible(true)}
                onExit={() => setAsideVisible(false)}
            >
                <div className="mobileMenu-wrap" onClick={clickWrapClose}>
                    <button className="close" onClick={closeMobileMenu}>&times;</button>
                    <CSSTransition
                        in={asideVisible}
                        timeout={400}
                        classNames="aside"
                    >
                        <div className="menu">
                            <Accordion allowMultiple={true} className="mobile-accordion">
                                {
                                    accordionMenu.map((item, index) => {
                                        return (
                                            <AccordionItem title={item.name} className="mobile-accordion-item" key={index}>
                                                <ul className="innerItems">
                                                    {
                                                        item.insetLinks.map((insetItem, index) => {
                                                            return (
                                                                <li key={`item-${index}`}>
                                                                    <NavLink 
                                                                        to={{pathname: insetItem.link, state: {prevPath: window.location.pathname}}}
                                                                        activeClassName="active"
                                                                        onClick={closeMobileMenu}
                                                                    >
                                                                        {insetItem.name}
                                                                    </NavLink>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </AccordionItem>
                                        );
                                    })
                                }
                            </Accordion>
                            {
                                mainMenuWithoutInset.map((item, index) => {
                                    return <NavLink 
                                            to={{pathname: item.link, state: {prevPath: window.location.pathname}}} 
                                            key={index} 
                                            className="mobile-menu-item" 
                                            activeClassName="active"
                                            onClick={closeMobileMenu}
                                        >
                                                {item.name}
                                        </NavLink>
                                })
                            }
                            {
                                topMenu.map((item, index) => {
                                    return item.isScrolling ? 
                                    <HashLink
                                        to={`/#${item.to}`}
                                        className="mobile-menu-item"
                                        onClick={closeMobileMenu}
                                        key={index}
                                    >
                                        {item.name}
                                    </HashLink>
                                    : <NavLink 
                                                to={item.to}
                                                activeClassName="active"
                                                className="mobile-menu-item"
                                                key={index}
                                                onClick={closeMobileMenu}
                                            >
                                                    {item.name}
                                            </NavLink>
                                })
                            }
                            {
                                yellowLink.map((item, index) => {
                                    return window.location.pathname === "/" ?
                                        <Link
                                            to={item.to}
                                            spy={true} 
                                            smooth={true} 
                                            duration={500}
                                            className="mobile-menu-item"
                                            onClick={closeMobileMenu}
                                            key={index}
                                        >
                                            {item.name}
                                        </Link> :
                                        <HashLink
                                            to="/#posts"
                                            className="mobile-menu-item"
                                            onClick={closeMobileMenu}
                                            key={index}
                                        >
                                            {item.name}
                                        </HashLink>
                                })
                            }
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
            
        </div>
    );
}

export default MobileMenu;