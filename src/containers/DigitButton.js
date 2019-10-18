import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pressDigit, pressDecimal } from '../actions';
import { isDigitAddable } from "../utils";

const DigitButton = (props) => {
    const {id, type, text} = props;
    const {pressDigit, pressDecimal} = props;
    const {formula, result, evaluated} = props;

    const handleButtonClick = (buttonType, buttonText) => {
        switch(buttonType) {
            case 'number':
                handleDigit(buttonText);
                break;
            case 'decimal':
                handleDecimal(buttonText);
                break;
            default:
                break;
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
    }

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
                    console.log(buttonText);
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

DigitButton.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    formula: PropTypes.string.isRequired,
    evaluated: PropTypes.bool.isRequired,
    result: PropTypes.string.isRequired,
    pressDigit: PropTypes.func.isRequired,
    pressDecimal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    formula: state.formula,
    result: state.result,
    evaluated: state.evaluated
});

const mapDispatchToProps = (dispatch) => ({
    pressDigit: (obj) => dispatch(pressDigit(obj)),
    pressDecimal: (obj) => dispatch(pressDecimal(obj))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DigitButton);
