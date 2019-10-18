import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {evaluate} from "mathjs";
import { pressEquals } from '../actions';

const EqualsButton = (props) => {
    const {id, type, text} = props;
    const {pressEquals} = props;
    const {formula, evaluated, history} = props;

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
    }

    return(
        <button id={id} className={"btn " + type}
            onClick={() => handleEquals(type, text)}
        >{text}</button>
    );
}

const mapStateToProps = (state) => ({
    formula: state.formula,
    evaluated: state.evaluated,
    history: state.history,
    previousResult: state.previousResult
});

const mapDispatchToProps = (dispatch) => ({
    pressEquals: (obj) => dispatch(pressEquals(obj))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EqualsButton);
