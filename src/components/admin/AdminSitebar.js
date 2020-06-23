import React, { useState } from 'react';
import AdminLogo from './AdminLogo';
import { FaDollarSign } from 'react-icons/fa';
import { FaFileSignature } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions/usersAction';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdSchedule } from 'react-icons/md';


function AdminSitebar (props) {
    const [visibleSitebar, setVisibleSitebar] = useState(false);
    const adminLogOut = e => {
        e.preventDefault();
        localStorage.removeItem('gc-token');
        sessionStorage.removeItem('gc-token');
        props.userLogOut();
        props.logined(false);
    }
    return (
        <aside id="admin-sitebar" className={visibleSitebar ? 'open' : 'close'}>
            <AdminLogo />
            <button 
                className='burger' 
                onClick={() => setVisibleSitebar(!visibleSitebar)}
            >
                {visibleSitebar ? <IoMdCloseCircleOutline /> : <GiHamburgerMenu />}
            </button>
            <nav>
                <ul>
                    <li onClick={() => setVisibleSitebar(false)}><a href="/"><FaDollarSign />Перейти на сайт</a></li>
                    <li onClick={() => setVisibleSitebar(false)}><NavLink to="/admin/posts/published" activeClassName="active"><FaFileSignature />Статьи</NavLink></li>
                    <li onClick={() => setVisibleSitebar(false)}><NavLink to="/admin/sellersQueue/0" activeClassName="active"><FaDatabase />Очередь получения заявок (Минск)</NavLink></li>
                    <li onClick={() => setVisibleSitebar(false)}><NavLink to="/admin/sellersQueue/1" activeClassName="active"><FaDatabase />Очередь получения заявок (Могилев)</NavLink></li>
                    <li onClick={() => setVisibleSitebar(false)}><NavLink to="/admin/sellersQueue/2" activeClassName="active"><FaDatabase />Очередь получения заявок (Гомель)</NavLink></li>
                    <li><NavLink to="/admin/schedule-and-schemas" activeClassName="active"><MdSchedule/>Расписание и шаблоны</NavLink></li>
                    <li onClick={() => setVisibleSitebar(false)}><NavLink to="/admin/users" activeClassName="active"><FaUserPlus />Администраторы</NavLink></li>
                    <li onClick={() => setVisibleSitebar(false)}><a href="/" onClick={adminLogOut}><GoSignOut />Выйти из учетной записи</a></li>
                </ul>
            </nav>
        </aside>
    );
}

export default connect(
    state => ({store: state.usersReducer}),
    dispatch => ({
        userLogOut: () => dispatch(logOut())
    })
)(AdminSitebar);