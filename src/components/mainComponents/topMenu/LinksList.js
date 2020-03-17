import React from 'react';
import Link from './Link';
import { topMenu } from '../menus';

const LinksList = () => {
    return (
        <ul className="links-list">
            { topMenu.map((link, index) => <Link name={link.name} to={link.to} key={index} isScrolling={link.isScrolling} />) }
        </ul>
    );
}

export default LinksList;