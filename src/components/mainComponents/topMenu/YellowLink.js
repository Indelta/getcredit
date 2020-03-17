import React from 'react';
import { MdSchool } from 'react-icons/md';
import { HashLink } from 'react-router-hash-link';
import { yellowLink } from '../menus';

const YellowLink = (props) => {
    const link = {...yellowLink[0], ...props};
    return (
        <HashLink className="btn" to={`/#${link.to}`}>
            <MdSchool className="icon" />
            <span>{link.name}</span>
        </HashLink>
    );
}

export default YellowLink;