import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pressDigit } from '../actions';
import { isDigitAddable } from "../utils";

const Button = (props) => {
    const {id, type, text} = props;
    const {pressDigit} = props;
    const {formula, result, evaluated} = props;

    const handleButtonClick = (event, buttonType, buttonText) => {
        switch(buttonType) {
            case 'number':
                handleDigit(event, buttonText);
                break;
            case 'operation':
                console.log('WIP: operation');
                break;
            case 'decimal':
                console.log('WIP: decimal');
                break;
            case 'clear-all':
                console.log('WIP: AC');
                break;
            default:
                break;
        }
    };

    const handleDigit = (event, buttonText) => {
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

    let btnClasses = type;
    if(btnClasses === undefined) {
        btnClasses = "btn";
    } else {
        btnClasses = "btn " + btnClasses;
    }

    return(
        <button id={id} className={btnClasses}
            onClick={event => handleButtonClick(event, type, text)}
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
    evaluated: state.evaluated
});

const mapDispatchToProps = (dispatch) => ({
  pressDigit: (obj) => dispatch(pressDigit(obj))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Button);;