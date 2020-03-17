import React, {Component} from 'react';
import CalcMainScreen from './CalcMainScreen';
import CalcSteps from './CalcSteps';
import { CSSTransition } from 'react-transition-group';
import { nextStep, prevStep, inputChangeHandler } from './controllers';
import { getSteps } from './getSteps';
import './calc.scss';
class Calc extends Component {
    constructor(props) {
        super(props);
        this.initState = {
            isMainScreen: true,
            stepsVisible: false,
            activeStep: 0,
            summa: 0,
            steps: []
        }
        this.state = this.initState;
        this.nextHandler = this.nextHandler.bind(this);
        this.prevHandler = this.prevHandler.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.resetState = this.resetState.bind(this);
        this.setStepsToStore = this.setStepsToStore.bind(this);
    }
    nextHandler = () => this.setState(nextStep(this.state));
    prevHandler = () => this.setState(prevStep(this.state));
    inputChange = e => this.setState(inputChangeHandler(e, this.state));
    resetState = () => this.setState(this.initState);
    setStepsToStore = steps => this.setState(steps);
    
    componentDidMount() {
        this.setState({steps: getSteps(this.props.calcName)});
        this.state.steps.map(item => {
            const newItem = {};
            newItem[item.inputName] = item.initValue || "";
            this.setStepsToStore(newItem);
            return newItem;
        });
    }
    componentDidUpdate = oldProps => {
        if (this.props.calcName !== oldProps.calcName) {
            if (this.state.steps !== 0) {
                this.state.steps.map(item => {
                    if (item.inputName in this.state) delete this.state[item.inputName];
                    return {};
                });
            }
            this.setState({...this.state, ...this.initState, steps: getSteps(this.props.calcName)}); 
        } 
        
    }
    
    render () {
        return (
            <div id="calc">
                <CSSTransition
                    in={this.state.isMainScreen}
                    timeout={400}
                    classNames="main"
                    unmountOnExit
                    onEnter={() => this.setState({stepsVisible: false})}
                    onExited={() => this.setState({stepsVisible: true})}
                >
                    <CalcMainScreen {...this.props} calcStore={this.state} next={this.nextHandler} inputChange={this.inputChange} inputName="summa" steps={this.state.steps} />
                </CSSTransition>
                <CSSTransition
                    in={this.state.stepsVisible}
                    timeout={400}
                    classNames="steps"
                    unmountOnExit
                >
                    <CalcSteps 
                        calcStore={this.state} 
                        prev={this.prevHandler} 
                        next={this.nextHandler}
                        inputChange={this.inputChange}
                        resetState={this.resetState}
                        setStepsToStore={this.setStepsToStore}
                        calcName={this.props.calcName}
                    />
                </CSSTransition>
            </div>
        );
    }
    
}

export default Calc;