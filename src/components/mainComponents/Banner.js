import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../images/banner.jpg';
const Banner = () => {
    return (
        <Link to="/consultation"><img src={banner} alt="banner"/></Link>
    );
}

export default Banner;