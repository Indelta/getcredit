import React, { useState } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminPanel from '../components/admin/AdminPanel';
import { getUsers } from '../actions/usersAction';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import '../components/admin/admin.scss';

function Admin (props) {
    const getTokenFromLocalStorage = () => localStorage.getItem('gc-token') || null;
    const [isAdminVisible, setIsAdminVisible] = useState(false);
    let token = getTokenFromLocalStorage();
    if (token) {
        axios.get('/api/admins', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
            .then(data => {
                if(!data.error) {
                    setIsAdminVisible(true);
                    !props.store.length && props.setUsersToStore(data);
                }
                else console.log(data.message);
            })
            .catch(err => {
                if (err.response) console.log(err.response.status);
            });
    }
    return (
        isAdminVisible ?
            <CSSTransition 
                in={isAdminVisible}
                classNames="admin"
                unmountOnExit
                timeout={400}
            >
                <AdminPanel logined={setIsAdminVisible} />
            </CSSTransition> :
            <CSSTransition
                in={!isAdminVisible}
                classNames="login"
                unmountOnExit
                timeout={400}
            >
                <AdminLogin logined={setIsAdminVisible} />
            </CSSTransition> 
    );
}

export default connect(
    state => ({store: state.usersReducer}),
    dispatch => ({
        setUsersToStore: users => dispatch(getUsers(users))
    })
)(Admin);