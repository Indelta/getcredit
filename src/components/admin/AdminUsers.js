import React from 'react';
import AdminUsersList from './AdminUsersList';
import AdminAddNewUser from './AdminAddNewUser';

function AdminUsers () {
    return (
        <section id="adminUsers">
            <h2>Администраторы</h2>
            <AdminUsersList />
            <AdminAddNewUser />
        </section>
    );
}

export default AdminUsers;