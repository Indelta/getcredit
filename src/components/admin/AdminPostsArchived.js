import React from 'react';
import AdminPost from './AdminPost';
import { connect } from 'react-redux';

function AdminPostsArchived (props) {
    const archived = props.store.filter(item => item.isArchived);
    
    return (
        <div className="posts">
            {
                archived.length ? 
                    archived.map(post => {
                        let postObj = JSON.parse(post.jsonString);
                        let h2 = postObj.filter(item => item.type === 'header');
                        let p = postObj.filter(item => item.type === 'paragraph');
                        return <AdminPost 
                                    h2={h2[0].data.text} 
                                    p={p[0].data.text} 
                                    postId={post.id} 
                                    isArchived={true}
                                    key={post.id}
                                />
                    }) :
                    <p>В архиве нет статей</p>
            }
        </div>
    );
}

export default connect(
    state => ({store: state.postsReducer})
)(AdminPostsArchived);