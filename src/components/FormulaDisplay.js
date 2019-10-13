import React from "react";
import PropTypes from 'prop-types';

const FormulaDisplay = (props) => {
    return(
        <div id="history-display">{props.formula}</div>
    );
}
FormulaDisplay.propTypes = {
    formula: PropTypes.string.isRequired
};

export default FormulaDisplay;