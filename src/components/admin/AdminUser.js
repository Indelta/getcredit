import React from 'react';
import axios from 'axios';
import { getUsers } from '../../actions/usersAction';
import { connect } from 'react-redux';

function AdminUser (props) {
    const deleteUser = () => {
        let userId = props.user.id;
        let token = sessionStorage.getItem('gc-token');
        axios.delete('/api/admins', {
            data: {userId},
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .then(data => {
                if(!data.error) props.updateUsers(data);
                else console.log(data.message);
            })
            .catch(err => console.error(err));
    }
    return (
        <div className="admin-user">
            <div className="left">
                <h4 className="userr-name">{`${props.user.name} ${props.user.lastname}`}</h4>
                <p>{props.user.email}</p>
            </div>
            <div className="right">
                <button className="btn btn-danger" onClick={deleteUser}>Удалить</button>
            </div>
            
        </div>
    );
}

export default connect(
    state => ({store: state.usersReducer}),
    dispatch => ({
        updateUsers: newUsers => dispatch(getUsers(newUsers))
    })
)(AdminUser);