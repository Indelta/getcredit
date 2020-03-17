import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import CountSlider from './CountSlider';
import potrebitelskiyMainImg from '../../images/calc/main/potrebitelsky.png';
import tehnikaMainImg from '../../images/calc/main/technika.png';
import remontMainImg from '../../images/calc/main/remont.png';
import otpuskMainImg from '../../images/calc/main/otpusk.png';
import defaultMainImg from '../../images/calc/main/online.png';
import nedvizhimostMainImg from '../../images/calc/main/nedvijimost.png';
import nalichnieMainImg from '../../images/calc/main/nalicnue.png';
import mebelMainImg from '../../images/calc/main/mebel.png';
import expressMainImg from '../../images/calc/main/express.png';
import avtoMainImg from '../../images/calc/main/avto.png';
import avtoLizingMainImg from '../../images/calc/main/avto-lizing.png';
import nedvizhimostLizingMainImg from '../../images/calc/main/nedvizhimost-lizing.png';
import refMainImg from '../../images/calc/main/ref.png';
import ipMainImg from '../../images/calc/main/ip.png';
import axios from 'axios';

const makeDate = () => {
    const date = new Date();
    const days = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${days}.${month}.${year}`; 
}

const CalcMainScreen = (props) => {
    let title = "Кредиты-онлайн";
    let subtitle = "Введите сумму кредита:";
    let mainImg = defaultMainImg;
    let steps = props.steps;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [appCount, setAppCount] = useState("");
    const [summaError, setSummaError] = useState(false);
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);
    if (!appCount) {
        axios.get('/api/count')
            .then(res => res.data)
            .then(data => !data.error ? setAppCount(data.count) : console.error(data.message))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth, false);
        return () => window.removeEventListener('resize', updateWindowWidth, false);
    });
    switch(props.calcName) {
        case 'potrebitelskiy':
            title = "Потребительский кредит";
            mainImg = potrebitelskiyMainImg;
            break;
        case 'nedvizhimost':
            title = "кредит на недвижимость";
            mainImg = nedvizhimostMainImg;
            break;
        case 'avto':
            title = "Кредит на авто";
            mainImg = avtoMainImg;
            break;
        case 'express':
            title ="Экспресс-кредиты";
            mainImg = expressMainImg;
            break;
        case 'ref':
            title = "Рефинансирование кредитов";
            mainImg = refMainImg;
            break;
        case 'ip':
            title = "Кредиты для ИП";
            mainImg = ipMainImg;
            break;
        case 'nalichnie':
            title = "Кредит наличными";
            mainImg = nalichnieMainImg;
            break;
        case 'otpusk':
            title = "Кредит на отпуск";
            mainImg = otpuskMainImg;
            break;
        case 'mebel':
            title = "Кредит на мебель";
            mainImg = mebelMainImg;
            break;
        case 'remont':
            title = "кредит на ремонт";
            mainImg = remontMainImg;
            break;
        case 'tehnika':
            title = "Кредит на бытовую технику";
            mainImg = tehnikaMainImg;
            break;
        case 'lizing-avto':
            title = "Лизинг авто";
            subtitle = "Стоимость авто в лизинг:";
            mainImg = avtoLizingMainImg;
            break;
        case 'lizing-nedvizhimost':
            title = "Лизинг недвижимости";
            subtitle = "Стоимость недвижимости в лизинг:";
            mainImg = nedvizhimostLizingMainImg;
            break;
        default: 
            title = "Кредиты-онлайн";
            mainImg = defaultMainImg;
    }
    const questStr = () => {
        const count = steps.length;
        let str = "вопросов";
        switch (count) {
            case 1:
                str = "вопрос";
                break;
            case 2:
            case 3:
            case 4:
                str = "вопроса";
                break;
            default:
                str = "вопросов";
        }
        return `${count} ${str}`;
    }
    const calculate = () => {
        if (props.calcStore.summa === 0) {
            setSummaError(true);
        }
        else props.next();
    } 
    return (
        <div className="calc-main">
            <div className="calc-main-screen">
                <div className="container">
                    <h2 className="title">{`${title} ${props.location === 1 ? 'в Могилёве' : ''}`}</h2>
                    <div className="left">
                        <p className="first">{subtitle}</p>
                        <CountSlider 
                            initCount={5000}
                            min={1000}
                            max={100000}
                            step={1000}
                            span="BYN"
                            inputName={props.inputName}
                            inputChange={props.inputChange}
                            inputChangeCallback={setSummaError}
                            calcStore={props.calcStore}
                        />
                        <div className={summaError ? 'summaError visible' : "summaError"}>
                            Пожалуйста, введите нужную Вам сумму кредита
                        </div>
                        <button className="btn btn-blue" onClick={calculate}>Рассчитать</button>
                        <p>Ответьте на {questStr()} и наш сервис подберет для Вас самое выгодное предложение</p>
                    </div>
                    {
                        windowWidth >= 768 ?
                            <div className="right">
                                <img src={mainImg} alt="main-img" />
                            </div> : ""
                    }
                    
                </div>
            </div>
            <div className="calc-counter">
                <div className="container">
                    <div className="date">{makeDate()}</div>
                    <div className="app-count">Обработано заявок: <span>{appCount}</span></div>
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({location: state.utmsReducer.location})
)(CalcMainScreen);