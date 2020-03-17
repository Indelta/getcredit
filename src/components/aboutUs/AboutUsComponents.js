import React from 'react';
import Slider from './Slider';
import document from '../../images/about/svidetelstvo.jpg';
import './aboutUs.scss';

const AboutUsComponents = () => {
    return (
        <section id="about">
            <div className="container">
                <h2 className="title">Единый кредитный центр <span>GetCredit.by</span></h2>
                <p className="strong">– команда экспертов в финансовой сфере. Наши специалисты обладают большим опытом и налаженными контактами с банками, лизинговыми компаниями и микрофинансовыми организациями Республики Беларусь.</p>
                <p>Мы проанализируем вашу кредитную историю, на основании кредитного рейтинга и скорбалла подберём кредит с минимальной процентной ставкой и с макимальной вероятностью одобрения.
                Вы сэкономите время и получите деньги в необходимый срок без скрытых банковских платежей и услуг.</p>
            </div>
            <Slider />
            <div className="container">
                <div className="documents-text">
                    <div className="left">
                        <p className="blue-line">Единый кредитный центр  GetCredit.by (ООО «ИнДельта») имеет официальный доступ к автоматизированной информационной системе Национального банка, обеспечивающей формирование кредитных историй, их хранение и предоставление кредитных отчетов.</p>
                        <p>ООО «ИнДельта» не относится к финансовым или микрофинансовым организациям,  регулируемым Указом Президента №325 "О привлечении и предоставлении займов, деятельности микрофинансовых организаций" от 30.06.2014г.</p>
                    </div>
                    <div className="right">
                        <img src={document} alt="svidetelstvo" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUsComponents;