import React, { Component } from "react";
import SumCalculator from "../components/mainComponents/mainCalculator/sumCalculator"

export class MainCalculator extends Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
    };
    this.changeTab1 = this.changeTab1.bind(this);
    this.changeTab2 = this.changeTab2.bind(this);
  }

  changeTab1 = () => {
    this.setState({
      tabIndex: 0,
    });
  };

  changeTab2 = () => {
    this.setState({
      tabIndex: 1,
    });
  };

  render() {
    return (
      <div className="container">
        <form className="calc">
          <div className="calc__top">
            <ul className="tablist">
              <li className="presentation" onClick={this.changeTab1}>
                по сумме кредита 
              </li>
              <li className="presentation" onClick={this.changeTab2}>
                по цене покупки
              </li>
            </ul>
          </div>
          <div className="calc__middle">
            <section className="tabs-content">
              {this.state.tabIndex === 0 ? <SumCalculator /> : null}
              {this.state.tabIndex === 1 ? <div>2</div> : null}
            </section>
          </div>
          <div className="calc__bottom"></div>
        </form>
      </div>
    );
  }
}

export default MainCalculator;
