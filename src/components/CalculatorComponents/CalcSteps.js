import React from 'react';
import CalcStep from './CalcStep';
import { CSSTransition } from 'react-transition-group';
import StepsList from './StepsList';
import ProgressStep from './ProgressStep';
import FinalStep from './FinalStep';
import { getSteps } from './getSteps';

const CalcSteps = (props) => {
    const steps = getSteps(props.calcName);
    steps.map(item => {
        let newItem = {};
        if (!(item.inputName in props.calcStore)) {
            newItem[item.inputName] = item.initValue || "";
            props.setStepsToStore(newItem);
        }
        return newItem;
    });
    return (
        <div className="calc-steps">
            <div className="container">
                {
                    steps.map((item, index) => {
                        return <CSSTransition
                            in={(props.calcStore.activeStep === (index + 1))}
                            timeout={300}
                            key={index}
                            classNames="step"
                            unmountOnExit
                            
                        >
                            <CalcStep 
                                data={item}
                                stepNum={props.calcStore.activeStep}
                                calcStore={props.calcStore} 
                                prev={props.prev} 
                                next={props.next} 
                                inputChange={props.inputChange}
                            />
                        </CSSTransition>
                    })
                }
                <CSSTransition
                    in={props.calcStore.activeStep === steps.length + 1}
                    timeout={400}
                    classNames="step"
                    unmountOnExit
                >
                    <ProgressStep next={props.next} />
                </CSSTransition>
                <CSSTransition
                    in={props.calcStore.activeStep === steps.length + 2}
                    timeout={400}
                    classNames="step"
                    unmountOnExit
                >
                    <FinalStep 
                        calcStore={props.calcStore}
                        resetState={props.resetState}
                        calcName={props.calcName}
                    />
                </CSSTransition>
            </div>
            {
                props.calcStore.activeStep <= steps.length && <StepsList itemsLength={steps.length} activeItem={props.calcStore.activeStep} />
            }
            
        </div>
    );
}

export default CalcSteps;