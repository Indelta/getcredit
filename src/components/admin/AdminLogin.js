import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/usersAction';
import axios from 'axios';
const passwordHash = require('password-hash');

function AdminLogin (props) {
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(false);

    const clickHandler = e => {
        e.preventDefault();
        axios.post('/api/signin', {login, pwd})
            .then(res => res.data)
            .then(data => {
                if (!data.error) {
                    let user = data.admins.filter(item => passwordHash.verify(pwd, item.pwd));
                    if (user.length) {
                        setError(false);
                        remember && data.token && localStorage.setItem('gc-token', data.token);;
                        data.token && sessionStorage.setItem('gc-token', data.token);
                        setLogin('');
                        setPwd('');
                        props.logined(true);
                        props.addUsersToStore(data.admins);
                    }
                    else setError(true);
                }
                else setError(true);
            }).catch(err => {
                if (err.response) setError(true);
            });
    }

    return <div id="adminLogin">
        <form id="login-form">
            <h2>Вход в систему</h2>
            <label>
                <p>Логин:</p>
                <input 
                    type="text" 
                    name="login" 
                    onChange={e => {
                        setLogin(e.target.value);
                        setError(false);
                    }} 
                    value={login} 
                />
            </label>
            <label>
                <p>Пароль:</p>
                <input 
                    type="password" 
                    name="pwd" 
                    onChange={e => {
                        setPwd(e.target.value);
                        setError(false);
                    }} 
                    value={pwd} 
                />
            </label>
            <label>
                <input type="checkbox" name="remember" onChange={e => setRemember(e.target.checked)} />
                <span>Запомнить меня</span>
            </label>
            <button className="btn btn-block" onClick={clickHandler}>Войти</button>
            <p className={error ? 'error visible' : 'error'}>Не верный Логин и/или пароль</p>
            
        </form>
    </div>
}

export default connect(
    state => ({store: state.usersReducer}),
    dispatch => ({
        addUsersToStore: users => dispatch(getUsers(users))
    })
)(AdminLogin);