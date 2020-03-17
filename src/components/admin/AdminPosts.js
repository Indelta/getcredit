import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import AdminPostsPublished from './AdminPostsPublished';
import AdminPostsArchived from './AdminPostsArchived';
import AdminPostsCreacte from './AdminPostsCreate';
import { connect } from 'react-redux';
import { updatePosts } from '../../actions/postsAction';
import AdminReductPost from './AdminReductPost';
import axios from 'axios';

function AdminPosts (props) {
    let token = sessionStorage.getItem('gc-token') || localStorage.getItem('gc-token') || null;
    if (!props.store.length) {
        axios.get('/api/posts', {headers: {Authorization: `Bearer ${token}`}})
            .then(res => res.data)
            .then(data => props.postsToStore(data))
            .catch(err => console.error(err));
    }
    return (
        <section id="adminPosts">
            <h2>Статьи</h2>
            <nav className="posts-nav">
                <ul>
                    <li><NavLink to="/admin/posts/published" activeClassName="active">Опубликованные</NavLink></li>
                    <li><NavLink to="/admin/posts/archived" activeClassName="active">В архиве</NavLink></li>
                    <li><NavLink to="/admin/posts/create" activeClassName="active">Новая статья</NavLink></li>
                </ul>
            </nav>
            <div className="content">
                <Route path="/admin/posts/published" component={AdminPostsPublished} />
                <Route path="/admin/posts/archived" component={AdminPostsArchived} />
                <Route path="/admin/posts/create" component={AdminPostsCreacte} />
                <Route path="/admin/posts/reduct/:postId" component={AdminReductPost} />
            </div>
        </section>
    );
}

export default connect(
    state => ({store: state.postsReducer}),
    dispatch => ({
        postsToStore: postsArray => dispatch(updatePosts(postsArray))
    })
)(AdminPosts);