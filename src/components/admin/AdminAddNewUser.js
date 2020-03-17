import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import axios from 'axios';
import { connect } from 'react-redux';
import { addUser } from '../../actions/usersAction';
const passwordHash = require('password-hash');

function AdminAddNewUser (props) {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setpwd2] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [error, setError] = useState(false);

    const changeInput = e => {
        setError(false);
        setPwdError(false);
        switch(e.target.name) {
            case 'name': 
                return setName(e.target.value);
            case 'lastname':
                return setLastName(e.target.value);
            case 'email':
                return setEmail(e.target.value);
            case 'login':
                return setLogin(e.target.value);
            case 'pwd':
                return setPwd(e.target.value);
            case 'pwd2':
                return setpwd2(e.target.value);
            default: return false;
        }
    }
    const cleanData = () => {
        setName('');
        setLastName('');
        setEmail('');
        setLogin('');
        setPwd('');
        setpwd2('');
        setPwdError(false);
        setError(false);
    }
    const checkError = () => {
        if(!name || !lastname || !email || !login || !pwd || !pwd2) setError(true);
        else if(pwd !== pwd2) setPwdError(true);
        else {
            setError(false);
            setPwdError(false);
            return true;
        }
    }

    const submitHandler = () => {
        if(checkError()) {
            let newData = {name, lastname, email, login, pwd: passwordHash.generate(pwd)};
            let token = sessionStorage.getItem('gc-token');
            axios.post('/api/admins', newData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(data => {
                    if (!data.error) {
                        cleanData();
                        props.addUserToList(newData);
                        setIsVisible(false);
                    }
                    else console.log(data.message);
                })
                .catch(err => console.error(err));
        }
    }
    return (
        <section className="adminAddNewUser">
            <button className="btn" onClick={() => setIsVisible(true)}>Добавить нового администратора</button>
            <CSSTransition
                in={isVisible}
                timeout={400}
                unmountOnExit
                classNames="add-admin"
            >
                <div className="popup-wrap">
                    <div className="popup">
                        <button className="close" onClick={() => setIsVisible(false)}><IoMdCloseCircleOutline /></button>
                        <h3>Добавить нового администратора</h3>
                        <label>
                            <p>Имя:</p>
                            <input type="text" name="name" onChange={changeInput} />
                        </label>
                        <label>
                            <p>Фамилия:</p>
                            <input type="text" name="lastname" onChange={changeInput} />
                        </label>
                        <label>
                            <p>E-mail</p>
                            <input type="text" name="email" onChange={changeInput} />
                        </label>
                        <label>
                            <p>Логин (потребуется для входа):</p>
                            <input type="text" name="login" onChange={changeInput} />
                        </label>
                        <label>
                            <p>Пароль:</p>
                            <input type="password" name="pwd" onChange={changeInput} />
                        </label>
                        <label>
                            <p>Повторите пароль:</p>
                            <input type="password" name="pwd2" onChange={changeInput} />
                        </label>
                        <p className={error || pwdError ? 'error visible' : 'error'}>
                            {
                                error ? 'Все поля обязательны к заполнению' : 'Пароли должны совпадать'
                            }
                        </p>
                        <button className="btn" onClick={submitHandler}>Добавить администратора</button>
                    </div>
                </div>
            </CSSTransition>
            
        </section>
    );
}

export default connect(
    state => ({store: state.usersReducer}),
    dispatch => ({
        addUserToList: userData => dispatch(addUser(userData))
    })
)(AdminAddNewUser);