import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



export class SumCalculator extends Component {
    constructor() {
        super();
        this.state = {
             payment: '0',
             sumPayment: '0',
             overPay: '0',
             prcOverPay: '0',
             endPayment: '0',
        }
    }

    handlePayment = () => {
        // this.setState() => {

        // }
    }

    render() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const options = ['руб.', '%'];
        const optionsMonth = ['январь', 'февраль', 'март', 'апрель','май', 'июнь', 'июль', 'август', 'сентябрь', 'окрябрь', 'ноябрь', 'декабрь',];
        const optionsYear = [`${year}`, `${year} + 1`, `${year} + 2`, `${year} + 3`, `${year} + 4`, `${year} + 5`];
        const defaultOption = options[0];
        const defaultOptionMonth = optionsMonth[month];
        const defaultOptionYear = optionsYear[0];
        return (
            <>
            <div className="сalc">
                <div className="сalc__row">
                    <span className="сalc__text">Сумма кредита</span>   
                    <input type="text" className="сalc__input" defaultValue="10000"/>
                    <span className="сalc__subtext">руб.</span>
                </div>
                <div className="сalc__row">
                    <span className="сalc__text">Срок кредита</span>   
                    <input type="text" className="сalc__input" defaultValue="12"/>
                    <span className="сalc__subtext">мес.</span>
                </div>
                <div className="сalc__row">
                    <span className="сalc__text">Процентная ставка</span>   
                    <input type="text" className="сalc__input" defaultValue="10"/>
                    <span className="сalc__subtext">%</span>
                </div>
                <div className="сalc__row">
                    <span className="сalc__text">Тип выплат</span>   
                    <div className="calc__wrapper">
                        <input type="radio" className="calc__input-radio" value="аннуитентный" name="type" checked/>аннуитентный
                        <input type="radio" className="calc__input-radio" value="дифференцированный" name="type"/>дифференцированный
                    </div>
                </div>
                <div className="сalc__row">
                    <span className="сalc__text">Единовременная комиссия</span>   
                    <input type="text" className="сalc__input"/>
                    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                </div>
                <div className="сalc__row">
                    <span className="сalc__text">Начало выплат</span>   
                    <Dropdown options={optionsMonth} onChange={this._onSelect} value={defaultOptionMonth} placeholder="Select an option" />
                    <Dropdown options={optionsYear} onChange={this._onSelect} value={defaultOptionYear} placeholder="Select an option" />
                </div>
                <input type="button" onClick={this.handlePayment} className="calc__button" value="рассчитать"/>
            </div>
            <div className="result">
                <div className="result__row">
                    <span className="result__text">Ежемесячный платеж</span>
        <span className="result__value">{this.state.payment}</span>
                </div>
                <div className="result__row">
                    <span className="result__text">Общая сумма выплат</span>
        <span className="result__value">{this.state.sumPayment}</span>
                <div className="result__row">
                    <span className="result__text">Переплата по кредиту</span>
        <span className="result__value">{this.state.overPay}</span>
                </div>
                <div className="result__row">
                    <span className="result__text">Процент переплаты</span>
        <span className="result__value">{this.state.prcOverPay}</span>
                </div>
                <div className="result__row">
                    <span className="result__text">Окончание выплат</span>
        <span className="result__value">{this.state.endPayment}</span>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default SumCalculator
