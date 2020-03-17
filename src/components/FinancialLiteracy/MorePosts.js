import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';

const MorePosts = props => {
    return (
        <div className="more-posts">
            <div className="container">
                <div className="right">
                    <button onClick={props.addPost}>
                        <MdAddCircleOutline />
                        <span>Еще статьи</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MorePosts;