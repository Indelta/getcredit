import React from 'react';

const Descriptions = props => {
    return (
        <div className="descriptions">
            <div className="container">
                <div className="items">
                    <div className="item">
                        <p className="item-title">Кто может получить</p>
                        <div className="content">
                            {
                                props.pageType === 'razvitie' ?
                                <ul>
                                    <li>ООО, ОДО, ОАО, ЗАО, ЧУП, ЧТУП</li>
                                    <li>Индивидуальные предприниматели</li>
                                </ul> :
                                <ul>
                                    <li>Собственник или руководитель действующих на территории РБ юридических лиц (ЧУП, ООО, ОАО, МФО, ОДО, ЗАО)</li>
                                    <li>Индивидуальные предприниматели</li>
                                </ul>
                            }
                        </div>
                    </div>
                    <div className="item">
                        <p className="item-title">Требования</p>
                        <div className="content">
                            <ul>
                                <li>Отсутствие текущей просроченной задолженности</li>
                                <li>Отсутствие действующего исполнительного листа</li>
                                {props.pageType === 'sobstvennik' ? <li>Отсутствие непогашенной судимости</li> : ""}
                            </ul> 
                        </div>
                    </div>
                    <div className="item">
                        <p className="item-title">Необходимые документы</p>
                        <div className="content">
                            {
                                props.pageType === 'razvitie' ?
                                <ul>
                                    <li>Индивидуально, в зависимости от суммы и условий кредитования</li>
                                    <li>Документы на получение кредита - оформит наш консультант</li>
                                </ul> :
                                <ul>
                                    <li>Паспорт гражданина Беларуси или вид на жительство в Беларуси</li>
                                    <li>Документы на получение кредита - оформит наш консультант</li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Descriptions;