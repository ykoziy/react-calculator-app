import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pressClear, pressOperation } from '../actions';

const OperationButton = (props) => {
    const {id, type, text} = props;
    const {pressClear, pressOperation} = props;
    const {formula, result, evaluated, previousResult} = props;

    const handleButtonClick = (buttonType, buttonText) => {
        switch(buttonType) {
            case 'operation':
                handleOperation(buttonText);
                break;
            case 'clear-all':
                handleAC(buttonText);
                break;
            default:
                break;
        }
    };

    const handleAC = () => {
        pressClear({
            formula: "",
            evaluated: false,
            previousResult: "",
            result: ""
        });
    }

    const handleOperation = (buttonText) => {
        let userInput = buttonText;
        let newFormula = formula.concat(userInput);

        if(evaluated) {
            pressOperation({
                formula: previousResult + userInput,
                result: userInput,
                evaluated: false
            });
            return;
        }

        if(result === "" && (/[*/+]/).test(userInput)) {
            newFormula = "0" + userInput;
        }

        if(userInput === "-") {
            newFormula = newFormula.replace(/-{2}|\+-$/,userInput);
        } else {
            newFormula = newFormula.replace(/[*+\-/]{2,}$/,userInput);
        }

        pressOperation({
            formula: newFormula,
            result: userInput
        });
    }

    return(
        <button id={id} className={"btn " + type}
            onClick={() => handleButtonClick(type, text)}
        >{text}</button>
    );
}

const mapStateToProps = (state) => ({
    formula: state.formula,
    result: state.result,
    evaluated: state.evaluated,
    previousResult: state.previousResult
});

const mapDispatchToProps = (dispatch) => ({
    pressClear: (obj) => dispatch(pressClear(obj)),
    pressOperation: (obj) => dispatch(pressOperation(obj))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationButton);
