import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pressDigit, pressClear, pressOperation } from '../actions';
import { isDigitAddable } from "../utils";

const Button = (props) => {
    const {id, type, text} = props;
    const {pressDigit, pressClear, pressOperation} = props;
    const {formula, result, evaluated, previousResult} = props;

    const handleButtonClick = (buttonType, buttonText) => {
        switch(buttonType) {
            case 'number':
                handleDigit(buttonText);
                break;
            case 'operation':
                handleOperation(buttonText);
                break;
            case 'decimal':
                console.log('WIP: decimal');
                break;
            case 'clear-all':
                handleAC();
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
    };

    const handleDigit = (buttonText) => {
        let userInput = buttonText;
        let newFormula = formula.concat(userInput);

        if(evaluated) {
            pressDigit({
                formula: userInput !== "0" ? userInput : "",
                result: userInput === "0" ? "" : userInput,
                evaluated: false
            });
            return;
        }

        if(!isDigitAddable(userInput, result)) {
            pressDigit({
                result: result
            });
            return;
        }

        if( (/[*+\-/]0$/).test(formula)) {
            newFormula = formula.slice(0, -1) + userInput;
        } else {
            if(!(/[*+\-/]/).test(result))
            {
                userInput = result + userInput;
            }
        }

        pressDigit({
            formula: newFormula,
            result: userInput,
            evaluated: false
        });
    };

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
                console.log(newFormula);
        pressOperation({
            formula: newFormula,
            result: userInput
        });
    };

    let btnClasses = type;
    if(btnClasses === undefined) {
        btnClasses = "btn";
    } else {
        btnClasses = "btn " + btnClasses;
    }

    return(
        <button id={id} className={btnClasses}
            onClick={() => handleButtonClick(type, text)}
        >{text}</button>
    );
}

Button.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    text: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    formula: state.formula,
    result: state.result,
    evaluated: state.evaluated,
    previousResult: state.previousResult,
});

const mapDispatchToProps = (dispatch) => ({
    pressDigit: (obj) => dispatch(pressDigit(obj)),
    pressClear: (obj) => dispatch(pressClear(obj)),
    pressOperation: (obj) => dispatch(pressOperation(obj))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Button);