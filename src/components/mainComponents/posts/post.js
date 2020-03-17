import React from 'react';
import { Link } from 'react-router-dom';

const Post = React.memo(props => {
        const postObj = JSON.parse(props.jsonString);
        const headers = postObj.filter(item => item.type === 'header');
        const paragraphs = postObj.filter(item => item.type === 'paragraph');
        const image = postObj.filter(item => item.type === 'image');
        return (
            <div className="post">
                <div className="post-inner">
                    <div className="left">
                        <img src={image[0].data.file.url} alt="post" />
                    </div>
                    <div className="right">
                        <Link to={`/posts/${props.id}`} className="post">{headers[0].data.text}</Link>
                        <p dangerouslySetInnerHTML={{__html: paragraphs[0].data.text}}></p>
                    </div>
                </div>
            </div>
        );
    } 
);

export default Post;