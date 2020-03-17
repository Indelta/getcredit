import React from 'react';
import { Link } from 'react-router-dom';

const SitebarPost = props => {
    const post = JSON.parse(props.post.jsonString);
    const images = post.filter(item => item.type === 'image');
    const titles = post.filter(item => item.type === 'header');
    return (
        <Link to={`/posts/${props.post.id}`} className="sitebar-post">
            <img src={images[0].data.file.url} alt="post" />
            <h3>{titles[0].data.text}</h3>
        </Link>
    );
}

export default SitebarPost;