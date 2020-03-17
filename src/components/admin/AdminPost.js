import React from 'react';
import { updatePosts } from '../../actions/postsAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminPost (props) {
    let token = sessionStorage.getItem('gc-token') || localStorage.getItem('gc-token') || null;
    const inArchive = postId => {
        let post = props.store.filter(item => item.id === parseInt(postId));
        let isMain = post[0].isMain;
        axios.put('/api/posts', {
            isPublished: false,
            isArchived: true,
            isMain,
            postId
        }, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => res.data)
        .then(data => props.updatePostsStore(data))
        .catch(err => console.error(err));
    }
    const inPublished = postId => {
        let post = props.store.filter(item => item.id === parseInt(postId));
        let isMain = post[0].isMain;
        axios.put('/api/posts', {
            isPublished: true,
            isArchived: false,
            isMain: parseInt(isMain) === 0 ? false : true,
            postId: postId
        }, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => res.data)
        .then(data => props.updatePostsStore(data))
        .catch(err => console.error(err));
    }
    const inDelete = postId => {
        axios.delete('/api/posts', {data: {postId}, headers: {Authorization: `Bearer ${token}`}})
            .then(res => res.data)
            .then(data => props.updatePostsStore(data))
            .catch(err => console.error(err));
    }
    
    return (
        <div className="post">
            <h2>{props.h2}</h2>
            <p dangerouslySetInnerHTML={{__html: props.p}}></p>
            <div className="buttons">
                {
                    props.isPublished ? 
                    <button className="btn" onClick={() => inArchive(props.postId)}>В архив</button> :
                    <button className="btn" onClick={() => inPublished(props.postId)} >Опубликовать</button>
                }
                <Link className="btn" to={`/admin/posts/reduct/${props.postId}`}>Редактировать</Link>
                <button className="btn btn-danger" onClick={() => inDelete(props.postId)}>удалить</button>
            </div>
        </div>
    );
}

export default connect(
    state => ({store: state.postsReducer}),
    dispatch => ({
        updatePostsStore: posts => dispatch(updatePosts(posts))
    })
)(AdminPost);