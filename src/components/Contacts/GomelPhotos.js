import React from 'react';
import img1 from '../../images/contacts/gomel/photo_1.jpg';
import img2 from '../../images/contacts/gomel/photo_2.jpg';

function GomelPhotos () {
    return (
        <div className="photos">
            <h3 className="bordered-title">Как нас найти?</h3>
            <div className="items">
                <div className="item mogilev">
                    <div className="img">
                        <img src={img1} alt="vhod"/>
                    </div>
                    <div className="bottom">
                        Проход со стороны пр.Победы
                    </div>
                </div>
                <div className="item mogilev">
                    <div className="img">
                        <img src={img2} alt=""/>
                    </div>
                    <div className="bottom">Центральный вход</div>
                </div>
            </div>
        </div>
    );
}

export default GomelPhotos;