import React from 'react';
import logoImg from '../../images/getcredit_logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/"><img src={logoImg} alt="getcredit-logo" /></Link>
        </div>
    );
}

export default Logo;