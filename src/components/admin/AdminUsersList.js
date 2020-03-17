import React from 'react';
import AdminUser from './AdminUser';
import { connect } from 'react-redux';

function AdminUsersList (props) {
    return (
        <div className="admin-users-list">
            { props.store.map((item, index) => <AdminUser user={item} key={index} />) }
        </div>
    );
}

export default connect(
    state => ({store: state.usersReducer})
)(AdminUsersList);