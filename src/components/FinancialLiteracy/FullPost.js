import React from 'react';

const FullPost = props => {
    return (
        <div className="full-post" dangerouslySetInnerHTML={props.post && {__html: props.post}}></div>
    );
}

export default FullPost;