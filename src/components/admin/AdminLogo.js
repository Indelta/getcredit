import React from 'react';
import logo from '../../images/logo.png';

function AdminLogo () {
    return (
        <div className="logo">
            <img src={logo} alt="Getcredit-logo" />
            <p>Панель администрирования</p>
        </div>
    );
}

export default AdminLogo;