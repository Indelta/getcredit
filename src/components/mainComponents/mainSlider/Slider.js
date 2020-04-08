import React, {useState, useEffect} from 'react';
import Slick from 'react-slick';
import SliderItem from './SliderItem';
import slide1Img from '../../../images/slide1-img.jpg';
import slide2Img from '../../../images/slide2-img.jpg';
import slide3Img from '../../../images/slide3-img.jpg';
import slide4Img from '../../../images/slide4-img.jpg';
import slide5Img from '../../../images/slide5/bg.jpg';
import mobileSlide1Img from '../../../images/for-mobile/1slide_img.jpg';
import mobileSlide2Img from '../../../images/for-mobile/2slide_img.jpg';
import mobileSlide3Img from '../../../images/for-mobile/3slide_img.jpg';
import mobileSlide4Img from '../../../images/for-mobile/4slide_img.jpg';
import mobileSlide5Img from '../../../images/slide5/bg_mobile.jpg';
import { connect } from 'react-redux';

const Slider = ({utms}) => {
    const rand = Math.floor(Math.random() * 4);
    const sliderSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: false,
        initialSlide: utms.utm_content === 'banner_open_mogilev' ? 4 : rand
    }
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, []);
    return (
        <Slick {...sliderSettings}>
            <div className="slide slide1">
                <SliderItem
                    image={windowWidth >= 768 ? slide1Img : mobileSlide1Img}
                    title="Помощь в получении кредита"
                    subtitle="Профессионалы оценят ваши шансы получить кредит и выберут лучший банк"
                    yellowText="Вероятность одобрения"
                    yellowSpan="82%"
                    desc="*по аналитическим данным crm за 4 квартал 2019 года"
                    btnName="Подобрать кредит"
                />
            </div>
            <div className="slide slide2">
                <SliderItem 
                    image={windowWidth >= 768 ? slide2Img : mobileSlide2Img}
                    title="Деньги нужны сегодня?"
                    subtitle="Личный консультант подберет экспресс кредит и поможет получить"
                    yellowText="Деньги за один день!"
                    btnName="Экспресс кредит"
                />
            </div>
            <div className="slide slide3">
                <SliderItem 
                    image={windowWidth >= 768 ? slide3Img : mobileSlide3Img}
                    title="Много кредитов в разных банках?"
                    subtitle="Подберем рефинансирование на выгодных условиях"
                    yellowText="Сделаем ваши кредиты дешевле"
                    btnName="Получить консультацию"
                />
            </div>
            <div className="slide slide4">
                <SliderItem 
                    image={windowWidth >= 768 ? slide4Img : mobileSlide4Img}
                    title="Отказали в банке?"
                    subtitle="Проведем анализ, выясним причины и поможем их устранить"
                    yellowText="Не проблема!"
                    btnName="Получить консультацию"
                />
            </div>
            {
                utms.utm_content === 'banner_open_mogilev' ?
                <div className="slide slide5">
                    <SliderItem 
                        image={windowWidth >= 768 ? slide5Img : mobileSlide5Img}
                        title="Новый филиал в г. Могилев"
                        subtitle="Личные консультанты помогут в получении кредита"
                        yellowText="Могилев, улица Дзержинского, 11А, каб.3"
                        btnName="Получить консультацию"
                        isMogilevBanner={true}
                    />
                </div> : null
            }
            
        </Slick>
    );
}

export default connect(
    state => ({utms: state.utmsReducer})
)(Slider);