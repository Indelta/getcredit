import React from 'react';
import { GoStar } from 'react-icons/go';

const Review = props => {
    const makeStars = (count) => {
        count = +count;
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < count) {
                stars.push(<span key={i} className="active"><GoStar /></span>);
            }
            else stars.push(<span key={i}><GoStar /></span>);
        }
        return stars;
    }
    return (
        <div className="review">
            <div className="review-avatar">
                <img src={props.img} alt=""/>
            </div>
            <div className="review-content">
                <div className="review-header">
                    <h4>{props.name}</h4>
                    <p>{props.hisReviewsCount}</p>
                    <div className="review-stars">
                        { makeStars(props.stars)}
                    </div>
                </div>
                <div className="review-text">{props.fullText}</div>
            </div>
        </div>
    );
}

export default Review;