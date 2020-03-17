import React from 'react';
import Calc from '../components/CalculatorComponents';
import Pluses from '../components/mainComponents/pluses';

const Calculator = (props) => {
    const creditName = props.match.params.name;
    return (
        <section id="calcPage">
            <Calc calcName={creditName} oldPath={props.location.state ? props.location.state.prevPath : '/'} />
            <Pluses />
        </section>
    );
}

export default Calculator;