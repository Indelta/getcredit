import React from 'react';
import LinksList from './LinksList';
import YellowLink from './YellowLink';
// import Geo from '../geo';
import './topMenu.scss';

const TopMenu = (props) => {
    return (
        <section id="top-menu">
            <div className="container">
                <div className="left"><LinksList /></div>
                {/* <Geo /> */}
                <div className="right"><YellowLink {...props.yellowLink} /></div>
            </div>
        </section>
    );
}

export default TopMenu;