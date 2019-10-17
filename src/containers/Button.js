import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {evaluate} from "mathjs";
import { pressDigit, pressClear, pressOperation, pressDecimal, pressEquals } from '../actions';
import { isDigitAddable } from "../utils";

const Button = (props) => {
    const {id, type, text} = props;
    const {pressDigit, pressClear, pressOperation, pressDecimal, pressEquals} = props;
    const {formula, result, evaluated, previousResult, history} = props;

    const handleButtonClick = (buttonType, buttonText) => {
        switch(buttonType) {
            case 'number':
                handleDigit(buttonText);
                break;
            case 'operation':
                handleOperation(buttonText);
                break;
            case 'decimal':
                handleDecimal(buttonText);
                break;
            case 'clear-all':
                handleAC();
                break;
            case 'operation equals':
                handleEquals(buttonText);
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

    const handleEquals = (buttonText) => {
        if(evaluated === false && formula !== "") {
            let expression = formula.replace((/[*+\-/]*$/), "");
            let result = evaluate(expression).toString();
            let newFormula = expression.concat("=" + result);
            let historyItem = {
                expression: newFormula,
                result: result
            };

            pressEquals({
                formula: newFormula,
                result: result.toString(),
                previousResult: result.toString(),
                evaluated: true,
                history: [historyItem, ...history]
            });
        }
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

        pressOperation({
            formula: newFormula,
            result: userInput
        });
    };

    const handleDecimal = (buttonText) => {
        let userInput = buttonText;
        if(evaluated === true) {
            this.setState({
                formula: "0.",
                result: "0.",
                evaluated: false
            });
        } else if(!result.includes(".")) {
            let newFormula = "";
            if((/[*+\-/]$/).test(formula) || (result === "" && formula === "")) {
                userInput = "0.";
                newFormula = formula + "0.";
            }else {
                userInput = formula.match(/(\d*)$/)[0] + ".";
                newFormula = formula + ".";
            }
            pressDecimal({
                formula: newFormula,
                result: userInput
            });
        }
    }
    
    return(
        <button id={id} className={"btn " + type}
            onClick={() => handleButtonClick(type, text)}
        >{text}</button>
    );
}

Button.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    formula: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    evaluated: PropTypes.bool.isRequired,
    previousResult: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
    pressDigit: PropTypes.func.isRequired,
    pressClear: PropTypes.func.isRequired,
    pressOperation: PropTypes.func.isRequired,
    pressDecimal: PropTypes.func.isRequired,
    pressEquals: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    formula: state.formula,
    result: state.result,
    evaluated: state.evaluated,
    previousResult: state.previousResult,
    history: state.history
});

const mapDispatchToProps = (dispatch) => ({
    pressDigit: (obj) => dispatch(pressDigit(obj)),
    pressClear: (obj) => dispatch(pressClear(obj)),
    pressOperation: (obj) => dispatch(pressOperation(obj)),
    pressDecimal: (obj) => dispatch(pressDecimal(obj)),
    pressEquals: (obj) => dispatch(pressEquals(obj))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Button);
