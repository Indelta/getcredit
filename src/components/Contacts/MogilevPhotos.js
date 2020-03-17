import React from 'react';
import img1 from '../../images/contacts/mogilev/1_photo.jpg';
import img2 from '../../images/contacts/mogilev/2_photo.jpg';
import img3 from '../../images/contacts/mogilev/3_photo.jpg';
import img4 from '../../images/contacts/mogilev/4_photo.jpg';

function MogilevPhotos () {
    return (
        <div className="photos">
            <h3 className="bordered-title">Как нас найти?</h3>
            <div className="items">
                <div className="item mogilev">
                    <div className="img">
                        <img src={img1} alt="vhod"/>
                    </div>
                    <div className="bottom">
                        От остановок &laquo;Универсам Центральный&raquo;/&laquo;Диагностический центр&raquo;
                    </div>
                </div>
                <div className="item mogilev">
                    <div className="img">
                        <img src={img2} alt=""/>
                    </div>
                    <div className="bottom">От ТЦ &laquo;Материк&raquo;</div>
                </div>
                <div className="item mogilev">
                    <div className="img">
                        <img src={img3} alt="prohod"/>
                    </div>
                    <div className="bottom">Здание на перекрестке пер. Карпинской и ул. Дзержинского</div>
                </div>
                <div className="item mogilev">
                    <div className="img">
                        <img src={img4} alt="office" />
                    </div>
                    <div className="bottom">Вход с левого торца здания, каб. 3</div>
                </div>
            </div>
        </div>
    );
}

export default MogilevPhotos;