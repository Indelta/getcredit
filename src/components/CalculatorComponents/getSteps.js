import { defaultCalcSteps, lizingAvtoSteps, lizingNedvizhimostSteps, ipSteps } from './steps';

const getSteps = calcName => {
    let steps = defaultCalcSteps;
    switch(calcName) {
        case 'potrebitelskiy':
        case 'nalichnie':
        case 'avto':
        case 'otpusk':
        case 'nedvizhimost':
        case 'mebel':
        case 'remont':
        case 'tehnika':
        case 'express':
        case 'ref':
            steps = defaultCalcSteps;
            break;
        case 'ip':
            steps = ipSteps;
            break;
        case 'lizing-avto':
            steps = lizingAvtoSteps;
            break;
        case 'lizing-nedvizhimost':
            steps = lizingNedvizhimostSteps;
            break;
        default: steps = defaultCalcSteps;
    }
    return steps;
}

export { getSteps };