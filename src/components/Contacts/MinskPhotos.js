import React from 'react';
import img1 from '../../images/contacts/1img.jpg';
import img2 from '../../images/contacts/2img.jpg';
import img3 from '../../images/contacts/3img.jpg';
import img4 from '../../images/contacts/4img.jpg';
function MinskPhotos () {
    return (
        <div className="photos">
            <h3 className="bordered-title">Как нас найти?</h3>
            <div className="items">
                <div className="item">
                    <div className="img">
                        <img src={img2} alt="vhod"/>
                    </div>
                    <div className="bottom">
                        Ближайший вход в ТЦ &laquo;Тивали&raquo; со стороны ст. метро Спортивная
                    </div>
                </div>
                <div className="item">
                    <div className="img">
                        <img src={img1} alt=""/>
                    </div>
                    <div className="bottom">Офис 233 находится на втором этаже ТЦ</div>
                </div>
                <div className="item">
                    <div className="img">
                        <img src={img3} alt="prohod"/>
                    </div>
                    <div className="bottom">Проход левее по коридору до упора</div>
                </div>
                <div className="item">
                    <div className="img">
                        <img src={img4} alt="office" />
                    </div>
                    <div className="bottom">Офис 233</div>
                </div>
            </div>
        </div>
    );
}

export default MinskPhotos;