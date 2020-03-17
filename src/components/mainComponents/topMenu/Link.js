import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Link = (props) => {
    return props.isScrolling ? 
        <li><HashLink to={`/#${props.to}`}>{props.name}</HashLink></li> :
        <li><NavLink to={props.to} activeClassName="active">{props.name}</NavLink></li>

}

export default Link;