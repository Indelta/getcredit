import React, {useState, useEffect} from 'react';
import SelectionItem from './selectionItem';

import nalichnie from '../../../images/credits/nalichnie.jpg';
import potrebitelskiy from '../../../images/credits/potrebitelskiy.jpg';
import avto from '../../../images/credits/avto.jpg';
import otpusk from '../../../images/credits/otpusk.jpg';
import nedvizhimost from '../../../images/credits/nedvizhimost.jpg';
import mebel from '../../../images/credits/mebel.jpg';
import remont from '../../../images/credits/remont.jpg';
import tehnika from '../../../images/credits/tehnika.jpg';
import express from '../../../images/credits/express.jpg';

const credits = [
    {
        name: "Кредит наличными",
        preview: nalichnie,
        urlName: "nalichnie",
        styles: {
            background: "linear-gradient(to bottom,  #8ecbf8 0%,#245d8f 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#8ecbf8', endColorstr='#245d8f',GradientType=0 )"
        }
    },
    {
        name: "Потребительский кредит",
        preview: potrebitelskiy,
        urlName: "potrebitelskiy",
        styles: {
            background: "linear-gradient(to bottom, #fb8794 0%,#b43aa7 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#fb8794', endColorstr='#b43aa7',GradientType=0 )"
        }
    },
    {
        name: "На автомобиль",
        preview: avto,
        urlName: "avto",
        styles: {
            background: "linear-gradient(to bottom, #9ce9b2 0%,#34807c 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#9ce9b2', endColorstr='#34807c',GradientType=0 )"
        }
    },
    {
        name: "На отпуск",
        preview: otpusk,
        urlName: "otpusk",
        styles: {
            background: "linear-gradient(to bottom, #cdf45b 0%,#34833a 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#cdf45b', endColorstr='#34833a',GradientType=0 )"
        }
    },
    {
        name: "На недвижимость",
        preview: nedvizhimost,
        urlName: "nedvizhimost",
        styles: {
            background: "linear-gradient(to bottom, #aeeefa 0%,#365c87 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#aeeefa', endColorstr='#365c87',GradientType=0 )"
        }
    },
    {
        name: "На мебель",
        preview: mebel,
        urlName: "mebel",
        styles: {
            background: "linear-gradient(to bottom, #fdde2c 0%,#df5006 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#fdde2c', endColorstr='#df5006',GradientType=0 )"
        }
    },
    {
        name: "На ремонт",
        preview: remont,
        urlName: "remont",
        styles: {
            background: "linear-gradient(to bottom, #f26f50 0%,#a81d30 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f26f50', endColorstr='#a81d30',GradientType=0 )"
        }
    },
    {
        name: "На бытовую технику",
        preview: tehnika,
        urlName: "tehnika",
        styles: {
            background: "linear-gradient(to bottom, #abb4ed 0%,#3f2b92 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#abb4ed', endColorstr='#3f2b92',GradientType=0 )"
        }
    },
    {
        name: "Экспресс-кредиты",
        preview: express,
        urlName: "express",
        styles: {
            background: "linear-gradient(to bottom, #e84e58 0%,#c8142f 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e84e58', endColorstr='#c8142f',GradientType=0 )"
        }
    }
];

const SelectionItems = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }, []);
    return (
        <div className="selection-items">
            {
                windowWidth < 768 && <div className="selection-item item-title">
                    <h3>Подбор кредита онлайн:</h3>
                    <div>&#10093;</div>
                </div>
            }
            {
                credits.map((credit, index) => <SelectionItem key={index} {...credit} />)
            }
        </div>
    );
}

export default SelectionItems;