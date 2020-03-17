import React from 'react';
import './mainMenu.scss';
import { FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { mainMenu } from '../menus';
import ConsultationLink from '../ConsultationLink';

const MainMenu = () => {
    return (
        <section id="main-menu">
            <div className="container">
                <nav>
                    <ul>
                        {
                            mainMenu.map((item, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            item.insetLinks ? 
                                            <div>
                                                <span>{item.name}</span>
                                                <i><FaCaretDown /></i>
                                                <div className="inset">
                                                    <div className="container">
                                                        <ul>
                                                            {item.insetLinks.map((innerItem, index) => {
                                                                return (
                                                                    <li key={`inner-${index}`}>
                                                                        <NavLink 
                                                                            to={{pathname: innerItem.link, state: {prevPath: window.location.pathname}}} 
                                                                            activeClassName="active"
                                                                        >
                                                                            {innerItem.name}
                                                                        </NavLink>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                            </div> : item.isScrolling ?
                                                            <Link to={item.link} spy={true} smooth={true} duration={500}>   {item.name}
                                                            </Link> :   
                                                            <NavLink 
                                                                to={{pathname: item.link, state: {prevPath: window.location.pathname}}} 
                                                                activeClassName="active"
                                                            >
                                                                {item.name}
                                                            </NavLink>
                                        } 
                                    </li>
                                );
                            })
                        }
                        <li><ConsultationLink /></li>
                    </ul>
                </nav>
            </div>
        </section>
    );
    
}

export default MainMenu;