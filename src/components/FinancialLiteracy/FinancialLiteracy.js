import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { updatePosts } from '../../actions/postsAction';
import { connect } from 'react-redux';
import FullPost from './FullPost';
import Sitebar from './Sitebar';
import MorePosts from './MorePosts';
import PostForm from './postForm';
import './financial-literacy.scss';

const FinancialLiteracy = props => {
    const [posts, setPosts] = useState(props.store || {});
    const [postsCount, setPostsCount] = useState(5);
    const addPost = () => setPostsCount(postsCount + 1);
    useEffect (() => {
        if (Object.keys(posts).length === 0) {
            axios.get('/api/posts')
                .then(res => res.data)
                .then(data => {
                    props.postsToStore(data);
                    setPosts(data);
                })
                .catch(err => console.error(err));
        }
        
    });
    const post = props.store.filter(item => item.id === +(props.postId))[0] || {};
    const otherPosts = props.store.filter(item => item.id !== +(props.postId) && item.isArchived !== 1);
    return (
        <section id="financial">
            <div className="container">
                <div className="left">
                    <h2 className="main-title">Финансовая грамотность</h2>
                    <FullPost post={post.content} />
                </div>
                <div className="right"><Sitebar posts={otherPosts} count={postsCount} /></div>
            </div>
            { postsCount < otherPosts.length && <MorePosts addPost={addPost} /> }
            <PostForm title={post.formTitle} description={post.formSubtitle} btnName={post.btnName} />
        </section>
    );
}

export default connect(
    state => ({store: state.postsReducer}),
    dispatch => ({
        postsToStore: posts => dispatch(updatePosts(posts))
    })
)(FinancialLiteracy);