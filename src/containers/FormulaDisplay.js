import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FormulaDisplay = ({formula}) => {
    return(
        <div id="history-display">{formula}</div>
    );
}
FormulaDisplay.propTypes = {
    formula: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    formula: state.formula
});

export default connect(
    mapStateToProps
)(FormulaDisplay);