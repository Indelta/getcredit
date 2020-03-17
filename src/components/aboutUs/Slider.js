import React from 'react';
import Slider from 'react-slick';
import item1Img from '../../images/about/photo1.jpg';
import item2Img from '../../images/about/photo2.jpg';
import item3Img from '../../images/about/photo3.jpg';
import item4Img from '../../images/about/photo4.jpg';

const AboutSlider = () => {
    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        slide: 'slide',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }
    return (
        <section id="images-slider">
            <Slider {...sliderSettings}>
                <div className="slide">
                    <img src={item1Img} alt="item1" />
                </div>
                <div className="slide">
                    <img src={item2Img} alt="item2" />
                </div>
                <div className="slide">
                    <img src={item3Img} alt="item3" />
                </div>
                <div className="slide">
                    <img src={item4Img} alt="item4" />
                </div>
            </Slider>
        </section>
    );
}

export default AboutSlider;