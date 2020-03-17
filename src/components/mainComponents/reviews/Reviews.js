import React from 'react';
import { FaPen } from 'react-icons/fa';
import { GoStar } from 'react-icons/go';
import json from './reviewsParse.json';
import googleLogo from '../../../images/google-logo.png';
import Review from './review';
import './reviews.scss';

const Reviews = () => {
    return (
        <section id="reviews">
            <div className="container">
                <h2 className="title">Отзывы о нашей компании:</h2>
                <img src={googleLogo} alt="google" className="google-logo" />
                <div className="reviews-container">
                    <div className="reviews-header">
                        <div className="left">
                            <h3>Единый кредитный центр GetCredit.by</h3>
                            <p>ул. Притыцкого 29, Минск</p>
                            <div className="big-stars">
                                <span>{json.score}</span>
                                <p className="stars">
                                    <span><GoStar /></span>
                                    <span><GoStar /></span>
                                    <span><GoStar /></span>
                                    <span><GoStar /></span>
                                    <span><GoStar /></span>
                                </p>
                                <p>{json.reviewsCount}</p>
                            </div>
                        </div>
                        <div className="right">
                            <a className="btn btn-blue" href="https://www.google.com/search?q=getcredit&oq=getcredit&aqs=chrome..69i57j35i39j0l2j69i60l4.3359j0j7&sourceid=chrome&ie=UTF-8#lrd=0x46dbc57dbc1f74c5:0x4a8bf122ad24b61d,3,,," target="_blank" rel="noopener noreferrer">
                                <span><FaPen /></span>
                                Написать отзыв
                            </a>
                        </div>
                    </div>
                    <div className="reviews-content">
                        {
                            json.reviews.reverse().map((review, index) => {
                                let stars = review.hisStars.slice(8,9);
                                let img = require(`${review.hisAv}`);
                                return review.fullText.length ? 
                                    <Review
                                        key={`review-${index}`}
                                        stars={stars}
                                        img={img}
                                        fullText={review.fullText}
                                        hisReviewsCount={review.hisReviewsCount}
                                        name={review.name}
                                    /> : ""; 
                            })
                        }
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reviews;