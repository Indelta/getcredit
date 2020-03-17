import React from 'react';
import consultant from '../../images/for-business/photo.jpg';
import { connect } from 'react-redux';
import { changeVisiblePopup } from '../../actions/popupAction';

const ConsultantBlock = props => {
    return (
        <section id="consultant-block">
            <div className="container">
                <div className="left">
                    <p className="blue-line">Услуга <br/>&laquo;Личный финансовый консультант&raquo;</p>
                    <p className="text">
                        Специалисты нашей компании проконсультируют по любым вопросам, оценят вашу кредитоспособность и подберут наиболее выгодные предложения. Не нужно тратить время на посещение банков для анализа предложений. Наши эксперты владеют информацией по всем кредитным продуктам на рынке. Мы поможем оформить все необходимые документы, предоставим бланки справок и проконсультируем по всем формам финансовой отчетности
                    </p>
                </div>
                <div className="right">
                    <img src={consultant} alt="consultant face" />
                    <button className="btn btn-block btn-blue" onClick={() => props.visiblePopup(true)}>Подобрать кредит</button>
                </div>
            </div>
        </section>
    );
}

export default connect(
    state => ({store: state.popupReducer}),
    dispatch => ({
        visiblePopup: bul => dispatch(changeVisiblePopup(bul))
    })
)(ConsultantBlock);