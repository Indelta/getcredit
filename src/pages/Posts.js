import React from 'react';
import FinancialLiteracy from '../components/FinancialLiteracy';
import Pluses from '../components/mainComponents/pluses';

const Posts = props => {
    const postId = props.match.params.postId;
    return (
        <section id="post-page">
            <FinancialLiteracy postId={postId} />
            <Pluses />
        </section>
    );
}

export default Posts;