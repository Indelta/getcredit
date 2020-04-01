import React from 'react';
import './banner.scss';
import { connect } from 'react-redux';
import { changeVisiblePopup } from '../../actions/popupAction';

const Banner = (props) => {

  function getDate() {
    const newDate = new Date();
    const days = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
    const monthes = newDate.getMonth() < 10 ? '0' + (1 + newDate.getMonth()) : 1 + newDate.getDate();
    const years = newDate.getFullYear()
    return `${days}.${monthes}.${years}`;
  }

  function getDayName() {
    return new Date().getMonth();
  }

  return (
    <div className="banner" onClick={props.changePopup}>
      <div className="banner__inner">
        <span className="banner__date">{getDate()}</span>
        <span className="banner__text">МЫ РАБОТАЕМ</span>
        <span className="banner__day">{getDayName() === 0 ?'ЗАВТРА' : 'СЕГОДНЯ'} ДО</span>
        <span className="banner__time">{getDayName() === 6 ? '17.00' : '19.00'}</span>
      </div>
    </div>
    
  )
}

export default connect(
  state => ({store: state}),
  dispatch => ({
    changePopup: () => dispatch(changeVisiblePopup(true, true))
  })
)(Banner);


