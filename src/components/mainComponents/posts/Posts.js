import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updatePosts } from '../../../actions/postsAction';
import Post from './post';
import axios from 'axios';
import './posts.scss';
import Banner from '../Banner';
import { MdAddCircleOutline } from 'react-icons/md';

const Posts = (props) => {
    if (!props.store.length) {
        axios.get('/api/posts')
            .then(res => res.data)
            .then(data => props.postsToStore(data))
            .catch(err => console.error(err));
    }
    const [postCount, setPostCount] = useState(3);
    const mainPosts = props.store.filter(item => item.isArchived === 0);
    return (
        <section id="posts">
            <div className="container">
                <h2>Финансовая грамотность</h2>
                <div className="posts-inner">
                    <div className="left">
                        {
                            mainPosts.map((item, index) => {
                                return index < postCount && <Post key={index} {...item} />
                            })
                        }
                    </div>
                    <div className="right"><Banner /></div>
                </div>
            </div>
            {
                postCount < mainPosts.length ? 
                <div className="morePosts">
                    <div className="container">
                        <button onClick={() => setPostCount(postCount + 1)}>
                            <MdAddCircleOutline />
                            <span>Еще статьи</span>
                        </button>
                    </div>
                </div> : ""
            }
            
        </section>
    );
}

export default connect(
    state => ({store: state.postsReducer}),
    dispatch => ({
        postsToStore: posts => dispatch(updatePosts(posts))
    })
)(Posts);