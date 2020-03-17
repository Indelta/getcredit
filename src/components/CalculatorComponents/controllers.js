
const nextStep = store => {
    
    return {...store, isMainScreen: false, activeStep: (store.activeStep + 1)}
}
const prevStep = store => {
    let stepCount = store.activeStep;
    stepCount = (stepCount > 0) ? (stepCount - 1) : stepCount;
    let isMainScreen = stepCount ? false : true;
    return {...store, isMainScreen, activeStep: stepCount }
}
const inputChangeHandler = (e, store) => {
    let newState = {}
    newState[e.target.name] = e.target.value;
    return {...store, ...newState}
}

export {
    nextStep,
    prevStep,
    inputChangeHandler
}