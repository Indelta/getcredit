import React from 'react';
import AdminSitebar from './AdminSitebar';
import AdminSellersQueue from './AdminSellersQueue';
import AdminPosts from './AdminPosts';
import AdminUsers from './AdminUsers';
import AdminSchedule from './AdminSchedule/index';
import { Route } from 'react-router-dom';

function AdminPanel (props) {
    return (
        <div id="adminPanel">
            <AdminSitebar {...props} />
            <div className="adminContent">
                <Route path="/admin/sellersQueue/:filial?" component={AdminSellersQueue} />
                <Route path="/admin/posts" component={AdminPosts} />
                <Route path="/admin/users" component={AdminUsers} />
                <Route path="/admin/schedule-and-schemas" component={AdminSchedule} />
            </div>
        </div>
    );
}

export default AdminPanel;