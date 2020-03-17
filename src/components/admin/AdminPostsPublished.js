import React from 'react';
import AdminPost from './AdminPost';
import { connect } from 'react-redux';

function AdminPostsPublished (props) {
    const published = props.store.filter(item => item.isPublished);
    return (
        <div className="posts">
            {
                published.length ?
                    published.map(post => {
                        let postObj = JSON.parse(post.jsonString);
                        let header = postObj.filter(item => item.type === 'header');
                        let p = postObj.filter(item => item.type === 'paragraph');
                        return <AdminPost 
                                    h2={header[0].data.text} 
                                    p={p[0].data.text} 
                                    postId={post.id} 
                                    isPublished={true}
                                    key={post.id}
                                />
                    }) :
                    <p>На данный момент нет опубликованных постов</p>
                
            }
        </div>
    );
}

export default connect(
    state => ({store: state.postsReducer})
)(AdminPostsPublished);