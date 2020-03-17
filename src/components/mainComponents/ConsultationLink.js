import React from 'react';
import { changeVisiblePopup } from '../../actions/popupAction';
import { connect } from 'react-redux';

const ConsultationLink = props => {
    return <button className="btn" onClick={props.openModal} aria-label="Консультация по кредитам">Консультация по кредитам</button>
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        openModal: () => dispatch(changeVisiblePopup(true))
    })
)(ConsultationLink);