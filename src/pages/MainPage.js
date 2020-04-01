import React from 'react';
import LazyLoad from 'react-lazyload';
import MainSlider from '../components/mainComponents/mainSlider';
import AboutBlock from '../components/mainComponents/AboutBlock';
import Selection from '../components/mainComponents/selection';
import Posts from '../components/mainComponents/posts';
import Pluses from '../components/mainComponents/pluses';
import Reviews from '../components/mainComponents/reviews';
import Map from '../components/mainComponents/map';
import Banner from '../components/banner/banner'
import { connect } from 'react-redux';

const MainPage = (props) => {
    return (
        <div id="mainPage">
            <Banner />
            <MainSlider />
            <AboutBlock />
            <Selection />
            <Posts />
            <Pluses />
            <Reviews />
            <LazyLoad offset={300} unmountIfInvisible={true}><Map activeMap={props.location} /></LazyLoad>
            
        </div>
    ); 
}

export default connect(
    state => ({location: state.utmsReducer.location})
)(MainPage);